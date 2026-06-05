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

const gtmEvent = useGtmEvent();

onMounted(() => {
	gtmEvent.pageViewEvent("Tech Services - Rockads");
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
		body: "A complete tech stack for brands scaling globally, from creative production to campaign deployment to automated optimization. No more stitching together five different tools.",
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
		<section class="relative overflow-hidden bg-[#060a14] text-white">
			<TechServicesDotGridCanvas />
			<div class="relative mx-auto max-w-[1066px] px-5 pt-[140px] pb-12 text-center lg:px-0 lg:pt-[164px] lg:pb-16">
				<div class="hero-anim hero-anim-1">
					<h1 class="rk-display text-white">
						The operating system for ad-ops at <em>scale.</em>
					</h1>
				</div>
				<p class="hero-anim hero-anim-2 mt-4 text-white/80 font-medium lg:text-lg">
					Stitching together disconnected tools slows down expansion.
				</p>
				<p class="hero-anim hero-anim-3 mt-6 max-w-[1066px] text-white/55 text-sm leading-relaxed lg:text-base">
					Rockads unifies campaign deployment, automated optimization, real-time policy monitoring, and creative generation into a single intelligence layer. Everything you need to run, scale, and protect your global operations.
				</p>
				<div class="hero-anim hero-anim-5 mt-8 lg:mt-10">
					<Button as-child>
						<NuxtLink to="/register" class="px-10! py-6 bg-primary hover:bg-primary-600 text-white font-medium rounded-control">
							Get Started in Minutes
						</NuxtLink>
					</Button>
				</div>
			</div>
		</section>

		<!-- Automation -->
		<section class="bg-[#f7f8fb] px-5 py-12 lg:px-0 lg:py-16">
			<div class="relative mx-auto grid max-w-[1140px] gap-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070f1d] md:min-h-112 md:grid-cols-[minmax(0,336px)_1fr] md:items-start lg:gap-12">
				<div class="flex min-w-0 flex-col p-6 sm:p-8 lg:p-12">
					<h2
						v-reveal="{ amount: 0.3 }"
						class="reveal rk-h2-italic text-white"
						style="--rv-y: 20px; --rv-dur: 0.55s"
					>
						Automation
					</h2>
					<p
						v-reveal="{ amount: 0.3 }"
						class="reveal rk-body mt-5 text-white/75"
						style="--rv-y: 16px; --rv-dur: 0.55s; --rv-delay: 0.1s"
					>
						Your operations, on autopilot. Eliminate manual bottlenecks across campaign management, budget allocation, and performance optimization. Rule-based actions, smart budget redistribution, and scheduled operations, all running across every platform.
					</p>
				</div>
				<div
					class="tech-automation-mock relative mx-6 mb-6 overflow-hidden rounded-2xl shadow-lg md:absolute md:right-3 md:bottom-3 md:mx-0 md:mb-0"
					aria-hidden="true"
				>
					<img
						:src="techAutomationPath"
						alt=""
						class="h-auto w-full max-w-full object-contain"
					>
				</div>
			</div>
		</section>

		<!-- Ad Launcher + Compliance AI -->
		<section class="bg-[#f7f8fb] px-5 pb-12 lg:px-0 lg:pb-16">
			<div class="mx-auto grid max-w-[1140px] gap-6 md:grid-cols-2 lg:gap-8">
				<div
					v-reveal="{ amount: 0.15 }"
					class="reveal flex min-w-0 flex-col rounded-2xl border border-border bg-card p-8 lg:p-12 shadow-sm"
				>
					<h2 class="rk-h2-italic text-foreground">
						One launch. Every <em>platform.</em>
					</h2>
					<p class="rk-body mt-5 text-foreground/75">
						Build once, customize per market, and deploy across Meta, Google, TikTok, Snapchat, and X simultaneously. Unified campaign builder, market-specific customization, and instant multi-platform deployment.
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
				<div
					v-reveal="{ amount: 0.15 }"
					class="reveal flex min-w-0 flex-col rounded-2xl border border-border bg-card p-8 lg:p-12 shadow-sm"
					style="--rv-delay: 0.12s"
				>
					<h2 class="rk-h2-italic text-foreground">
						Stay compliant. Stay <em>live.</em>
					</h2>
					<p class="rk-body mt-5 text-foreground/75">
						Continuously monitor campaigns, creatives, and account health across every platform. Pre-publish policy scanning, real-time risk monitoring, and cross-border regulatory intelligence.
					</p>
					<div class="mt-10 flex w-full justify-start overflow-hidden">
						<ComplianceAiAnimated />
					</div>
				</div>
			</div>
		</section>

		<!-- AI Creative Studio -->
		<section class="bg-[#f7f8fb] px-5 pb-12 lg:px-0 lg:pb-20">
			<div
				v-reveal="{ amount: 0.15 }"
				class="reveal relative mx-auto max-w-[1140px] overflow-hidden rounded-2xl border border-primary/10 bg-[#e6f2fc] px-6 pt-8 sm:px-8 lg:px-12 lg:pt-12"
				style="--rv-y: 32px; --rv-dur: 0.65s"
			>
				<div class="mx-auto max-w-[656px] text-center">
					<h2 class="rk-h2-italic text-foreground">
						Creatives that perform. At any <em>scale.</em>
					</h2>
					<p class="rk-body mt-5 text-foreground/75">
						Generate, iterate, and optimize ad creatives with AI powered by real-time performance data. From product feeds to multi-format output, with automated localization and brand consistency.
					</p>
				</div>
				<div class="mt-10 grid place-items-center gap-4">
					<img
						:src="aiCreativeStudioPath"
						alt="AI Creative Studio"
						class="h-auto w-full max-w-full"
					>
				</div>
			</div>
		</section>

		<!-- How it works + audiences -->
		<section class="bg-[#f7f8fb] px-5 pb-12 lg:px-0 lg:pb-20">
			<div
				class="relative mx-auto max-w-[1140px] overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
			>
				<TechServicesDotGridCanvas variant="lightCard" />
				<div
					class="relative z-10 grid gap-10 p-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,465px)] lg:gap-x-8 lg:gap-y-0 lg:p-12 xl:grid-cols-[447px_465px] xl:gap-x-[132px]"
				>
					<div
						v-reveal="{ amount: 0.2 }"
						class="reveal max-w-none xl:max-w-[447px]"
						style="--rv-y: 24px"
					>
						<h2 class="rk-h2-italic text-foreground">
							How it works <em>together.</em>
						</h2>
						<p class="rk-body mt-5 text-foreground/75">
							AI Creative Studio generates ad creatives from your product feed and brand assets. Compliance AI scans every creative and campaign configuration for policy compliance before launch. Ad Launcher deploys compliant campaigns across all platforms and markets simultaneously.
						</p>
						<p class="rk-body mt-4 text-foreground/75">
							Automation monitors performance and automatically optimizes budgets, pauses underperformers, and scales winners. Performance data feeds back into AI Creative Studio to generate better-performing creative iterations.
						</p>
					</div>
					<div class="flex flex-col gap-6">
						<div
							v-for="(a, index) in audienceCards"
							:key="a.title"
							v-reveal="{ amount: 0.1 }"
							class="reveal flex flex-col gap-6 rounded-xl border border-border bg-card p-6 shadow-xs"
							:style="{ '--rv-y': '24px', '--rv-dur': '0.55s', '--rv-delay': `${index * 0.1}s` }"
						>
							<component
								:is="a.icon"
								class="size-8 shrink-0 text-primary"
								stroke-width="1.5"
							/>
							<div class="flex flex-col gap-4">
								<h3 class="rk-h3 text-foreground">
									{{ a.title }}
								</h3>
								<p class="rk-body-sm">
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
			<div
				v-reveal="{ amount: 0.3 }"
				class="reveal mx-auto max-w-[800px] text-center"
				style="--rv-y: 24px"
			>
				<h2 class=" text-[32px] leading-[1.2] font-semibold lg:text-[40px]">
					Ready to run tech that scales with you?<br><span class="text-foreground">Start on Rockads</span>
				</h2>
				<Button
					as-child
					class="mt-8 lg:mt-10"
				>
					<NuxtLink
						to="/register"
						class="px-10! py-6"
					>
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
				<p
					v-reveal="{ amount: 0.3 }"
					class="reveal text-sm leading-5 text-(--tech-closing-kicker) lg:text-base"
					style="--rv-y: 16px; --rv-dur: 0.5s"
				>
					The only partner you'll ever need.
				</p>
				<h2 class="w-full max-w-[536px] text-white">
					<p
						v-reveal="{ amount: 0.2 }"
						class="reveal text-[40px] leading-[48px] font-normal md:text-[52px] md:leading-[60px] lg:text-[68px] lg:leading-[72px]"
						style="--rv-y: 24px"
					>
						Stable.
					</p>
					<p
						v-reveal="{ amount: 0.2 }"
						class="reveal text-[40px] leading-[48px] md:text-[52px] md:leading-[60px] lg:text-[68px] lg:leading-[72px]"
						style="--rv-y: 24px; --rv-delay: 0.1s"
					>
						<em class="tech-closing-enduring text-(--tech-closing-accent)">Enduring.</em>
					</p>
					<p
						v-reveal="{ amount: 0.2 }"
						class="reveal text-[40px] leading-[48px] font-normal md:text-[52px] md:leading-[60px] lg:text-[68px] lg:leading-[72px]"
						style="--rv-y: 24px; --rv-delay: 0.2s"
					>
						Limitless.
					</p>
				</h2>
				<p
					v-reveal="{ amount: 0.3 }"
					class="reveal max-w-[372px] text-sm leading-5 text-(--tech-closing-description)"
					style="--rv-y: 16px; --rv-dur: 0.5s; --rv-delay: 0.3s"
				>
					When others come and go, we'll still be here. Join the infrastructure built to last.
				</p>
			</div>
		</section>

		<TheFooter />
	</div>
</template>

<style scoped>
/* ── Hero enter animations ───────────────────────────────── */
@keyframes hero-enter {
	from {
		opacity: 0;
		transform: translateY(var(--hero-y, 20px));
	}
	to {
		opacity: 1;
		transform: none;
	}
}

.hero-anim {
	animation: hero-enter cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero-anim-1 {
	animation-duration: 0.65s;
	--hero-y: 28px;
}

.hero-anim-2 {
	animation-duration: 0.55s;
	animation-delay: 0.1s;
}

.hero-anim-3 {
	animation-duration: 0.55s;
	animation-delay: 0.18s;
}

.hero-anim-4 {
	animation-duration: 0.55s;
	animation-delay: 0.24s;
}

.hero-anim-5 {
	animation-duration: 0.5s;
	animation-delay: 0.32s;
	--hero-y: 16px;
}

/* ── Scroll reveal ───────────────────────────────────────── */
.reveal {
	opacity: 0;
	transform: translateY(var(--rv-y, 28px));
	transition:
		opacity var(--rv-dur, 0.6s) cubic-bezier(0.16, 1, 0.3, 1) var(--rv-delay, 0s),
		transform var(--rv-dur, 0.6s) cubic-bezier(0.16, 1, 0.3, 1) var(--rv-delay, 0s);
}

.reveal.in-view {
	opacity: 1;
	transform: none;
}

@media (prefers-reduced-motion: reduce) {
	.hero-anim {
		animation: none;
	}

	.reveal {
		opacity: 1;
		transform: none;
		transition: none;
	}
}

/* ── Section styles ──────────────────────────────────────── */
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
	font-family: var(--font-sans);
	font-style: italic;
	font-weight: 700;
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
