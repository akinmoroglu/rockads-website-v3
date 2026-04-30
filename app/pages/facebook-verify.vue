<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import type { SubmissionHandler } from "vee-validate";
import type { z } from "zod";
import { AlertCircle, Facebook } from "lucide-vue-next";
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
import { facebookVerifyFormSchema } from "@/lib/auth-form-schemas";

definePageMeta({
	layout: "auth",
});

useHead({
	title: "Verify Facebook Profile - Rockads",
});

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const gtmEvent = useGtmEvent();

const formSchema = toTypedSchema(facebookVerifyFormSchema);

type FacebookVerifyFormValues = z.infer<typeof facebookVerifyFormSchema>;

const token = computed(() => {
	const raw = route.query.token;

	return typeof raw === "string" ? raw.trim() : "";
});

const isSubmitting = ref(false);

onMounted(() => {
	gtmEvent.pageViewEvent("Verify Facebook Profile - Rockads");

	if (!token.value) {
		router.push("/");
	}
});

function onSubmit(values: FacebookVerifyFormValues) {
	if (!token.value || typeof window === "undefined") return;

	isSubmitting.value = true;

	const goApiURL = (config.public.goApiURL as string).replace(/\/$/, "");
	const appURL = (config.public.appURL as string).replace(/\/$/, "");

	window.location.href
		= `${goApiURL}/oauth/access-request`
			+ `?access_request_id=${token.value}`
			+ `&profile_link=${values.facebookProfile}`
			+ `&callback_url=${appURL}/facebook-verify-callback`;
}

const onFormSubmit: SubmissionHandler = (values) => {
	return onSubmit(values as FacebookVerifyFormValues);
};
</script>

<template>
	<Card class="w-full">
		<CardHeader class="space-y-1">
			<div class="mb-2 flex justify-center">
				<div class="flex size-14 items-center justify-center rounded-full bg-[#1877F2]/10">
					<Facebook class="size-7 text-[#1877F2]" />
				</div>
			</div>
			<CardTitle class="text-center text-2xl">
				Verify your Facebook profile
			</CardTitle>
			<CardDescription class="text-center">
				Paste the link to your personal Facebook profile so we can confirm ownership and complete your access request.
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
					Open this page from the link in your email. If it expired, request a new verification link from your account manager.
				</AlertDescription>
			</Alert>

			<Form
				v-if="token"
				:validation-schema="formSchema"
				class="space-y-4"
				@submit="onFormSubmit"
			>
				<FormField
					v-slot="{ componentField }"
					name="facebookProfile"
				>
					<FormItem>
						<FormLabel>Facebook profile URL</FormLabel>
						<FormControl>
							<Input
								type="url"
								autocomplete="url"
								placeholder="https://facebook.com/yourname"
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
					Verify profile
				</Button>
			</Form>
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
