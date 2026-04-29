<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import type { SubmissionHandler } from "vee-validate";
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { businessInfoFormSchema } from "@/lib/lead-form-schemas";
import type {
	BusinessInfoFormValues,
	CountryOptionValue,
	PhoneCountryCodeValue,
} from "@/lib/lead-form-schemas";
import RASearchableCombobox from "./RASearchableCombobox.vue";

const props = defineProps<{
	countryList: CountryOptionValue[];
	phoneCountryList: PhoneCountryCodeValue[];
	initialValues?: Partial<BusinessInfoFormValues>;
}>();

const emit = defineEmits<{ formData: [values: BusinessInfoFormValues] }>();

const formSchema = toTypedSchema(businessInfoFormSchema);

const isWebsiteHintVisible = ref(false);

function formatWebsiteUrl(url?: string) {
	if (!url) return url;

	return url.includes("http") ? url : `http://${url}`;
}

function onSubmit(values: BusinessInfoFormValues) {
	const normalized: BusinessInfoFormValues = {
		...values,
		businessName: values.businessName.trim(),
		website: formatWebsiteUrl(values.website.trim()) ?? values.website,
		phoneNumber: values.phoneNumber.replace(/\D/g, "").slice(0, 10),
	};

	emit("formData", normalized);
}

const onFormSubmit: SubmissionHandler = values =>
	onSubmit(values as BusinessInfoFormValues);

const initialFormValues: Partial<BusinessInfoFormValues> = {
	businessName: props.initialValues?.businessName ?? "",
	website: props.initialValues?.website ?? "",
	phoneNumber: props.initialValues?.phoneNumber ?? "",
	country: props.initialValues?.country,
	phoneCountryCode: props.initialValues?.phoneCountryCode,
};

function onPhoneInput(event: Event, setValue: (v: string) => void) {
	const input = event.target as HTMLInputElement;
	const digits = input.value.replace(/\D/g, "").slice(0, 10);

	input.value = digits;
	setValue(digits);
}
</script>

<template>
	<div
		id="registration-step-second"
		class="mt-10 flex justify-center"
	>
		<Form
			:validation-schema="formSchema"
			:initial-values="initialFormValues"
			class="flex w-full flex-col gap-4 text-left sm:w-[329px]"
			@submit="onFormSubmit"
			@invalid-submit="() => (typeof window !== 'undefined' && window.scrollTo(0, 0))"
		>
			<FormField
				v-slot="{ componentField }"
				name="businessName"
			>
				<FormItem>
					<FormLabel>Business name</FormLabel>
					<FormControl>
						<Input
							id="registration-name-input"
							autofocus
							placeholder="Your business name"
							class="h-12"
							v-bind="componentField"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>

			<div class="flex flex-col gap-2">
				<Label>Phone number</Label>
				<div class="flex gap-2">
					<FormField
						v-slot="{ value, setValue, errorMessage }"
						name="phoneCountryCode"
					>
						<FormItem class="w-28 shrink-0">
							<FormControl>
								<RASearchableCombobox
									id="registration-phone-country-dropdown"
									:model-value="(value as PhoneCountryCodeValue | undefined)"
									:options="phoneCountryList"
									placeholder="—"
									search-placeholder="Search country"
									:display-label="(o) => o.label"
									:error="!!errorMessage"
									@update:model-value="setValue"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>

					<FormField
						v-slot="{ value, setValue, errorMessage }"
						name="phoneNumber"
					>
						<FormItem class="flex-1">
							<FormControl>
								<Input
									id="registration-phone-input"
									:value="value"
									type="tel"
									inputmode="numeric"
									autocomplete="tel-national"
									placeholder="(---) --- -- --"
									maxlength="10"
									class="h-12"
									:class="errorMessage ? 'border-destructive' : ''"
									@input="(e) => onPhoneInput(e, setValue as (v: string) => void)"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
				</div>
			</div>

			<FormField
				v-slot="{ componentField }"
				name="website"
			>
				<FormItem>
					<FormLabel>Website</FormLabel>
					<FormControl>
						<Input
							id="registration-website-input"
							placeholder="https://yourcompany.com"
							class="h-12"
							v-bind="componentField"
							@focus="isWebsiteHintVisible = true"
							@blur="isWebsiteHintVisible = false"
						/>
					</FormControl>
					<p
						v-if="isWebsiteHintVisible"
						class="text-xs text-muted-foreground"
					>
						If you don't add http:// we'll prepend it for you.
					</p>
					<FormMessage />
				</FormItem>
			</FormField>

			<FormField
				v-slot="{ value, setValue, errorMessage }"
				name="country"
			>
				<FormItem>
					<FormLabel>Country</FormLabel>
					<FormControl>
						<RASearchableCombobox
							id="registration-country-dropdown"
							:model-value="(value as CountryOptionValue | undefined)"
							:options="countryList"
							placeholder="Select country"
							search-placeholder="Search country"
							:display-label="(o) => o.label ?? o.value"
							:error="!!errorMessage"
							@update:model-value="setValue"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>

			<Button
				id="registration-step-second-submit"
				type="submit"
				class="mt-6 h-12 w-full"
			>
				Continue
			</Button>
		</Form>
	</div>
</template>
