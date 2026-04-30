/**
 * Push GTM events through the `@zadigetvoltaire/nuxt-gtm` module's
 * `useGtm()` composable. Container is loaded automatically by the module
 * using `runtimeConfig.public.gtm.id` (env: `GTM_KEY`).
 *
 * `pageViewEvent(title)` mirrors the legacy Vue 2 helper
 * (event: 'GAVirtual', pageUrl, pageTitle, pagePath, previousPath) so
 * downstream GTM tags continue to fire.
 */
export function useGtmEvent() {
	const router = useRouter();
	const gtm = useGtm();

	function pageViewEvent(title: string) {
		if (!import.meta.client) return;
		gtm?.push({
			event: "GAVirtual",
			pageUrl: window.location.href,
			pageTitle: title,
			pagePath: router.currentRoute.value.fullPath,
			previousPath: (router.options.history as { state?: { back?: string } })
				.state?.back,
		});
	}

	return { pageViewEvent };
}
