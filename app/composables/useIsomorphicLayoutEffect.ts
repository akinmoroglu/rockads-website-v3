import { onScopeDispose, watch, type WatchSource } from "vue";

/**
 * Runs `effect` synchronously after reactive updates (layout-style), with cleanup on re-run and scope dispose.
 * Skips execution on the server.
 */
export function useIsomorphicLayoutEffect(
	effect: () => undefined | (() => void),
	sources: WatchSource | WatchSource[],
): void {
	if (import.meta.server) {
		return;
	}

	let cleanup: (() => void) | undefined;

	const stop = watch(
		sources,
		() => {
			if (typeof cleanup === "function") {
				cleanup();
			}
			cleanup = effect();
		},
		{ flush: "sync", immediate: true },
	);

	onScopeDispose(() => {
		stop();
		if (typeof cleanup === "function") {
			cleanup();
		}
	});
}
