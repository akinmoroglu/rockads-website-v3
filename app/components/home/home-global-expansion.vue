<script setup lang="ts">
import { Motion } from "motion-v";
import HomeServeGlobeAnimated from "@/components/icons/animated/home-serve-globe-animated.vue";

type WhoServeItem = {
	title: string;
	description: string;
	lineColor: string;
};

const items: WhoServeItem[] = [
	{
		title: "E-Commerce Brands",
		description: "Multi-platform from day one. Without the operational drag that usually comes with it.",
		lineColor: "#0E82FF",
	},
	{
		title: "Digital Agencies",
		description: "Consistent delivery across every platform, for every client, at any volume.",
		lineColor: "#E8D500",
	},
	{
		title: "Enterprise & Performance Teams",
		description: "The financial infrastructure and platform access that serious scale actually requires.",
		lineColor: "#FF5A52",
	},
];
</script>

<template>
	<section class="who-we-serve-section relative overflow-hidden py-20 lg:py-24">

		<!-- Globe background -->
		<div class="pointer-events-none absolute inset-x-0 -bottom-20 z-0 overflow-hidden opacity-30">
			<HomeServeGlobeAnimated />
		</div>

		<div class="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-12 xl:px-[160px]">

			<!-- Header -->
			<Motion
				as="div"
				class="mb-12 lg:mb-16"
				:initial="{ opacity: 0, y: 16 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.4 }"
				:transition="{ duration: 0.55, ease: 'easeOut' }"
			>
				<span class="text-xs font-medium tracking-[0.2em] text-foreground/40 uppercase">
					WHO WE SERVE
				</span>
				<h2 class="mt-3 max-w-[520px] text-[28px] leading-[1.2] font-medium text-[#151b26] md:text-[36px] lg:text-[44px] lg:leading-[1.15]">
					Built for brands that are done being limited.
				</h2>
			</Motion>

			<!-- Three columns -->
			<div class="grid grid-cols-1 divide-y divide-foreground/10 md:grid-cols-3 md:divide-x md:divide-y-0">
				<Motion
					v-for="(item, index) in items"
					:key="item.title"
					as="div"
					class="flex flex-col gap-6 py-10
					       first:md:pr-10 [&:not(:first-child)]:md:px-10 last:md:pr-0 last:md:pl-10
					       md:py-0 md:pt-8"
					:initial="{ opacity: 0, y: 24 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:in-view-options="{ once: true, amount: 0.2 }"
					:transition="{
						duration: 0.6,
						delay: index * 0.1,
						ease: [0.16, 1, 0.3, 1],
					}"
				>
					<!-- Colored accent line -->
					<div
						class="h-[4px] w-10 rounded-full"
						:style="{ backgroundColor: item.lineColor }"
					/>

					<!-- Title -->
					<h3 class="text-[24px] font-medium leading-[1.2] text-[#151b26] lg:text-[28px]">
						{{ item.title }}
					</h3>

					<!-- Description -->
					<p class="text-[15px] leading-[1.7] text-foreground/60">
						{{ item.description }}
					</p>
				</Motion>
			</div>

		</div>
	</section>
</template>

<style scoped>
.who-we-serve-section {
	background-color: #f7f9fb;
}
</style>
