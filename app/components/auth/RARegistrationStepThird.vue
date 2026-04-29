<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
	AD_PLATFORMS,
	CLIENT_COUNT_OPTIONS,
	CLIENT_INDUSTRIES,
	CLIENT_REGIONS,
	MONTHLY_SPEND_OPTIONS,
	SERVICES,
} from "@/constants/registration";
import type { CustomerType } from "@/constants/registration";
import { isAutomationCookieSet } from "@/utils/cookie";
import RABtnGroup from "./RABtnGroup.vue";
import RACheckboxGroup from "./RACheckboxGroup.vue";

declare global {
	interface Window {
		dataLayer?: Record<string, unknown>[];
	}
}

const props = defineProps<{
	customerType: CustomerType;
	isSubmitting: boolean;
}>();

const emit = defineEmits<{
	submit: [params: SubmitParams];
}>();

export type SubmitParams = {
	approximateMonthlySpend: string;
	services: string[];
	adPlatforms: string[];
	otherAdPlatforms: string;
	clientCount: string;
	clientBusinessIndustries: string[];
	clientRegions: string[];
	captchaResponse: string;
	skipRecaptcha: boolean;
};

const { token: captchaToken, isDummyToken, resetToken } = useTurnstileToken();

const automationCookieExists = ref(false);

onMounted(() => {
	automationCookieExists.value = isAutomationCookieSet();
});

const skipCaptcha = computed(() => isDummyToken || automationCookieExists.value);

const formData = ref<Omit<SubmitParams, "captchaResponse" | "skipRecaptcha">>({
	approximateMonthlySpend: "",
	services: [],
	adPlatforms: [],
	otherAdPlatforms: "",
	clientCount: "",
	clientBusinessIndustries: [],
	clientRegions: [],
});

const route = useRoute();
const router = useRouter();

const formStep = computed<1 | 2>(() => (Number(route.query.sub) === 2 ? 2 : 1));
const showStep1Errors = ref(false);
const showStep2Errors = ref(false);

const monthlySpendOptions = computed(() =>
	props.customerType === "advertiser"
		? MONTHLY_SPEND_OPTIONS.ADVERTISER
		: MONTHLY_SPEND_OPTIONS.AGENCY_PARTNER,
);

const isAdvertiser = computed(() => props.customerType === "advertiser");
const isPartner = computed(() => props.customerType === "partner");

const hasOtherPlatforms = computed(() =>
	formData.value.adPlatforms.includes("platform-others"),
);

const otherPlatformsValid = computed(() => {
	if (!hasOtherPlatforms.value) return true;

	return formData.value.otherAdPlatforms.trim().length >= 3;
});

const step1Valid = computed(
	() =>
		!!formData.value.approximateMonthlySpend
		&& formData.value.adPlatforms.length > 0
		&& formData.value.services.length > 0
		&& otherPlatformsValid.value,
);

const step2Valid = computed(() => {
	if (isAdvertiser.value) return true;
	const baseValid
		= !!formData.value.clientCount
			&& formData.value.clientBusinessIndustries.length > 0;

	if (!isPartner.value) return baseValid;

	return baseValid && formData.value.clientRegions.length > 0;
});

const isFinalStep = computed(() => isAdvertiser.value || formStep.value === 2);

const isSubmitBtnDisabled = computed(() => {
	if (props.isSubmitting) return true;

	if (isFinalStep.value) {
		const captchaOk = skipCaptcha.value || !!captchaToken.value;

		if (isAdvertiser.value) return !(captchaOk && step1Valid.value);

		return !(captchaOk && step2Valid.value);
	}

	return !step1Valid.value;
});

watch(
	() => formData.value.approximateMonthlySpend,
	(newVal) => {
		if (!newVal) return;
		if (typeof window === "undefined") return;
		const list = isAdvertiser.value
			? MONTHLY_SPEND_OPTIONS.ADVERTISER
			: MONTHLY_SPEND_OPTIONS.AGENCY_PARTNER;
		const matched = list.find(o => o.text === newVal)?.text;
		const encoded = matched ? encodeURIComponent(matched) : "";

		try {
			localStorage.setItem("m_s", encoded);
		}
		catch {
			// localStorage may be unavailable (private mode)
		}
	},
);

function pushDataLayer(payload: Record<string, unknown>) {
	if (typeof window === "undefined") return;
	window.dataLayer = window.dataLayer ?? [];
	window.dataLayer.push(payload);
}

function fireFunnelEventsForStep1() {
	pushDataLayer({
		event: "register_funnel",
		action: `adspend - ${formData.value.approximateMonthlySpend}`,
	});
	const platformValues = formData.value.adPlatforms
		.map(id => AD_PLATFORMS.find(p => p.id === id)?.value)
		.filter(Boolean)
		.join(", ");
	const otherSuffix = hasOtherPlatforms.value
		? ` - ${formData.value.otherAdPlatforms}`
		: "";

	pushDataLayer({
		event: "register_funnel",
		action: `adplatforms - ${platformValues}${otherSuffix}`,
	});
	pushDataLayer({
		event: "register_funnel",
		action: `needs - ${formData.value.services
			.map(id => SERVICES.find(s => s.id === id)?.value)
			.filter(Boolean)
			.join(", ")}`,
	});
}

function fireFunnelEventsForFinalNonAdvertiser() {
	pushDataLayer({
		event: "register_funnel",
		action: `clients - ${formData.value.clientCount}`,
	});
	pushDataLayer({
		event: "register_funnel",
		action: `sector - ${formData.value.clientBusinessIndustries
			.map(id => CLIENT_INDUSTRIES.find(i => i.id === id)?.value)
			.filter(Boolean)
			.join(", ")}`,
	});
	if (isPartner.value) {
		pushDataLayer({
			event: "register_funnel",
			action: `regions - ${formData.value.clientRegions
				.map(id => CLIENT_REGIONS.find(r => r.id === id)?.value)
				.filter(Boolean)
				.join(", ")}`,
		});
	}
}

function pushVirtualPageView(stepLabel: string) {
	if (typeof window === "undefined") return;
	pushDataLayer({
		event: "GAVirtual",
		pageUrl: `${window.location.href}/${props.customerType}/${stepLabel}`,
		pageTitle: `Register ${props.customerType} ${stepLabel}`,
		pagePath: `${window.location.pathname}/${props.customerType}/${stepLabel}`,
	});
}

function handleSubmit() {
	if (isFinalStep.value) {
		if (isAdvertiser.value) {
			if (!step1Valid.value) {
				showStep1Errors.value = true;
				window.scrollTo(0, 0);

				return;
			}
			fireFunnelEventsForStep1();
		}
		else {
			if (!step2Valid.value) {
				showStep2Errors.value = true;
				window.scrollTo(0, 0);

				return;
			}
			fireFunnelEventsForFinalNonAdvertiser();
		}

		emit("submit", {
			...formData.value,
			captchaResponse: captchaToken.value,
			skipRecaptcha: skipCaptcha.value,
		});

		return;
	}

	if (!step1Valid.value) {
		showStep1Errors.value = true;
		window.scrollTo(0, 0);

		return;
	}

	router.push({ query: { ...route.query, sub: "2" } });
	showStep2Errors.value = false;
	window.scrollTo(0, 0);
	pushVirtualPageView("2");
	fireFunnelEventsForStep1();
}

defineExpose({
	resetCaptcha: () => resetToken(),
});
</script>

<template>
	<div class="mt-10 flex flex-col items-center">
		<div class="flex w-full flex-col items-center gap-12 sm:w-[800px]">
			<!-- Sub-step 1 fields (always shown for advertiser; conditionally for non-advertiser) -->
			<div
				v-show="isAdvertiser || formStep === 1"
				class="flex w-full flex-col gap-12"
			>
				<RABtnGroup
					id="btn-group-approximate-monthly-spend"
					label="What is your approximate monthly ad spend?"
					:items="monthlySpendOptions"
					:selected-id="monthlySpendOptions.find(o => o.text === formData.approximateMonthlySpend)?.id"
					:error-message="showStep1Errors && !formData.approximateMonthlySpend ? 'Required' : ''"
					@change="formData.approximateMonthlySpend = $event.text"
				/>

				<div class="flex flex-col gap-4">
					<RACheckboxGroup
						label="Which ad platforms do you use?"
						:items="AD_PLATFORMS"
						:model-value="formData.adPlatforms"
						:error-message="showStep1Errors && formData.adPlatforms.length === 0 ? 'Select at least one' : ''"
						@update:model-value="formData.adPlatforms = $event"
					/>
					<Textarea
						v-if="hasOtherPlatforms"
						id="text-area-others"
						v-model="formData.otherAdPlatforms"
						class="max-h-96 w-full"
						placeholder="Tell us which other ad platforms you use"
					/>
					<p
						v-if="showStep1Errors && hasOtherPlatforms && !otherPlatformsValid"
						class="text-center text-sm text-destructive"
					>
						Please describe your other platforms (min. 3 characters).
					</p>
				</div>

				<RACheckboxGroup
					label="Which services do you need?"
					:items="SERVICES"
					:model-value="formData.services"
					:error-message="showStep1Errors && formData.services.length === 0 ? 'Select at least one' : ''"
					@update:model-value="formData.services = $event"
				/>
			</div>

			<!-- Sub-step 2 fields (non-advertiser only) -->
			<div
				v-show="!isAdvertiser && formStep === 2"
				class="flex w-full flex-col gap-12"
			>
				<RABtnGroup
					id="btn-group-client-count"
					label="How many clients do you serve?"
					:items="CLIENT_COUNT_OPTIONS"
					:selected-id="CLIENT_COUNT_OPTIONS.find(o => o.text === formData.clientCount)?.id"
					:error-message="showStep2Errors && !formData.clientCount ? 'Required' : ''"
					@change="formData.clientCount = $event.text"
				/>

				<RACheckboxGroup
					label="Which industries are your clients in?"
					:items="CLIENT_INDUSTRIES"
					:model-value="formData.clientBusinessIndustries"
					:error-message="showStep2Errors && formData.clientBusinessIndustries.length === 0 ? 'Select at least one' : ''"
					@update:model-value="formData.clientBusinessIndustries = $event"
				/>

				<div v-if="isPartner">
					<RACheckboxGroup
						label="Which regions do your clients operate in?"
						:items="CLIENT_REGIONS"
						:model-value="formData.clientRegions"
						:error-message="showStep2Errors && formData.clientRegions.length === 0 ? 'Select at least one' : ''"
						@update:model-value="formData.clientRegions = $event"
					/>
				</div>
			</div>
		</div>

		<div class="mt-10 flex flex-col items-center justify-center">
			<NuxtTurnstile
				v-if="!skipCaptcha && isFinalStep"
				id="registration-turnstile"
				v-model="captchaToken"
				class="mt-4"
				:options="{ size: 'flexible' }"
			/>

			<Button
				id="registration-submit-button"
				type="button"
				class="mt-6 h-12 w-full sm:w-[320px]"
				:disabled="isSubmitBtnDisabled"
				@click="handleSubmit"
			>
				<Spinner
					v-if="isSubmitting"
					class="mr-2"
				/>
				{{ isFinalStep ? "Submit" : "Continue" }}
			</Button>
		</div>
	</div>
</template>
