<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, onScopeDispose, provide, ref, shallowRef, toRef, watch } from "vue";
import { Primitive, useDirection } from "reka-ui";
import { useIsomorphicLayoutEffect } from "@/composables/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";
import {
	SCROLL_SPY_CONTEXT_KEY,
	type ScrollSpyContextValue,
	type ScrollSpyDirection,
	type ScrollSpyOrientation,
} from "./scroll-spy-context";
import { resolveDomElement } from "./resolveDomElement";

const props = withDefaults(
	defineProps<{
		value?: string;
		defaultValue?: string;
		rootMargin?: string;
		threshold?: number | number[];
		offset?: number;
		scrollBehavior?: ScrollBehavior;
		scrollContainer?: HTMLElement | null;
		dir?: ScrollSpyDirection;
		orientation?: ScrollSpyOrientation;
		asChild?: boolean;
		class?: HTMLAttributes["class"];
	}>(),
	{
		threshold: 0.1,
		offset: 0,
		orientation: "horizontal",
		scrollContainer: null,
		asChild: false,
	},
);

const emit = defineEmits<{
	"update:value": [string];
}>();

function getDefaultScrollBehavior(): ScrollBehavior {
	if (!import.meta.client) {
		return "smooth";
	}

	return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

const resolvedScrollBehavior = computed(
	() => props.scrollBehavior ?? getDefaultScrollBehavior(),
);

const dir = useDirection(toRef(props, "dir"));

const activeId = ref(props.value ?? props.defaultValue ?? "");
const sectionMap = shallowRef(new Map<string, Element>());
const isScrollingRef = ref(false);
const rafIdRef = ref<number | null>(null);
const scrollTimeoutRef = ref<number | null>(null);
const isHydratedRef = ref(false);

function commitValue(next: string) {
	if (Object.is(activeId.value, next)) {
		return;
	}
	activeId.value = next;
	emit("update:value", next);
}

function onSectionRegister(id: string, element: Element) {
	const next = new Map(sectionMap.value);

	next.set(id, element);
	sectionMap.value = next;
}

function onSectionUnregister(id: string) {
	const next = new Map(sectionMap.value);

	next.delete(id);
	sectionMap.value = next;
}

function onScrollToSection(sectionId: string) {
	if (!import.meta.client) {
		return;
	}

	const scrollContainer = props.scrollContainer ?? null;
	let section: Element | null = null;

	try {
		section = scrollContainer
			? scrollContainer.querySelector(`#${CSS.escape(sectionId)}`)
			: document.getElementById(sectionId);
	}
	catch {
		section = scrollContainer
			? scrollContainer.querySelector(`#${sectionId}`)
			: document.getElementById(sectionId);
	}

	if (!section || !(section instanceof HTMLElement)) {
		commitValue(sectionId);

		return;
	}

	isScrollingRef.value = true;
	commitValue(sectionId);

	const offset = props.offset;
	const behavior = resolvedScrollBehavior.value;

	if (scrollContainer) {
		const containerRect = scrollContainer.getBoundingClientRect();
		const sectionRect = section.getBoundingClientRect();
		const scrollTop = scrollContainer.scrollTop;
		const offsetPosition = sectionRect.top - containerRect.top + scrollTop - offset;

		scrollContainer.scrollTo({ top: offsetPosition, behavior });
	}
	else {
		const sectionPosition = section.getBoundingClientRect().top;
		const offsetPosition = sectionPosition + window.scrollY - offset;

		window.scrollTo({ top: offsetPosition, behavior });
	}

	if (scrollTimeoutRef.value !== null) {
		clearTimeout(scrollTimeoutRef.value);
	}
	scrollTimeoutRef.value = window.setTimeout(() => {
		isScrollingRef.value = false;
		scrollTimeoutRef.value = null;
	}, 500);
}

useIsomorphicLayoutEffect(
	() => {
		if (!import.meta.client) {
			return undefined;
		}

		const currentValue = props.value ?? props.defaultValue;

		if (currentValue === undefined || currentValue === "") {
			return undefined;
		}

		if (!isHydratedRef.value) {
			isHydratedRef.value = true;
			commitValue(currentValue);

			return undefined;
		}

		if (props.value !== undefined) {
			onScrollToSection(props.value);
		}

		return undefined;
	},
	() => [props.value, props.defaultValue],
);

let observerCleanup: (() => void) | undefined;

watch(
	[
		sectionMap,
		() => props.offset,
		() => props.rootMargin,
		() => props.threshold,
		() => props.scrollContainer,
	],
	() => {
		if (!import.meta.client || typeof IntersectionObserver === "undefined") {
			return;
		}

		observerCleanup?.();
		observerCleanup = undefined;

		const map = sectionMap.value;

		if (map.size === 0) {
			return;
		}

		const observerRootMargin = props.rootMargin ?? `${-props.offset}px 0px -70% 0px`;

		const observer = new IntersectionObserver(
			(entries) => {
				if (isScrollingRef.value) {
					return;
				}

				if (rafIdRef.value !== null) {
					cancelAnimationFrame(rafIdRef.value);
				}

				rafIdRef.value = requestAnimationFrame(() => {
					const intersecting = entries.filter(entry => entry.isIntersecting);

					if (intersecting.length === 0) {
						return;
					}

					const topmost = intersecting.reduce((prev, curr) => {
						return curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev;
					});

					const id = topmost.target.id;

					if (id && sectionMap.value.has(id)) {
						commitValue(id);
					}
				});
			},
			{
				root: props.scrollContainer ?? null,
				rootMargin: observerRootMargin,
				threshold: props.threshold,
			},
		);

		for (const node of map.values()) {
			const element = resolveDomElement(node);

			if (element) {
				observer.observe(element);
			}
		}

		observerCleanup = () => {
			observer.disconnect();
			if (rafIdRef.value !== null) {
				cancelAnimationFrame(rafIdRef.value);
				rafIdRef.value = null;
			}
			if (scrollTimeoutRef.value !== null) {
				clearTimeout(scrollTimeoutRef.value);
				scrollTimeoutRef.value = null;
			}
		};
	},
	{ flush: "post", immediate: true },
);

onScopeDispose(() => {
	observerCleanup?.();
});

const contextValue: ScrollSpyContextValue = {
	get offset() {
		return props.offset;
	},
	get scrollBehavior() {
		return resolvedScrollBehavior.value;
	},
	dir,
	get orientation() {
		return props.orientation;
	},
	get scrollContainer() {
		return props.scrollContainer ?? null;
	},
	isScrollingRef,
	activeId,
	onSectionRegister,
	onSectionUnregister,
	onScrollToSection,
};

provide(SCROLL_SPY_CONTEXT_KEY, contextValue);
</script>

<template>
	<Primitive
		data-slot="scroll-spy"
		:data-orientation="props.orientation"
		:as-child="props.asChild"
		as="div"
		:dir="dir"
		:class="
			cn(
				'flex',
				props.orientation === 'horizontal' ? 'flex-row' : 'flex-col',
				props.class,
			)
		"
	>
		<slot />
	</Primitive>
</template>
