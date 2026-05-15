<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { Motion } from "motion-v";
import CountUpNumber from "@/components/legacy/CountUpNumber.vue";

type Stat = {
	numericValue: number;
	from: number;
	suffix: string;
	label: string;
	duration: number;
	delay: number;
};

const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

const stats: Stat[] = [
	{ numericValue: 2020, from: 2017, suffix: "", label: "In market since", duration: 1.5, delay: 0 },
	{ numericValue: 400, from: 0, suffix: "+", label: "Active Partners", duration: 2, delay: 0.1 },
	{ numericValue: 150, from: 0, suffix: "+", label: "Countries Served", duration: 2, delay: 0.2 },
	{ numericValue: 5, from: 0, suffix: "", label: "Major Platforms", duration: 1.5, delay: 0.3 },
];

function staticStatDisplay(stat: Stat): string {
	return `${stat.numericValue}${stat.suffix}`;
}
</script>

<template>
	<section
		class="numbers-stats-section py-20 text-white lg:py-24"
		aria-labelledby="numbers-stats-heading"
	>
		<div class="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-5 md:px-10 lg:gap-20 lg:px-12 xl:px-[160px]">

			<!-- Brand Investment copy -->
			<Motion
				as="div"
				class="flex flex-col gap-5"
				:initial="{ opacity: 0, y: 16 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.35 }"
				:transition="{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }"
			>
				<span class="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
					CREDENTIALS
				</span>
				<h2
					id="numbers-stats-heading"
					class="max-w-[640px] text-[28px] leading-[1.2] font-medium text-white md:text-[36px] lg:text-[44px] lg:leading-[1.15]"
				>
					Working with us is a positioning decision.
				</h2>
				<p class="max-w-[560px] text-[15px] leading-[1.7] text-white/60">
					Official platform partnerships. Institutional know-how built over years, not months. A team that has been in this ecosystem since before it was crowded.
				</p>
			</Motion>

			<!-- Stats -->
			<div
				class="grid w-full grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-white/10"
				role="list"
			>
				<Motion
					v-for="(stat, index) in stats"
					:key="stat.label"
					as="div"
					class="flex flex-col gap-1 lg:px-10 first:lg:pl-0 last:lg:pr-0"
					role="listitem"
					:initial="{ opacity: 0, y: 20 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:in-view-options="{ once: true, amount: 0.25 }"
					:transition="{
						duration: 0.55,
						delay: index * 0.08,
						ease: [0.16, 1, 0.3, 1],
					}"
				>
					<span class="text-[48px] leading-none font-black text-white lg:text-[64px]">
						<template v-if="prefersReducedMotion">
							{{ staticStatDisplay(stat) }}
						</template>
						<CountUpNumber
							v-else
							:to="stat.numericValue"
							:from="stat.from"
							:suffix="stat.suffix"
							:duration="stat.duration"
							:delay="stat.delay"
						/>
					</span>
					<span class="text-sm font-medium text-white/50 lg:text-base">
						{{ stat.label }}
					</span>
				</Motion>
			</div>

		</div>
	</section>
</template>

<style scoped>
.numbers-stats-section {
	background-color: #070f1d;
}
</style>
