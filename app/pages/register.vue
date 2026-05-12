<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import type { SubmissionHandler } from "vee-validate";
import type { z } from "zod";
import { AlertCircle, Eye, EyeOff } from "lucide-vue-next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { signUpFormSchema } from "@/lib/auth-form-schemas";
import { signUp } from "@/services/signUpService";
import { getCookie, getReferralCode, setCookie } from "@/utils/cookie";
import {
	REGISTER_VERIFY_QUERY,
	readRegisterVerifyState,
	writeRegisterVerifyState,
} from "@/utils/register-verify-storage";
import RegisterSuccess from "@/components/auth/RegisterSuccess.vue";
import TermsOfServiceDialog from "@/components/auth/TermsOfServiceDialog.vue";

definePageMeta({
	layout: "auth",
});

useHead({
	title: "Sign Up - Rockads",
});

const gtmEvent = useGtmEvent();

const legal = {
	terms: "/terms-of-service-of-rockads",
	privacy: "/privacy-notice",
	cookies: "/cookie-policy",
} as const;

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const baseURL = (config.public.goApiURL as string).replace(/\/$/, "");
const panelAutoLoginUrl = config.public.panelAutoLoginUrl as string;

const formSchema = toTypedSchema(signUpFormSchema);

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

const apiError = ref<string | null>(null);
const isSubmitting = ref(false);
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
// Initialize from URL synchronously so SSR + hydration render the success
// shell directly (no form-flash on refresh). Email/countdown populate from
// sessionStorage on client mount via restoreVerifyStateFromUrl().
const signupSuccess = ref(
	route.query[REGISTER_VERIFY_QUERY.key] === REGISTER_VERIFY_QUERY.value,
);
const submittedEmail = ref("");
const { token: captchaToken, isDummyToken, resetToken } = useTurnstileToken();
const agreement = ref<boolean | null>(null);
const showTermsRequiredError = ref(false);
const showTermsModal = ref(false);
// Bound to <Form ref="formRef"> — used by the modal & submit gate to write
// `accept_terms` without forcing the user to double-tap the checkbox.
const formRef = ref<{ setFieldValue?: (field: string, value: unknown) => void } | null>(null);

function setAcceptTerms(value: boolean) {
	formRef.value?.setFieldValue?.("accept_terms", value);
}

// Pre-fill email from query param (e.g. from invite link)
const initialEmail = typeof route.query.email === "string" ? route.query.email : "";

async function clearStatusFromUrl() {
	const { [REGISTER_VERIFY_QUERY.key]: _omit, ...rest } = route.query;

	await router.replace({ query: rest });
}

// Hydrate the success shell with persisted email on mount. If storage is
// empty (stale URL, shared link, new tab), revert to the form and clean the
// query so the user lands on a clean register page.
function hydrateVerifyState() {
	if (!signupSuccess.value) return;

	const stored = readRegisterVerifyState();

	if (stored) {
		submittedEmail.value = stored.email;

		return;
	}
	signupSuccess.value = false;
	void clearStatusFromUrl();
}

// Capture UTM codes and referral code on mount
onMounted(() => {
	setCookie(route.query as Record<string, string | string[] | undefined>);
	gtmEvent.pageViewEvent("Sign Up - Rockads");
	hydrateVerifyState();
});

function fireRegistrationCompletedEvents() {
	if (!import.meta.client) return;

	const eventName = "web.signup.completed";
	const eventPayload = {
		event_category: "signup",
		event_label: "Register - Completed",
	} as const;

	if (window.$gtag) {
		window.$gtag.event(eventName, eventPayload);
	}
	if (window.firebase) {
		try {
			window.firebase.analytics().logEvent(eventName, eventPayload);
		}
		catch (error) {
			console.error("Firebase analytics logEvent failed:", error);
		}
	}

	window.dataLayer = window.dataLayer ?? [];
	window.dataLayer.push({
		event: "GAEvent",
		eventCategory: "Register",
		eventAction: "Success",
		eventLabel: "register_frontend",
	});
	window.dataLayer.push({
		event: "register",
		status: "success",
		platform: "register_register_frontend",
	});

	if (window.fbq) {
		window.fbq("trackCustom", "customRegister", { status: "success_frontend" });
	}
}

async function onSubmit(values: SignUpFormValues) {
	if (!values.accept_terms) {
		// Force the user through the terms modal — same gate as the source.
		showTermsRequiredError.value = true;
		showTermsModal.value = true;

		return;
	}

	apiError.value = null;
	isSubmitting.value = true;

	try {
		await signUp(baseURL, {
			name: values.name.trim(),
			email: values.email.trim(),
			password: values.password,
			captcha_response: captchaToken.value || undefined,
			utm_sources: getCookie("utm_codes"),
			referral_customer_id: getReferralCode(),
			agreement: values.accept_terms,
		});

		fireRegistrationCompletedEvents();

		const email = values.email.trim();

		writeRegisterVerifyState({ email, resendStartedAt: Date.now() });
		submittedEmail.value = email;
		signupSuccess.value = true;
		await router.replace({
			query: { ...route.query, [REGISTER_VERIFY_QUERY.key]: REGISTER_VERIFY_QUERY.value },
		});
	}
	catch (error: unknown) {
		const errorData = (error as { data?: { message?: string } })?.data;

		apiError.value = errorData?.message
			?? (error instanceof Error ? error.message : "Could not create your account.");
		resetToken();
	}
	finally {
		isSubmitting.value = false;
	}
}

const onFormSubmit: SubmissionHandler = (values) => {
	return onSubmit(values as SignUpFormValues);
};

function handleAgreementChange(checked: boolean) {
	agreement.value = checked;
	if (checked) showTermsRequiredError.value = false;
}

function handleRequireAgreement() {
	// Triggered by social login buttons when terms aren't accepted yet.
	showTermsRequiredError.value = true;
	showTermsModal.value = true;
}

function handleTermsCheckboxClick(currentlyChecked: boolean) {
	// Mirror the source RACheckTermsModal: clicking the checkbox never
	// silently flips the form state — it always opens the modal (or, when
	// already accepted, treats it as "uncheck").
	if (currentlyChecked) {
		setAcceptTerms(false);
		handleAgreementChange(false);

		return;
	}
	showTermsModal.value = true;
}

function handleTermsConfirm() {
	setAcceptTerms(true);
	handleAgreementChange(true);
}

function handleTermsCancel() {
	setAcceptTerms(false);
	handleAgreementChange(false);
}
</script>

<template>
	<div>
		<RegisterSuccess
			v-if="signupSuccess"
			:email="submittedEmail"
		/>

		<Card
			v-else
			class="w-full"
		>
			<CardHeader class="space-y-2 text-center sm:text-left">
				<CardTitle class="text-2xl">
					Create your account
				</CardTitle>
				<CardDescription class="text-base">
					Work smarter, grow faster. Rockads is a performance marketing ecosystem.
				</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4">
				<Alert
					v-if="apiError"
					variant="destructive"
				>
					<AlertCircle class="size-4" />
					<AlertTitle>Could not sign up</AlertTitle>
					<AlertDescription>{{ apiError }}</AlertDescription>
				</Alert>

				<AuthSocialLoginButtons
					requires-agreement
					:agreement="agreement"
					@require-agreement="handleRequireAgreement"
				/>

				<div class="relative flex items-center gap-3">
					<div class="h-px flex-1 bg-border" />
					<span class="text-xs text-muted-foreground">or</span>
					<div class="h-px flex-1 bg-border" />
				</div>

				<Form
					ref="formRef"
					:validation-schema="formSchema"
					:initial-values="{ accept_terms: false, email: initialEmail }"
					class="space-y-4"
					@submit="onFormSubmit"
				>
					<FormField
						v-slot="{ componentField }"
						name="name"
					>
						<FormItem>
							<FormLabel>Name and surname</FormLabel>
							<FormControl>
								<Input
									test-id="register-name-input"
									type="text"
									autocomplete="name"
									placeholder="Name and surname"
									v-bind="componentField"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>

					<FormField
						v-slot="{ componentField }"
						name="email"
					>
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									test-id="register-email-input"
									type="email"
									autocomplete="email"
									placeholder="Enter a valid e-mail"
									v-bind="componentField"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>

					<FormField
						v-slot="{ componentField }"
						name="password"
					>
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<div class="relative">
									<Input
										test-id="register-password-input"
										:type="showPassword ? 'text' : 'password'"
										autocomplete="new-password"
										class="pr-10"
										placeholder="Min. 8 chars with uppercase, lowercase & number"
										v-bind="componentField"
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										class="absolute top-0 right-0 h-9 w-9 text-muted-foreground hover:text-foreground"
										:aria-pressed="showPassword"
										:aria-label="showPassword ? 'Hide password' : 'Show password'"
										@click="showPassword = !showPassword"
									>
										<Eye
											v-if="!showPassword"
											class="size-4"
										/>
										<EyeOff
											v-else
											class="size-4"
										/>
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>

					<FormField
						v-slot="{ componentField }"
						name="password_confirmation"
					>
						<FormItem>
							<FormLabel>Confirm password</FormLabel>
							<FormControl>
								<div class="relative">
									<Input
										test-id="register-password-confirm-input"
										:type="showPasswordConfirm ? 'text' : 'password'"
										autocomplete="new-password"
										class="pr-10"
										placeholder="Re-enter your password"
										v-bind="componentField"
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										class="absolute top-0 right-0 h-9 w-9 text-muted-foreground hover:text-foreground"
										:aria-pressed="showPasswordConfirm"
										:aria-label="showPasswordConfirm ? 'Hide password' : 'Show password'"
										@click="showPasswordConfirm = !showPasswordConfirm"
									>
										<Eye
											v-if="!showPasswordConfirm"
											class="size-4"
										/>
										<EyeOff
											v-else
											class="size-4"
										/>
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>

					<FormField
						v-slot="{ value }"
						name="accept_terms"
					>
						<FormItem>
							<div class="flex gap-3">
								<FormControl>
									<Checkbox
										test-id="register-terms-checkbox"
										:model-value="value === true"
										class="mt-0.5"
										@update:model-value="() => handleTermsCheckboxClick(value === true)"
									/>
								</FormControl>
								<div class="min-w-0 flex-1 space-y-1">
									<FormLabel class="block text-sm leading-snug font-normal text-muted-foreground">
										I accept the
										<NuxtLink
											:to="legal.terms"
											target="_blank"
											class="font-medium text-primary underline-offset-4 hover:underline"
										>
											service agreement
										</NuxtLink>,
										<NuxtLink
											:to="legal.privacy"
											target="_blank"
											class="font-medium text-primary underline-offset-4 hover:underline"
										>
											privacy policy
										</NuxtLink>, and
										<NuxtLink
											:to="legal.cookies"
											target="_blank"
											class="font-medium text-primary underline-offset-4 hover:underline"
										>
											cookie policy
										</NuxtLink>.
									</FormLabel>
									<FormMessage />
								</div>
							</div>
							<p
								v-if="showTermsRequiredError"
								class="text-sm font-medium text-destructive"
							>
								Please accept the terms before continuing.
							</p>
						</FormItem>
					</FormField>

					<NuxtTurnstile
						v-if="!isDummyToken"
						v-model="captchaToken"
						class="w-full"
						:options="{ size: 'flexible' }"
					/>

					<Button
						test-id="register-submit-btn"
						type="submit"
						class="w-full"
						:disabled="isSubmitting"
					>
						<Spinner
							v-if="isSubmitting"
							class="mr-2"
						/>
						Create account
					</Button>
				</Form>
			</CardContent>
			<CardFooter class="justify-center text-sm text-muted-foreground">
				Already have an account?
				<NuxtLink
					to="/signin"
					class="ml-1 font-medium text-primary hover:underline"
				>
					Sign in
				</NuxtLink>
			</CardFooter>
		</Card>

		<TermsOfServiceDialog
			v-model:open="showTermsModal"
			@confirm="handleTermsConfirm"
			@cancel="handleTermsCancel"
		/>
	</div>
</template>
