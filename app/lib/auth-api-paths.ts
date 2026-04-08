/**
 * Relative paths appended to `runtimeConfig.public.authApiBase` (see `nuxt.config` / `NUXT_PUBLIC_AUTH_API_BASE`).
 * Expected JSON POST bodies (adjust to match your API):
 *
 * - `signIn` → `POST /signin`: `{ email, password }`
 * - `signUp` → `POST /signup`: `{ name, email, company, phone?, password, password_confirmation, terms_accepted }`
 * - `verifyEmail` → `POST /verify-email`: `{ token }` (magic link token from email)
 * - `resendVerification` → `POST /resend-verification`: `{ email }`
 * - `forgotPassword` → `POST /forgot-password`: `{ email }`
 * - `resetPassword` → `POST /reset-password`: `{ token, password, password_confirmation }` (`token` from email query link → `/reset-password?token=`)
 * - `acceptInvitation` → `POST /accept-invitation`: `{ token, password, password_confirmation, name? }` (`token` from invite link → `/accept-invite?token=`)
 *
 * **JWT:** After signin (and optionally verify / reset / invite), the API should return a token in JSON as `access_token`, `accessToken`, or `token` (or the same under a `data` object). The app stores it and sends `Authorization: Bearer …` on `useAuthApi().fetchWithBearer()`.
 *
 * **Cookies:** Set `runtimeConfig.public.authWithCredentials` / `NUXT_PUBLIC_AUTH_WITH_CREDENTIALS` if the API also relies on cookies (e.g. refresh token).
 */
export const AUTH_API_PATHS = {
	signIn: "/signin",
	signUp: "/signup",
	verifyEmail: "/verify-email",
	resendVerification: "/resend-verification",
	forgotPassword: "/forgot-password",
	resetPassword: "/reset-password",
	acceptInvitation: "/accept-invitation",
	/** OAuth redirect initiation paths — browser navigates to these URLs */
	socialMeta: "/social/meta",
	socialGoogle: "/social/google",
	socialShopify: "/social/shopify",
} as const;
