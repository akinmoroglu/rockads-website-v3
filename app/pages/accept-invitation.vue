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
import { acceptInvitationFormSchema } from "@/lib/auth-form-schemas";
import { extractAccessToken } from "@/utils/auth-token";

definePageMeta({
	layout: "auth",
});

useHead({
	title: "Accept Invitation - Rockads",
});

const authApi = useAuthApi();
const session = useAuthSession();
const route = useRoute();

const formSchema = toTypedSchema(acceptInvitationFormSchema);

type AcceptInvitationFormValues = z.infer<typeof acceptInvitationFormSchema>;

const token = computed(() => {
	const raw = route.query.token;
	return typeof raw === "string" ? raw.trim() : "";
});

const apiError = ref<string | null>(null);
const isSubmitting = ref(false);
const success = ref(false);

async function onSubmit(values: AcceptInvitationFormValues) {
	apiError.value = null;
	if (!token.value) {
		apiError.value = "This invitation link is invalid or expired. Ask your administrator to send a new invite.";
		return;
	}
	isSubmitting.value = true;
	try {
		const nameTrimmed = values.name?.trim();
		const data = await authApi.acceptInvitation({
			token: token.value,
			password: values.password,
			password_confirmation: values.password_confirmation,
			...(nameTrimmed ? { name: nameTrimmed } : {}),
		});
		const accessToken = extractAccessToken(data);
		if (accessToken) session.setAccessToken(accessToken);
		success.value = true;
	}
	catch (error: unknown) {
		apiError.value = error instanceof Error
			? error.message
			: "Could not accept the invitation.";
	}
	finally {
		isSubmitting.value = false;
	}
}

const onFormSubmit: SubmissionHandler = (values) => {
	return onSubmit(values as AcceptInvitationFormValues);
};
</script>

<template>
	<Card class="w-full">
		<CardHeader class="space-y-1">
			<CardTitle class="text-2xl">
				Accept your invitation
			</CardTitle>
			<CardDescription>
				Set a password to join the workspace. Add your name if it is not already on the invite.
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
					Open the invitation link from your email. If it expired, request a new invitation from your team admin.
				</AlertDescription>
			</Alert>

			<Alert v-if="success">
				<CheckCircle2 class="size-4 text-primary" />
				<AlertTitle>You are in</AlertTitle>
				<AlertDescription>
					Your account is ready. Sign in with your email and the password you just created.
				</AlertDescription>
			</Alert>

			<Alert
				v-if="apiError"
				variant="destructive"
			>
				<AlertCircle class="size-4" />
				<AlertTitle>Could not complete invitation</AlertTitle>
				<AlertDescription>{{ apiError }}</AlertDescription>
			</Alert>

			<Form
				v-if="token && !success"
				:validation-schema="formSchema"
				class="space-y-4"
				@submit="onFormSubmit"
			>
				<FormField
					v-slot="{ componentField }"
					name="name"
				>
					<FormItem>
						<FormLabel>Your name (optional)</FormLabel>
						<FormControl>
							<Input
								type="text"
								autocomplete="name"
								placeholder="Jane Doe"
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
							<Input
								type="password"
								autocomplete="new-password"
								placeholder="Create a secure password"
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
						<FormLabel>Confirm password</FormLabel>
						<FormControl>
							<Input
								type="password"
								autocomplete="new-password"
								placeholder="Repeat your password"
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
					Accept invitation
				</Button>
			</Form>
		</CardContent>
		<CardFooter class="justify-center text-sm text-muted-foreground">
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
