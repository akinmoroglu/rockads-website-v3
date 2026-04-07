import type { ComponentPublicInstance } from "vue";

/**
 * Resolves Vue template ref targets (DOM element or component instance) to a real DOM Element.
 */
export function resolveDomElement(target: unknown): Element | null {
	if (target == null) {
		return null;
	}
	if (target instanceof Element) {
		return target;
	}
	if (typeof target === "object" && target !== null && "$el" in target) {
		const raw = (target as ComponentPublicInstance).$el;
		if (raw instanceof Element) {
			return raw;
		}
		if (raw instanceof Text) {
			return raw.parentElement;
		}
	}
	return null;
}
