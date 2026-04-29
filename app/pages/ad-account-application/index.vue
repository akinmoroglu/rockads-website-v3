<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { toast } from "vue-sonner";
import RARegistrationStepFirst from "@/components/auth/RARegistrationStepFirst.vue";
import RARegistrationStepSecond from "@/components/auth/RARegistrationStepSecond.vue";
import RARegistrationStepThird from "@/components/auth/RARegistrationStepThird.vue";
import type {
	BusinessInfoFormValues,
	CountryOptionValue,
	PhoneCountryCodeValue,
} from "@/lib/lead-form-schemas";
import type { CustomerType } from "@/constants/registration";
import { createLead } from "@/services/leadService";
import type { CreateLeadParams } from "~/models/lead";
import { setCookie } from "@/utils/cookie";

declare global {
	interface Window {
		dataLayer?: Record<string, unknown>[];
	}
}

definePageMeta({ layout: "auth" });

useHead({ title: "Ad Account Application - Rockads" });
useSeoMeta({ robots: "noindex, nofollow" });
useServerSeoMeta({ robots: "noindex, nofollow" });

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const baseURL = (config.public.goApiURL as string).replace(/\/$/, "");

const BUSINESS_INFO_KEY = "ad-account-application:business-info";

const VALID_TYPES: ReadonlySet<CustomerType> = new Set([
	"advertiser",
	"agency",
	"partner",
]);

const currentStep = computed<1 | 2 | 3>(() => {
	const raw = Number(route.query.step);

	if (raw === 2) return 2;
	if (raw === 3) return 3;

	return 1;
});

const customerType = computed<CustomerType | null>(() => {
	const raw = route.query.type;

	if (typeof raw === "string" && VALID_TYPES.has(raw as CustomerType)) {
		return raw as CustomerType;
	}

	return null;
});

const businessInfo = ref<BusinessInfoFormValues | null>(null);

const countryList = ref<CountryOptionValue[]>([]);
const phoneCountryList = ref<PhoneCountryCodeValue[]>([]);
const inviteToken = ref<string | undefined>(undefined);

const isSubmitting = ref(false);
const stepThreeRef = ref<{ resetCaptcha: () => void } | null>(null);

const title = computed(() => {
	if (currentStep.value === 1 || !customerType.value) {
		return "Tell us about you";
	}
	switch (customerType.value) {
		case "advertiser":
			return "Set up your advertiser profile";
		case "agency":
			return "Set up your agency profile";
		case "partner":
			return "Set up your partner profile";
	}

	return "Tell us about you";
});

const subtitle = computed(() => {
	switch (currentStep.value) {
		case 1:
			return "Pick the option that fits you best — we'll tailor the rest.";
		case 2:
			return "A few business details so we can verify your account.";
		case 3:
			return "Help us understand your needs to match you with the right team.";
		default:
			return "";
	}
});

function pushDataLayer(payload: Record<string, unknown>) {
	if (typeof window === "undefined") return;
	window.dataLayer = window.dataLayer ?? [];
	window.dataLayer.push(payload);
}

function pushVirtualPageView(extraPath: string, title: string) {
	if (typeof window === "undefined") return;
	pushDataLayer({
		event: "GAVirtual",
		pageUrl: `${window.location.href}${extraPath}`,
		pageTitle: title,
		pagePath: `${window.location.pathname}${extraPath}`,
	});
}

async function fetchCountryList() {
	try {
		const response = await $fetch<{
			data: { alpha2: string; name: string; dial_code: string }[];
		}>("countries", {
			baseURL,
			method: "GET",
		});

		const countries = response?.data ?? [];

		countryList.value = countries.map(c => ({
			value: c.alpha2,
			label: c.name,
		}));

		phoneCountryList.value = countries.map(c => ({
			value: c.dial_code,
			label: c.alpha2.toUpperCase(),
		}));
	}
	catch {
		toast.error("Could not load country list. Please refresh and try again.");
	}
}

function restoreBusinessInfo() {
	if (typeof window === "undefined") return;
	try {
		const raw = sessionStorage.getItem(BUSINESS_INFO_KEY);

		if (!raw) return;
		const parsed = JSON.parse(raw) as BusinessInfoFormValues;

		businessInfo.value = parsed;
	}
	catch {
		// ignore corrupt storage
	}
}

function persistBusinessInfo(values: BusinessInfoFormValues | null) {
	if (typeof window === "undefined") return;
	try {
		if (values) {
			sessionStorage.setItem(BUSINESS_INFO_KEY, JSON.stringify(values));
		}
		else {
			sessionStorage.removeItem(BUSINESS_INFO_KEY);
		}
	}
	catch {
		// ignore quota / private mode errors
	}
}

function reconcileUrlState() {
	const step = currentStep.value;
	const type = customerType.value;

	if (step >= 2 && !type) {
		router.replace({ query: {} });

		return;
	}

	if (step === 3 && !businessInfo.value) {
		router.replace({ query: { step: 2, type } });
	}
}

onMounted(async () => {
	const query = route.query as Record<string, string | string[] | undefined>;

	setCookie(query);

	if (typeof query.token === "string") {
		inviteToken.value = query.token;
	}

	restoreBusinessInfo();
	reconcileUrlState();

	await fetchCountryList();

	pushVirtualPageView("", "Ad Account Application");
});

watch(
	() => [currentStep.value, customerType.value] as const,
	([step], [prevStep]) => {
		if (step === 1 && prevStep !== 1) {
			pushVirtualPageView("", "Ad Account Application");
		}
	},
);

function handleCustomerType(type: CustomerType) {
	router.push({ query: { step: 2, type } });
	pushVirtualPageView(`/${type}`, `Register ${type}`);
}

function handleBusinessInfo(values: BusinessInfoFormValues) {
	businessInfo.value = values;
	persistBusinessInfo(values);
	router.push({ query: { step: 3, type: customerType.value } });
	if (typeof window !== "undefined") window.scrollTo(0, 0);
	pushVirtualPageView(
		`/${customerType.value}/1`,
		`Register ${customerType.value} 1`,
	);
}

async function handleSubmit(params: {
	approximateMonthlySpend: string;
	services: string[];
	adPlatforms: string[];
	otherAdPlatforms: string;
	clientCount: string;
	clientBusinessIndustries: string[];
	clientRegions: string[];
	captchaResponse: string;
	skipRecaptcha: boolean;
}) {
	if (!customerType.value || !businessInfo.value) return;

	isSubmitting.value = true;

	const payload: CreateLeadParams = {
		customerType: customerType.value,
		businessName: businessInfo.value.businessName,
		website: businessInfo.value.website,
		country: businessInfo.value.country,
		phoneCountryCode: businessInfo.value.phoneCountryCode,
		phoneNumber: businessInfo.value.phoneNumber,
		approximateMonthlySpend: params.approximateMonthlySpend,
		services: params.services,
		adPlatforms: params.adPlatforms,
		otherAdPlatforms: params.otherAdPlatforms,
		clientCount:
			customerType.value === "advertiser" ? undefined : params.clientCount,
		clientBusinessIndustries:
			customerType.value === "advertiser"
				? undefined
				: params.clientBusinessIndustries,
		clientRegions:
			customerType.value === "partner" ? params.clientRegions : undefined,
		captchaResponse: params.captchaResponse,
		skipRecaptcha: params.skipRecaptcha,
	};

	try {
		await createLead(baseURL, payload, inviteToken.value);
		businessInfo.value = null;
		persistBusinessInfo(null);
		await navigateTo("/ad-account-application/success");
	}
	catch (error: unknown) {
		const errData
			= (error as { response?: { _data?: { code?: string; message?: string } } })
				.response?._data;
		const code = errData?.code?.toLowerCase();

		const message
			= errData?.message
				?? (code ? `Submission failed (${code}).` : null)
				?? (error instanceof Error
					? error.message
					: "Could not submit your application.");

		toast.error(message);

		stepThreeRef.value?.resetCaptcha();
		if (typeof window !== "undefined") window.scrollTo(0, 0);
	}
	finally {
		isSubmitting.value = false;
	}
}
</script>

<template>
	<div
		id="registration-page"
		class="flex flex-col"
	>
		<div
			id="registration-header"
			class="flex flex-col items-center gap-4 text-center"
		>
			<h1
				id="registration-title"
				class="text-2xl leading-8 font-semibold text-foreground sm:text-[44px] sm:leading-[52px] sm:font-bold"
			>
				{{ title }}
			</h1>
			<span
				id="registration-subtitle"
				class="text-sm leading-6 font-light text-muted-foreground sm:text-base"
			>
				{{ subtitle }}
			</span>
		</div>

		<KeepAlive>
			<RARegistrationStepFirst
				v-if="currentStep === 1"
				@customer-type="handleCustomerType"
			/>
		</KeepAlive>

		<KeepAlive>
			<RARegistrationStepSecond
				v-if="currentStep === 2 && customerType"
				:country-list="countryList"
				:phone-country-list="phoneCountryList"
				:initial-values="businessInfo ?? undefined"
				@form-data="handleBusinessInfo"
			/>
		</KeepAlive>

		<RARegistrationStepThird
			v-if="currentStep === 3 && customerType && businessInfo"
			ref="stepThreeRef"
			:customer-type="customerType"
			:is-submitting="isSubmitting"
			@submit="handleSubmit"
		/>
	</div>
</template>
