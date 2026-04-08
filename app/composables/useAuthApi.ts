import { AUTH_API_PATHS } from "@/lib/auth-api-paths";
import { extractAuthErrorMessage } from "@/utils/auth-error";

export type SignInBody = {
	email: string;
	password: string;
};

export type SignUpBody = {
	name: string;
	email: string;
	company: string;
	phone?: string;
	password: string;
	password_confirmation: string;
	/** Set when the user accepts legal policies (your API may require this field). */
	terms_accepted: boolean;
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

function isTruthyPublicFlag(value: unknown): boolean {
	return value === true || value === "true" || value === "1";
}

export function useAuthApi() {
	const config = useRuntimeConfig();
	const session = useAuthSession();

	const baseURL = (config.public.authApiBase as string | undefined)?.replace(
		/\/$/,
		"",
	) ?? "";

	const credentials = isTruthyPublicFlag(config.public.authWithCredentials)
		? ("include" as const)
		: ("omit" as const);

	function requireBase(): string {
		if (!baseURL) {
			throw new Error(
				"Auth API is not configured. Set NUXT_PUBLIC_AUTH_API_BASE in your environment.",
			);
		}

		return baseURL;
	}

	async function request<T>(
		path: string,
		options: {
			method?: "GET" | "POST";
			body?: Record<string, unknown>;
			bearer?: boolean;
		},
	): Promise<T> {
		const root = requireBase();
		const headers: Record<string, string> = {};

		if (options.bearer) {
			const token = session.accessToken.value;

			if (!token) {
				throw new Error("Not authenticated.");
			}
			headers.Authorization = `Bearer ${token}`;
		}

		const method = options.method ?? "POST";

		try {
			return await $fetch<T>(path, {
				baseURL: root,
				method,
				...(method === "GET" ? {} : { body: options.body }),
				headers,
				credentials,
			});
		}
		catch (error: unknown) {
			throw new Error(extractAuthErrorMessage(error));
		}
	}

	return {
		baseURL,

		/**
		 * Authenticated `$fetch` against `authApiBase`. Sends `Authorization: Bearer <jwt>`.
		 * Use for non-auth app endpoints (e.g. `/me`, `/projects`).
		 */
		fetchWithBearer<T>(
			path: string,
			options: {
				method?: "GET" | "POST";
				body?: Record<string, unknown>;
			} = {},
		) {
			return request<T>(path, {
				method: options.method ?? "GET",
				body: options.body,
				bearer: true,
			});
		},

		signIn(body: SignInBody) {
			return request<unknown>(AUTH_API_PATHS.signIn, { body });
		},

		signUp(body: SignUpBody) {
			return request<unknown>(AUTH_API_PATHS.signUp, { body });
		},

		verifyEmail(body: VerifyEmailBody) {
			return request<unknown>(AUTH_API_PATHS.verifyEmail, {
				body,
			});
		},

		resendVerification(body: ResendVerificationBody) {
			return request<unknown>(
				AUTH_API_PATHS.resendVerification,
				{ body },
			);
		},

		forgotPassword(body: ForgotPasswordBody) {
			return request<unknown>(AUTH_API_PATHS.forgotPassword, {
				body,
			});
		},

		resetPassword(body: ResetPasswordBody) {
			return request<unknown>(AUTH_API_PATHS.resetPassword, {
				body,
			});
		},

		acceptInvitation(body: AcceptInvitationBody) {
			return request<unknown>(AUTH_API_PATHS.acceptInvitation, {
				body,
			});
		},
	};
}
