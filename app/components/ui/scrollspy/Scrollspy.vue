<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

type ScrollTarget = HTMLElement | HTMLDivElement | Document | null | undefined;

const props = withDefaults(
	defineProps<{
		target?: ScrollTarget;
		offset?: number;
		smooth?: boolean;
		class?: HTMLAttributes["class"];
		dataAttribute?: string;
		history?: boolean;
		throttleTime?: number;
	}>(),
	{
		target: undefined,
		offset: 0,
		smooth: true,
		class: undefined,
		dataAttribute: "scrollspy",
		history: true,
		throttleTime: 80,
	},
);

const emit = defineEmits<{
	update: [id: string];
}>();

const selfRef = ref<HTMLElement | null>(null);
const anchorElements = ref<HTMLElement[]>([]);
const previousId = ref<string | null>(null);
const clickHandlers = new Map<HTMLElement, (event: Event) => void>();

const getScrollElement = (): HTMLElement | null => {
	if (!import.meta.client) {
		return null;
	}

	let baseElement: HTMLElement | null = null;
	if (props.target === document || !props.target) {
		baseElement = document.documentElement;
	}
	else if (props.target instanceof HTMLElement) {
		baseElement = props.target;
	}

	if (!baseElement) {
		return null;
	}

	const viewport = baseElement.querySelector("[data-slot=\"scroll-area-viewport\"]");
	return viewport instanceof HTMLElement ? viewport : baseElement;
};

const setActiveSection = (sectionId: string | null, force = false) => {
	if (!sectionId || !import.meta.client) {
		return;
	}

	for (const anchor of anchorElements.value) {
		const id = anchor.getAttribute(`data-${props.dataAttribute}-anchor`);
		if (id === sectionId) {
			anchor.setAttribute("data-active", "true");
		}
		else {
			anchor.removeAttribute("data-active");
		}
	}

	emit("update", sectionId);
	if (props.history && (force || previousId.value !== sectionId)) {
		window.history.replaceState({}, "", `#${sectionId}`);
	}
	previousId.value = sectionId;
};

const handleScroll = () => {
	if (!import.meta.client || anchorElements.value.length === 0) {
		return;
	}

	const scrollElement = getScrollElement();
	if (!scrollElement) {
		return;
	}

	const scrollTop = scrollElement === document.documentElement
		? window.scrollY || document.documentElement.scrollTop
		: scrollElement.scrollTop;

	let activeIndex = 0;
	let minDelta = Number.POSITIVE_INFINITY;

	anchorElements.value.forEach((anchor, index) => {
		const sectionId = anchor.getAttribute(`data-${props.dataAttribute}-anchor`);
		if (!sectionId) {
			return;
		}

		const sectionElement = document.getElementById(sectionId);
		if (!sectionElement) {
			return;
		}

		let customOffset = props.offset;
		const dataOffset = anchor.getAttribute(`data-${props.dataAttribute}-offset`);
		if (dataOffset) {
			customOffset = Number.parseInt(dataOffset, 10);
		}

		const delta = Math.abs(sectionElement.offsetTop - customOffset - scrollTop);
		if (sectionElement.offsetTop - customOffset <= scrollTop && delta < minDelta) {
			minDelta = delta;
			activeIndex = index;
		}
	});

	const scrollHeight = scrollElement.scrollHeight;
	const clientHeight = scrollElement.clientHeight;
	const nearBottom = scrollTop + clientHeight >= scrollHeight - 2;
	if (nearBottom) {
		const lastAnchor = anchorElements.value.at(-1);
		const lastSectionId = lastAnchor?.getAttribute(`data-${props.dataAttribute}-anchor`);
		if (lastSectionId) {
			const lastSection = document.getElementById(lastSectionId);
			if (lastSection) {
				let lastOffset = props.offset;
				const dataOffset = lastAnchor?.getAttribute(`data-${props.dataAttribute}-offset`);
				if (dataOffset) {
					lastOffset = Number.parseInt(dataOffset, 10);
				}

				// Prevent forcing last item before user actually reaches its section.
				if (scrollTop >= lastSection.offsetTop - lastOffset) {
					activeIndex = anchorElements.value.length - 1;
				}
			}
		}
	}

	const activeAnchor = anchorElements.value[activeIndex];
	const sectionId = activeAnchor?.getAttribute(`data-${props.dataAttribute}-anchor`) ?? null;
	setActiveSection(sectionId);
};

const scrollToAnchor = (anchor: HTMLElement) => (event?: Event) => {
	if (!import.meta.client) {
		return;
	}

	event?.preventDefault();
	const rawSectionId = anchor.getAttribute(`data-${props.dataAttribute}-anchor`);
	const sectionId = rawSectionId?.replace("#", "") ?? null;
	if (!sectionId) {
		return;
	}

	const sectionElement = document.getElementById(sectionId);
	if (!sectionElement) {
		return;
	}

	let scrollTarget: HTMLElement | Window | null = null;
	if (props.target === document || !props.target) {
		scrollTarget = window;
	}
	else if (props.target instanceof HTMLElement) {
		const viewport = props.target.querySelector("[data-slot=\"scroll-area-viewport\"]");
		scrollTarget = viewport instanceof HTMLElement ? viewport : props.target;
	}

	if (!scrollTarget) {
		return;
	}

	let customOffset = props.offset;
	const dataOffset = anchor.getAttribute(`data-${props.dataAttribute}-offset`);
	if (dataOffset) {
		customOffset = Number.parseInt(dataOffset, 10);
	}

	const targetTop = sectionElement.offsetTop - customOffset;
	scrollTarget.scrollTo({
		top: targetTop,
		left: 0,
		behavior: props.smooth ? "smooth" : "auto",
	});

	setActiveSection(sectionId, true);
};

const scrollToHashSection = () => {
	if (!import.meta.client) {
		return;
	}

	const hash = window.location.hash.replace("#", "");
	if (!hash) {
		return;
	}

	const escapedHash = CSS.escape(hash);
	const anchor = selfRef.value?.querySelector(
		`[data-${props.dataAttribute}-anchor="${escapedHash}"]`,
	) as HTMLElement | null;
	if (!anchor) {
		return;
	}

	scrollToAnchor(anchor)();
};

const resolveAnchors = () => {
	if (!selfRef.value) {
		anchorElements.value = [];
		return;
	}

	anchorElements.value = Array.from(
		selfRef.value.querySelectorAll(`[data-${props.dataAttribute}-anchor]`),
	);
};

const throttledScroll = (() => {
	let lastRun = 0;
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	return () => {
		const now = Date.now();
		const remaining = props.throttleTime - (now - lastRun);
		if (remaining <= 0) {
			lastRun = now;
			handleScroll();
			return;
		}

		if (timeoutId) {
			return;
		}

		timeoutId = setTimeout(() => {
			lastRun = Date.now();
			timeoutId = null;
			handleScroll();
		}, remaining);
	};
})();

let initialTimeout: ReturnType<typeof setTimeout> | null = null;
const onScrollEvent = (event: Event) => {
	if (!import.meta.client) {
		return;
	}

	const scrollElement = props.target === document || !props.target ? window : props.target;
	if (!scrollElement) {
		return;
	}

	if (
		scrollElement === window
		|| (scrollElement instanceof HTMLElement && scrollElement.contains(event.target as Node))
	) {
		throttledScroll();
	}
};

const bindAnchorListeners = () => {
	for (const anchor of anchorElements.value) {
		const handler = scrollToAnchor(anchor);
		clickHandlers.set(anchor, handler);
		anchor.addEventListener("click", handler);
	}
};

const unbindAnchorListeners = () => {
	for (const [anchor, handler] of clickHandlers) {
		anchor.removeEventListener("click", handler);
	}
	clickHandlers.clear();
};

onMounted(() => {
	resolveAnchors();
	bindAnchorListeners();
	window.addEventListener("scroll", onScrollEvent, true);

	initialTimeout = setTimeout(() => {
		if (props.history) {
			scrollToHashSection();
		}
		handleScroll();
	}, 100);
});

onBeforeUnmount(() => {
	window.removeEventListener("scroll", onScrollEvent, true);
	unbindAnchorListeners();
	if (initialTimeout) {
		clearTimeout(initialTimeout);
	}
});

watch(
	() => props.dataAttribute,
	() => {
		unbindAnchorListeners();
		resolveAnchors();
		bindAnchorListeners();
		handleScroll();
	},
);
</script>

<template>
	<div
		ref="selfRef"
		data-slot="scrollspy"
		:class="cn(props.class)"
	>
		<slot />
	</div>
</template>
