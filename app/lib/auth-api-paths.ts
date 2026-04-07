/**
 * Relative paths appended to `runtimeConfig.public.authApiBase` (see `nuxt.config` / `NUXT_PUBLIC_AUTH_API_BASE`).
 * Expected JSON POST bodies (adjust to match your API):
 *
 * - `signIn`: `{ email, password }`
 * - `signUp`: `{ name, email, password, password_confirmation }`
 * - `verifyEmail`: `{ token }` (magic link token from email)
 * - `resendVerification`: `{ email }`
 * - `forgotPassword`: `{ email }`
 * - `resetPassword`: `{ token, password, password_confirmation }` (`token` from email query link → `/reset-password?token=`)
 * - `acceptInvitation`: `{ token, password, password_confirmation, name? }` (`token` from invite link → `/accept-invitation?token=`)
 *
 * All requests use `credentials: "include"` for cookie-based sessions. Switch `useAuthApi` if you use Bearer tokens instead.
 */
export const AUTH_API_PATHS = {
	signIn: "/auth/sign-in",
	signUp: "/auth/sign-up",
	verifyEmail: "/auth/verify-email",
	resendVerification: "/auth/resend-verification",
	forgotPassword: "/auth/forgot-password",
	resetPassword: "/auth/reset-password",
	acceptInvitation: "/auth/accept-invitation",
} as const;
