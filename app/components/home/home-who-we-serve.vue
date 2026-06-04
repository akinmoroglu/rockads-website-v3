<script setup lang="ts">
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
	<section class="bg-[#070f1d] py-20 text-white lg:py-24">
		<div class="mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-12 xl:px-[160px]">

			<span class="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
				WHO WE SERVE
			</span>

			<h2 class="mt-5 max-w-[560px] text-[28px] font-medium leading-[1.2] text-white md:text-[36px] lg:text-[44px] lg:leading-[1.15]">
				For the ones ready to grow without limits.
			</h2>

			<div class="mt-12 grid grid-cols-1 gap-px border border-white/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
				<div
					v-for="segment in segments"
					:key="segment.id"
					class="flex flex-col gap-4 border-white/10 bg-white/[0.03] p-8 lg:p-10"
				>
					<h3 class="text-[17px] font-semibold leading-snug text-white lg:text-[18px]">
						{{ segment.title }}
					</h3>
					<p class="text-[14px] leading-[1.7] text-white/55 lg:text-[15px]">
						{{ segment.body }}
					</p>
				</div>
			</div>

		</div>
	</section>
</template>
