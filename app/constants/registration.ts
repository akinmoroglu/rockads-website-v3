export type FormOption = { id: string; value: string; text: string };

export const MONTHLY_SPEND_OPTIONS = {
	ADVERTISER: [
		{ id: "spend-25k", value: "25000", text: "< $25K" },
		{ id: "spend-50k", value: "50000", text: "$25K - $50K" },
		{ id: "spend-100k", value: "100000", text: "$50K - $100K" },
		{ id: "spend-250k", value: "250000", text: "$100K - $250K" },
		{ id: "spend-250k-plus", value: "250001", text: "$250K +" },
	],
	AGENCY_PARTNER: [
		{ id: "spend-100k", value: "100000", text: "< $100K" },
		{ id: "spend-500k", value: "500000", text: "$100K - $500K" },
		{ id: "spend-1m", value: "1000000", text: "$500K - $1M" },
		{ id: "spend-5m", value: "5000000", text: "$1M - $5M" },
		{ id: "spend-5m-plus", value: "5000001", text: "$5M +" },
	],
} as const satisfies { ADVERTISER: FormOption[]; AGENCY_PARTNER: FormOption[] };

export const CLIENT_COUNT_OPTIONS: FormOption[] = [
	{ id: "count-1-25", value: "25", text: "1 - 25" },
	{ id: "count-25-50", value: "50", text: "25 - 50" },
	{ id: "count-50-100", value: "100", text: "50 - 100" },
	{ id: "count-100-250", value: "250", text: "100 - 250" },
	{ id: "count-250-plus", value: "251", text: "250 +" },
];

export const AD_PLATFORMS: FormOption[] = [
	{ id: "platform-meta", value: "meta", text: "Meta" },
	{ id: "platform-tiktok", value: "tiktok", text: "Tiktok" },
	{ id: "platform-google", value: "google", text: "Google" },
	{ id: "platform-others", value: "others", text: "Other" },
];

export const SERVICES: FormOption[] = [
	{ id: "service-ad-account", value: "ad_account", text: "Ad account opening" },
	{ id: "service-campaign", value: "campaign_management", text: "Campaign management" },
	{ id: "service-creative", value: "creative_creation", text: "Creative production" },
	{ id: "service-consultation", value: "consultation", text: "Consultation" },
];

export const CLIENT_INDUSTRIES: FormOption[] = [
	{ id: "industry-ecommerce", value: "ecommerce", text: "E-commerce" },
	{ id: "industry-dropshipping", value: "dropshipping", text: "Dropshipping" },
	{ id: "industry-health", value: "health", text: "Health" },
	{ id: "industry-mobile", value: "mobile_app", text: "Mobile application" },
	{ id: "industry-saas", value: "saas", text: "SaaS" },
	{ id: "industry-dating", value: "dating", text: "Dating" },
	{ id: "industry-financial", value: "financial", text: "Financial" },
	{ id: "industry-crypto", value: "crypto", text: "Crypto" },
	{ id: "industry-gaming", value: "gaming", text: "Gaming" },
	{ id: "industry-tourism", value: "tourism", text: "Tourism" },
	{ id: "industry-other", value: "other", text: "Other" },
];

export const CLIENT_REGIONS: FormOption[] = [
	{ id: "region-europe", value: "europe", text: "Europe" },
	{ id: "region-nordics", value: "nordics", text: "Nordics" },
	{ id: "region-baltics", value: "baltics", text: "Baltics" },
	{ id: "region-middle-east", value: "middle_east", text: "Middle East" },
	{ id: "region-africa", value: "africa", text: "Africa" },
	{ id: "region-north-america", value: "north_america", text: "North America" },
	{ id: "region-latin-america", value: "latin_america", text: "Latin America" },
	{ id: "region-asia-pacific", value: "asia_pacific", text: "Asia Pacific" },
];

export type CustomerType = "advertiser" | "agency" | "partner";
