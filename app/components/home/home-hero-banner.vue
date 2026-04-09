<script setup lang="ts">
import { useMediaQuery, useMouseInElement } from "@vueuse/core";
import { Motion } from "motion-v";
import { CalendarDays } from "lucide-vue-next";
import {
	IconBrandGoogle,
	IconBrandMeta,
	IconBrandSnapchat,
	IconBrandTiktok,
	IconBrandX,
} from "@tabler/icons-vue";
import { computed, ref } from "vue";
import { Button } from "@/components/ui/button";
import leftGlowAsset from "@/assets/images/home/hero/left-glow.svg?url";
import rightGlowAsset from "@/assets/images/home/hero/right-glow.svg?url";

const heroRef = ref<HTMLElement | null>(null);
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
const { elementX, elementY, elementWidth, elementHeight, isOutside } = useMouseInElement(heroRef);

/** Max parallax shift in px when cursor is at hero edge */
const PARALLAX_STRENGTH = 48;

const glowMouseOffsets = computed(() => {
	if (prefersReducedMotion.value || isOutside.value) {
		return { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } };
	}
	const w = elementWidth.value;
	const h = elementHeight.value;

	if (w <= 0 || h <= 0) {
		return { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } };
	}
	const nx = (elementX.value / w) * 2 - 1;
	const ny = (elementY.value / h) * 2 - 1;

	return {
		left: {
			x: nx * PARALLAX_STRENGTH * 0.9,
			y: ny * PARALLAX_STRENGTH * 0.55,
		},
		right: {
			x: nx * PARALLAX_STRENGTH * -0.75,
			y: ny * PARALLAX_STRENGTH * 0.5,
		},
	};
});

const leftGlowMouseStyle = computed(() => ({
	transform: `translate3d(${glowMouseOffsets.value.left.x}px, ${glowMouseOffsets.value.left.y}px, 0)`,
}));

const rightGlowMouseStyle = computed(() => ({
	transform: `translate3d(${glowMouseOffsets.value.right.x}px, ${glowMouseOffsets.value.right.y}px, 0)`,
}));

const partnerIcons = [
	{ component: IconBrandX, label: "X partner" },
	{ component: IconBrandSnapchat, label: "Snapchat partner" },
	{ component: IconBrandTiktok, label: "TikTok partner" },
	{ component: IconBrandGoogle, label: "Google partner" },
	{ component: IconBrandMeta, label: "Meta partner" },
];

const { setHeaderTransparent } = useMarketingHeaderAppearance();

onMounted(() => {
	setHeaderTransparent(true);
});

onUnmounted(() => {
	setHeaderTransparent(false);
});
</script>

<template>
	<section
		ref="heroRef"
		class="relative h-full max-h-screen overflow-hidden bg-linear-to-b from-black to-[#02123e]"
	>
		<div class="absolute inset-0 bg-size-[22px_22px] opacity-8" />

		<Motion
			as="div"
			aria-hidden="true"
			class="pointer-events-none absolute top-[clamp(0.25rem,1.2vh,0.5rem)] left-[clamp(-26rem,-30vw,-10rem)] z-1 hidden h-[min(970px,92vh)] w-[min(920px,92vw)] lg:block"
			:initial="{ opacity: 0, x: -180 }"
			:animate="{ opacity: 1, x: 0 }"
			:transition="{ duration: 1.1, ease: 'easeOut' }"
		>
			<Motion
				as="div"
				class="h-full w-full"
				:animate="{ opacity: [0.88, 0.96, 0.88], x: [0, 6, 0], y: [10, -8, 10] }"
				:transition="{ duration: 6.2, delay: 1.1, repeat: Infinity, ease: 'easeInOut' }"
			>
				<div
					class="h-full w-full will-change-transform"
					:style="leftGlowMouseStyle"
				>
					<img
						:src="leftGlowAsset"
						alt=""
						aria-hidden="true"
						class="h-full w-full object-contain brightness-120 saturate-125 filter-[drop-shadow(0_0_28px_rgba(18,131,255,0.24))]"
					>
				</div>
			</Motion>
		</Motion>

		<Motion
			as="div"
			aria-hidden="true"
			class="pointer-events-none absolute top-[clamp(-6.625rem,-9vh,-2.5rem)] right-[clamp(-26rem,-30vw,-10rem)] z-1 hidden h-[min(970px,92vh)] w-[min(920px,92vw)] lg:block"
			:initial="{ opacity: 0, x: 180 }"
			:animate="{ opacity: 1, x: 0 }"
			:transition="{ duration: 1.1, ease: 'easeOut' }"
		>
			<Motion
				as="div"
				class="h-full w-full"
				:animate="{ opacity: [0.88, 0.96, 0.88], x: [0, -6, 0], y: [-10, 8, -10] }"
				:transition="{ duration: 6.6, delay: 1.1, repeat: Infinity, ease: 'easeInOut' }"
			>
				<div
					class="h-full w-full will-change-transform"
					:style="rightGlowMouseStyle"
				>
					<img
						:src="rightGlowAsset"
						alt=""
						aria-hidden="true"
						class="h-full w-full object-contain brightness-120 saturate-125 filter-[drop-shadow(0_0_28px_rgba(18,131,255,0.24))]"
					>
				</div>
			</Motion>
		</Motion>

		<div class="relative z-10 mx-auto flex min-h-[860px] w-full max-w-[1440px] flex-col items-center px-5 pt-[132px] pb-8 lg:min-h-[900px] lg:px-12 lg:pt-[160px]">
			<Motion
				as="div"
				class="rounded-full border border-[#37A4FF]/35 bg-[#0a75cb]/20 px-3 py-2 text-sm  text-white/90"
				:initial="{ opacity: 0, y: 12 }"
				:animate="{ opacity: 1, y: 0 }"
				:transition="{ duration: 0.45, ease: 'easeOut' }"
			>
				Stable. <span class="italic">Enduring.</span> Limitless.
			</Motion>

			<Motion
				as="h1"
				class="mt-6 text-center text-[46px] leading-[1.05] font-extrabold tracking-[-0.03em] text-[#99CBF3] sm:text-[60px] lg:text-[72px]"
				:initial="{ opacity: 0, y: 18 }"
				:animate="{ opacity: 1, y: 0 }"
				:transition="{ duration: 0.55, delay: 0.1, ease: 'easeOut' }"
			>
				Grow without limits.
			</Motion>

			<Motion
				as="p"
				class="mt-5 max-w-[760px] text-center text-[19px] leading-8 text-white/95 lg:text-[20px]"
				:initial="{ opacity: 0, y: 14 }"
				:animate="{ opacity: 1, y: 0 }"
				:transition="{ duration: 0.55, delay: 0.16, ease: 'easeOut' }"
			>
				Rockads is a cross-border business accelerator; the stable, intelligent, scalable ground upon which the world's
				fastest-growing brands and entrepreneurs build their global operations.
			</Motion>

			<Motion
				as="p"
				class="mt-4 max-w-[760px] text-center text-[19px] leading-8 text-[#747A8E] lg:text-[20px]"
				:initial="{ opacity: 0, y: 12 }"
				:animate="{ opacity: 1, y: 0 }"
				:transition="{ duration: 0.55, delay: 0.22, ease: 'easeOut' }"
			>
				A global growth partner and a next-generation full-stack platform.
			</Motion>

			<Motion
				as="div"
				class="mt-9"
				:initial="{ opacity: 0, y: 14, scale: 0.98 }"
				:animate="{ opacity: 1, y: 0, scale: [0.98, 1, 0.98] }"
				:transition="{ duration: 1.5, delay: 0.26, ease: 'easeInOut' }"
			>
				<Button
					as-child
				>
					<NuxtLink
						to="/contact-us"
						class="px-10! py-6"
					>
						<CalendarDays class="size-5" />
						Book a Call
					</NuxtLink>
				</Button>
			</Motion>
		</div>

		<div class="absolute right-0 bottom-0 left-0 py-8">
			<div class="flex flex-col items-center gap-5 pt-14 pb-4">
				<p class="text-center text-xs  tracking-[0.02em] text-white/95">
					OFFICIAL PLATFORM PARTNERS
				</p>
				<div class="flex items-center gap-4">
					<Motion
						v-for="(icon, index) in partnerIcons"
						:key="icon.label"
						as="div"
						:aria-label="icon.label"
						role="img"
						class="flex size-8 items-center justify-center rounded-full bg-white/10 p-1"
						:initial="{ opacity: 0, y: 8 }"
						:animate="{ opacity: 1, y: 0 }"
						:transition="{ duration: 0.45, delay: 0.3 + (index * 0.08), ease: 'easeOut' }"
					>
						<component
							:is="icon.component"
							class="size-4.5 text-white"
							aria-hidden="true"
							stroke-width="1.8"
						/>
					</Motion>
				</div>
			</div>
		</div>
	</section>
</template>
