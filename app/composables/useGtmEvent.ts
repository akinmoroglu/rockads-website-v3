/**
 * Push GTM events to `window.dataLayer`. The GTM script itself is loaded
 * via the GTM container snippet using `runtimeConfig.public.gtm.id`.
 *
 * `pageViewEvent(title)` mirrors the legacy Vue 2 helper
 * (event: 'GAVirtual', pageUrl, pageTitle, pagePath, previousPath) so
 * downstream GTM tags continue to fire on the new auth pages.
 */
export function useGtmEvent() {
	const router = useRouter();

	function push(payload: Record<string, unknown>) {
		if (!import.meta.client) return;
		window.dataLayer = window.dataLayer ?? [];
		window.dataLayer.push(payload);
	}

	function pageViewEvent(title: string) {
		if (!import.meta.client) return;
		push({
			event: "GAVirtual",
			pageUrl: window.location.href,
			pageTitle: title,
			pagePath: router.currentRoute.value.fullPath,
			previousPath: (router.options.history as { state?: { back?: string } })
				.state?.back,
		});
	}

	return { push, pageViewEvent };
}
