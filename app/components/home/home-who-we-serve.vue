<script setup lang="ts">
import { ref } from "vue";
import { Motion } from "motion-v";

const segments = [
	{
		id: "ecommerce",
		title: "E-Commerce Brands",
		body: "Every major platform. Live from day one. No setup delays. No operational friction.",
		color: "#0a4d9e", // Deep Meta Blue
	},
	{
		id: "agencies",
		title: "Digital Agencies",
		body: "One infrastructure. Every client. Every platform. Results that hold, at any volume.",
		color: "#25064c", // Deep Purple
	},
	{
		id: "gaming",
		title: "Gaming & Apps",
		body: "The speed and scale user acquisition demands, across every major platform, from day one.",
		color: "#0f5d28", // Deep Green
	},
	{
		id: "enterprise",
		title: "Enterprise Teams",
		body: "Large budgets, multiple markets, multiple platforms. The infrastructure to run it all without friction.",
		color: "#003f7a", // Corporate Navy
	},
];

const activeAccordion = ref(0);
</script>

<template>
	<section class="bg-white py-20 lg:py-32">
		<div class="mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-12 xl:px-[160px]">

			<Motion
				as="h2"
				class="max-w-[640px] text-[36px] font-medium leading-[1.1] text-[#060a14] md:text-[48px] lg:text-[64px]"
				:initial="{ opacity: 0, y: 14 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.4 }"
				:transition="{ duration: 0.5, ease: 'easeOut' }"
			>
				For the ones ready to grow without limits.
			</Motion>

			<!-- Mobile (Vertical Accordion) -->
			<div class="mt-12 flex flex-col gap-3 lg:hidden">
				<div
					v-for="(segment, index) in segments"
					:key="'mobile-' + segment.id"
					class="relative cursor-pointer overflow-hidden rounded-2xl bg-[#060a14] p-6 text-white transition-all duration-500"
					@click="activeAccordion = index"
				>
					<div
						class="absolute inset-0 transition-opacity duration-700"
						:style="{ opacity: activeAccordion === index ? 0.8 : 0.3, background: `linear-gradient(135deg, #060a14 0%, ${segment.color} 100%)` }"
					></div>

					<div class="relative z-10">
						<h3 class="text-[20px] font-bold">{{ segment.title }}</h3>
						<div
							class="overflow-hidden transition-all duration-500"
							:style="activeAccordion === index ? 'max-height: 150px; opacity: 1; margin-top: 12px;' : 'max-height: 0px; opacity: 0; margin-top: 0px;'"
						>
							<p class="text-[14px] leading-relaxed text-white/80">{{ segment.body }}</p>
						</div>
					</div>
					<!-- Background watermark -->
					<div class="pointer-events-none absolute -bottom-6 right-2 opacity-[0.06]">
						<span class="text-[120px] font-black leading-none tracking-tighter">0{{ index + 1 }}</span>
					</div>
				</div>
			</div>

			<!-- Desktop (Horizontal Hover Expansion Accordion) -->
			<div class="mt-16 hidden h-[480px] w-full gap-4 lg:flex xl:h-[520px]">
				<Motion
					v-for="(segment, index) in segments"
					:key="segment.id"
					as="div"
					class="accordion-panel group relative cursor-pointer overflow-hidden rounded-[32px] bg-[#060a14] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
					:class="activeAccordion === index ? 'flex-[4]' : 'flex-[1]'"
					@mouseenter="activeAccordion = index"
					:initial="{ opacity: 0, x: 20 }"
					:while-in-view="{ opacity: 1, x: 0 }"
					:in-view-options="{ once: true, amount: 0.1 }"
					:transition="{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }"
				>
					<!-- Custom gradient backgrounds depending on active state -->
					<div
						class="absolute inset-0 transition-opacity duration-700"
						:style="{ opacity: activeAccordion === index ? 1 : 0.4, background: `linear-gradient(135deg, #060a14 0%, ${segment.color} 100%)` }"
					></div>

					<!-- Inactive state (rotated text) -->
					<div
						class="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
						:class="activeAccordion === index ? 'pointer-events-none opacity-0' : 'opacity-100'"
					>
						<span class="whitespace-nowrap -rotate-90 text-[18px] font-semibold tracking-wider text-white/40 transition-colors duration-300 group-hover:text-white">
							{{ segment.title }}
						</span>
					</div>

					<!-- Active state (expanded content) -->
					<div
						class="absolute inset-0 flex flex-col justify-end p-10 transition-all duration-700 xl:p-12"
						:class="activeAccordion === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
					>
						<!-- Massive background watermark number -->
						<div class="pointer-events-none absolute right-4 top-4 opacity-[0.03]">
							<span class="text-[340px] font-black leading-none tracking-tighter text-white">0{{ index + 1 }}</span>
						</div>

						<div class="relative z-10 max-w-[400px]">
							<h3 class="text-[32px] font-bold leading-tight text-white xl:text-[40px]">{{ segment.title }}</h3>
							<p class="mt-4 text-[16px] leading-relaxed text-white/70 xl:text-[18px]">
								{{ segment.body }}
							</p>
						</div>
					</div>

				</Motion>
			</div>

		</div>
	</section>
</template>

<style scoped>
.accordion-panel {
	transform-origin: center center;
}
</style>
