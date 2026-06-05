<script setup lang="ts">
import { Motion } from "motion-v";

const segments = [
	{
		id: "ecommerce",
		title: "E-Commerce Brands",
		body: "Every major platform. Live from day one. No setup delays. No operational friction.",
	},
	{
		id: "agencies",
		title: "Digital Agencies",
		body: "One infrastructure. Every client. Every platform. Results that hold, at any volume.",
	},
	{
		id: "gaming",
		title: "Gaming & Apps",
		body: "The speed and scale user acquisition demands, across every major platform, from day one.",
	},
	{
		id: "enterprise",
		title: "Enterprise Teams",
		body: "Large budgets, multiple markets, multiple platforms. The infrastructure to run it all without friction.",
	},
];
</script>

<template>
	<section class="bg-white py-20 text-foreground lg:py-24">
		<div class="mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-12 xl:px-[160px]">

			<Motion
				as="h2"
				class="max-w-[560px] text-[28px] font-medium leading-[1.2] text-foreground md:text-[36px] lg:text-[44px] lg:leading-[1.15]"
				:initial="{ opacity: 0, y: 14 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.4 }"
				:transition="{ duration: 0.5, ease: 'easeOut' }"
			>
				For the ones ready to grow without limits.
			</Motion>

			<div class="mt-12 grid grid-cols-1 gap-px border border-foreground/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
				<Motion
					v-for="(segment, index) in segments"
					:key="segment.id"
					as="div"
					class="flex flex-col gap-4 bg-foreground/[0.03] p-8 lg:p-10"
					:initial="{ opacity: 0, y: 20 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:in-view-options="{ once: true, amount: 0.15 }"
					:transition="{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }"
				>
					<h3 class="text-[17px] font-semibold leading-snug text-foreground lg:text-[18px]">
						{{ segment.title }}
					</h3>
					<p class="text-[14px] leading-[1.7] text-foreground/55 lg:text-[15px]">
						{{ segment.body }}
					</p>
				</Motion>
			</div>

		</div>
	</section>
</template>
