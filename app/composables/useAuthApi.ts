import { AUTH_API_PATHS } from "@/lib/auth-api-paths";
import { extractAuthErrorMessage } from "@/utils/auth-error";

export type SignInBody = {
	email: string;
	password: string;
};

export type SignUpBody = {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
};

export type VerifyEmailBody = {
	token: string;
};

export type ResendVerificationBody = {
	email: string;
};

export type ForgotPasswordBody = {
	email: string;
};

export type ResetPasswordBody = {
	token: string;
	password: string;
	password_confirmation: string;
};

export type AcceptInvitationBody = {
	token: string;
	name?: string;
	password: string;
	password_confirmation: string;
};

async function authFetch<T>(
	baseURL: string,
	path: string,
	options: {
		method?: "GET" | "POST";
		body?: Record<string, unknown>;
	},
): Promise<T> {
	try {
		return await $fetch<T>(path, {
			baseURL,
			method: options.method ?? "POST",
			body: options.body,
			credentials: "include",
		});
	}
	catch (error: unknown) {
		throw new Error(extractAuthErrorMessage(error));
	}
}

/**
 * Typed client for your auth backend. Set `NUXT_PUBLIC_AUTH_API_BASE` (no trailing slash).
 * Uses cookie sessions (`credentials: "include"`). Add Bearer tokens in this composable if you switch to JWT headers.
 */
export function useAuthApi() {
	const config = useRuntimeConfig();
	const baseURL = (config.public.authApiBase as string | undefined)?.replace(
		/\/$/,
		"",
	) ?? "";

	function requireBase(): string {
		if (!baseURL) {
			throw new Error(
				"Auth API is not configured. Set NUXT_PUBLIC_AUTH_API_BASE in your environment.",
			);
		}
		return baseURL;
	}

	const root = () => requireBase();

	return {
		baseURL,

		signIn(body: SignInBody) {
			return authFetch<unknown>(root(), AUTH_API_PATHS.signIn, { body });
		},

		signUp(body: SignUpBody) {
			return authFetch<unknown>(root(), AUTH_API_PATHS.signUp, { body });
		},

		verifyEmail(body: VerifyEmailBody) {
			return authFetch<unknown>(root(), AUTH_API_PATHS.verifyEmail, {
				body,
			});
		},

		resendVerification(body: ResendVerificationBody) {
			return authFetch<unknown>(
				root(),
				AUTH_API_PATHS.resendVerification,
				{ body },
			);
		},

		forgotPassword(body: ForgotPasswordBody) {
			return authFetch<unknown>(root(), AUTH_API_PATHS.forgotPassword, {
				body,
			});
		},

		resetPassword(body: ResetPasswordBody) {
			return authFetch<unknown>(root(), AUTH_API_PATHS.resetPassword, {
				body,
			});
		},

		acceptInvitation(body: AcceptInvitationBody) {
			return authFetch<unknown>(root(), AUTH_API_PATHS.acceptInvitation, {
				body,
			});
		},
	};
}
