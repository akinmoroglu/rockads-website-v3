<script setup lang="ts">
import { CheckCircle2, XCircle } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

definePageMeta({
	layout: "auth",
});

const route = useRoute();
const gtmEvent = useGtmEvent();

const hasResult = computed(() => {
	const raw = route.query.success;

	return typeof raw === "string" && raw.length > 0;
});

const isSuccess = computed(() => route.query.success === "true");

const message = computed(() => {
	const raw = route.query.message;

	return typeof raw === "string" ? raw : "";
});

useHead({
	title: () => isSuccess.value
		? "Facebook profile verified - Rockads"
		: "Facebook verification failed - Rockads",
});

onMounted(() => {
	if (!hasResult.value) return;
	gtmEvent.pageViewEvent(
		isSuccess.value
			? "Facebook profile verified - Rockads"
			: "Facebook verification failed - Rockads",
	);
});
</script>

<template>
	<Card
		v-if="hasResult"
		class="w-full"
	>
		<CardHeader class="space-y-1">
			<div class="mb-2 flex justify-center">
				<div
					class="flex size-14 items-center justify-center rounded-full"
					:class="isSuccess ? 'bg-primary/10' : 'bg-destructive/10'"
				>
					<CheckCircle2
						v-if="isSuccess"
						class="size-7 text-primary"
					/>
					<XCircle
						v-else
						class="size-7 text-destructive"
					/>
				</div>
			</div>
			<CardTitle class="text-center text-2xl">
				{{ isSuccess ? "Profile verified" : "Verification failed" }}
			</CardTitle>
			<CardDescription class="text-center">
				{{
					isSuccess
						? "Thanks for confirming your Facebook profile. Your access request is now in our review queue and we will be in touch shortly."
						: message || "We could not verify your Facebook profile. Please request a new verification link from your account manager."
				}}
			</CardDescription>
		</CardHeader>
		<CardContent class="hidden" />
		<CardFooter class="justify-center">
			<Button
				as-child
				:variant="isSuccess ? 'default' : 'outline'"
			>
				<NuxtLink to="/sign-in">
					Back to sign in
				</NuxtLink>
			</Button>
		</CardFooter>
	</Card>
</template>
