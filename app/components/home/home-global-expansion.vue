<script setup lang="ts">
import { Motion } from "motion-v";
import serveGlobeAsset from "@/assets/images/home/serve/serve-globe.svg?url";

const whoWeServeCards = [
	{
		title: "E-Commerce Brands",
		description:
			"Scale without a ceiling. For founders and growth leads ready to move fast across global markets.",
		lineColor: "#0E82FF",
		variant: "light",
	},
	{
		title: "Digital Agencies",
		description:
			"One dashboard. Unlimited clients. Automate the operational layer so your team can focus entirely on strategy.",
		lineColor: "#E8D500",
		variant: "dark",
	},
	{
		title: "Enterprise & Performance Teams",
		description:
			"Infrastructure that never sleeps. Stability and compliance for mission-critical advertising operations.",
		lineColor: "#FF5A52",
		variant: "light",
	},
] as const;
</script>

<template>
	<section class="who-we-serve-section relative overflow-hidden bg-(--who-bg) pt-16 pb-8 lg:min-h-[589px] lg:pt-[80px] lg:pb-0">
		<div class="pointer-events-none absolute inset-x-0 -bottom-40 z-0 h-auto overflow-hidden">
			<img
				:src="serveGlobeAsset"
				alt=""
				aria-hidden="true"
				class="h-full w-full object-cover object-bottom opacity-65"
			>
		</div>

		<div class="relative z-10 mx-auto w-full max-w-[1240px] px-5 lg:px-12">
			<Motion
				as="div"
				class="mx-auto flex max-w-[660px] flex-col items-center gap-6 text-center"
				:initial="{ opacity: 0, y: 16 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: false, amount: 0.5 }"
				:transition="{ duration: 0.6, ease: 'easeOut' }"
			>
				<span
					class="inline-flex rounded-full border border-(--who-pill-border) bg-(--who-pill-bg) px-6 py-3 text-sm font-medium tracking-[0.16em] text-(--who-pill-text)"
				>
					WHO WE SERVE
				</span>
				<h2 class="text-[38px] leading-[1.15] font-medium tracking-[-0.02em] text-(--who-title) sm:text-[44px] lg:text-[48px]">
					Built for Ambitious <span class="text-primary">Teams</span>
				</h2>
			</Motion>

			<div class="mx-auto mt-10 grid max-w-[1120px] gap-6 lg:mt-[88px] lg:grid-cols-3 lg:gap-8">
				<Motion
					v-for="(card, index) in whoWeServeCards"
					:key="card.title"
					as="article"
					class="rounded-2xl border p-8 lg:min-h-[308px] lg:p-12"
					:class="card.variant === 'dark'
						? 'border-white/20 bg-(--who-card-dark-bg) text-(--who-card-dark-text)'
						: 'border-(--who-card-border) bg-(--who-card-bg) text-(--who-card-text)'"
					:initial="{ opacity: 0, y: 20 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:in-view-options="{ once: false, amount: 0.35 }"
					:transition="{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }"
				>
					<div
						class="h-[4px] w-9 rounded-full"
						:style="{ backgroundColor: card.lineColor }"
					/>
					<h3 class="mt-10 text-[30px] leading-[1.2] font-medium lg:text-[32px]">
						{{ card.title }}
					</h3>
					<p
						class="mt-6 text-lg leading-[1.45]"
						:class="card.variant === 'dark' ? 'text-(--who-card-dark-muted)' : 'text-(--who-card-muted)'"
					>
						{{ card.description }}
					</p>
				</Motion>
			</div>
		</div>
	</section>
</template>

<style scoped>
.who-we-serve-section {
	--who-bg: #f7f9fb;
	--who-title: #151b26;
	--who-pill-border: #cce5f9;
	--who-pill-bg: #ffffff;
	--who-pill-text: #9fa6bb;
	--who-card-bg: #ffffff;
	--who-card-border: #cce5f9;
	--who-card-text: #151b26;
	--who-card-muted: #9fa6bb;
	--who-card-dark-bg: #10151e;
	--who-card-dark-text: #ffffff;
	--who-card-dark-muted: #9fa6bb;
}
</style>
