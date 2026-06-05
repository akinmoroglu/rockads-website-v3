<script setup lang="ts">
import EcosystemSvg from "@/components/services/core/EcosystemSvg.vue";
import GrowthSvg from "@/components/services/core/GrowthSvg.vue";
import HeroDots from "@/components/services/core/HeroDots.vue";
import IntegritySvg from "@/components/services/core/IntegritySvg.vue";
import OperationSvg from "@/components/services/core/OperationSvg.vue";
import StrategicSvg from "@/components/services/core/StrategicSvg.vue";
import SafariMockup from "@/components/ui/safari-mockup/SafariMockup.vue";
import dashboardSvg from "@/assets/images/services/core/dashboard.svg?url";
import { Button } from "@/components/ui/button";

useHead({
	title: "Core Services - Rockads",
});

const gtmEvent = useGtmEvent();

onMounted(() => {
	gtmEvent.pageViewEvent("Core Services - Rockads");
});

const opContinuityBullets = [
	"Instant 24/7 top-up availability for uninterrupted delivery.",
	"Minimal latency in critical financial moments.",
	"Faster response for campaigns that can't afford downtime.",
	"Continuity-first flow designed around real operational rhythms, not office hours.",
];

const strategicBullets = [
	"Hands-on partner support with direct operational access.",
	"Practical growth guidance informed by real platform experience.",
	"Market-aware thinking that goes beyond generic playbooks.",
	"Alignment that extends well beyond software alone.",
];

const ecosystemBullets = [
	"Deeply integrated with Meta, Google, TikTok, X, and Snapchat.",
	"Strategies shaped by the real-world dynamics of global advertising, not theory.",
	"Long-standing platform partnerships that solve problems faster and unlock opportunities.",
	"A central ecosystem position that gives you a unique vantage point on where the industry is heading.",
];

const integrityBullets = [
	"Structured review logic ensuring all operations meet the highest standards.",
	"Proactive, platform-aware safeguards that protect accounts before risks surface.",
	"Every process designed with long-term operational continuity as the objective.",
	"Architected for stable, predictable, and enduring success.",
];

const dashboardBullets = [
	"Multi-account management with real-time status across all ad accounts and platforms.",
	"User and role management with granular permissions and team structures.",
	"Financial overview with live balance tracking, payment history, and credit utilization.",
	"Consolidated reporting across platforms, accounts, and markets.",
	"Direct operational controls for top-ups, budget allocations, and account configurations.",
];
</script>

<template>
	<div class="font-display">
		<TheHeader />

		<!-- Hero -->
		<section class="relative overflow-hidden bg-[#060a14] text-white">
			<HeroDots />
			<div class="relative mx-auto max-w-[1066px] space-y-8 px-5 pt-[140px] pb-12 text-center lg:px-0 lg:pt-[164px] lg:pb-16">
				<div class="hero-anim hero-anim-1">
					<h1 class="rk-display text-white">
						The structure behind serious <em>expansion.</em>
					</h1>
				</div>
				<div class="hero-anim hero-anim-2 space-y-4 max-w-[800px] mx-auto">
					<p class="text-white/80 font-medium lg:text-lg">
						True scale is built on operational certainty, not promises.
					</p>
					<p class="text-white/55 text-sm leading-relaxed lg:text-base">
						Rockads Core is the operational backbone for advertisers who refuse to slow down. We remove every obstacle that stands between you and sustainable global growth: financial friction, operational gaps, compliance risks, and platform complexity. What remains is a clear, stable path to scale, backed by infrastructure, not promises.
					</p>
				</div>
				<div class="hero-anim hero-anim-3">
					<Button as-child>
						<NuxtLink to="/register" class="px-10! py-6 bg-primary hover:bg-primary-600 text-white font-medium rounded-control transition-all duration-200">
							Get Started in Minutes
						</NuxtLink>
					</Button>
				</div>
			</div>
		</section>

		<!-- Service Cards -->
		<section class="bg-[#f7f8fb] py-20 lg:py-24 px-5 lg:px-0">
			<div class="mx-auto flex max-w-[1140px] flex-col gap-6 lg:gap-8">
				<!-- Row 1: Financial Infrastructure + Growth Capacity -->
				<div class="grid gap-6 md:grid-cols-2 lg:gap-8">
					<!-- Financial Infrastructure -->
					<div
						v-reveal="{ amount: 0.15 }"
						class="reveal flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 lg:p-12 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md"
					>
						<div>
							<h2 class="rk-h2-italic text-foreground">
								Capital and compliance, <em>unlocked.</em>
							</h2>
						</div>
						<p class="rk-body mt-5 text-foreground/75">
							Our financial infrastructure gives partners more room to operate, greater stability, and the flexibility to move fast. Versatile payment models, flexible settlement structures, compliance-first account foundations, and credit-backed continuity, engineered so your most ambitious moves are never constrained by cash mechanics.
						</p>
						<div class="mt-8 flex w-full flex-1 items-end justify-center overflow-hidden pb-2">
							<ServicesCoreFinancialSvg />
						</div>
					</div>

					<!-- Growth Capacity -->
					<div
						v-reveal="{ amount: 0.15 }"
						class="reveal flex min-w-0 flex-col overflow-hidden rounded-2xl bg-surface-cream p-8 lg:p-12 transition-all duration-300 hover:shadow-md border border-[#efd9b5]/40"
						:style="{ '--rv-delay': '0.12s' }"
					>
						<div>
							<h2 class="rk-h2-italic text-foreground">
								Scale without <em>ceilings.</em>
							</h2>
						</div>
						<p class="rk-body mt-5 text-foreground/75">
							An operating environment designed to absorb expansion without bottlenecks. New markets, increased spend, new accounts. Core's infrastructure scales with you, never against you. There are no artificial limits on where or how fast you can grow.
						</p>
						<div class="mt-8 flex w-full flex-1 items-end justify-center overflow-hidden">
							<GrowthSvg />
						</div>
					</div>
				</div>

				<!-- Row 2: Operational Continuity (full width, dark) -->
				<div
					v-reveal="{ amount: 0.1 }"
					class="reveal grid gap-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070f1d] px-8 pt-8 md:grid-cols-2 lg:gap-12 lg:px-12 lg:pt-12 transition-all duration-300 hover:border-primary/25 hover:shadow-lg"
					style="--rv-y: 32px; --rv-dur: 0.65s"
				>
					<div class="flex min-w-0 flex-col pb-8 lg:pb-12">
						<h2 class="rk-h2-italic text-white">
							Always on. No <em>exceptions.</em>
						</h2>
						<p class="rk-body mt-5 text-white/75">
							Instant, 24/7 top-up support that eliminates the waiting game. When campaigns are live and budgets need to move, we ensure operations keep running. Not tomorrow, not next shift. Now.
						</p>
						<ul class="mt-6 flex flex-col gap-3">
							<li
								v-for="item in opContinuityBullets"
								:key="item"
								class="flex items-start gap-3"
							>
								<svg
									class="mt-0.5 h-5 w-5 shrink-0 text-primary"
									viewBox="0 0 20 20"
									fill="currentColor"
								><path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/></svg>
								<span class="rk-body-sm text-white/80">{{ item }}</span>
							</li>
						</ul>
					</div>
					<div class="flex min-w-0 items-center justify-center overflow-hidden">
						<OperationSvg />
					</div>
				</div>

				<!-- Row 3: Strategic Support (dark, reversed layout) -->
				<div
					v-reveal="{ amount: 0.1 }"
					class="reveal grid gap-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070f1d] p-8 md:grid-cols-2 lg:gap-12 lg:p-12 transition-all duration-300 hover:border-primary/25 hover:shadow-lg"
					style="--rv-y: 32px; --rv-dur: 0.65s"
				>
					<div class="order-2 flex min-w-0 items-center justify-center overflow-hidden md:order-1">
						<StrategicSvg />
					</div>
					<div class="order-1 flex min-w-0 flex-col md:order-2">
						<h2 class="rk-h2-italic text-white">
							Partnership in <em>practice.</em>
						</h2>
						<p class="rk-body mt-5 text-white/75">
							Software alone is not a strategy. A dedicated team supports your growth with real-world operational experience and a commitment to long-term alignment. Not a helpdesk. A growth partner that understands your business, your markets, and your goals.
						</p>
						<ul class="mt-6 flex flex-col gap-3">
							<li
								v-for="item in strategicBullets"
								:key="item"
								class="flex items-start gap-3"
							>
								<svg
									class="mt-0.5 h-5 w-5 shrink-0 text-primary"
									viewBox="0 0 20 20"
									fill="currentColor"
								><path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/></svg>
								<span class="rk-body-sm text-white/80">{{ item }}</span>
							</li>
						</ul>
					</div>
				</div>

				<!-- Row 4: Ecosystem Alignment + Integrity Framework -->
				<div class="grid gap-6 md:grid-cols-2 lg:gap-8">
					<!-- Ecosystem Alignment -->
					<div
						v-reveal="{ amount: 0.15 }"
						class="reveal flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 lg:p-12 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md"
					>
						<h2 class="rk-h2-italic text-foreground">
							Connected by <em>design.</em>
						</h2>
						<p class="rk-body mt-5 text-foreground/75">
							Our platform relationships and deep understanding of the digital advertising ecosystem are brought together in one cohesive structure. We are positioned at the center of global ad infrastructure, and we bring that advantage to you.
						</p>
						<ul class="mt-6 flex flex-col gap-3">
							<li
								v-for="item in ecosystemBullets"
								:key="item"
								class="flex items-start gap-3"
							>
								<svg
									class="mt-0.5 h-5 w-5 shrink-0 text-primary"
									viewBox="0 0 20 20"
									fill="currentColor"
								><path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/></svg>
								<span class="rk-body-sm text-foreground/75">{{ item }}</span>
							</li>
						</ul>
						<div class="mt-8 flex w-full flex-1 items-end overflow-hidden">
							<EcosystemSvg />
						</div>
					</div>

					<!-- Integrity Framework -->
					<div
						v-reveal="{ amount: 0.15 }"
						class="reveal flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 lg:p-12 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md"
						style="--rv-delay: 0.12s"
					>
						<h2 class="rk-h2-italic text-foreground">
							Built to <em>last.</em>
						</h2>
						<p class="rk-body mt-5 text-foreground/75">
							Operational safeguards that protect consistency, clarity, and long-term platform health. Compliance isn't left to chance. It's built into every layer.
						</p>
						<ul class="mt-6 flex flex-col gap-3">
							<li
								v-for="item in integrityBullets"
								:key="item"
								class="flex items-start gap-3"
							>
								<svg
									class="mt-0.5 h-5 w-5 shrink-0 text-primary"
									viewBox="0 0 20 20"
									fill="currentColor"
								><path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/></svg>
								<span class="rk-body-sm text-foreground/75">{{ item }}</span>
							</li>
						</ul>
						<div class="mt-8 flex w-full flex-1 items-end justify-center overflow-hidden">
							<IntegritySvg />
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Dashboard -->
		<section class="bg-[#f7f9fb] px-5 pt-12 pb-12 lg:px-0 lg:pt-20 lg:pb-20">
			<div
				v-reveal="{ amount: 0.1 }"
				class="reveal mx-auto grid max-w-[1140px] gap-8 rounded-[30px] bg-[#eceef2] p-6 md:grid-cols-[420px_minmax(0,1fr)] lg:gap-10 lg:px-10 lg:py-8"
				style="--rv-y: 32px; --rv-dur: 0.65s"
			>
				<div class="flex flex-col">
					<h2 class="rk-h1 text-foreground">
						Rockads Dashboard
					</h2>
					<p class="rk-body mt-3 font-medium text-muted-foreground lg:text-lg">
						Every service. One screen. Full control.
					</p>
					<p class="rk-body mt-5 text-foreground/75">
						Every layer of Rockads Core, your financial infrastructure, account health, operational workflows, team access, and performance data, managed from a single, purpose-built interface. The Rockads Dashboard doesn't replace what we do. It gives you full visibility and control over everything we provide.
					</p>
					<ul class="mt-7 flex flex-col gap-4">
						<li
							v-for="item in dashboardBullets"
							:key="item"
							class="flex items-start gap-3"
						>
							<svg
								class="mt-0.5 h-5 w-5 shrink-0 text-primary"
								viewBox="0 0 20 20"
								fill="currentColor"
							><path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/></svg>
							<span class="rk-body-sm text-[#747a8e]">{{ item }}</span>
						</li>
					</ul>
				</div>
				<div class="-mr-6 -mb-6 flex items-end justify-end lg:-mr-10 lg:-mb-8">
					<SafariMockup
						url="console.rockads.com/"
						:image-src="dashboardSvg"
					/>
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section class="bg-white px-5 py-16 lg:py-20">
			<div
				v-reveal="{ amount: 0.3 }"
				class="reveal mx-auto max-w-[800px] space-y-10 text-center"
				style="--rv-y: 24px"
			>
				<h2 class="text-text-base text-[32px] leading-[1.2] font-medium lg:text-[40px]">
					Built for growth that holds.<br> Discuss Your Growth Plan
				</h2>
				<Button
					as-child
				>
					<NuxtLink
						to="/register"
						class="px-10! py-6 transition-all duration-200"
					>
						Get Started in Minutes
					</NuxtLink>
				</Button>
			</div>
		</section>

		<HomeCta />

		<TheFooter />
	</div>
</template>

<style scoped>
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
	animation-delay: 0.12s;
}

.hero-anim-3 {
	animation-duration: 0.5s;
	animation-delay: 0.25s;
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
</style>
