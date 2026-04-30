<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import type { SubmissionHandler } from "vee-validate";
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
import { forgotPasswordFormSchema } from "@/lib/auth-form-schemas";

definePageMeta({
	layout: "auth",
});

useHead({
	title: "Forgot Password - Rockads",
});

const config = useRuntimeConfig();

const formSchema = toTypedSchema(forgotPasswordFormSchema);

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;

const { token: captchaResponse, isDummyToken, widgetRef: turnstile, resetToken } = useTurnstileToken();
const apiError = ref<string | null>(null);
const isSubmitting = ref(false);
const emailSent = ref(false);
const submittedEmail = ref("");

async function onSubmit(values: ForgotPasswordFormValues) {
	apiError.value = null;
	isSubmitting.value = true;
	try {
		const emailTrimmed = values.email.trim();

		await $fetch("forgot-password", {
			baseURL: config.public.goApiURL as string,
			method: "POST",
			body: {
				email: emailTrimmed,
				captcha_response: captchaResponse.value,
				reset_url: `${window.location.origin}/reset-password`,
			},
		});
		submittedEmail.value = emailTrimmed;
		emailSent.value = true;
	}
	catch (error: unknown) {
		apiError.value = error instanceof Error
			? error.message
			: "Could not send reset instructions.";
	}
	finally {
		isSubmitting.value = false;
		resetToken();
	}
}

const onFormSubmit: SubmissionHandler = (values) => {
	return onSubmit(values as ForgotPasswordFormValues);
};
</script>

<template>
	<Card class="w-full">
		<CardHeader class="space-y-1">
			<CardTitle class="text-2xl">
				Reset your password
			</CardTitle>
			<CardDescription>
				Enter your account email and we will send you a link to choose a new password.
			</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<Alert v-if="emailSent">
				<CheckCircle2 class="size-4 text-primary" />
				<AlertTitle>Check your email</AlertTitle>
				<AlertDescription>
					If an account exists for
					<strong>{{ submittedEmail }}</strong>
					, you will receive password reset instructions shortly.
				</AlertDescription>
			</Alert>

			<Alert
				v-if="apiError"
				variant="destructive"
			>
				<AlertCircle class="size-4" />
				<AlertTitle>Request failed</AlertTitle>
				<AlertDescription>{{ apiError }}</AlertDescription>
			</Alert>

			<Form
				v-if="!emailSent"
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
								type="email"
								autocomplete="email"
								placeholder="you@company.com"
								v-bind="componentField"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>

				<NuxtTurnstile
					v-if="!isDummyToken"
					ref="turnstile"
					v-model="captchaResponse"
					class="w-full"
					:options="{ size: 'flexible' }"
				/>

				<Button
					type="submit"
					class="w-full"
					:disabled="isSubmitting"
				>
					<Spinner
						v-if="isSubmitting"
						class="mr-2"
					/>
					Send reset link
				</Button>
			</Form>
		</CardContent>
		<CardFooter class="justify-center text-sm text-muted-foreground">
			<NuxtLink
				to="/signin"
				class="font-medium text-primary hover:underline"
			>
				Back to sign in
			</NuxtLink>
		</CardFooter>
	</Card>
</template>
