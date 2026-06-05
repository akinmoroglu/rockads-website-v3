<script setup lang="ts">
import { Motion } from "motion-v";
</script>

<template>
	<section class="bg-surface-cream py-20 lg:py-24">
		<div class="mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-12 xl:px-[160px]">

			<Motion
				as="span"
				class="text-xs font-medium tracking-[0.2em] text-foreground/40 uppercase"
				:initial="{ opacity: 0, y: 8 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.5 }"
				:transition="{ duration: 0.4, ease: 'easeOut' }"
			>
				HOW WE DO IT
			</Motion>

			<Motion
				as="h2"
				class="mt-5 max-w-[720px] text-[28px] font-medium leading-[1.2] text-foreground md:text-[36px] lg:text-[44px] lg:leading-[1.15]"
				:initial="{ opacity: 0, y: 14 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.4 }"
				:transition="{ duration: 0.5, delay: 0.06, ease: 'easeOut' }"
			>
				Everything that runs in the background, runs for you.
			</Motion>

			<Motion
				as="div"
				class="mt-4 max-w-[560px] space-y-2"
				:initial="{ opacity: 0, y: 10 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.4 }"
				:transition="{ duration: 0.45, delay: 0.12, ease: 'easeOut' }"
			>
				<p class="text-[15px] leading-[1.7] text-foreground/55 lg:text-[17px]">
					Platform partnerships, years of know-how, and the technology that brings them together.
				</p>
				<p class="text-[15px] leading-[1.7] text-foreground/55 lg:text-[17px]">
					Working behind every campaign, so growth keeps moving.
				</p>
			</Motion>

			<div class="mt-14 grid grid-cols-1 divide-y divide-foreground/10 md:grid-cols-2 md:divide-x md:divide-y-0 lg:mt-16">

				<!-- Left column -->
				<div class="flex flex-col divide-y divide-foreground/10 md:pr-12 lg:pr-16">

					<!-- Partnership -->
					<Motion
						as="div"
						class="py-10 first:pt-0"
						:initial="{ opacity: 0, y: 16 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:in-view-options="{ once: true, amount: 0.2 }"
						:transition="{ duration: 0.5, delay: 0, ease: [0.16, 1, 0.3, 1] }"
					>
						<h3 class="text-[18px] font-bold leading-snug text-foreground lg:text-[20px]">
							Partnership
						</h3>
						<p class="mt-3 text-[14px] leading-[1.7] text-foreground/60 lg:text-[15px]">
							Our partnerships with Meta, TikTok, Google, Snapchat, and X go back years. Built through volume, consistency, and operating at a scale that only comes with years of operating at this level. Direct access. Priority support. A seat at the table.
						</p>
					</Motion>

					<!-- Know-How -->
					<Motion
						as="div"
						class="py-10"
						:initial="{ opacity: 0, y: 16 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:in-view-options="{ once: true, amount: 0.2 }"
						:transition="{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }"
					>
						<h3 class="text-[18px] font-bold leading-snug text-foreground lg:text-[20px]">
							Know-How
						</h3>
						<p class="mt-3 text-[14px] leading-[1.7] text-foreground/60 lg:text-[15px]">
							We've been through every platform update, every market shift, every industry change. Firsthand.
						</p>
						<p class="mt-2 text-[14px] leading-[1.7] text-foreground/60 lg:text-[15px]">
							That experience drives how we build, how we advise, and how we make sure our partners are never caught off guard.
						</p>
					</Motion>

				</div>

				<!-- Right column -->
				<div class="flex flex-col divide-y divide-foreground/10 md:pl-12 lg:pl-16">

					<!-- Technology -->
					<Motion
						as="div"
						class="py-10 first:pt-0 md:pt-0"
						:initial="{ opacity: 0, y: 16 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:in-view-options="{ once: true, amount: 0.2 }"
						:transition="{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }"
					>
						<h3 class="text-[18px] font-bold leading-snug text-foreground lg:text-[20px]">
							Technology
						</h3>
						<p class="mt-3 text-[14px] leading-[1.7] text-foreground/60 lg:text-[15px]">
							Everything runs through one place. A fully centralized, AI-supported system designed from the ground up around how multi-platform advertising actually works at scale. Faster decisions, cleaner execution, full visibility. All in one place.
						</p>
					</Motion>

					<!-- Finance -->
					<Motion
						as="div"
						class="py-10"
						:initial="{ opacity: 0, y: 16 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:in-view-options="{ once: true, amount: 0.2 }"
						:transition="{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }"
					>
						<h3 class="text-[18px] font-bold leading-snug text-foreground lg:text-[20px]">
							Finance
						</h3>
						<p class="mt-3 text-[14px] leading-[1.7] text-foreground/60 lg:text-[15px]">
							We've run large budgets across global markets long enough to know where payments break down. Multiple payment options, a global financial network, and the infrastructure to keep campaigns live without interruption.
						</p>
					</Motion>

				</div>

			</div>

		</div>
	</section>
</template>
