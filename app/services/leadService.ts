import type { CreateLeadParams, CreateLeadPayload } from "~/models/lead";

const DUMMY_CAPTCHA_TOKEN = "XXXX.DUMMY.TOKEN.XXXX";

function resolveReferrer(): string | null {
	if (!import.meta.client) return null;

	const storedReferrer = localStorage.getItem("referrer");

	return storedReferrer === document.referrer
		? document.referrer
		: storedReferrer;
}

function buildAdPlatforms(
	adPlatforms: string[] = [],
	otherAdPlatforms = "",
): string {
	const filtered = adPlatforms.filter(p => p !== "others");

	return `${filtered.join(", ")},${otherAdPlatforms}`;
}

function buildPayload(params: CreateLeadParams): CreateLeadPayload {
	return {
		approximate_monthly_spend: params.approximateMonthlySpend,
		client_business_industries: params.clientBusinessIndustries?.join(","),
		client_count: params.clientCount,
		client_regions: params.clientRegions?.join(","),
		country: params.country?.value?.toUpperCase(),
		customer_type: params.customerType,
		business_name: params.businessName,
		services: params.services?.join(","),
		website: params.website,
		phone_number: params.phoneNumber,
		phone_country_code: params.phoneCountryCode.label,
		captcha_response: params.skipRecaptcha
			? DUMMY_CAPTCHA_TOKEN
			: params.captchaResponse,
		referer: resolveReferrer(),
		ad_platforms: buildAdPlatforms(params.adPlatforms, params.otherAdPlatforms),
	};
}

export async function createLead(
	baseURL: string,
	params: CreateLeadParams,
	accessToken?: string,
): Promise<unknown> {
	const headers: Record<string, string> = {};

	if (accessToken) {
		headers.Authorization = `Bearer ${accessToken}`;
	}

	return $fetch("me/leads", {
		baseURL,
		method: "PUT",
		body: buildPayload(params),
		headers,
	});
}
