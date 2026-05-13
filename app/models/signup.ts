export type SignUpPayload = {
	email: string;
	password: string;
	name: string;
	captcha_response?: string;
	utm_sources?: string | null;
	referral_customer_id?: string;
	agreement?: boolean;
};

export type SignUpResponse = {
	token?: string;
	[key: string]: unknown;
};

export type OAuthProvider = "facebook" | "google" | "shopify";

export type OAuthSignInPayload = {
	provider: OAuthProvider;
	utm_codes?: string;
};

export type OAuthSignInResponse = {
	redirect_url: string;
};

export type ResendVerificationEmailPayload = {
	email: string;
	captcha_response?: string;
};
