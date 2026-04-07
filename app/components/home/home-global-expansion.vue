<script setup lang="ts">
import { Motion } from "motion-v";
import HomeServeGlobeAnimated from "@/components/icons/animated/home-serve-globe-animated.vue";

type WhoServeCardVariant = "light" | "dark";

type WhoServeCard = {
	title: string;
	description: string;
	lineColor: string;
	variant: WhoServeCardVariant;
};

const whoWeServeCards: WhoServeCard[] = [
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
		variant: "light",
	},
	{
		title: "Enterprise & Performance Teams",
		description:
			"Infrastructure that never sleeps. Stability and compliance for mission-critical advertising operations.",
		lineColor: "#FF5A52",
		variant: "light",
	},
];
</script>

<template>
	<section class="who-we-serve-section relative overflow-hidden bg-(--who-bg) pt-16 pb-8 lg:min-h-[589px] lg:pt-[80px] lg:pb-0">
		<div class="pointer-events-none absolute inset-x-0 -bottom-40 z-0 h-auto overflow-hidden">
			<HomeServeGlobeAnimated />
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

			<div class="mx-auto mt-10 grid max-w-[1120px] gap-6 lg:mt-[88px] lg:grid-cols-3 lg:gap-8 lg:pb-37">
				<Motion
					v-for="(card, index) in whoWeServeCards"
					:key="card.title"
					as="div"
					class="h-full min-h-0"
					:initial="{ opacity: 0, y: 32 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:in-view-options="{ once: true, amount: 0.2 }"
					:transition="{
						duration: 0.7,
						delay: index * 0.15,
						ease: [0.16, 1, 0.3, 1],
					}"
				>
					<article
						class="who-serve-card group flex h-full cursor-default flex-col rounded-2xl border p-8 lg:min-h-[308px] lg:p-12"
						:class="card.variant === 'dark' ? 'who-serve-card--dark' : 'who-serve-card--light'"
					>
						<div
							class="who-serve-card-line h-[5px] w-[35px] shrink-0 rounded-full"
							:style="{ backgroundColor: card.lineColor }"
						/>
						<h3
							class="who-serve-card-title mt-10 text-[30px] leading-[1.2] font-medium lg:text-[32px]"
							:class="card.variant === 'dark' ? 'text-(--who-card-dark-text)' : 'text-(--who-card-text)'"
						>
							{{ card.title }}
						</h3>
						<p
							class="mt-6 text-lg leading-[1.45]"
							:class="card.variant === 'dark' ? 'text-(--who-card-dark-muted)' : 'text-(--who-card-muted)'"
						>
							{{ card.description }}
						</p>
					</article>
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

/* Ported from legacy BuiltForTeams.vue — card hover + accent line */
.who-serve-card {
	transition:
		background-color 0.45s cubic-bezier(0.16, 1, 0.3, 1),
		border-color 0.45s ease,
		transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
		box-shadow 0.35s ease;
}

.who-serve-card--light {
	border-color: var(--who-card-border);
	background-color: var(--who-card-bg);
	color: var(--who-card-text);
}

.who-serve-card--light:hover {
	background-color: var(--who-card-dark-bg);
	border-color: rgba(255, 255, 255, 0.15);
	transform: translateY(-6px);
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.who-serve-card--dark {
	border-color: rgba(255, 255, 255, 0.2);
	background-color: var(--who-card-dark-bg);
	color: var(--who-card-dark-text);
}

.who-serve-card--dark:hover {
	transform: translateY(-6px);
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
	border-color: rgba(255, 255, 255, 0.3);
}

.who-serve-card-line {
	transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.who-serve-card:hover .who-serve-card-line {
	width: 100%;
}

.who-serve-card-title {
	transition: color 0.4s ease;
}

.who-serve-card--light:hover .who-serve-card-title {
	color: #ffffff;
}
</style>
