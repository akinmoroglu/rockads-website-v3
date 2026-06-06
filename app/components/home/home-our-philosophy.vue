<script setup lang="ts">
import { Motion } from "motion-v";

const items = [
	{
		id: "access",
		number: "01",
		title: "Start advertising everywhere. Now.",
		body: "Connect Meta, TikTok, Google, Snapchat, and X from day one. No setup friction. No waiting. Go live.",
	},
	{
		id: "live",
		number: "02",
		title: "Always on, always running.",
		body: "Years inside these platforms taught us what keeps business live. That experience is now part of every system we operate. Keeping your business running. Every day.",
	},
	{
		id: "ceiling",
		number: "03",
		title: "Room to scale. No limits.",
		body: "Spend more. New markets. Faster growth. Whatever was holding you back, the path forward is already cleared.",
	},
];
</script>

<template>
	<section class="relative bg-gradient-to-b from-[#02123e] to-[#060a14] pt-24 text-white lg:pt-32">
		<!-- Subtle background decoration -->
		<div class="pointer-events-none absolute left-0 top-0 z-0 h-full w-full opacity-60">
			<div class="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"></div>
			<div class="absolute bottom-0 right-1/4 h-[600px] w-[600px] translate-x-1/2 translate-y-1/3 rounded-full bg-[#99CBF3]/10 blur-[150px]"></div>
		</div>

		<div class="relative z-20 mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-12 xl:px-[160px]">
			
			<div class="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24 xl:grid-cols-[1fr_1.3fr]">
				
				<!-- Left: Sticky Context -->
				<div class="relative h-full pt-[15vh] lg:pt-[25vh] lg:pb-[max(320px,35vh)]">
					<div class="lg:sticky lg:top-[calc(50vh-120px)]">
						<Motion
							as="h2"
							class="text-[34px] font-semibold leading-[1.15] tracking-tight text-white md:text-[42px] lg:text-[48px]"
							:initial="{ opacity: 0, y: 16 }"
							:while-in-view="{ opacity: 1, y: 0 }"
							:in-view-options="{ once: true, amount: 0.4 }"
							:transition="{ duration: 0.5, delay: 0.1, ease: 'easeOut' }"
						>
							Launch instantly. <br class="hidden md:block" />
							Stay live. <br class="hidden md:block" />
							Scale infinitely.
						</Motion>
						<Motion
							as="p"
							class="mt-6 max-w-[480px] text-[17px] leading-relaxed text-white/70 md:text-[19px]"
							:initial="{ opacity: 0, y: 16 }"
							:while-in-view="{ opacity: 1, y: 0 }"
							:in-view-options="{ once: true, amount: 0.4 }"
							:transition="{ duration: 0.5, delay: 0.2, ease: 'easeOut' }"
						>
							Our infrastructure isn't just a set of features. It's a continuous, unstoppable engine designed to push your business past every plateau.
						</Motion>
					</div>
				</div>

				<!-- Right: The Editorial List -->
				<div class="relative flex flex-col gap-24 pb-16 lg:pb-32">
					<Motion
						v-for="(item, index) in items"
						:key="item.id"
						as="div"
						class="relative flex flex-col"
						:initial="{ opacity: 0, y: 30 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:in-view-options="{ once: true, amount: 0.4 }"
						:transition="{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }"
					>
						<!-- Massive background number watermark -->
						<div class="absolute -left-4 -top-8 select-none text-[120px] font-bold leading-none tracking-tighter text-white/[0.04] md:-left-8 md:-top-12 md:text-[180px]">
							{{ item.number }}
						</div>

						<!-- Content -->
						<div class="relative z-10 flex flex-col pt-4 md:pt-6">
							<h3 class="text-[24px] font-semibold tracking-tight text-white md:text-[32px]">
								{{ item.title }}
							</h3>
							<p class="mt-4 max-w-[560px] text-[17px] leading-[1.8] text-white/60 md:text-[19px]">
								{{ item.body }}
							</p>
						</div>
					</Motion>
				</div>

			</div>

		</div>

	</section>
</template>
