<script setup lang="ts">
import pillarsDecorativeFrameAsset from "@/assets/images/home/pillars/line.svg?url";

const pillars = [
	{
		id: "growth",
		title: "Growth Engine",
		subtitle: "Limitless Scale",
		description: "Most platforms give you access. We give you the architecture behind it. Capital routing, compliance, and financial resilience built to scale in silence, so nothing stands between your ambition and the market.",
	},
	{
		id: "intelligence",
		title: "Intelligence",
		subtitle: "Stable Foresight",
		description: "We have been inside the market at the highest level, across every major platform, for years. Our clients don't react to change. They move before it arrives.",
	},
	{
		id: "partnership",
		title: "Partnership",
		subtitle: "Enduring Alignment",
		description: "Official partnerships are table stakes. What separates us is the alignment that follows. We don't manage accounts. We own outcomes alongside you, and we win when you win.",
	},
];
</script>

<template>
	<section class="relative overflow-hidden bg-surface-cream">
		<!-- Decorative lines -->
		<div class="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
			<img
				:src="pillarsDecorativeFrameAsset"
				class="h-full w-full object-cover"
				aria-hidden="true"
			>
		</div>

		<div class="relative mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:px-12 lg:py-28 xl:px-[160px]">

			<!-- Section header -->
			<div class="mb-16 lg:mb-20">
				<span class="text-xs font-medium tracking-[0.2em] text-foreground/40 uppercase">
					CORE PILLARS
				</span>
				<h2 class="mt-4 max-w-[520px] text-[28px] leading-[1.2] font-medium text-foreground md:text-[36px] lg:text-[48px] lg:leading-[1.15]">
					The infrastructure your growth runs on.
				</h2>
			</div>

			<!-- Three pillars -->
			<div class="grid grid-cols-1 divide-y divide-foreground/10 md:grid-cols-3 md:divide-x md:divide-y-0">
				<div
					v-for="(pillar, index) in pillars"
					:key="pillar.id"
					class="group flex flex-col gap-6 py-10 transition-all duration-300
					       first:md:pr-12 [&:not(:first-child)]:md:px-12 last:md:pr-0 last:md:pl-12
					       md:py-0"
				>
					<!-- Top accent line -->
					<div class="hidden h-px w-full bg-foreground/10 transition-colors duration-300 group-hover:bg-primary md:block" />

					<div class="flex flex-col gap-1 md:mt-8">
						<span class="text-xs font-medium tabular-nums text-foreground/30">
							{{ String(index + 1).padStart(2, '0') }}
						</span>
					</div>

					<div>
						<h3 class="font-display text-[26px] italic leading-[1.15] text-foreground lg:text-[32px]">
							{{ pillar.title }}
						</h3>
						<span class="mt-2 block text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
							{{ pillar.subtitle }}
						</span>
					</div>

					<p class="text-sm leading-relaxed text-foreground/60 lg:text-[15px] lg:leading-7">
						{{ pillar.description }}
					</p>
				</div>
			</div>
		</div>
	</section>
</template>
