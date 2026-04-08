<template>
	<section class="bg-surface-green py-10 lg:py-14">
		<div class="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-[100px]">
			<!-- Header -->
			<div class="mb-10 flex flex-col items-center gap-5 lg:mb-[70px] lg:gap-8">
				<span class="border-text-gray-darker rounded-rounded text-text-gray-light inline-flex items-center border px-4 py-2 text-xs font-medium tracking-[2.24px] lg:px-6 lg:py-3 lg:text-sm">
					GLOBAL AUTHORITY
				</span>
				<h2 class="text-center text-[28px] leading-[36px] font-medium md:text-[36px] md:leading-[44px] lg:text-[48px] lg:leading-[56px]">
					<span class="text-white">Numbers </span>
					<span class="text-accent-orange">That Speak for Themselves</span>
				</h2>
			</div>

			<!-- Stats -->
			<div class="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-4">
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
						class="text-[40px] leading-normal font-black text-white md:text-[52px] lg:text-[64px]"
					/>
					<span class="text-center text-lg leading-7 font-medium text-white/80 lg:text-2xl lg:leading-8">{{ stat.label }}</span>
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
