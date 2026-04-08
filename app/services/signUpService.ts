import {
	type OAuthSignInPayload,
	type OAuthSignInResponse,
	type SignUpPayload,
	type SignUpResponse,
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
