import { shallowRef, type Ref } from "vue";

const UNSET = Symbol("lazyRefUnset");

/**
 * Lazily initializes a ref with `factory` once per component instance.
 */
export function useLazyRef<T>(factory: () => T): Ref<T> {
	const ref = shallowRef<T | typeof UNSET>(UNSET);
	if (ref.value === UNSET) {
		ref.value = factory();
	}
	return ref as Ref<T>;
}
