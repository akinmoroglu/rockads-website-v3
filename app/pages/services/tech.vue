<script setup lang="ts">
import {
	IconBrush,
	IconBuildingStore,
	IconPhoto,
	IconPlayerPlay,
	IconShoppingBag,
	IconSparkles,
	IconTopologyStarRing,
} from "@tabler/icons-vue";
import { Button } from "@/components/ui/button";
import techAutomationPath from "@/assets/images/services/tech/ad-automation.svg?url";
import techMetaPath from "@/assets/images/services/tech/meta.svg?url";
import techGooglePath from "@/assets/images/services/tech/google.svg?url";
import techTikTokPath from "@/assets/images/services/tech/tiktok.svg?url";
import techXPath from "@/assets/images/services/tech/x-twitter.svg?url";
import techSnapchatPath from "@/assets/images/services/tech/snapchat.svg?url";
import ComplianceAiAnimated from "@/components/icons/animated/compliance-ai-animated.vue";
import aiCreativeStudioPath from "@/assets/images/services/tech/ai-creative-studio.svg?url";

useHead({
	title: "Tech Services - Rockads",
});

const platformLogos = [
	{ name: "Meta", src: techMetaPath },
	{ name: "Google", src: techGooglePath },
	{ name: "TikTok", src: techTikTokPath },
	{ name: "X", src: techXPath },
	{ name: "Snapchat", src: techSnapchatPath },
];

const creativeTypes = [
	{
		title: "Ad Creatives",
		description: "Meta Ads, Google Ads, LinkedIn Ads, CTA-focused creatives, carousel ads.",
		hint: "Auto-size adaptation, balanced text areas.",
		icon: IconBrush,
	},
	{
		title: "Product Creatives",
		description: "Product cutouts, collections, pricing highlights, product mockups.",
		hint: "Visual alignment with brand identity.",
		icon: IconPhoto,
	},
	{
		title: "Video Creatives",
		description: "Short videos (Reels, TikTok), animated product demos.",
		hint: "Optional voice-over, dynamic CTA variations.",
		icon: IconPlayerPlay,
	},
	{
		title: "Stock & thematic visuals",
		description: "Seasonal visuals, background images, themed banners.",
		hint: "AI-powered stock suggestions.",
		icon: IconSparkles,
	},
];

const audienceCards = [
	{
		title: "E-Commerce Brands",
		body: "A complete tech stack for brands scaling globally — from creative production to campaign deployment to automated optimization. No more stitching together five different tools.",
		icon: IconShoppingBag,
	},
	{
		title: "Digital Agencies",
		body: "Manage more clients without growing your ops team. Unified tools for launching, monitoring, and optimizing campaigns across every client and every platform.",
		icon: IconBuildingStore,
	},
	{
		title: "Enterprise & Performance Teams",
		body: "Enterprise-grade infrastructure with role-based access, approval workflows, audit trails, and compliance built into every layer. Scale without losing control.",
		icon: IconTopologyStarRing,
	},
];
</script>

<template>
	<div class="font-display">
		<TheHeader />

		<!-- Hero -->
		<section class="relative overflow-hidden bg-white">
			<TechServicesDotGridCanvas />
			<div class="relative mx-auto max-w-[1066px] px-5 pt-[140px] pb-12 text-center lg:px-0 lg:pt-[164px] lg:pb-16">
				<h1 class="text-[40px] leading-[1.14] md:text-[48px] lg:text-[56px]">
					<span class="text-primary">Tech</span> <span class="text-text-base">Services</span>
				</h1>
				<p class="mt-4 text-base font-medium text-foreground lg:mt-5 lg:text-lg">
					The Full Stack for Global Ad Operations
				</p>
				<p class="mt-6 max-w-[1066px] text-sm leading-relaxed lg:mt-8 lg:text-base">
					From campaign creation to compliance, from automation to creative intelligence and more… Everything you need to run, scale, and protect your global operations.
				</p>
				<p class="mt-4 max-w-[1066px] text-sm leading-relaxed lg:mt-5 lg:text-base">
					Running global ad operations across platforms, markets, and teams demands more than a collection of disconnected tools. It demands an integrated system where every action — from launching a campaign to checking compliance, from reallocating budget to generating creatives — flows through one intelligent layer. That's Rockads.
				</p>
				<Button
					as-child
					size="lg"
					class="mt-8 lg:mt-10"
				>
					<NuxtLink to="/sign-up">
						Get Started in Minutes
					</NuxtLink>
				</Button>
			</div>
		</section>

		<!-- Automation -->
		<section class="bg-muted/80 px-5 py-12 lg:px-0 lg:py-16">
			<div class="border-primary-light relative mx-auto grid h-112 max-w-[1140px] gap-10 overflow-hidden rounded-4xl border bg-surface-dark md:grid-cols-[minmax(0,336px)_1fr] md:items-start lg:gap-12">
				<div class="flex flex-col p-12">
					<h2 class="text-2xl leading-tight text-white lg:text-[32px]">
						Automation
					</h2>
					<p class="mt-6 text-sm leading-relaxed text-white lg:text-base">
						Your operations, on autopilot. Eliminate manual bottlenecks across campaign management, budget allocation, and performance optimization. Rule-based actions, smart budget redistribution, and scheduled operations — all running across every platform.
					</p>
				</div>
				<div
					class="tech-automation-mock absolute right-3 bottom-3 overflow-hidden rounded-2xl shadow-lg"
					aria-hidden="true"
				>
					<img
						:src="techAutomationPath"
						alt=""
					>
				</div>
			</div>
		</section>

		<!-- Ad Launcher + Compliance AI -->
		<section class="bg-muted/80 px-5 pb-12 lg:px-0 lg:pb-16">
			<div class="mx-auto grid max-w-[1140px] gap-6 md:grid-cols-2 lg:gap-8">
				<div class="border-primary-light flex flex-col rounded-4xl border bg-card p-8 lg:p-12">
					<h2 class="text-2xl leading-tight lg:text-[32px]">
						Ad Launcher
					</h2>
					<p class="mt-6 text-sm leading-relaxed lg:text-base">
						One launch. Every platform. Every market. Build once, customize per market, and deploy across Meta, Google, TikTok, Snapchat, and X simultaneously. Unified campaign builder, market-specific customization, and instant multi-platform deployment.
					</p>
					<div class="mt-8 flex flex-wrap gap-3.5">
						<div
							v-for="p in platformLogos"
							:key="p.name"
						>
							<img
								:src="p.src"
								:alt="p.name"
							>
						</div>
					</div>
				</div>
				<div class="border-primary-light flex flex-col rounded-4xl border bg-card p-8 lg:p-12">
					<h2 class="text-2xl leading-tight lg:text-[32px]">
						Compliance AI
					</h2>
					<p class="mt-6 text-sm leading-relaxed lg:text-base">
						Stay compliant. Stay live. Stay ahead. Continuously monitor campaigns, creatives, and account health across every platform. Pre-publish policy scanning, real-time risk monitoring, and cross-border regulatory intelligence.
					</p>
					<div class="mt-10 flex justify-start">
						<ComplianceAiAnimated />
					</div>
				</div>
			</div>
		</section>

		<!-- AI Creative Studio -->
		<section class="bg-muted/80 px-5 pb-12 lg:px-0 lg:pb-20">
			<div class="relative mx-auto max-w-[1140px] rounded-4xl bg-[#e5f1ff] px-8 pt-8 lg:px-12 lg:pt-12">
				<div class="mx-auto max-w-[656px] text-center">
					<h2 class="text-2xl leading-tight lg:text-[32px]">
						AI Creative Studio
					</h2>
					<p class="mt-4 text-sm leading-relaxed lg:mt-6 lg:text-base">
						Creatives that perform. At any scale. Generate, iterate, and optimize ad creatives with AI powered by real-time performance data. From product feeds to multi-format output, with automated localization and brand consistency.
					</p>
				</div>
				<div class="mt-10 grid place-items-center gap-4">
					<img
						:src="aiCreativeStudioPath"
						alt="AI Creative Studio"
					>
				</div>
			</div>
		</section>

		<!-- How it works + audiences (Figma: Automation frame — two columns, dot texture) -->
		<section class="bg-muted/80 px-5 pb-12 lg:px-0 lg:pb-20">
			<div
				class="border-primary-light relative mx-auto max-w-[1140px] overflow-hidden rounded-4xl border bg-[#f7f9fb]"
			>
				<TechServicesDotGridCanvas variant="lightCard" />
				<div
					class="relative z-10 grid gap-10 p-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,465px)] lg:gap-x-8 lg:gap-y-0 lg:p-12 xl:grid-cols-[447px_465px] xl:gap-x-[132px]"
				>
					<div class="max-w-none xl:max-w-[447px]">
						<h2 class="text-2xl leading-tight lg:text-[32px]">
							How It Works Together
						</h2>
						<p class="mt-6 text-base leading-relaxed">
							AI Creative Studio generates ad creatives from your product feed and brand assets. Compliance AI scans every creative and campaign configuration for policy compliance before launch. Ad Launcher deploys compliant campaigns across all platforms and markets simultaneously.
						</p>
						<p class="mt-4 text-base leading-relaxed">
							Automation monitors performance and automatically optimizes budgets, pauses underperformers, and scales winners. Performance data feeds back into AI Creative Studio to generate better-performing creative iterations.
						</p>
					</div>
					<div class="flex flex-col gap-6">
						<div
							v-for="a in audienceCards"
							:key="a.title"
							class="flex flex-col gap-6 rounded-2xl bg-card p-6 shadow-sm"
						>
							<component
								:is="a.icon"
								class="size-8 shrink-0 text-primary"
								stroke-width="1.5"
							/>
							<div class="flex flex-col gap-4">
								<h3 class="text-xl leading-7">
									{{ a.title }}
								</h3>
								<p class="text-sm leading-normal text-foreground/50">
									{{ a.body }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section class="bg-background px-5 py-16 lg:py-20">
			<div class="mx-auto max-w-[800px] text-center">
				<h2 class=" text-[32px] leading-[1.2] font-semibold lg:text-[40px]">
					Ready to run tech that scales with you?<br><span class="text-foreground">Start on Rockads</span>
				</h2>
				<Button
					as-child
					size="lg"
					class="mt-8 lg:mt-10"
				>
					<NuxtLink to="/sign-up">
						Get Started in Minutes
					</NuxtLink>
				</Button>
			</div>
		</section>

		<section class="tech-closing relative overflow-hidden px-5 py-20 lg:py-28">
			<div
				class="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[260px] w-[300px] max-w-[calc(100%+2rem)] -translate-x-1/2 -translate-y-1/2 md:h-[350px] md:w-[400px] lg:h-[458px] lg:w-[536px]"
				aria-hidden="true"
			>
				<div class="tech-closing-ellipse size-full rounded-full" />
			</div>
			<div class="relative z-10 mx-auto flex max-w-[492px] flex-col items-center gap-9 text-center">
				<p class="text-sm leading-5 text-(--tech-closing-kicker) lg:text-base">
					The only partner you'll ever need.
				</p>
				<h2 class="w-full max-w-[536px] text-white">
					<p class="text-[40px] leading-[48px] font-normal md:text-[52px] md:leading-[60px] lg:text-[68px] lg:leading-[72px]">
						Stable.
					</p>
					<p class="text-[40px] leading-[48px] md:text-[52px] md:leading-[60px] lg:text-[68px] lg:leading-[72px]">
						<em class="tech-closing-enduring text-(--tech-closing-accent)">Enduring.</em>
					</p>
					<p class="text-[40px] leading-[48px] font-normal md:text-[52px] md:leading-[60px] lg:text-[68px] lg:leading-[72px]">
						Limitless.
					</p>
				</h2>
				<p class="max-w-[372px] text-sm leading-5 text-(--tech-closing-description)">
					When others come and go, we'll still be here. Join the infrastructure built to last.
				</p>
			</div>
		</section>

		<TheFooter />
	</div>
</template>

<style scoped>
.tech-automation-mock {
	max-height: 420px;
}

.tech-closing {
	--tech-closing-bg: #080b0f;
	--tech-closing-kicker: #898fa5;
	--tech-closing-accent: #f6ca9a;
	--tech-closing-description: #9fa6bb;
	background-color: var(--tech-closing-bg);
}

.tech-closing-enduring {
	font-family: var(--font-fraunces);
	font-style: italic;
	font-weight: 700;
	font-variation-settings: "SOFT" 0, "WONK" 1;
}

.tech-closing-ellipse {
	background: radial-gradient(
		ellipse 75% 72% at 50% 50%,
		rgb(38 56 94 / 52%) 0%,
		rgb(38 56 94 / 16%) 45%,
		rgb(8 11 15 / 0%) 72%
	);
	filter: blur(40px);
}

@media (prefers-reduced-motion: reduce) {
	.tech-closing-ellipse {
		filter: blur(20px);
		opacity: 0.9;
	}
}
</style>
