import { shallowRef } from "vue";
import type { ShallowRef } from "vue";

export function useLazyRef<T>(factory: () => T): ShallowRef<T> {
	const ref = shallowRef<T | null>(null);

	if (ref.value === null) {
		ref.value = factory();
	}

	return ref as ShallowRef<T>;
}
