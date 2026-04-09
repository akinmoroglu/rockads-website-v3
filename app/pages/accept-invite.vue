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

definePageMeta({
	layout: "auth",
});

useHead({
	title: "Accept Invitation - Rockads",
});

const config = useRuntimeConfig();
const route = useRoute();

const formSchema = toTypedSchema(acceptInvitationFormSchema);

type AcceptInvitationFormValues = z.infer<typeof acceptInvitationFormSchema>;

const token = computed(() => {
	const raw = route.query.token;

	return typeof raw === "string" ? raw.trim() : "";
});

const { token: captchaResponse, isDummyToken } = useTurnstileToken();
const apiError = ref<string | null>(null);
const fetchError = ref<string | null>(null);
const isSubmitting = ref(false);
const isLoadingInvitation = ref(false);
const success = ref(false);
const organizationName = ref("");
const organizationId = ref("");
const accepted = ref(false);
const expired = ref(false);

async function getInvitation() {
	isLoadingInvitation.value = true;
	try {
		const data = await $fetch<{
			customer_title: string;
			customer_id: string;
			accepted_at: string | null;
			status: string;
		}>(`invitations/${token.value}`, {
			baseURL: config.public.goApiURL as string,
			method: "GET",
		});

		organizationName.value = data.customer_title;
		organizationId.value = data.customer_id;
		accepted.value = data.accepted_at !== null;
		expired.value = data.status === "expired";
	}
	catch {
		fetchError.value = "This invitation link is invalid or has expired. Ask your administrator to send a new invite.";
	}
	finally {
		isLoadingInvitation.value = false;
	}
}

watch(token, (value) => {
	if (value) {
		getInvitation();
	}
}, { immediate: true });

async function onSubmit(values: AcceptInvitationFormValues) {
	apiError.value = null;
	if (!token.value) {
		apiError.value = "This invitation link is invalid or expired. Ask your administrator to send a new invite.";

		return;
	}
	isSubmitting.value = true;
	try {
		const nameTrimmed = values.name?.trim();

		await $fetch("invitations/accept", {
			baseURL: config.public.goApiURL as string,
			method: "POST",
			body: {
				captcha_response: captchaResponse.value,
				password: values.password,
				password_confirmation: values.password_confirmation,
				token: token.value,
				...(nameTrimmed ? { name: nameTrimmed } : {}),
			},
		});
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
				{{ organizationName ? `Join ${organizationName}` : "Accept your invitation" }}
			</CardTitle>
			<CardDescription>
				Set a password to join the workspace. Add your name if it is not already on the invite.
			</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<div
				v-if="isLoadingInvitation"
				class="flex justify-center py-6"
			>
				<Spinner />
			</div>

			<template v-else>
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

				<Alert
					v-if="fetchError"
					variant="destructive"
				>
					<AlertCircle class="size-4" />
					<AlertTitle>Invitation not found</AlertTitle>
					<AlertDescription>{{ fetchError }}</AlertDescription>
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
					v-if="token && !success && !fetchError"
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

					<NuxtTurnstile
						v-if="!isDummyToken"
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
						Accept invitation
					</Button>
				</Form>
			</template>
		</CardContent>
		<CardFooter class="flex flex-col gap-2 sm:flex-row sm:justify-center">
			<Button
				v-if="success"
				test-id="accept-invite-sign-in-btn"
				as-child
			>
				<NuxtLink to="/sign-in">
					Go to sign in
				</NuxtLink>
			</Button>
			<Button
				v-else-if="!token || fetchError"
				test-id="accept-invite-contact-admin-btn"
				variant="outline"
				as-child
			>
				<NuxtLink to="/sign-in">
					Back to sign in
				</NuxtLink>
			</Button>
			<NuxtLink
				v-else
				to="/sign-in"
				class="text-sm font-medium text-muted-foreground hover:text-primary hover:underline"
			>
				Back to sign in
			</NuxtLink>
		</CardFooter>
	</Card>
</template>
