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
import { getCookie, getReferralCode, setCookie, clearReferrer } from "@/utils/cookie";

declare global {
	interface Window {
		dataLayer?: Record<string, unknown>[];
		fbq?: (...args: unknown[]) => void;
	}
}

definePageMeta({
	layout: "auth",
});

useHead({
	title: "Sign Up - Rockads",
});

const marketingSiteBase = "https://www.rockads.com";

const legal = {
	terms: `${marketingSiteBase}/en/terms-of-service-of-rockads/`,
	privacy: `${marketingSiteBase}/en/privacy-notice/`,
	cookies: `${marketingSiteBase}/en/cookie-policy/`,
} as const;

const config = useRuntimeConfig();
const route = useRoute();

const baseURL = (config.public.goApiURL as string).replace(/\/$/, "");
const panelAutoLoginUrl = config.public.panelAutoLoginUrl as string;

const formSchema = toTypedSchema(signUpFormSchema);

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

const apiError = ref<string | null>(null);
const isSubmitting = ref(false);
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const captchaToken = ref<string>("");
const agreement = ref<boolean | null>(null);
const showTermsRequiredError = ref(false);

// Pre-fill email from query param (e.g. from invite link)
const initialEmail = typeof route.query.email === "string" ? route.query.email : "";

// Capture UTM codes and referral code on mount
onMounted(() => {
	setCookie(route.query as Record<string, string | string[] | undefined>);
});

function pushDataLayerEvents() {
	if (!import.meta.client) return;

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

function handleAutoLogin(token: string) {
	clearReferrer();
	window.location.href = `${panelAutoLoginUrl}?token=${token}`;
}

async function onSubmit(values: SignUpFormValues) {
	if (!values.accept_terms) {
		showTermsRequiredError.value = true;

		return;
	}

	apiError.value = null;
	isSubmitting.value = true;

	try {
		const response = await signUp(baseURL, {
			name: values.name.trim(),
			email: values.email.trim(),
			password: values.password,
			captcha_response: captchaToken.value || undefined,
			utm_sources: getCookie("utm_codes"),
			referral_customer_id: getReferralCode(),
			agreement: values.accept_terms,
		});

		pushDataLayerEvents();

		if (response.token) {
			handleAutoLogin(response.token);

			return;
		}

		await navigateTo({
			path: "/verify-email",
			query: { email: values.email.trim() },
		});
	}
	catch (error: unknown) {
		const errorData = (error as { data?: { message?: string } })?.data;

		apiError.value = errorData?.message
			?? (error instanceof Error ? error.message : "Could not create your account.");
		captchaToken.value = "";
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
	showTermsRequiredError.value = false;
}

function handleRequireAgreement() {
	showTermsRequiredError.value = true;
}
</script>

<template>
	<Card class="w-full">
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
								test-id="sign-up-name-input"
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
								test-id="sign-up-email-input"
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
									test-id="sign-up-password-input"
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
									test-id="sign-up-password-confirm-input"
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
					v-slot="{ value, setValue }"
					name="accept_terms"
				>
					<FormItem>
						<div class="flex gap-3">
							<FormControl>
								<Checkbox
									test-id="sign-up-terms-checkbox"
									:model-value="value === true"
									class="mt-0.5"
									@update:model-value="(v) => {
										setValue(v === true);
										handleAgreementChange(v === true);
									}"
								/>
							</FormControl>
							<div class="min-w-0 flex-1 space-y-1">
								<FormLabel class="block text-sm leading-snug font-normal text-muted-foreground">
									I accept the
									<a
										:href="legal.terms"
										target="_blank"
										rel="noopener noreferrer"
										class="font-medium text-primary underline-offset-4 hover:underline"
									>service agreement</a>,
									<a
										:href="legal.privacy"
										target="_blank"
										rel="noopener noreferrer"
										class="font-medium text-primary underline-offset-4 hover:underline"
									>privacy policy</a>, and
									<a
										:href="legal.cookies"
										target="_blank"
										rel="noopener noreferrer"
										class="font-medium text-primary underline-offset-4 hover:underline"
									>cookie policy</a>.
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
					v-model="captchaToken"
					class="w-full"
					:options="{ size: 'flexible' }"
				/>

				<Button
					test-id="sign-up-submit-btn"
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
				to="/sign-in"
				class="ml-1 font-medium text-primary hover:underline"
			>
				Sign in
			</NuxtLink>
		</CardFooter>
	</Card>
</template>
