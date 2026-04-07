import type { ComponentPublicInstance, Ref } from "vue";

type MaybeElement = Element | ComponentPublicInstance | null;

export type ComposableRef<T extends MaybeElement>
	= Ref<T | null>
		| ((value: T | null) => void)
		| undefined;

function setRef<T extends MaybeElement>(ref: ComposableRef<T>, value: T | null) {
	if (typeof ref === "function") {
		ref(value);
	}
	else if (ref) {
		ref.value = value;
	}
}

/**
 * Composes multiple Vue template refs and/or callback refs into one setter.
 */
export function composeRefs<T extends MaybeElement>(
	...refs: ComposableRef<T>[]
): (instance: T | null) => void {
	return (instance) => {
		for (const ref of refs) {
			setRef(ref, instance);
		}
	};
}

/**
 * Same as `composeRefs` — mirrors the React `useComposedRefs` helper name.
 */
export function useComposedRefs<T extends MaybeElement>(
	...refs: ComposableRef<T>[]
): (instance: T | null) => void {
	return composeRefs(...refs);
}
