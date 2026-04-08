<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import type { z } from "zod";
import { AlertCircle, CheckCircle2 } from "lucide-vue-next";
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
import {
	resendVerificationFormSchema,
	verifyEmailTokenFormSchema,
} from "@/lib/auth-form-schemas";

definePageMeta({
	layout: "auth",
});

useHead({
	title: "Verify Email - Rockads",
});

const config = useRuntimeConfig();
const route = useRoute();

const verifySchema = toTypedSchema(verifyEmailTokenFormSchema);
const resendSchema = toTypedSchema(resendVerificationFormSchema);

type ManualVerifyFormValues = z.infer<typeof verifyEmailTokenFormSchema>;
type ResendVerificationFormValues = z.infer<typeof resendVerificationFormSchema>;

const initialEmail = computed(() => {
	const raw = route.query.email;

	return typeof raw === "string" ? raw : "";
});

const linkToken = computed(() => {
	const raw = route.query.token;

	return typeof raw === "string" ? raw.trim() : "";
});

const autoVerifyState = ref<"idle" | "pending" | "success" | "error">("idle");
const autoVerifyMessage = ref("");

const manualError = ref<string | null>(null);
const manualSubmitting = ref(false);
const manualSuccess = ref(false);

const resendError = ref<string | null>(null);
const resendSubmitting = ref(false);
const resendSuccess = ref(false);

onMounted(async () => {
	if (!import.meta.client || !linkToken.value) {
		autoVerifyState.value = "idle";

		return;
	}
	autoVerifyState.value = "pending";
	autoVerifyMessage.value = "";
	try {
		await $fetch("verify-email", {
			baseURL: config.public.goApiURL as string,
			method: "POST",
			body: { token: linkToken.value },
		});
		autoVerifyState.value = "success";
	}
	catch (error: unknown) {
		autoVerifyState.value = "error";
		autoVerifyMessage.value = error instanceof Error
			? error.message
			: "Verification failed.";
	}
});

async function onManualVerify(values: ManualVerifyFormValues) {
	manualError.value = null;
	manualSubmitting.value = true;
	try {
		await $fetch("verify-email", {
			baseURL: config.public.goApiURL as string,
			method: "POST",
			body: { token: values.token.trim() },
		});
		manualSuccess.value = true;
	}
	catch (error: unknown) {
		manualError.value = error instanceof Error
			? error.message
			: "Verification failed.";
	}
	finally {
		manualSubmitting.value = false;
	}
}

function onManualVerifyFormSubmit(values: Record<string, unknown>) {
	return onManualVerify(values as ManualVerifyFormValues);
}

async function onResend(values: ResendVerificationFormValues) {
	resendError.value = null;
	resendSubmitting.value = true;
	try {
		await $fetch("resend-verification", {
			baseURL: config.public.goApiURL as string,
			method: "POST",
			body: { email: values.email.trim() },
		});
		resendSuccess.value = true;
	}
	catch (error: unknown) {
		resendError.value = error instanceof Error
			? error.message
			: "Could not resend the email.";
	}
	finally {
		resendSubmitting.value = false;
	}
}

function onResendFormSubmit(values: Record<string, unknown>) {
	return onResend(values as ResendVerificationFormValues);
}
</script>

<template>
	<Card class="w-full">
		<CardHeader class="space-y-1">
			<CardTitle class="text-2xl">
				Verify your email
			</CardTitle>
			<CardDescription>
				Confirm your address to activate your account. Use the link we sent you, or paste the token below.
			</CardDescription>
		</CardHeader>
		<CardContent class="space-y-6">
			<div
				v-if="linkToken"
				class="space-y-2"
			>
				<Alert v-if="autoVerifyState === 'pending'">
					<Spinner class="size-4" />
					<AlertTitle>Verifying link</AlertTitle>
					<AlertDescription>
						Please wait while we confirm your email.
					</AlertDescription>
				</Alert>

				<Alert v-if="autoVerifyState === 'success'">
					<CheckCircle2 class="size-4 text-primary" />
					<AlertTitle>Email verified</AlertTitle>
					<AlertDescription>
						Your email is confirmed. You can sign in to continue.
					</AlertDescription>
				</Alert>

				<Alert
					v-if="autoVerifyState === 'error'"
					variant="destructive"
				>
					<AlertCircle class="size-4" />
					<AlertTitle>Link could not be verified</AlertTitle>
					<AlertDescription>{{ autoVerifyMessage }}</AlertDescription>
				</Alert>
			</div>

			<div
				v-if="!linkToken || autoVerifyState === 'error'"
				class="space-y-4"
			>
				<p class="text-sm font-medium text-foreground">
					Have a token from your email?
				</p>

				<Alert
					v-if="manualError"
					variant="destructive"
				>
					<AlertCircle class="size-4" />
					<AlertTitle>Verification failed</AlertTitle>
					<AlertDescription>{{ manualError }}</AlertDescription>
				</Alert>

				<Alert v-if="manualSuccess">
					<CheckCircle2 class="size-4 text-primary" />
					<AlertTitle>Email verified</AlertTitle>
					<AlertDescription>
						You can sign in to continue.
					</AlertDescription>
				</Alert>

				<Form
					v-if="!manualSuccess"
					:validation-schema="verifySchema"
					class="space-y-4"
					@submit="onManualVerifyFormSubmit"
				>
					<FormField
						v-slot="{ componentField }"
						name="token"
					>
						<FormItem>
							<FormLabel>Verification token</FormLabel>
							<FormControl>
								<Input
									type="text"
									autocomplete="one-time-code"
									placeholder="Paste the token from the email"
									v-bind="componentField"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>

					<Button
						type="submit"
						class="w-full"
						:disabled="manualSubmitting"
					>
						<Spinner
							v-if="manualSubmitting"
							class="mr-2"
						/>
						Verify email
					</Button>
				</Form>
			</div>

			<div class="space-y-4 border-t border-border pt-6">
				<p class="text-sm font-medium text-foreground">
					Did not get the email?
				</p>

				<Alert v-if="resendSuccess">
					<CheckCircle2 class="size-4 text-primary" />
					<AlertTitle>Email sent</AlertTitle>
					<AlertDescription>
						If an account exists for that address, we sent a new verification message.
					</AlertDescription>
				</Alert>

				<Alert
					v-if="resendError"
					variant="destructive"
				>
					<AlertCircle class="size-4" />
					<AlertTitle>Could not resend</AlertTitle>
					<AlertDescription>{{ resendError }}</AlertDescription>
				</Alert>

				<Form
					v-if="!resendSuccess"
					:validation-schema="resendSchema"
					:initial-values="{ email: initialEmail }"
					class="space-y-4"
					@submit="onResendFormSubmit"
				>
					<FormField
						v-slot="{ componentField }"
						name="email"
					>
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									autocomplete="email"
									placeholder="you@company.com"
									v-bind="componentField"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>

					<Button
						type="submit"
						variant="outline"
						class="w-full"
						:disabled="resendSubmitting"
					>
						<Spinner
							v-if="resendSubmitting"
							class="mr-2"
						/>
						Resend verification email
					</Button>
				</Form>
			</div>
		</CardContent>
		<CardFooter class="justify-center text-sm text-muted-foreground">
			<NuxtLink
				to="/sign-in"
				class="font-medium text-primary hover:underline"
			>
				Back to sign in
			</NuxtLink>
		</CardFooter>
	</Card>
</template>
