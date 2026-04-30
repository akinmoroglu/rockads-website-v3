<script setup lang="ts">
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
import { Spinner } from "@/components/ui/spinner";

definePageMeta({
	layout: "auth",
});

useHead({
	title: "Verify Email - Rockads",
});

const config = useRuntimeConfig();
const route = useRoute();

const linkToken = computed(() => {
	const raw = route.query.token;

	return typeof raw === "string" ? raw.trim() : "";
});

const verifyState = ref<"pending" | "success" | "error">("pending");
const verifyMessage = ref("");

onMounted(async () => {
	if (!import.meta.client) return;

	if (!linkToken.value) {
		verifyState.value = "error";
		verifyMessage.value = "This verification link is invalid or has expired.";

		return;
	}

	try {
		await $fetch("verify-email", {
			baseURL: config.public.goApiURL as string,
			method: "POST",
			body: { token: linkToken.value },
		});
		verifyState.value = "success";
	}
	catch (error: unknown) {
		verifyState.value = "error";
		verifyMessage.value = error instanceof Error
			? error.message
			: "Verification failed.";
	}
});
</script>

<template>
	<Card class="w-full">
		<CardHeader class="space-y-1">
			<CardTitle class="text-2xl">
				Verify your email
			</CardTitle>
			<CardDescription>
				Confirming your email so you can sign in.
			</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<Alert v-if="verifyState === 'pending'">
				<Spinner class="size-4" />
				<AlertTitle>Verifying your email</AlertTitle>
				<AlertDescription>
					Please wait a moment.
				</AlertDescription>
			</Alert>

			<Alert v-else-if="verifyState === 'success'">
				<CheckCircle2 class="size-4 text-primary" />
				<AlertTitle>Email verified</AlertTitle>
				<AlertDescription>
					Your email is confirmed. You can sign in to continue.
				</AlertDescription>
			</Alert>

			<Alert
				v-else
				variant="destructive"
			>
				<AlertCircle class="size-4" />
				<AlertTitle>Verification failed</AlertTitle>
				<AlertDescription>{{ verifyMessage }}</AlertDescription>
			</Alert>
		</CardContent>
		<CardFooter class="justify-center">
			<Button
				v-if="verifyState !== 'pending'"
				as-child
			>
				<NuxtLink to="/sign-in">
					Go to sign in
				</NuxtLink>
			</Button>
		</CardFooter>
	</Card>
</template>
