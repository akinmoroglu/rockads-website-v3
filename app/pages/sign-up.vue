<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import type { SubmissionHandler } from "vee-validate";
import type { z } from "zod";
import { AlertCircle, Eye, EyeOff } from "lucide-vue-next";
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
import { Checkbox } from "@/components/ui/checkbox";
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
import { signUpFormSchema } from "@/lib/auth-form-schemas";

definePageMeta({
	layout: "auth",
});

useHead({
	title: "Sign Up - Rockads",
});

const marketingSiteBase = "https://www.rockads.com";

const legal = {
	terms: `${marketingSiteBase}/en/terms-of-service-of-rockads/`,
	privacy: `${marketingSiteBase}/en/privacy-notice/`,
	cookies: `${marketingSiteBase}/en/cookie-policy/`,
} as const;

const authApi = useAuthApi();

const formSchema = toTypedSchema(signUpFormSchema);

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

const apiError = ref<string | null>(null);
const isSubmitting = ref(false);
const showPassword = ref(false);
const showPasswordConfirm = ref(false);

async function onSubmit(values: SignUpFormValues) {
	apiError.value = null;
	isSubmitting.value = true;
	const phoneTrimmed = values.phone.trim();
	try {
		await authApi.signUp({
			name: values.name.trim(),
			email: values.email.trim(),
			company: values.company.trim(),
			...(phoneTrimmed ? { phone: phoneTrimmed } : {}),
			password: values.password,
			password_confirmation: values.password_confirmation,
			terms_accepted: values.accept_terms,
		});
		await navigateTo({
			path: "/verify-email",
			query: { email: values.email.trim() },
		});
	}
	catch (error: unknown) {
		apiError.value = error instanceof Error
			? error.message
			: "Could not create your account.";
	}
	finally {
		isSubmitting.value = false;
	}
}

const onFormSubmit: SubmissionHandler = (values) => {
	return onSubmit(values as SignUpFormValues);
};
</script>

<template>
	<Card class="w-full">
		<CardHeader class="space-y-2 text-center sm:text-left">
			<CardTitle class="text-2xl">
				Create your account
			</CardTitle>
			<CardDescription class="text-base">
				Work smarter, grow faster. Rockads is a performance marketing ecosystem.
			</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<Alert
				v-if="apiError"
				variant="destructive"
			>
				<AlertCircle class="size-4" />
				<AlertTitle>Could not sign up</AlertTitle>
				<AlertDescription>{{ apiError }}</AlertDescription>
			</Alert>

			<Form
				:validation-schema="formSchema"
				:initial-values="{ accept_terms: false }"
				class="space-y-4"
				@submit="onFormSubmit"
			>
				<FormField
					v-slot="{ componentField }"
					name="name"
				>
					<FormItem>
						<FormLabel>Name and surname</FormLabel>
						<FormControl>
							<Input
								type="text"
								autocomplete="name"
								placeholder="Name and surname"
								v-bind="componentField"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>

				<FormField
					v-slot="{ componentField }"
					name="company"
				>
					<FormItem>
						<FormLabel>Company or organization</FormLabel>
						<FormControl>
							<Input
								type="text"
								autocomplete="organization"
								placeholder="Your company name"
								v-bind="componentField"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>

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
								placeholder="Enter a valid e-mail"
								v-bind="componentField"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>

				<FormField
					v-slot="{ componentField }"
					name="phone"
				>
					<FormItem>
						<FormLabel>
							Phone
							<span class="font-normal text-muted-foreground"> (optional)</span>
						</FormLabel>
						<FormControl>
							<Input
								type="tel"
								autocomplete="tel"
								placeholder="Work phone"
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
							<div class="relative">
								<Input
									:type="showPassword ? 'text' : 'password'"
									autocomplete="new-password"
									class="pr-10"
									placeholder="Enter password"
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

				<FormField
					v-slot="{ componentField }"
					name="password_confirmation"
				>
					<FormItem>
						<FormLabel>Confirm password</FormLabel>
						<FormControl>
							<div class="relative">
								<Input
									:type="showPasswordConfirm ? 'text' : 'password'"
									autocomplete="new-password"
									class="pr-10"
									placeholder="Re-enter your password"
									v-bind="componentField"
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									class="absolute top-0 right-0 h-9 w-9 text-muted-foreground hover:text-foreground"
									:aria-pressed="showPasswordConfirm"
									:aria-label="showPasswordConfirm ? 'Hide password' : 'Show password'"
									@click="showPasswordConfirm = !showPasswordConfirm"
								>
									<Eye
										v-if="!showPasswordConfirm"
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

				<FormField
					v-slot="{ value, setValue }"
					name="accept_terms"
				>
					<FormItem>
						<div class="flex gap-3">
							<FormControl>
								<Checkbox
									:model-value="value === true"
									class="mt-0.5"
									@update:model-value="
										(v) => setValue(v === true)
									"
								/>
							</FormControl>
							<div class="min-w-0 flex-1 space-y-1">
								<FormLabel class="text-sm leading-snug font-normal text-muted-foreground">
									I accept the
									<a
										:href="legal.terms"
										target="_blank"
										rel="noopener noreferrer"
										class="font-medium text-primary underline-offset-4 hover:underline"
									>service agreement</a>,
									<a
										:href="legal.privacy"
										target="_blank"
										rel="noopener noreferrer"
										class="font-medium text-primary underline-offset-4 hover:underline"
									>privacy policy</a>, and
									<a
										:href="legal.cookies"
										target="_blank"
										rel="noopener noreferrer"
										class="font-medium text-primary underline-offset-4 hover:underline"
									>cookie policy</a>.
								</FormLabel>
								<FormMessage />
							</div>
						</div>
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
					Create account
				</Button>
			</Form>
		</CardContent>
		<CardFooter class="justify-center text-sm text-muted-foreground">
			Already have an account?
			<NuxtLink
				to="/sign-in"
				class="ml-1 font-medium text-primary hover:underline"
			>
				Sign in
			</NuxtLink>
		</CardFooter>
	</Card>
</template>
