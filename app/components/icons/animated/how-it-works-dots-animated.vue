<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useId } from "vue";
import { useMediaQuery, useIntersectionObserver } from "@vueuse/core";
import { Motion } from "motion-v";
import { HOW_IT_WORKS_DOTS_PATH_D } from "./how-it-works-dots-path-d";

const idSuffix = useId().replace(/[^a-zA-Z0-9_-]/g, "") || "dots";
const paintId = `how-it-works-paint-${idSuffix}`;
const clipId = `how-it-works-clip-${idSuffix}`;

const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
const rootEl = ref<SVGSVGElement | null>(null);
const parallaxWrapRef = ref<HTMLElement | null>(null);
const inView = ref(false);

/** Smoothed translate (px) applied to the texture group */
const parallaxTx = ref(0);
const parallaxTy = ref(0);

const MAX_PARALLAX = 11;
const LERP = 0.14;

let parallaxRaf = 0;
let targetTx = 0;
let targetTy = 0;
let smoothTx = 0;
let smoothTy = 0;

useIntersectionObserver(
	rootEl,
	(entries) => {
		const e = entries[0];
		if (e?.isIntersecting) inView.value = true;
	},
	{ threshold: 0.12, rootMargin: "40px 0px" },
);

const shouldPlay = computed(() => prefersReducedMotion.value || inView.value);

const fadeHidden = computed(() =>
	prefersReducedMotion.value ? { opacity: 1 } : { opacity: 0 },
);

const fadeVisible = { opacity: 1 };

function fadeTransition() {
	if (prefersReducedMotion.value) {
		return { duration: 0 };
	}
	return {
		duration: 0.85,
		ease: [0.42, 0, 0.58, 1] as const,
	};
}

function onWindowMouseMove(e: MouseEvent) {
	if (prefersReducedMotion.value) {
		targetTx = 0;
		targetTy = 0;
		return;
	}

	const wrap = parallaxWrapRef.value;
	if (!wrap) return;

	const r = wrap.getBoundingClientRect();
	if (
		e.clientX < r.left
		|| e.clientX > r.right
		|| e.clientY < r.top
		|| e.clientY > r.bottom
	) {
		targetTx = 0;
		targetTy = 0;
		return;
	}

	const cx = r.left + r.width / 2;
	const cy = r.top + r.height / 2;
	const halfW = Math.max(r.width / 2, 1);
	const halfH = Math.max(r.height / 2, 1);
	const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / halfW));
	const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / halfH));
	targetTx = nx * MAX_PARALLAX;
	targetTy = ny * MAX_PARALLAX;
}

function parallaxTick() {
	parallaxRaf = requestAnimationFrame(parallaxTick);

	if (prefersReducedMotion.value) {
		targetTx = 0;
		targetTy = 0;
		smoothTx = 0;
		smoothTy = 0;
		parallaxTx.value = 0;
		parallaxTy.value = 0;
		return;
	}

	smoothTx += (targetTx - smoothTx) * LERP;
	smoothTy += (targetTy - smoothTy) * LERP;
	parallaxTx.value = smoothTx;
	parallaxTy.value = smoothTy;
}

onMounted(() => {
	if (!import.meta.client) return;
	window.addEventListener("mousemove", onWindowMouseMove, { passive: true });
	parallaxRaf = requestAnimationFrame(parallaxTick);
});

onUnmounted(() => {
	if (!import.meta.client) return;
	window.removeEventListener("mousemove", onWindowMouseMove);
	cancelAnimationFrame(parallaxRaf);
});
</script>

<template>
	<div
		ref="parallaxWrapRef"
		class="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
		aria-hidden="true"
	>
		<svg
			ref="rootEl"
			role="presentation"
			aria-hidden="true"
			width="1140"
			height="480"
			viewBox="0 0 1140 480"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="absolute inset-x-0 bottom-0 block h-auto w-full max-w-none select-none"
		>
			<defs>
				<linearGradient
					:id="paintId"
					x1="-52"
					y1="584"
					x2="361.001"
					y2="118.001"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#ADBDCD" />
					<stop
						offset="1"
						stop-color="#F7F9FB"
					/>
				</linearGradient>
				<clipPath :id="clipId">
					<rect
						width="1140"
						height="480"
						rx="32"
						fill="white"
					/>
				</clipPath>
			</defs>
			<g :clip-path="`url(#${clipId})`">
				<g
					:style="{
						transform: `translate(${parallaxTx}px, ${parallaxTy}px)`,
					}"
				>
					<Motion
						as="path"
						:d="HOW_IT_WORKS_DOTS_PATH_D"
						:fill="`url(#${paintId})`"
						:initial="fadeHidden"
						:animate="shouldPlay ? fadeVisible : fadeHidden"
						:transition="fadeTransition()"
					/>
				</g>
			</g>
		</svg>
	</div>
</template>
