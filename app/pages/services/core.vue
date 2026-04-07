<script setup lang="ts">
import {
	IconBolt,
	IconBuildingStore,
	IconChartLine,
	IconCheck,
	IconCoin,
	IconCreditCard,
	IconRefresh,
	IconShieldCheck,
	IconTrendingUp,
	IconUsers,
	IconWorld,
} from "@tabler/icons-vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CoreServicesDashboardMock from "@/components/CoreServicesDashboardMock.vue";
import techMetaPath from "@/assets/images/services/tech/meta.svg?url";
import techGooglePath from "@/assets/images/services/tech/google.svg?url";
import techTikTokPath from "@/assets/images/services/tech/tiktok.svg?url";
import techXPath from "@/assets/images/services/tech/x-twitter.svg?url";
import techSnapchatPath from "@/assets/images/services/tech/snapchat.svg?url";

useHead({
	title: "Core Services - Rockads",
});

const platformLogos = [
	{ name: "Meta", src: techMetaPath },
	{ name: "Google", src: techGooglePath },
	{ name: "TikTok", src: techTikTokPath },
	{ name: "X", src: techXPath },
	{ name: "Snapchat", src: techSnapchatPath },
];

const financialPills = [
	{ label: "Payment", icon: IconCreditCard },
	{ label: "Speed", icon: IconBolt },
	{ label: "Compliance", icon: IconShieldCheck },
	{ label: "Credit", icon: IconCoin },
	{ label: "Settlement", icon: IconRefresh },
	{ label: "Stability", icon: IconChartLine },
] as const;

const growthRows = [
	{ label: "Increasing budgets", icon: IconTrendingUp },
	{ label: "New accounts", icon: IconUsers },
	{ label: "New markets", icon: IconBuildingStore },
] as const;

const operationalBullets = [
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

const strategicOrbitLabels = [
	"Direct Operational Access",
	"Platform-Level Expertise",
	"Market-Specific Strategy",
	"True Partnership",
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

const integrityOrbitLabels = [
	"Layered Protection",
	"Proactive Defense",
	"Built Control",
	"Platform-Aware",
	"Stable Systems",
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
		<section class="relative overflow-hidden bg-white">
			<TechServicesDotGridCanvas />
			<div class="relative mx-auto max-w-[1066px] px-5 pt-[140px] pb-12 text-center lg:px-0 lg:pt-[164px] lg:pb-16">
				<h1 class="text-[40px] leading-[1.14] md:text-[48px] lg:text-[56px]">
					<span class="text-primary">Core</span> <span class="text-text-base">Services</span>
				</h1>
				<p class="mt-4 text-base font-medium text-foreground lg:mt-5 lg:text-lg">
					The Structure Behind Serious Expansion
				</p>
				<p class="mt-6 max-w-[1066px] text-sm leading-relaxed lg:mt-8 lg:text-base">
					True global scale isn't just built on technology. It's built on a foundation of operational excellence. Rockads Core is the operational backbone for advertisers who refuse to slow down. We remove every obstacle that stands between you and sustainable global growth: financial friction, operational gaps, compliance risks, and platform complexity. What remains is a clear, stable path to scale, backed by infrastructure, not promises.
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

		<!-- Financial + Growth -->
		<section class="bg-muted/80 px-5 py-12 lg:px-0 lg:py-16">
			<div class="mx-auto grid max-w-[1140px] gap-6 md:grid-cols-2 lg:gap-8">
				<div class="border-primary-light flex flex-col overflow-hidden rounded-4xl border bg-card">
					<div class="p-8 lg:p-12">
						<h2 class="text-2xl leading-tight lg:text-[32px]">
							Financial Infrastructure
						</h2>
						<p class="mt-3 text-base text-muted-foreground">
							Resilient foundations. Zero friction.
						</p>
						<p class="mt-6 text-sm leading-relaxed lg:text-base">
							Our financial infrastructure gives partners more room to operate, greater stability, and the flexibility to move fast. Versatile payment models, flexible settlement structures, compliance-first account foundations, and credit-backed continuity, engineered so your most ambitious moves are never constrained by cash mechanics.
						</p>
					</div>
					<div class="border-t border-border p-4 lg:p-6">
						<div class="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-muted/60">
							<div class="absolute inset-[12%] rounded-full border border-primary/20 bg-primary/5" />
							<div class="absolute inset-[22%] rounded-full border border-primary/15" />
							<div class="absolute inset-[32%] rounded-full border border-primary/10" />
							<div class="relative z-10 flex flex-wrap items-center justify-center gap-2 px-4">
								<Badge
									v-for="pill in financialPills"
									:key="pill.label"
									variant="secondary"
									class="gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium shadow-sm"
								>
									<component
										:is="pill.icon"
										class="size-3.5 text-primary"
										stroke-width="1.5"
									/>
									{{ pill.label }}
								</Badge>
							</div>
						</div>
					</div>
				</div>

				<div class="border-primary-light flex flex-col overflow-hidden rounded-4xl border bg-card">
					<div class="p-8 lg:p-12">
						<h2 class="text-2xl leading-tight lg:text-[32px]">
							Growth Capacity
						</h2>
						<p class="mt-3 text-base text-muted-foreground">
							Scale without ceilings.
						</p>
						<p class="mt-6 text-sm leading-relaxed lg:text-base">
							An operating environment designed to absorb expansion without bottlenecks. New markets, increased spend, new accounts. Core's infrastructure scales with you, never against you. There are no artificial limits on where or how fast you can grow.
						</p>
					</div>
					<div class="border-t border-border p-4 lg:p-6">
						<div class="relative flex min-h-[280px] flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl bg-muted/60 px-6 py-8">
							<div class="relative flex size-44 items-center justify-center rounded-full border border-primary/20 bg-linear-to-b from-primary/10 to-transparent shadow-inner md:size-52">
								<IconWorld
									class="size-16 text-primary md:size-20"
									stroke-width="1.25"
								/>
							</div>
							<div class="flex w-full max-w-[220px] flex-col gap-3">
								<div
									v-for="row in growthRows"
									:key="row.label"
									class="flex items-center gap-3 rounded-full border border-border bg-background px-3 py-2 text-sm shadow-sm"
								>
									<component
										:is="row.icon"
										class="size-5 shrink-0 text-primary"
										stroke-width="1.5"
									/>
									{{ row.label }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Operational continuity -->
		<section class="bg-muted/80 px-5 pb-12 lg:px-0 lg:pb-16">
			<div class="mx-auto grid max-w-[1140px] gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,546px)] md:items-stretch lg:gap-8">
				<div class="border-primary-light flex flex-col justify-center rounded-4xl border bg-card p-8 lg:p-12">
					<h2 class="text-2xl leading-tight lg:text-[32px]">
						Operational Continuity
					</h2>
					<p class="mt-3 text-base text-muted-foreground">
						Always on. No exceptions.
					</p>
					<p class="mt-6 text-sm leading-relaxed lg:text-base">
						Instant, 24/7 top-up support that eliminates the waiting game. When campaigns are live and budgets need to move, we ensure operations keep running. Not tomorrow, not next shift. Now.
					</p>
					<ul class="mt-8 flex flex-col gap-4">
						<li
							v-for="line in operationalBullets"
							:key="line"
							class="flex gap-3 text-sm leading-normal lg:text-base"
						>
							<IconCheck
								class="mt-0.5 size-5 shrink-0 text-primary"
								stroke-width="2"
							/>
							<span>{{ line }}</span>
						</li>
					</ul>
				</div>
				<div class="border-primary-light relative min-h-[280px] overflow-hidden rounded-4xl border bg-surface-dark md:min-h-[320px]">
					<div class="absolute inset-0 opacity-[0.35]">
						<TechServicesDotGridCanvas variant="lightCard" />
					</div>
					<div class="relative z-10 flex h-full min-h-[280px] items-center justify-center p-8 md:min-h-[320px]">
						<div class="flex size-44 items-center justify-center rounded-full border-2 border-primary/50 bg-primary/10 shadow-[0_0_60px_rgb(31_113_234/0.25)]">
							<IconBolt
								class="size-14 text-primary"
								stroke-width="1.25"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Strategic support + diagram -->
		<section class="bg-muted/80 px-5 pb-12 lg:px-0 lg:pb-16">
			<div class="mx-auto grid max-w-[1140px] gap-6 md:grid-cols-2 md:items-stretch lg:gap-8">
				<div class="border-primary-light order-2 overflow-hidden rounded-4xl border bg-card md:order-1">
					<div class="relative flex min-h-[300px] items-center justify-center bg-muted/50 p-8 md:min-h-[360px]">
						<div class="absolute inset-6 rounded-full border border-primary/10 md:inset-10" />
						<div class="absolute inset-[18%] rounded-full border border-primary/15 md:inset-[22%]" />
						<div class="absolute inset-[30%] rounded-full border border-primary/20 bg-card/80 shadow-sm md:inset-[34%]" />
						<div class="relative z-10 flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary md:size-20">
							<IconUsers
								class="size-8 md:size-10"
								stroke-width="1.25"
							/>
						</div>
						<Badge
							v-for="(label, i) in strategicOrbitLabels"
							:key="label"
							variant="secondary"
							class="core-strategic-pill pointer-events-none absolute rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-medium shadow-md md:text-xs"
							:style="{
								'--pill-rotate': `${i * 90}deg`,
								'--pill-r': 'min(42vw, 200px)',
							}"
						>
							{{ label }}
						</Badge>
					</div>
				</div>
				<div class="md:border-primary-light order-1 flex flex-col justify-center rounded-4xl border border-transparent bg-transparent p-0 md:order-2 md:bg-card md:p-8 lg:p-12">
					<h2 class="text-2xl leading-tight lg:text-[32px]">
						Strategic Support
					</h2>
					<p class="mt-3 text-base text-muted-foreground">
						Partnership in practice.
					</p>
					<p class="mt-6 text-sm leading-relaxed lg:text-base">
						Software alone is not a strategy. A dedicated team supports your growth with real-world operational experience and a commitment to long-term alignment. Not a helpdesk. A growth partner that understands your business, your markets, and your goals.
					</p>
					<ul class="mt-8 flex flex-col gap-4">
						<li
							v-for="line in strategicBullets"
							:key="line"
							class="flex gap-3 text-sm leading-normal lg:text-base"
						>
							<IconCheck
								class="mt-0.5 size-5 shrink-0 text-primary"
								stroke-width="2"
							/>
							<span>{{ line }}</span>
						</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Ecosystem + Integrity -->
		<section class="bg-muted/80 px-5 pb-12 lg:px-0 lg:pb-20">
			<div class="mx-auto grid max-w-[1140px] gap-6 lg:grid-cols-2 lg:gap-8">
				<div class="border-primary-light flex flex-col overflow-hidden rounded-4xl border bg-card">
					<div class="p-8 lg:p-12">
						<h2 class="text-2xl leading-tight lg:text-[32px]">
							Ecosystem Alignment
						</h2>
						<p class="mt-3 text-base text-muted-foreground">
							Connected by design.
						</p>
						<p class="mt-6 text-sm leading-relaxed lg:text-base">
							Our platform relationships and deep understanding of the digital advertising ecosystem are brought together in one cohesive structure. We are positioned at the center of global ad infrastructure, and we bring that advantage to you.
						</p>
						<ul class="mt-8 flex flex-col gap-4">
							<li
								v-for="line in ecosystemBullets"
								:key="line"
								class="flex gap-3 text-sm leading-normal lg:text-base"
							>
								<IconCheck
									class="mt-0.5 size-5 shrink-0 text-primary"
									stroke-width="2"
								/>
								<span>{{ line }}</span>
							</li>
						</ul>
					</div>
					<div class="border-t border-border p-4 lg:p-6">
						<div class="flex min-h-[260px] flex-col items-center justify-center gap-6 rounded-2xl bg-muted/60 px-6 py-10">
							<div class="flex flex-wrap items-center justify-center gap-4">
								<img
									v-for="p in platformLogos"
									:key="p.name"
									:src="p.src"
									:alt="p.name"
									class="h-8 opacity-90 grayscale transition-opacity hover:opacity-100 hover:grayscale-0 md:h-9"
								>
							</div>
							<p class="max-w-sm text-center text-xs leading-relaxed text-muted-foreground md:text-sm">
								Integrated operations across the platforms that matter for global performance marketing.
							</p>
						</div>
					</div>
				</div>

				<div class="border-primary-light flex flex-col overflow-hidden rounded-4xl border bg-card">
					<div class="p-8 lg:p-12">
						<h2 class="text-2xl leading-tight lg:text-[32px]">
							Integrity Framework
						</h2>
						<p class="mt-3 text-base text-muted-foreground">
							Built to last.
						</p>
						<p class="mt-6 text-sm leading-relaxed lg:text-base">
							Operational safeguards that protect consistency, clarity, and long-term platform health. Compliance isn't left to chance. It's built into every layer.
						</p>
						<ul class="mt-8 flex flex-col gap-4">
							<li
								v-for="line in integrityBullets"
								:key="line"
								class="flex gap-3 text-sm leading-normal lg:text-base"
							>
								<IconCheck
									class="mt-0.5 size-5 shrink-0 text-primary"
									stroke-width="2"
								/>
								<span>{{ line }}</span>
							</li>
						</ul>
					</div>
					<div class="border-t border-border p-4 lg:p-6">
						<div class="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-muted/60">
							<div class="absolute size-[min(72vw,290px)] rounded-full border border-primary/15 bg-linear-to-b from-primary/5 to-transparent" />
							<div class="relative z-10 flex flex-col items-center gap-4">
								<div class="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg md:size-24">
									<IconCheck
										class="size-10 md:size-12"
										stroke-width="2.5"
									/>
								</div>
								<div class="flex max-w-[280px] flex-wrap justify-center gap-2">
									<Badge
										v-for="tag in integrityOrbitLabels"
										:key="tag"
										variant="outline"
										class="rounded-full px-2.5 py-1 text-[10px] font-medium md:text-xs"
									>
										{{ tag }}
									</Badge>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Rockads Dashboard -->
		<section class="bg-muted/80 px-5 pb-12 lg:px-0 lg:pb-20">
			<div class="mx-auto grid max-w-[1140px] gap-10 overflow-hidden rounded-4xl border border-border bg-card p-8 shadow-sm lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-12 lg:p-12">
				<div>
					<h2 class="text-2xl leading-tight lg:text-[32px]">
						Rockads Dashboard
					</h2>
					<p class="mt-3 text-base text-muted-foreground">
						Every service. One screen. Full control.
					</p>
					<p class="mt-6 text-sm leading-relaxed lg:text-base">
						Every layer of Rockads Core, your financial infrastructure, account health, operational workflows, team access, and performance data, managed from a single, purpose-built interface. The Rockads Dashboard doesn't replace what we do. It gives you full visibility and control over everything we provide.
					</p>
					<ul class="mt-8 flex flex-col gap-4">
						<li
							v-for="line in dashboardBullets"
							:key="line"
							class="flex gap-3 text-sm leading-normal lg:text-base"
						>
							<IconCheck
								class="mt-0.5 size-5 shrink-0 text-primary"
								stroke-width="2"
							/>
							<span>{{ line }}</span>
						</li>
					</ul>
				</div>
				<div class="min-w-0 lg:pt-2">
					<CoreServicesDashboardMock />
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section class="bg-background px-5 py-16 lg:py-20">
			<div class="border-primary-light mx-auto max-w-[1140px] rounded-4xl border bg-card px-8 py-12 text-center lg:px-12 lg:py-14">
				<h2 class="text-[28px] leading-tight font-semibold lg:text-[36px]">
					Built for growth that holds.<br>
					Discuss Your Growth Plan
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

		<section class="core-closing relative overflow-hidden px-5 py-20 lg:py-28">
			<div
				class="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[260px] w-[300px] max-w-[calc(100%+2rem)] -translate-x-1/2 -translate-y-1/2 md:h-[350px] md:w-[400px] lg:h-[458px] lg:w-[536px]"
				aria-hidden="true"
			>
				<div class="core-closing-ellipse size-full rounded-full" />
			</div>
			<div class="relative z-10 mx-auto flex max-w-[492px] flex-col items-center gap-9 text-center">
				<p class="text-sm leading-5 text-(--core-closing-kicker) lg:text-base">
					THE ONLY PARTNER YOU'LL EVER NEED.
				</p>
				<h2 class="w-full max-w-[536px] text-white">
					<p class="text-[40px] leading-[48px] font-normal md:text-[52px] md:leading-[60px] lg:text-[68px] lg:leading-[72px]">
						Stable.
					</p>
					<p class="text-[40px] leading-[48px] md:text-[52px] md:leading-[60px] lg:text-[68px] lg:leading-[72px]">
						<em class="core-closing-enduring text-(--core-closing-accent)">Enduring.</em>
					</p>
					<p class="text-[40px] leading-[48px] font-normal md:text-[52px] md:leading-[60px] lg:text-[68px] lg:leading-[72px]">
						Limitless.
					</p>
				</h2>
				<p class="max-w-[372px] text-sm leading-5 text-(--core-closing-description)">
					When others come and go, we'll still be here. Join the infrastructure built to last.
				</p>
			</div>
		</section>

		<TheFooter />
	</div>
</template>

<style scoped>
.core-strategic-pill {
	transform: rotate(var(--pill-rotate)) translateY(calc(-1 * var(--pill-r))) rotate(calc(-1 * var(--pill-rotate)));
}

.core-closing {
	--core-closing-bg: #080b0f;
	--core-closing-kicker: #898fa5;
	--core-closing-accent: #f6ca9a;
	--core-closing-description: #9fa6bb;
	background-color: var(--core-closing-bg);
}

.core-closing-enduring {
	font-family: var(--font-fraunces);
	font-style: italic;
	font-weight: 700;
	font-variation-settings: "SOFT" 0, "WONK" 1;
}

.core-closing-ellipse {
	background: radial-gradient(
		ellipse 75% 72% at 50% 50%,
		rgb(38 56 94 / 52%) 0%,
		rgb(38 56 94 / 16%) 45%,
		rgb(8 11 15 / 0%) 72%
	);
	filter: blur(40px);
}

@media (prefers-reduced-motion: reduce) {
	.core-closing-ellipse {
		filter: blur(20px);
		opacity: 0.9;
	}
}
</style>
