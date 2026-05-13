import type {
	OAuthSignInPayload,
	OAuthSignInResponse,
	ResendVerificationEmailPayload,
	SignUpPayload,
	SignUpResponse,
} from "~/models/signup";

export async function signUp(
	baseURL: string,
	payload: SignUpPayload,
): Promise<SignUpResponse> {
	return $fetch<SignUpResponse>("signup", {
		baseURL,
		method: "POST",
		body: payload,
	});
}

export async function oauthSignIn(
	baseURL: string,
	payload: OAuthSignInPayload,
): Promise<OAuthSignInResponse> {
	return $fetch<OAuthSignInResponse>("oauth/signin", {
		baseURL,
		method: "POST",
		body: payload,
	});
}

export async function resendVerificationEmail(
	baseURL: string,
	payload: ResendVerificationEmailPayload,
): Promise<void> {
	await $fetch("resend-verification-email", {
		baseURL,
		method: "POST",
		body: payload,
	});
}
