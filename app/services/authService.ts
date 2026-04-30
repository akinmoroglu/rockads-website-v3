/**
 * Wraps the Go auth API used by sign-in and 2FA flows.
 * All endpoints live under `runtimeConfig.public.goApiURL`.
 */

export type SignInPayload = {
	email: string;
	password: string;
	captcha_response: string;
};

export type SignInResponse = {
	access_token: string;
	refresh_token: string;
	two_factor_enabled: boolean;
	customer_two_factor_required: boolean;
};

export type TwoFactorResponse = {
	access_token: string;
	refresh_token: string;
};

export type TwoFactorGenerateResponse = {
	otp_auth_url: string;
	secret: string;
};

export async function signIn(
	baseURL: string,
	payload: SignInPayload,
): Promise<SignInResponse> {
	return $fetch<SignInResponse>("signin", {
		baseURL,
		method: "POST",
		body: payload,
	});
}

export async function generateTwoFactor(
	baseURL: string,
	bearer: string,
): Promise<TwoFactorGenerateResponse> {
	return $fetch<TwoFactorGenerateResponse>("me/2fa/generate", {
		baseURL,
		method: "POST",
		headers: { Authorization: `Bearer ${bearer}` },
	});
}

export async function enableTwoFactor(
	baseURL: string,
	bearer: string,
	body: { code: string; secret: string },
): Promise<TwoFactorResponse> {
	return $fetch<TwoFactorResponse>("me/2fa/enable", {
		baseURL,
		method: "POST",
		headers: { Authorization: `Bearer ${bearer}` },
		body,
	});
}

export async function loginTwoFactor(
	baseURL: string,
	bearer: string,
	body: { code: string },
): Promise<TwoFactorResponse> {
	return $fetch<TwoFactorResponse>("me/2fa/login", {
		baseURL,
		method: "POST",
		headers: { Authorization: `Bearer ${bearer}` },
		body,
	});
}
