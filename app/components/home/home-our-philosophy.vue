<script setup lang="ts">
import { Motion } from "motion-v";

const items = [
	{
		id: "access",
		title: "Start advertising everywhere. Now.",
		body: "You are connected from day one. Meta, TikTok, Google, Snapchat, and X. No setup friction. No waiting. Go live.",
	},
	{
		id: "live",
		title: "Always on, always running.",
		body: "Years inside these platforms taught us what keeps business live. That experience is now part of every system we operate. Keeping your business running. Every day.",
	},
	{
		id: "ceiling",
		title: "Room to scale. No limits.",
		body: "Spend more. New markets. Faster growth. Whatever was holding you back, the path forward is already cleared.",
	},
];
</script>

<template>
	<section class="border-y border-foreground/10 bg-white py-20 text-foreground lg:py-24">
		<div class="mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-12 xl:px-[160px]">

			<!-- Label -->
			<Motion
				as="span"
				class="text-xs font-medium tracking-[0.2em] text-foreground/40 uppercase"
				:initial="{ opacity: 0, y: 8 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.5 }"
				:transition="{ duration: 0.4, ease: 'easeOut' }"
			>
				OUR PROMISE
			</Motion>

			<!-- Enabler Statement -->
			<Motion
				as="h2"
				class="mt-3 max-w-[680px] text-[28px] font-medium leading-[1.2] text-foreground md:text-[34px] lg:text-[40px] lg:leading-[1.15]"
				:initial="{ opacity: 0, y: 12 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.4 }"
				:transition="{ duration: 0.5, delay: 0.05, ease: 'easeOut' }"
			>
				Your ads run. We make sure they never stop.
			</Motion>

			<!-- Three items — editorial stack -->
			<div class="mt-10 flex flex-col divide-y divide-foreground/10 lg:mt-12">
				<Motion
					v-for="(item, index) in items"
					:key="item.id"
					as="div"
					class="flex flex-col gap-3 py-7 md:flex-row md:items-start md:gap-0 md:py-9"
					:initial="{ opacity: 0, y: 16 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:in-view-options="{ once: true, amount: 0.2 }"
					:transition="{ duration: 0.5, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }"
				>
					<!-- Number -->
					<span class="w-16 shrink-0 text-xs font-medium tabular-nums text-foreground/30 md:pt-[5px]">
						{{ String(index + 1).padStart(2, '0') }}
					</span>

					<!-- Title -->
					<h3 class="shrink-0 text-[20px] font-semibold leading-[1.25] text-primary md:w-[420px] lg:text-[22px]">
						{{ item.title }}
					</h3>

					<!-- Body -->
					<p class="max-w-[460px] text-[15px] leading-[1.7] text-foreground/60 md:ml-auto">
						{{ item.body }}
					</p>
				</Motion>
			</div>

		</div>
	</section>
</template>
