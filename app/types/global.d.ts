/**
 * Ambient globals for third-party scripts loaded by the marketing/auth pages.
 */
export {};

declare global {
	interface Window {
		/** Desk360 live chat widget — present when the loader script is on the page. */
		desk360Chat?: {
			open?: () => void;
			show?: () => void;
		};
		/** Legacy Google Analytics gtag helper. Optional — populated by GTM/GA snippet. */
		$gtag?: {
			event: (name: string, params: Record<string, unknown>) => void;
		};
		/** Firebase JS SDK — optional analytics() helper used by legacy registration tracking. */
		firebase?: {
			analytics: () => { logEvent: (name: string, params: Record<string, unknown>) => void };
		};
		/** Meta (Facebook) pixel function — optional. */
		fbq?: (...args: unknown[]) => void;
		dataLayer?: Record<string, unknown>[];
	}
}
