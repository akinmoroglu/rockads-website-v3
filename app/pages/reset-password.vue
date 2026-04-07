<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
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
import { resetPasswordFormSchema } from "@/lib/auth-form-schemas";

definePageMeta({
	layout: "auth",
});

useHead({
	title: "Reset Password - Rockads",
});

const authApi = useAuthApi();
const route = useRoute();

const formSchema = toTypedSchema(resetPasswordFormSchema);

const token = computed(() => {
	const raw = route.query.token;
	return typeof raw === "string" ? raw.trim() : "";
});

const apiError = ref<string | null>(null);
const isSubmitting = ref(false);
const success = ref(false);

async function onSubmit(values: {
	password: string;
	password_confirmation: string;
}) {
	apiError.value = null;
	if (!token.value) {
		apiError.value = "This reset link is invalid or expired. Request a new one from the forgot password page.";
		return;
	}
	isSubmitting.value = true;
	try {
		await authApi.resetPassword({
			token: token.value,
			password: values.password,
			password_confirmation: values.password_confirmation,
		});
		success.value = true;
	}
	catch (error: unknown) {
		apiError.value = error instanceof Error
			? error.message
			: "Could not reset your password.";
	}
	finally {
		isSubmitting.value = false;
	}
}
</script>

<template>
	<Card class="w-full">
		<CardHeader class="space-y-1">
			<CardTitle class="text-2xl">
				Choose a new password
			</CardTitle>
			<CardDescription>
				Use a strong password you have not used elsewhere.
			</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<Alert
				v-if="!token"
				variant="destructive"
			>
				<AlertCircle class="size-4" />
				<AlertTitle>Invalid link</AlertTitle>
				<AlertDescription>
					Open the reset link from your email, or
					<NuxtLink
						to="/forgot-password"
						class="font-medium underline"
					>
						request a new link
					</NuxtLink>
					.
				</AlertDescription>
			</Alert>

			<Alert v-if="success">
				<CheckCircle2 class="size-4 text-primary" />
				<AlertTitle>Password updated</AlertTitle>
				<AlertDescription>
					You can now sign in with your new password.
				</AlertDescription>
			</Alert>

			<Alert
				v-if="apiError"
				variant="destructive"
			>
				<AlertCircle class="size-4" />
				<AlertTitle>Could not reset password</AlertTitle>
				<AlertDescription>{{ apiError }}</AlertDescription>
			</Alert>

			<Form
				v-if="token && !success"
				:validation-schema="formSchema"
				class="space-y-4"
				@submit="onSubmit"
			>
				<FormField
					v-slot="{ componentField }"
					name="password"
				>
					<FormItem>
						<FormLabel>New password</FormLabel>
						<FormControl>
							<Input
								type="password"
								autocomplete="new-password"
								placeholder="New password"
								v-bind="componentField"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>

				<FormField
					v-slot="{ componentField }"
					name="password_confirmation"
				>
					<FormItem>
						<FormLabel>Confirm new password</FormLabel>
						<FormControl>
							<Input
								type="password"
								autocomplete="new-password"
								placeholder="Repeat new password"
								v-bind="componentField"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>

				<Button
					type="submit"
					class="w-full"
					:disabled="isSubmitting"
				>
					<Spinner
						v-if="isSubmitting"
						class="mr-2"
					/>
					Update password
				</Button>
			</Form>
		</CardContent>
		<CardFooter class="flex flex-col gap-2 text-muted-foreground sm:flex-row sm:justify-center sm:text-sm">
			<NuxtLink
				v-if="success"
				to="/sign-in"
				class="font-medium text-primary hover:underline"
			>
				Go to sign in
			</NuxtLink>
			<NuxtLink
				v-else
				to="/sign-in"
				class="font-medium text-primary hover:underline"
			>
				Back to sign in
			</NuxtLink>
		</CardFooter>
	</Card>
</template>
