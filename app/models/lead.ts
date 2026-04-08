export type CountryOption = {
	value: string;
	label?: string;
};

export type PhoneCountryCode = {
	label: string;
	value?: string;
};

export type CreateLeadParams = {
	approximateMonthlySpend?: string;
	clientBusinessIndustries?: string[];
	clientCount?: string;
	clientRegions?: string[];
	country?: CountryOption;
	customerType?: string;
	businessName?: string;
	services?: string[];
	website?: string;
	phoneNumber?: string;
	phoneCountryCode: PhoneCountryCode;
	captchaResponse?: string;
	/** Skip captcha verification in development/test environments. */
	skipRecaptcha?: boolean;
	adPlatforms?: string[];
	otherAdPlatforms?: string;
};

export type CreateLeadPayload = {
	approximate_monthly_spend?: string;
	client_business_industries?: string;
	client_count?: string;
	client_regions?: string;
	country?: string;
	customer_type?: string;
	business_name?: string;
	services?: string;
	website?: string;
	phone_number?: string;
	phone_country_code?: string;
	captcha_response?: string;
	referer?: string | null;
	ad_platforms?: string;
};
