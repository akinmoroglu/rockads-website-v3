/**
 * Provides a Turnstile captcha token ref and helpers for all auth pages.
 *
 * When `NUXT_PUBLIC_CAPTCHA_DUMMY_TOKEN` is set (e.g. on staging), the token
 * is pre-populated with that value and the widget should be hidden via
 * `v-if="!isDummyToken"` in the template.
 */
export function useTurnstileToken() {
	const config = useRuntimeConfig();
	const dummyToken = (config.public.captchaDummyToken as string) || "";
	const isDummyToken = Boolean(dummyToken);

	const token = ref<string>(dummyToken);

	/** Ref to attach to the NuxtTurnstile widget for programmatic reset. */
	const widgetRef = ref<{ reset: () => void } | null>(null);

	/**
	 * Resets the token after a failed submission so the user can retry.
	 * No-op when a dummy token is active (staging/test environments).
	 */
	function resetToken() {
		if (isDummyToken) return;
		token.value = "";
		widgetRef.value?.reset();
	}

	return { token, isDummyToken, widgetRef, resetToken };
}
