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
import { Motion } from "motion-v";

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
		<section class="core-hero relative overflow-hidden text-white">
			<HeroDots />
			<!-- Hero background glow accents -->
			<div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
				<div class="core-hero-glow-left" />
				<div class="core-hero-glow-right" />
			</div>
			<div class="relative z-10 mx-auto max-w-[1066px] space-y-8 px-5 pt-[140px] pb-12 text-center lg:px-0 lg:pt-[164px] lg:pb-16">
				<Motion
					as="div"
					:initial="{ opacity: 0, y: 28 }"
					:animate="{ opacity: 1, y: 0 }"
					:transition="{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }"
				>
					<h1 class="rk-display text-white">
						The structure behind serious <em class="core-hero-em">expansion.</em>
					</h1>
				</Motion>
				<Motion
					as="div"
					class="space-y-4 max-w-[800px] mx-auto"
					:initial="{ opacity: 0, y: 20 }"
					:animate="{ opacity: 1, y: 0 }"
					:transition="{ duration: 0.55, delay: 0.12, ease: 'easeOut' }"
				>
					<p class="text-white/80 font-medium lg:text-lg">
						True scale is built on operational certainty, not promises.
					</p>
					<p class="text-white/55 text-sm leading-relaxed lg:text-base">
						Rockads Core is the operational backbone for advertisers who refuse to slow down. We remove every obstacle that stands between you and sustainable global growth: financial friction, operational gaps, compliance risks, and platform complexity. What remains is a clear, stable path to scale, backed by infrastructure, not promises.
					</p>
				</Motion>
				<Motion
					as="div"
					:initial="{ opacity: 0, y: 16 }"
					:animate="{ opacity: 1, y: 0 }"
					:transition="{ duration: 0.5, delay: 0.25, ease: 'easeOut' }"
				>
					<Button as-child>
						<NuxtLink to="/register" class="px-10! py-6 bg-primary hover:bg-primary-600 text-white font-medium rounded-control transition-all duration-200">
							Get Started in Minutes
						</NuxtLink>
					</Button>
				</Motion>
			</div>
		</section>

		<!-- Service Cards -->
		<section class="core-cards-section py-20 lg:py-24 px-5 lg:px-0">
			<div class="mx-auto flex max-w-[1140px] flex-col gap-6 lg:gap-8">

				<!-- Row 1: Financial Infrastructure + Growth Capacity -->
				<div class="grid gap-6 md:grid-cols-2 lg:gap-8">
					<!-- Financial Infrastructure -->
					<div
						v-reveal="{ amount: 0.15 }"
						class="reveal core-card core-card-light flex min-w-0 flex-col overflow-hidden rounded-2xl p-8 lg:p-12"
					>
						<div>
							<h2 class="rk-h2-italic text-foreground">
								Capital and compliance, <em>unlocked.</em>
							</h2>
						</div>
						<p class="rk-body mt-5 text-foreground/70">
							Our financial infrastructure gives partners more room to operate, greater stability, and the flexibility to move fast. Versatile payment models, flexible settlement structures, compliance-first account foundations, and credit-backed continuity, engineered so your most ambitious moves are never constrained by cash mechanics.
						</p>
						<div class="mt-8 flex w-full flex-1 items-end justify-center overflow-hidden pb-2">
							<ServicesCoreFinancialSvg />
						</div>
					</div>

					<!-- Growth Capacity -->
					<div
						v-reveal="{ amount: 0.15 }"
						class="reveal core-card core-card-cream flex min-w-0 flex-col overflow-hidden rounded-2xl p-8 lg:p-12"
						:style="{ '--rv-delay': '0.12s' }"
					>
						<div>
							<h2 class="rk-h2-italic text-foreground">
								Scale without <em>ceilings.</em>
							</h2>
						</div>
						<p class="rk-body mt-5 text-foreground/70">
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
					class="reveal core-card-dark grid gap-8 overflow-hidden rounded-2xl px-8 pt-8 md:grid-cols-2 lg:gap-12 lg:px-12 lg:pt-12"
					style="--rv-y: 32px; --rv-dur: 0.65s"
				>
					<!-- Radial glow accent -->
					<div class="core-dark-glow" aria-hidden="true" />
					<div class="flex min-w-0 flex-col pb-8 lg:pb-12 relative z-10">
						<h2 class="rk-h2-italic text-white">
							Always on. No <em>exceptions.</em>
						</h2>
						<p class="rk-body mt-5 text-white/70">
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
								<span class="rk-body-sm text-white/75">{{ item }}</span>
							</li>
						</ul>
					</div>
					<div class="flex min-w-0 items-center justify-center overflow-hidden relative z-10">
						<OperationSvg />
					</div>
				</div>

				<!-- Row 3: Strategic Support (dark, reversed layout) -->
				<div
					v-reveal="{ amount: 0.1 }"
					class="reveal core-card-dark-alt grid gap-8 overflow-hidden rounded-2xl p-8 md:grid-cols-2 lg:gap-12 lg:p-12"
					style="--rv-y: 32px; --rv-dur: 0.65s"
				>
					<!-- Radial glow accent (left side) -->
					<div class="core-dark-glow-left" aria-hidden="true" />
					<div class="order-2 flex min-w-0 items-center justify-center overflow-hidden md:order-1 relative z-10">
						<StrategicSvg />
					</div>
					<div class="order-1 flex min-w-0 flex-col md:order-2 relative z-10">
						<h2 class="rk-h2-italic text-white">
							Partnership in <em>practice.</em>
						</h2>
						<p class="rk-body mt-5 text-white/70">
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
								<span class="rk-body-sm text-white/75">{{ item }}</span>
							</li>
						</ul>
					</div>
				</div>

				<!-- Row 4: Ecosystem Alignment + Integrity Framework -->
				<div class="grid gap-6 md:grid-cols-2 lg:gap-8">
					<!-- Ecosystem Alignment -->
					<div
						v-reveal="{ amount: 0.15 }"
						class="reveal core-card core-card-light flex min-w-0 flex-col overflow-hidden rounded-2xl p-8 lg:p-12"
					>
						<h2 class="rk-h2-italic text-foreground">
							Connected by <em>design.</em>
						</h2>
						<p class="rk-body mt-5 text-foreground/70">
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
								<span class="rk-body-sm text-foreground/70">{{ item }}</span>
							</li>
						</ul>
						<div class="mt-8 flex w-full flex-1 items-end overflow-hidden">
							<EcosystemSvg />
						</div>
					</div>

					<!-- Integrity Framework -->
					<div
						v-reveal="{ amount: 0.15 }"
						class="reveal core-card core-card-light flex min-w-0 flex-col overflow-hidden rounded-2xl p-8 lg:p-12"
						style="--rv-delay: 0.12s"
					>
						<h2 class="rk-h2-italic text-foreground">
							Built to <em>last.</em>
						</h2>
						<p class="rk-body mt-5 text-foreground/70">
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
								<span class="rk-body-sm text-foreground/70">{{ item }}</span>
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
		<section class="core-dashboard-section px-5 pt-0 pb-16 lg:px-0 lg:pb-24">
			<div class="relative mx-auto max-w-[1140px]">
				<!-- Background glow behind dashboard card -->
				<div class="core-dashboard-bg-glow" aria-hidden="true" />

				<div
					v-reveal="{ amount: 0.1 }"
					class="reveal core-dashboard-card relative rounded-[30px] p-6 lg:p-10 overflow-hidden"
					style="--rv-y: 32px; --rv-dur: 0.65s"
				>
					<!-- Inner glow accent -->
					<div class="core-dashboard-inner-glow" aria-hidden="true" />

					<!-- Header: title + subtitle full width -->
					<div class="relative z-10">
						<h2 class="rk-h1 text-foreground">
							Rockads Dashboard
						</h2>
						<p class="rk-body mt-3 font-medium text-muted-foreground lg:text-lg">
							Every service. One screen. Full control.
						</p>
						<!-- Description spans full width -->
						<p class="rk-body mt-5 text-foreground/70 max-w-none">
							Every layer of Rockads Core, your financial infrastructure, account health, operational workflows, team access, and performance data, managed from a single, purpose-built interface. The Rockads Dashboard doesn't replace what we do. It gives you full visibility and control over everything we provide.
						</p>
					</div>

					<!-- Bottom row: bullets left, screenshot right — both vertically centered -->
					<div class="relative z-10 mt-8 grid items-center gap-8 md:grid-cols-2 lg:gap-12">
						<ul class="flex flex-col gap-4">
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
								<span class="rk-body-sm text-foreground/65">{{ item }}</span>
							</li>
						</ul>
						<div class="flex items-center justify-center">
							<SafariMockup
								url="console.rockads.com/"
								:image-src="dashboardSvg"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>

		<HomeCta />

		<TheFooter />
	</div>
</template>

<style scoped>
/* ── Hero ─────────────────────────────────────────────────── */
.core-hero {
	background: linear-gradient(160deg, #060a14 0%, #02123e 100%);
}

.core-hero-glow-left {
	position: absolute;
	inset: 0;
	background: radial-gradient(
		ellipse 55% 60% at 5% 50%,
		rgba(0, 124, 225, 0.10) 0%,
		transparent 70%
	);
}

.core-hero-glow-right {
	position: absolute;
	inset: 0;
	background: radial-gradient(
		ellipse 45% 55% at 95% 30%,
		rgba(0, 80, 160, 0.08) 0%,
		transparent 65%
	);
}

.core-hero-em {
	font-style: italic;
	font-weight: 700;
	background: linear-gradient(90deg, #7ab8f5 0%, #ffffff 60%, #c9e1ff 100%);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
}

/* ── Light Cards Section ─────────────────────────────────── */
.core-cards-section {
	background: #f4f6fb;
}

.core-card {
	border: 1px solid transparent;
	transition:
		border-color 0.25s ease,
		box-shadow 0.25s ease,
		transform 0.25s ease;
}

.core-card:hover {
	transform: translateY(-2px);
	box-shadow:
		0 0 0 1px rgba(0, 124, 225, 0.18),
		0 8px 32px rgba(0, 124, 225, 0.10),
		0 2px 8px rgba(0, 0, 0, 0.06);
	border-color: rgba(0, 124, 225, 0.15);
}

.core-card-light {
	background: #ffffff;
	border-color: rgba(0, 0, 0, 0.07);
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03);
}

.core-card-cream {
	background: linear-gradient(135deg, #fdf5e6 0%, #f7efe2 100%);
	border: 1px solid rgba(239, 217, 181, 0.5);
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.core-card-cream:hover {
	border-color: rgba(200, 160, 90, 0.3);
	box-shadow:
		0 0 0 1px rgba(200, 160, 90, 0.2),
		0 8px 32px rgba(200, 160, 90, 0.12),
		0 2px 8px rgba(0, 0, 0, 0.05);
}

/* ── Dark Cards ──────────────────────────────────────────── */
.core-card-dark {
	position: relative;
	background: linear-gradient(135deg, #070f1d 0%, #0a1628 60%, #071020 100%);
	border: 1px solid rgba(255, 255, 255, 0.07);
	transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.core-card-dark:hover {
	border-color: rgba(0, 124, 225, 0.22);
	box-shadow:
		0 0 0 1px rgba(0, 124, 225, 0.12),
		0 16px 48px rgba(0, 30, 80, 0.35);
}

.core-card-dark-alt {
	position: relative;
	background: linear-gradient(135deg, #0a1628 0%, #070f1d 60%, #0c1530 100%);
	border: 1px solid rgba(255, 255, 255, 0.07);
	transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.core-card-dark-alt:hover {
	border-color: rgba(0, 124, 225, 0.22);
	box-shadow:
		0 0 0 1px rgba(0, 124, 225, 0.12),
		0 16px 48px rgba(0, 30, 80, 0.35);
}

.core-dark-glow {
	position: absolute;
	top: -40px;
	right: -40px;
	width: 320px;
	height: 280px;
	background: radial-gradient(
		ellipse 60% 55% at 80% 20%,
		rgba(0, 124, 225, 0.14) 0%,
		rgba(0, 80, 200, 0.06) 45%,
		transparent 72%
	);
	pointer-events: none;
	z-index: 0;
}

.core-dark-glow-left {
	position: absolute;
	top: -40px;
	left: -40px;
	width: 280px;
	height: 260px;
	background: radial-gradient(
		ellipse 55% 50% at 20% 20%,
		rgba(0, 124, 225, 0.12) 0%,
		rgba(0, 80, 200, 0.05) 45%,
		transparent 72%
	);
	pointer-events: none;
	z-index: 0;
}

/* ── Dashboard Section ───────────────────────────────────── */
.core-dashboard-section {
	background: #f4f6fb;
}

.core-dashboard-bg-glow {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 600px;
	height: 300px;
	transform: translate(-50%, -50%);
	background: radial-gradient(
		ellipse 70% 60% at 50% 50%,
		rgba(0, 124, 225, 0.07) 0%,
		transparent 70%
	);
	pointer-events: none;
	filter: blur(20px);
}

.core-dashboard-card {
	background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(232,240,255,0.85) 100%);
	border: 1px solid rgba(255, 255, 255, 0.75);
	box-shadow:
		0 1px 0 rgba(255,255,255,0.9) inset,
		0 4px 24px rgba(0, 70, 180, 0.08),
		0 1px 4px rgba(0, 0, 0, 0.05);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
}

.core-dashboard-inner-glow {
	position: absolute;
	top: -60px;
	right: -60px;
	width: 340px;
	height: 300px;
	background: radial-gradient(
		ellipse 65% 55% at 80% 15%,
		rgba(0, 124, 225, 0.10) 0%,
		transparent 65%
	);
	pointer-events: none;
	z-index: 0;
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
	.reveal {
		opacity: 1;
		transform: none;
		transition: none;
	}

	.core-cta-ellipse {
		filter: blur(20px);
		opacity: 0.9;
	}
}
</style>
