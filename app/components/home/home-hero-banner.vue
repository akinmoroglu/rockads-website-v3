<script setup lang="ts">
import { useMediaQuery, useMouseInElement } from "@vueuse/core";
import { Motion } from "motion-v";
import { CalendarDays } from "lucide-vue-next";
import PartnerXTwitter from "@/assets/icons/partners/x-twitter.svg";
import PartnerSnapchat from "@/assets/icons/partners/snapchat.svg";
import PartnerTiktok from "@/assets/icons/partners/tiktok.svg";
import PartnerGoogle from "@/assets/icons/partners/google.svg";
import PartnerMeta from "@/assets/icons/partners/meta.svg";

import { computed, ref } from "vue";
import { Button } from "@/components/ui/button";
import leftGlowAsset from "@/assets/images/home/hero/left-glow.svg?url";
import rightGlowAsset from "@/assets/images/home/hero/right-glow.svg?url";

const heroRef = ref<HTMLElement | null>(null);
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
const { elementX, elementY, isOutside } = useMouseInElement(heroRef);

const PARALLAX_STRENGTH = 18;

const leftGlowMouseStyle = computed(() => {
	if (isOutside.value || prefersReducedMotion.value) return {};
	const el = heroRef.value;
	if (!el) return {};
	const cx = el.offsetWidth / 2;
	const cy = el.offsetHeight / 2;
	const dx = (elementX.value - cx) / cx;
	const dy = (elementY.value - cy) / cy;
	return {
		transform: `translate(${-dx * PARALLAX_STRENGTH}px, ${-dy * PARALLAX_STRENGTH * 0.4}px)`,
	};
});

const rightGlowMouseStyle = computed(() => {
	if (isOutside.value || prefersReducedMotion.value) return {};
	const el = heroRef.value;
	if (!el) return {};
	const cx = el.offsetWidth / 2;
	const cy = el.offsetHeight / 2;
	const dx = (elementX.value - cx) / cx;
	const dy = (elementY.value - cy) / cy;
	return {
		transform: `translate(${dx * PARALLAX_STRENGTH}px, ${-dy * PARALLAX_STRENGTH * 0.4}px)`,
	};
});

const partnerIcons = [
	{ component: PartnerXTwitter, label: "X partner" },
	{ component: PartnerSnapchat, label: "Snapchat partner" },
	{ component: PartnerTiktok, label: "TikTok partner" },
	{ component: PartnerGoogle, label: "Google partner" },
	{ component: PartnerMeta, label: "Meta partner" },
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
		class="hero-section relative flex min-h-screen flex-col overflow-hidden lg:h-full lg:max-h-screen"
	>
		<!-- Left glow -->
		<div
			class="pointer-events-none absolute left-0 top-0 z-0 h-full w-[48%] origin-left transition-transform duration-700 ease-out"
			:style="leftGlowMouseStyle"
			aria-hidden="true"
		>
			<img
				:src="leftGlowAsset"
				class="h-full w-full object-cover object-right"
				alt=""
			>
		</div>

		<!-- Right glow -->
		<div
			class="pointer-events-none absolute right-0 top-0 z-0 h-full w-[48%] origin-right transition-transform duration-700 ease-out"
			:style="rightGlowMouseStyle"
			aria-hidden="true"
		>
			<img
				:src="rightGlowAsset"
				class="h-full w-full object-cover object-left"
				alt=""
			>
		</div>

		<div class="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-5 pt-(--marketing-header-height) lg:px-12 lg:pt-(--marketing-header-height-lg)">
			<Motion
				as="p"
				class="text-xs font-medium tracking-[0.2em] text-white/40"
				:initial="{ opacity: 0, y: 12 }"
				:animate="{ opacity: 1, y: 0 }"
				:transition="{ duration: 0.45, ease: 'easeOut' }"
			>
				Connected, stable, <span class="italic">limitless.</span>
			</Motion>

			<Motion
				as="h1"
				class="mt-5 text-center text-[36px] leading-[1.1] font-extrabold tracking-[-0.03em] text-[#99CBF3] sm:mt-6 sm:text-[54px] sm:leading-[1.05] lg:text-[72px]"
				:initial="{ opacity: 0, y: 18 }"
				:animate="{ opacity: 1, y: 0 }"
				:transition="{ duration: 0.55, delay: 0.1, ease: 'easeOut' }"
			>
				Grow without limits.
			</Motion>

			<Motion
				as="p"
				class="mt-4 max-w-[640px] text-center text-[15px] leading-6 text-white/80 sm:mt-5 sm:max-w-[760px] sm:text-[17px] sm:leading-7 lg:text-[20px] lg:leading-8"
				:initial="{ opacity: 0, y: 14 }"
				:animate="{ opacity: 1, y: 0 }"
				:transition="{ duration: 0.55, delay: 0.16, ease: 'easeOut' }"
			>
				Start advertising on every major platform today.<br />Stay live, stay compliant, scale without a ceiling.<br />All of it, already in place.
			</Motion>

			<Motion
				as="div"
				class="mt-7 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:gap-4"
				:initial="{ opacity: 0, y: 14, scale: 0.98 }"
				:animate="{ opacity: 1, y: 0, scale: 1 }"
				:transition="{ duration: 0.5, delay: 0.26, ease: 'easeOut' }"
			>
				<Button as-child variant="outline" class="border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white">
					<NuxtLink
						to="/contact-us"
						class="px-6! py-[14px] sm:px-10! sm:py-6"
					>
						<CalendarDays class="size-5" />
						Talk to Our Team
					</NuxtLink>
				</Button>
				<Button as-child>
					<NuxtLink
						to="/services/tech"
						class="px-6! py-[14px] sm:px-10! sm:py-6"
					>
						Explore Features
					</NuxtLink>
				</Button>
			</Motion>
		</div>

		<div class="relative w-full py-8">
			<div class="flex flex-col items-center gap-4 pt-4 pb-2 lg:pt-14 lg:pb-4">
				<p class="text-center text-xs tracking-[0.02em] text-white/40">
					OFFICIAL PLATFORM PARTNERS
				</p>
				<div class="flex w-full max-w-[560px] items-center justify-between sm:max-w-[680px]">
					<Motion
						v-for="(icon, index) in partnerIcons"
						:key="icon.label"
						as="div"
						:aria-label="icon.label"
						role="img"
						class="flex size-8 items-center justify-center"
						:initial="{ opacity: 0, y: 8 }"
						:animate="{ opacity: 1, y: 0 }"
						:transition="{ duration: 0.45, delay: 0.3 + (index * 0.08), ease: 'easeOut' }"
					>
						<img
							:src="icon.component"
							class="size-full"
							aria-hidden="true"
						>
					</Motion>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.hero-section {
	background: linear-gradient(to bottom, #060a14 0%, #02123e 100%);
}
</style>
