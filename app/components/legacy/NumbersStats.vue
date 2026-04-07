<template>
	<section class="bg-surface-green py-10 lg:py-14">
		<div class="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-[100px]">
			<!-- Header -->
			<div class="flex flex-col items-center gap-5 lg:gap-8 mb-10 lg:mb-[70px]">
				<span class="inline-flex items-center px-4 lg:px-6 py-2 lg:py-3 border border-text-gray-darker rounded-rounded text-text-gray-light text-xs lg:text-sm font-medium tracking-[2.24px]">
					GLOBAL AUTHORITY
				</span>
				<h2 class="text-[28px] md:text-[36px] lg:text-[48px] font-medium leading-[36px] md:leading-[44px] lg:leading-[56px] text-center">
					<span class="text-white">Numbers </span>
					<span class="text-accent-orange">That Speak for Themselves</span>
				</h2>
			</div>

			<!-- Stats -->
			<div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
				<div
					v-for="stat in stats"
					:key="stat.label"
					class="flex flex-col items-center"
				>
					<CountUpNumber
						:to="stat.numericValue"
						:from="stat.from"
						:suffix="stat.suffix"
						:duration="stat.duration"
						:delay="stat.delay"
						class="text-[40px] md:text-[52px] lg:text-[64px] font-black text-white leading-normal"
					/>
					<span class="text-lg lg:text-2xl font-medium text-white/80 leading-7 lg:leading-8 text-center">{{ stat.label }}</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const stats = [
	{ numericValue: 2020, from: 1990, suffix: "", label: "Founded", duration: 2, delay: 0 },
	{ numericValue: 400, from: 0, suffix: "+", label: "Active Partners", duration: 2, delay: 0.1 },
	{ numericValue: 150, from: 0, suffix: "+", label: "Countries Served", duration: 2, delay: 0.2 },
	{ numericValue: 5, from: 0, suffix: "", label: "Major Platforms", duration: 1.5, delay: 0.3 },
];
</script>
