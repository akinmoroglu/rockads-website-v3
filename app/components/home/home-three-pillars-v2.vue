<script setup lang="ts">
import pillarsDecorativeFrameAsset from "@/assets/images/home/pillars/line.svg?url";
import {
	IconBuildingBank,
	IconWorld,
	IconInfinity,
	IconNetwork,
	IconEye,
	IconTrendingUp,
	IconCertificate,
	IconTarget,
	IconUsers,
} from "@tabler/icons-vue";

const pillars = [
	{
		id: "growth",
		title: "Growth Engine",
		subtitle: "Limitless Scale",
		lead: "Most platforms give you access. We give you the architecture.",
		bullets: [
			{ icon: IconBuildingBank, text: "Outspend what your account should allow" },
			{ icon: IconWorld, text: "New market this week, not next quarter" },
			{ icon: IconInfinity, text: "Running while your competitors pull back" },
		],
	},
	{
		id: "intelligence",
		title: "Intelligence",
		subtitle: "Stable Foresight",
		lead: "We have been inside the market at the highest level, for years.",
		bullets: [
			{ icon: IconNetwork, text: "We already paid the learning curve" },
			{ icon: IconEye, text: "See shifts before your clients do" },
			{ icon: IconTrendingUp, text: "Arrive at every meeting with the answer" },
		],
	},
	{
		id: "partnership",
		title: "Partnership",
		subtitle: "Enduring Alignment",
		lead: "We have the platform access. Here is what actually makes the difference.",
		bullets: [
			{ icon: IconCertificate, text: "Access most agencies will never get" },
			{ icon: IconTarget, text: "We don't celebrate unless you do" },
			{ icon: IconUsers, text: "Our growth is tied to yours. Literally. 🤝" },
		],
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

		<div class="relative mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:px-12 lg:py-24 xl:px-[160px]">

			<!-- Section header -->
			<div class="mb-12 lg:mb-16">
				<span class="text-xs font-medium tracking-[0.2em] text-foreground/40 uppercase">
					CORE PILLARS
				</span>
				<h2 class="mt-3 max-w-[520px] text-[28px] leading-[1.2] font-medium text-foreground md:text-[36px] lg:text-[44px] lg:leading-[1.15]">
					The infrastructure your growth runs on.
				</h2>
			</div>

			<!-- Three pillars -->
			<div class="grid grid-cols-1 divide-y divide-foreground/10 md:grid-cols-3 md:divide-x md:divide-y-0">
				<div
					v-for="(pillar, index) in pillars"
					:key="pillar.id"
					class="group flex flex-col gap-5 py-10
					       first:md:pr-10 [&:not(:first-child)]:md:px-10 last:md:pr-0 last:md:pl-10
					       md:py-0"
				>
					<!-- Top accent line -->
					<div class="hidden h-px w-full bg-foreground/10 transition-colors duration-300 group-hover:bg-primary md:block" />

					<!-- Number -->
					<div class="md:mt-5">
						<span class="text-xs font-medium tabular-nums text-foreground/30">
							{{ String(index + 1).padStart(2, '0') }}
						</span>
					</div>

					<!-- Title + subtitle -->
					<div>
						<h3 class="font-display text-[26px] italic leading-[1.15] text-foreground lg:text-[34px]">
							{{ pillar.title }}
						</h3>
						<span class="mt-2 block text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
							{{ pillar.subtitle }}
						</span>
					</div>

					<!-- Lead sentence -->
					<p class="text-sm font-medium leading-relaxed text-foreground/75 lg:text-[15px] lg:leading-[1.7]">
						{{ pillar.lead }}
					</p>

					<!-- Bullets -->
					<ul class="flex flex-col gap-3.5">
						<li
							v-for="bullet in pillar.bullets"
							:key="bullet.text"
							class="flex items-center gap-3"
						>
							<component :is="bullet.icon" class="size-[15px] shrink-0 text-primary" :stroke-width="1.6" />
							<span class="text-sm leading-snug text-foreground/65">{{ bullet.text }}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>
