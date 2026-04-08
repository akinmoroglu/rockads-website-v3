/**
 * Relative paths appended to `runtimeConfig.public.authApiBase` (see `nuxt.config` / `NUXT_PUBLIC_AUTH_API_BASE`).
 * Expected JSON POST bodies (adjust to match your API):
 *
 * - `signIn`: `{ email, password }`
 * - `signUp`: `{ name, email, company, phone?, password, password_confirmation, terms_accepted }`
 * - `verifyEmail`: `{ token }` (magic link token from email)
 * - `resendVerification`: `{ email }`
 * - `forgotPassword`: `{ email }`
 * - `resetPassword`: `{ token, password, password_confirmation }` (`token` from email query link → `/reset-password?token=`)
 * - `acceptInvitation`: `{ token, password, password_confirmation, name? }` (`token` from invite link → `/accept-invitation?token=`)
 *
 * **JWT:** After sign-in (and optionally verify / reset / invite), the API should return a token in JSON as `access_token`, `accessToken`, or `token` (or the same under a `data` object). The app stores it and sends `Authorization: Bearer …` on `useAuthApi().fetchWithBearer()`.
 *
 * **Cookies:** Set `runtimeConfig.public.authWithCredentials` / `NUXT_PUBLIC_AUTH_WITH_CREDENTIALS` if the API also relies on cookies (e.g. refresh token).
 */
export const AUTH_API_PATHS = {
	signIn: "/auth/sign-in",
	signUp: "/auth/sign-up",
	verifyEmail: "/auth/verify-email",
	resendVerification: "/auth/resend-verification",
	forgotPassword: "/auth/forgot-password",
	resetPassword: "/auth/reset-password",
	acceptInvitation: "/auth/accept-invitation",
	/** OAuth redirect initiation paths — browser navigates to these URLs */
	socialMeta: "/auth/social/meta",
	socialGoogle: "/auth/social/google",
	socialShopify: "/auth/social/shopify",
} as const;
