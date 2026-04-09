<script setup lang="ts">
import { Motion } from "motion-v";
import EcosystemSvg from "@/components/services/core/EcosystemSvg.vue";
import GrowthSvg from "@/components/services/core/GrowthSvg.vue";
import HeroDots from "@/components/services/core/HeroDots.vue";
import IntegritySvg from "@/components/services/core/IntegritySvg.vue";
import OperationSvg from "@/components/services/core/OperationSvg.vue";
import StrategicSvg from "@/components/services/core/StrategicSvg.vue";
import SafariMockup from "@/components/ui/safari-mockup/SafariMockup.vue";
import dashboardSvg from "@/assets/images/services/core/dashboardh.svg?url";
import { Button } from "@/components/ui/button";

useHead({
	title: "Core Services - Rockads",
});

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
		<section class="relative overflow-hidden bg-[#f7f9fb]">
			<HeroDots />
			<div class="relative mx-auto max-w-[1066px] space-y-8 px-5 pt-[140px] pb-12 text-center lg:px-0 lg:pt-[164px] lg:pb-16">
				<Motion
					as="h1"
					class="text-[40px] leading-[1.14] font-medium md:text-[48px] lg:text-[56px]"
					:initial="{ opacity: 0, y: 28 }"
					:animate="{ opacity: 1, y: 0 }"
					:transition="{ duration: 0.65, ease }"
				>
					<span class="text-primary">Core</span> <span class="text-text-base">Services</span>
				</Motion>
				<Motion
					as="div"
					class="space-y-4"
					:initial="{ opacity: 0, y: 20 }"
					:animate="{ opacity: 1, y: 0 }"
					:transition="{ duration: 0.55, delay: 0.12, ease }"
				>
					<p class="font-medium lg:text-lg">
						The Structure Behind Serious Expansion
					</p>
					<p class="max-w-[1066px] text-sm leading-relaxed lg:text-base">
						True global scale isn't just built on technology. It's built on a foundation of operational excellence. Rockads Core is the operational backbone for advertisers who refuse to slow down. We remove every obstacle that stands between you and sustainable global growth: financial friction, operational gaps, compliance risks, and platform complexity. What remains is a clear, stable path to scale, backed by infrastructure, not promises.
					</p>
				</Motion>
				<Motion
					as="div"
					:initial="{ opacity: 0, y: 16 }"
					:animate="{ opacity: 1, y: 0 }"
					:transition="{ duration: 0.5, delay: 0.25, ease }"
				>
					<Button
						as-child
					>
						<NuxtLink
							to="/sign-up"
							class="px-10! py-6"
						>
							Get Started in Minutes
						</NuxtLink>
					</Button>
				</Motion>
			</div>
		</section>

		<!-- Service Cards -->
		<section class="bg-[#f7f9fb] px-5 lg:px-0">
			<div class="mx-auto flex max-w-[1141px] flex-col gap-6 lg:gap-8">
				<!-- Row 1: Financial Infrastructure + Growth Capacity -->
				<div class="grid gap-6 md:grid-cols-2 lg:gap-8">
					<!-- Financial Infrastructure -->
					<Motion
						as="div"
						class="flex min-w-0 flex-col overflow-hidden rounded-4xl bg-card p-8 lg:p-12"
						:initial="{ opacity: 0, y: 28 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:in-view-options="{ once: true, amount: 0.15 }"
						:transition="{ duration: 0.6, ease }"
					>
						<h2 class="text-2xl leading-tight font-medium lg:text-[32px]">
							Financial Infrastructure
						</h2>
						<p class="mt-3 text-base text-[#747a8e] lg:text-lg">
							Resilient foundations. Zero friction.
						</p>
						<p class="mt-5 text-sm leading-relaxed lg:text-base">
							Our financial infrastructure gives partners more room to operate, greater stability, and the flexibility to move fast. Versatile payment models, flexible settlement structures, compliance-first account foundations, and credit-backed continuity, engineered so your most ambitious moves are never constrained by cash mechanics.
						</p>
						<div class="mt-6 flex w-full flex-1 items-end justify-center overflow-hidden pb-2">
							<ServicesCoreFinancialSvg />
						</div>
					</Motion>

					<!-- Growth Capacity -->
					<Motion
						as="div"
						class="border-primary-light flex min-w-0 flex-col overflow-hidden rounded-4xl p-8 lg:p-12"
						style="background-color:#e8f4ff;"
						:initial="{ opacity: 0, y: 28 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:in-view-options="{ once: true, amount: 0.15 }"
						:transition="{ duration: 0.6, delay: 0.12, ease }"
					>
						<h2 class="text-2xl leading-tight font-medium lg:text-[32px]">
							Growth Capacity
						</h2>
						<p class="mt-3 text-base text-[#747a8e] lg:text-lg">
							Scale without ceilings.
						</p>
						<p class="mt-5 text-sm leading-relaxed lg:text-base">
							An operating environment designed to absorb expansion without bottlenecks. New markets, increased spend, new accounts. Core's infrastructure scales with you, never against you. There are no artificial limits on where or how fast you can grow.
						</p>
						<div class="mt-6 flex w-full flex-1 items-end justify-center overflow-hidden">
							<GrowthSvg />
						</div>
					</Motion>
				</div>

				<!-- Row 2: Operational Continuity (full width, dark) -->
				<Motion
					as="div"
					class="grid gap-8 overflow-hidden rounded-2xl border border-white/10 bg-surface-dark px-8 pt-8 md:grid-cols-2 lg:gap-12 lg:px-12 lg:pt-12"
					:initial="{ opacity: 0, y: 32 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:in-view-options="{ once: true, amount: 0.1 }"
					:transition="{ duration: 0.65, ease }"
				>
					<div class="flex min-w-0 flex-col pb-8 lg:pb-12">
						<h2 class="text-2xl leading-tight font-medium text-white lg:text-[32px]">
							Operational Continuity
						</h2>
						<p class="mt-3 text-base font-medium text-white lg:text-lg ">
							Always on. No exceptions.
						</p>
						<p class="mt-5 text-sm leading-relaxed text-white/80 lg:text-base">
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
								<span class="text-sm text-white lg:text-base">{{ item }}</span>
							</li>
						</ul>
					</div>
					<div class="flex min-w-0 items-center justify-center overflow-hidden">
						<OperationSvg />
					</div>
				</Motion>

				<!-- Row 3: Strategic Support (dark, reversed layout) -->
				<Motion
					as="div"
					class="grid gap-8 overflow-hidden rounded-2xl border border-white/10 bg-surface-dark p-8 md:grid-cols-2 lg:gap-12 lg:p-12"
					:initial="{ opacity: 0, y: 32 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:in-view-options="{ once: true, amount: 0.1 }"
					:transition="{ duration: 0.65, ease }"
				>
					<div class="order-2 flex min-w-0 items-center justify-center overflow-hidden md:order-1">
						<StrategicSvg />
					</div>
					<div class="order-1 flex min-w-0 flex-col md:order-2">
						<h2 class="text-2xl leading-tight font-medium text-white lg:text-[32px]">
							Strategic Support
						</h2>
						<p class="mt-3 text-base font-medium text-white lg:text-lg">
							Partnership in practice.
						</p>
						<p class="mt-5 text-sm leading-relaxed text-white/80 lg:text-base">
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
								<span class="text-sm text-white lg:text-base">{{ item }}</span>
							</li>
						</ul>
					</div>
				</Motion>

				<!-- Row 4: Ecosystem Alignment + Integrity Framework -->
				<div class="grid gap-6 md:grid-cols-2 lg:gap-8">
					<!-- Ecosystem Alignment -->
					<Motion
						as="div"
						class="border-primary-light flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-white p-8 lg:p-12"
						:initial="{ opacity: 0, y: 28 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:in-view-options="{ once: true, amount: 0.15 }"
						:transition="{ duration: 0.6, ease }"
					>
						<h2 class="text-text-base text-2xl leading-tight font-medium lg:text-[32px]">
							Ecosystem Alignment
						</h2>
						<p class="text-text-gray-dark mt-3 text-base font-medium lg:text-lg">
							Connected by design.
						</p>
						<p class="text-text-base mt-5 text-sm leading-relaxed lg:text-base">
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
								<span class="text-text-gray-dark text-sm lg:text-base">{{ item }}</span>
							</li>
						</ul>
						<div class="mt-8 flex w-full flex-1 items-end overflow-hidden">
							<EcosystemSvg />
						</div>
					</Motion>

					<!-- Integrity Framework -->
					<Motion
						as="div"
						class="border-primary-light flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-white p-8 lg:p-12"
						:initial="{ opacity: 0, y: 28 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:in-view-options="{ once: true, amount: 0.15 }"
						:transition="{ duration: 0.6, delay: 0.12, ease }"
					>
						<h2 class="text-text-base text-2xl leading-tight font-medium lg:text-[32px]">
							Integrity Framework
						</h2>
						<p class="text-text-gray-dark mt-3 text-base font-medium lg:text-lg">
							Built to last.
						</p>
						<p class="text-text-base mt-5 text-sm leading-relaxed lg:text-base">
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
								<span class="text-text-gray-dark text-sm lg:text-base">{{ item }}</span>
							</li>
						</ul>
						<div class="mt-8 flex w-full flex-1 items-end justify-center overflow-hidden">
							<IntegritySvg />
						</div>
					</Motion>
				</div>
			</div>
		</section>

		<!-- Dashboard -->
		<section class="bg-[#f7f9fb] px-5 pt-12 pb-12 lg:px-0 lg:pt-20 lg:pb-20">
			<Motion
				as="div"
				class="border-primary-light mx-auto grid max-w-[1140px] gap-8 rounded-2xl border bg-white p-8 md:grid-cols-[380px_1fr] lg:gap-12 lg:p-12"
				:initial="{ opacity: 0, y: 32 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.1 }"
				:transition="{ duration: 0.65, ease }"
			>
				<div class="flex flex-col">
					<h2 class="text-text-base text-2xl leading-tight font-medium lg:text-[32px]">
						Rockads Dashboard
					</h2>
					<p class="text-text-gray-dark mt-3 text-lg font-medium italic">
						Every service. One screen. Full control.
					</p>
					<p class="text-text-base mt-5 text-sm leading-relaxed lg:text-base">
						Every layer of Rockads Core, your financial infrastructure, account health, operational workflows, team access, and performance data, managed from a single, purpose-built interface. The Rockads Dashboard doesn't replace what we do. It gives you full visibility and control over everything we provide.
					</p>
					<ul class="mt-6 flex flex-col gap-3">
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
							<span class="text-text-gray-dark text-sm lg:text-base">{{ item }}</span>
						</li>
					</ul>
					<div class="flex items-start justify-center">
						<SafariMockup
							url="console.rockads.com/"
							:image-src="dashboardSvg"
							class="w-full"
						/>
					</div>
				</div>
			</Motion>
		</section>

		<!-- CTA -->
		<section class="bg-white px-5 py-16 lg:py-20">
			<Motion
				as="div"
				class="mx-auto max-w-[800px] space-y-10 text-center"
				:initial="{ opacity: 0, y: 24 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.3 }"
				:transition="{ duration: 0.6, ease }"
			>
				<h2 class="text-text-base text-[32px] leading-[1.2] font-medium lg:text-[40px]">
					Built for growth that holds.<br> Discuss Your Growth Plan
				</h2>
				<Button
					as-child
				>
					<NuxtLink
						to="/sign-up"
						class="px-10! py-6"
					>
						Get Started in Minutes
					</NuxtLink>
				</Button>
			</Motion>
		</section>

		<HomeCta />

		<TheFooter />
	</div>
</template>
