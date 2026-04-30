<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import type { SubmissionHandler } from "vee-validate";
import type { z } from "zod";
import { AlertCircle, Eye, EyeOff } from "lucide-vue-next";
import { toast } from "vue-sonner";
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
import TwoFactorAuthDialog from "@/components/auth/TwoFactorAuthDialog.vue";
import { signInFormSchema } from "@/lib/auth-form-schemas";
import {
	enableTwoFactor,
	generateTwoFactor,
	loginTwoFactor,
	signIn,
} from "@/services/authService";

definePageMeta({
	layout: "auth",
});

useHead({
	title: "Sign In - Rockads",
});

const route = useRoute();
const config = useRuntimeConfig();
const gtmEvent = useGtmEvent();

const goApiURL = (config.public.goApiURL as string).replace(/\/$/, "");
const panelAutoLoginUrl = config.public.panelAutoLoginUrl as string;
const COMMUNITY_AUTOLOGIN_URL
	= "https://community.rockads.com/?rest_route=/simple-jwt-login/v1/autologin&JWT=";

const formSchema = toTypedSchema(signInFormSchema);

type SignInFormValues = z.infer<typeof signInFormSchema>;

const apiError = ref<string | null>(null);
const isSubmitting = ref(false);
const isVerifyingTwoFactor = ref(false);
const showPassword = ref(false);
const { token: captchaToken, isDummyToken, resetToken } = useTurnstileToken();

// 2FA modal state — set after a successful /signin call when 2FA is in play.
const showTwoFactorModal = ref(false);
const twoFactorEnabled = ref(false);
const customerTwoFactorRequired = ref(false);
const otpAuthUrl = ref("");
const otpSecret = ref("");
const tempAccessToken = ref("");

// Surface server-side OAuth/login errors arriving as `?error=...` once on mount.
onMounted(() => {
	gtmEvent.pageViewEvent("Sign In - Rockads");

	const errorCode = typeof route.query.error === "string"
		? route.query.error
		: "";

	if (errorCode && errorCode !== "login_cancelled") {
		const map: Record<string, string> = {
			"customer is inactive":
				"Your account is currently inactive. Please contact support.",
			"user is passive":
				"This user has been deactivated. Please contact your administrator.",
			"unauthenticated":
				"You need to sign in to continue.",
		};

		toast.error(map[errorCode] ?? "We couldn't sign you in. Please try again.");
	}
});

function redirectAfterSignIn(accessToken: string, refreshToken?: string) {
	if (typeof window === "undefined") return;

	if (route.query.redirect === "community") {
		window.location.replace(`${COMMUNITY_AUTOLOGIN_URL}${accessToken}`);

		return;
	}

	const refreshParam = refreshToken
		? `&refresh_token=${refreshToken}`
		: "";

	window.location.replace(
		`${panelAutoLoginUrl}?token=${accessToken}${refreshParam}`,
	);
}

async function onSubmit(values: SignInFormValues) {
	apiError.value = null;
	isSubmitting.value = true;

	try {
		const data = await signIn(goApiURL, {
			email: values.email.trim(),
			password: values.password,
			captcha_response: captchaToken.value,
		});

		// Path A — no 2FA, redirect straight to the panel (or community).
		if (!data.customer_two_factor_required && !data.two_factor_enabled) {
			redirectAfterSignIn(data.access_token, data.refresh_token);

			return;
		}

		// Path B — 2FA is required (org mandate or user-enabled).
		tempAccessToken.value = data.access_token;
		twoFactorEnabled.value = data.two_factor_enabled;
		customerTwoFactorRequired.value = data.customer_two_factor_required;

		// Only fetch the QR/secret when the user is NOT yet enrolled.
		if (!data.two_factor_enabled) {
			const generated = await generateTwoFactor(goApiURL, data.access_token);

			otpAuthUrl.value = generated.otp_auth_url;
			otpSecret.value = generated.secret;
		}
		else {
			otpAuthUrl.value = "";
			otpSecret.value = "";
		}

		showTwoFactorModal.value = true;
	}
	catch (error: unknown) {
		const message = (error as { data?: { message?: string; code?: string } })
			?.data?.message
			?? (error instanceof Error ? error.message : "Sign in failed.");

		apiError.value = message;
		toast.error(message);
		resetToken();
	}
	finally {
		isSubmitting.value = false;
	}
}

const onFormSubmit: SubmissionHandler = (values) => {
	return onSubmit(values as SignInFormValues);
};

async function handleTwoFactorComplete(code: string) {
	isVerifyingTwoFactor.value = true;
	try {
		const result = twoFactorEnabled.value
			? await loginTwoFactor(goApiURL, tempAccessToken.value, { code })
			: await enableTwoFactor(goApiURL, tempAccessToken.value, {
				code,
				secret: otpSecret.value,
			});

		redirectAfterSignIn(result.access_token, result.refresh_token);
	}
	catch (error: unknown) {
		const message = (error as { data?: { message?: string } })
			?.data?.message
			?? (error instanceof Error ? error.message : "Code verification failed.");

		toast.error(message);
	}
	finally {
		isVerifyingTwoFactor.value = false;
	}
}

function handleTwoFactorOpenChange(open: boolean) {
	showTwoFactorModal.value = open;
	if (!open) {
		// Drop the temp token + setup state when the user cancels.
		tempAccessToken.value = "";
		otpAuthUrl.value = "";
		otpSecret.value = "";
	}
}
</script>

<template>
	<div>
		<Card class="w-full">
			<CardHeader class="space-y-1">
				<CardTitle class="text-2xl">
					Welcome back
				</CardTitle>
				<CardDescription>
					Sign in to continue managing your campaigns.
				</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4">
				<Alert
					v-if="apiError"
					variant="destructive"
				>
					<AlertCircle class="size-4" />
					<AlertTitle>Could not sign in</AlertTitle>
					<AlertDescription>{{ apiError }}</AlertDescription>
				</Alert>

				<AuthSocialLoginButtons />

				<div class="relative flex items-center gap-3">
					<div class="h-px flex-1 bg-border" />
					<span class="text-xs text-muted-foreground">or</span>
					<div class="h-px flex-1 bg-border" />
				</div>

				<Form
					:validation-schema="formSchema"
					class="space-y-4"
					@submit="onFormSubmit"
				>
					<FormField
						v-slot="{ componentField }"
						name="email"
					>
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									test-id="signin-email-input"
									type="email"
									autocomplete="email"
									placeholder="you@company.com"
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
							<div class="flex items-center justify-between gap-2">
								<FormLabel>Password</FormLabel>
								<NuxtLink
									to="/forgot-password"
									class="text-xs font-medium text-primary hover:underline"
								>
									Forgot password?
								</NuxtLink>
							</div>
							<FormControl>
								<div class="relative">
									<Input
										test-id="signin-password-input"
										:type="showPassword ? 'text' : 'password'"
										autocomplete="current-password"
										class="pr-10"
										placeholder="Enter your password"
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

					<NuxtTurnstile
						v-if="!isDummyToken"
						v-model="captchaToken"
						class="w-full"
						:options="{ size: 'flexible' }"
					/>

					<Button
						test-id="signin-submit-btn"
						type="submit"
						class="w-full"
						:disabled="isSubmitting"
					>
						<Spinner
							v-if="isSubmitting"
							class="mr-2"
						/>
						Sign In
					</Button>
				</Form>
			</CardContent>
			<CardFooter class="justify-center text-sm text-muted-foreground">
				No account yet?
				<NuxtLink
					to="/register"
					class="ml-1 font-medium text-primary hover:underline"
				>
					Create one
				</NuxtLink>
			</CardFooter>
		</Card>

		<TwoFactorAuthDialog
			:open="showTwoFactorModal"
			:two-factor-enabled="twoFactorEnabled"
			:customer-two-factor-required="customerTwoFactorRequired"
			:otp-auth-url="otpAuthUrl"
			:otp-secret="otpSecret"
			:submitting="isVerifyingTwoFactor"
			@update:open="handleTwoFactorOpenChange"
			@complete="handleTwoFactorComplete"
		/>
	</div>
</template>
