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
	{ numericValue: 2020, from: 1990, suffix: "", label: "Founded", duration: 2, delay: 0 },
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
		class="numbers-stats-section py-14 text-white lg:py-[56px]"
		aria-labelledby="numbers-stats-heading"
	>
		<div class="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-5 md:px-10 lg:gap-[70px] lg:px-12 xl:px-[100px]">
			<Motion
				as="div"
				class="flex max-w-[900px] flex-col items-center gap-6 text-center lg:gap-8"
				:initial="{ opacity: 0, y: 16 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.35 }"
				:transition="{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }"
			>
				<span
					class="inline-flex items-center rounded-full border border-(--numbers-pill-border) px-4 py-2 text-xs font-medium tracking-[2.24px] text-(--numbers-pill-text) lg:px-6 lg:py-3 lg:text-sm"
				>
					GLOBAL AUTHORITY
				</span>
				<h2
					id="numbers-stats-heading"
					class="text-[28px] leading-[36px] font-medium tracking-[-0.02em] md:text-[36px] md:leading-[44px] lg:text-[48px] lg:leading-[56px]"
				>
					<span class="text-white">Numbers</span>
					<span class="text-(--numbers-heading-accent)"> That Speak for Themselves</span>
				</h2>
			</Motion>

			<div
				class="grid w-full max-w-[1244px] grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-4"
				role="list"
			>
				<Motion
					v-for="(stat, index) in stats"
					:key="stat.label"
					as="div"
					class="flex flex-col items-center text-center"
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
					<span
						class="text-[40px] leading-none font-black text-white md:text-[52px] lg:text-[64px]"
					>
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
					<span
						class="mt-1 max-w-min text-lg leading-7 font-medium text-white/80 lg:mt-0 lg:text-2xl lg:leading-8"
					>
						{{ stat.label }}
					</span>
				</Motion>
			</div>
		</div>
	</section>
</template>

<style scoped>
.numbers-stats-section {
	--numbers-bg: #0a2c27;
	--numbers-pill-border: #4b5061;
	--numbers-pill-text: #9fa6bb;
	--numbers-heading-accent: #f6ca9a;
	background-color: var(--numbers-bg);
}
</style>
