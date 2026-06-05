<script setup lang="ts">
import { Motion } from "motion-v";
import {
	IconRefresh,
	IconRocket,
	IconShieldCheck,
	IconFileDescription,
	IconSparkles,
	IconArrowUpRight,
} from "@tabler/icons-vue";

const features = [
	{
		id: "automation",
		icon: IconRefresh,
		title: "Automation",
		body: "Rules that run 24/7. Auto-budget, optimize, and pause across every platform.",
		cta: "Explore Automation",
		iconBg: "rgba(99, 102, 241, 0.10)",
		iconBorder: "rgba(99, 102, 241, 0.25)",
		iconColor: "#6366f1",
	},
	{
		id: "bulk-launcher",
		icon: IconRocket,
		title: "Bulk Ad Launcher",
		body: "Hundreds of creative variations live across platforms, in seconds.",
		cta: "Start Launching Faster",
		iconBg: "rgba(245, 158, 11, 0.10)",
		iconBorder: "rgba(245, 158, 11, 0.25)",
		iconColor: "#d97706",
	},
	{
		id: "compliance",
		icon: IconShieldCheck,
		title: "Ad Compliance",
		body: "AI scans every creative before launch. Stay live, stay safe.",
		cta: "Secure Your Campaigns",
		iconBg: "rgba(16, 185, 129, 0.10)",
		iconBorder: "rgba(16, 185, 129, 0.25)",
		iconColor: "#059669",
	},
	{
		id: "appeal",
		icon: IconFileDescription,
		title: "Smart Appeal",
		body: "AI-drafted appeals. Recover rejected campaigns in minutes, not days.",
		cta: "Try Smart Appeal",
		iconBg: "rgba(139, 92, 246, 0.10)",
		iconBorder: "rgba(139, 92, 246, 0.25)",
		iconColor: "#7c3aed",
	},
	{
		id: "creative",
		icon: IconSparkles,
		title: "AI Creative Agent",
		body: "An agent that generates, tests, and iterates creatives from your brand.",
		cta: "Meet the Agent",
		iconBg: "rgba(236, 72, 153, 0.10)",
		iconBorder: "rgba(236, 72, 153, 0.25)",
		iconColor: "#db2777",
	},
];
</script>

<template>
	<section class="relative overflow-hidden bg-surface-cream py-20 lg:py-24">
		<div class="relative mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-12 xl:px-[160px]">

			<!-- Header -->
			<Motion
				as="div"
				class="mb-10 rounded-2xl border border-foreground/8 bg-white p-8 shadow-sm lg:mb-12 lg:p-12"
				:initial="{ opacity: 0, y: 16 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.3 }"
				:transition="{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }"
			>
				<div class="flex flex-col gap-4 lg:max-w-[600px]">
					<h2 class="text-[26px] font-medium leading-[1.2] text-foreground md:text-[34px] lg:text-[42px] lg:leading-[1.15]">
						Manage and Scale Your Ad Operations
						<span class="font-display italic text-primary"> from a Single Hub</span>
					</h2>
					<p class="max-w-[480px] text-[15px] leading-[1.7] text-foreground/55">
						Free yourself from the manual workload. Launch your campaigns in seconds, automate your processes, and keep your campaigns compliant before they go live.
					</p>
				</div>
			</Motion>

			<!-- Feature cards -->
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
				<Motion
					v-for="(feature, index) in features"
					:key="feature.id"
					as="div"
					class="group flex flex-col gap-5 rounded-xl border border-foreground/8 bg-white p-5 shadow-sm transition-all duration-300 hover:border-foreground/15 hover:shadow-md"
					:initial="{ opacity: 0, y: 20 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:in-view-options="{ once: true, amount: 0.15 }"
					:transition="{
						duration: 0.5,
						delay: index * 0.08,
						ease: [0.16, 1, 0.3, 1],
					}"
				>
					<!-- Icon -->
					<div
						class="flex size-9 items-center justify-center rounded-lg"
						:style="{ backgroundColor: feature.iconBg, border: `1px solid ${feature.iconBorder}` }"
					>
						<component
							:is="feature.icon"
							class="size-4"
							:style="{ color: feature.iconColor }"
							:stroke-width="1.6"
						/>
					</div>

					<!-- Text -->
					<div class="flex flex-col gap-1.5">
						<h3 class="text-[15px] font-semibold leading-snug text-foreground">
							{{ feature.title }}
						</h3>
						<p class="text-sm leading-relaxed text-foreground/55">
							{{ feature.body }}
						</p>
					</div>

					<!-- CTA -->
					<div class="mt-auto flex items-center justify-between border-t border-foreground/8 pt-4">
						<span class="text-xs font-medium text-foreground/40 transition-colors duration-200 group-hover:text-foreground/60">
							{{ feature.cta }}
						</span>
						<div class="flex size-6 items-center justify-center rounded-full border border-foreground/12 transition-colors duration-200 group-hover:border-foreground/25">
							<IconArrowUpRight class="size-3 text-foreground/35" :stroke-width="2" />
						</div>
					</div>
				</Motion>
			</div>

		</div>
	</section>
</template>
