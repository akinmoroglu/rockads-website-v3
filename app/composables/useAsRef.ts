import { shallowRef, toValue, watch, type MaybeRefOrGetter } from "vue";

/**
 * Keeps a ref synchronized with a reactive source (flush: sync), for stable callbacks reading latest values.
 */
export function useAsRef<T>(source: MaybeRefOrGetter<T>) {
	const ref = shallowRef(toValue(source));

	watch(
		() => toValue(source),
		(v) => {
			ref.value = v;
		},
		{ flush: "sync" },
	);

	return ref;
}
