<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { AlertCircle } from "lucide-vue-next";
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
import { signInFormSchema } from "@/lib/auth-form-schemas";
import { extractAccessToken } from "@/utils/auth-token";

definePageMeta({
	layout: "auth",
});

useHead({
	title: "Sign In - Rockads",
});

const authApi = useAuthApi();
const session = useAuthSession();
const route = useRoute();

const formSchema = toTypedSchema(signInFormSchema);

const apiError = ref<string | null>(null);
const isSubmitting = ref(false);

async function onSubmit(values: { email: string; password: string }) {
	apiError.value = null;
	isSubmitting.value = true;
	try {
		const data = await authApi.signIn({
			email: values.email.trim(),
			password: values.password,
		});
		const token = extractAccessToken(data);
		if (!token) {
			apiError.value
				= "Sign-in succeeded but no access token was returned. Expected `access_token`, `accessToken`, or `token` in the JSON body.";
			return;
		}
		session.setAccessToken(token);
		const redirect = typeof route.query.redirect === "string"
			? route.query.redirect
			: "/";
		await navigateTo(redirect);
	}
	catch (error: unknown) {
		apiError.value = error instanceof Error
			? error.message
			: "Sign in failed.";
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

			<Form
				:validation-schema="formSchema"
				class="space-y-4"
				@submit="onSubmit"
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
							<Input
								type="password"
								autocomplete="current-password"
								placeholder="Enter your password"
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
					Sign In
				</Button>
			</Form>
		</CardContent>
		<CardFooter class="justify-center text-sm text-muted-foreground">
			No account yet?
			<NuxtLink
				to="/sign-up"
				class="ml-1 font-medium text-primary hover:underline"
			>
				Create one
			</NuxtLink>
		</CardFooter>
	</Card>
</template>
