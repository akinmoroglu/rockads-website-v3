<script setup lang="ts">
import HomeCta from "@/components/home/home-cta.vue";
import { Badge } from "@/components/ui/badge";
import imgTiktokUrl from "@/assets/icons/brands/tiktok-wordmark.svg?url";
import imgMetaUrl from "@/assets/icons/brands/meta-wordmark.svg?url";
import imgGoogleUrl from "@/assets/icons/brands/google-ads-wordmark.svg?url";

useHead({
	title: "Plans - Rockads",
});

definePageMeta({
	layout: "marketing",
});

const gtmEvent = useGtmEvent();

onMounted(() => {
	gtmEvent.pageViewEvent("Plans - Rockads");
});

interface PricingFeature {
	label: string;
	included: boolean;
}

interface AdSpendFee {
	free: string;
	after: string;
}

interface PricingPlan {
	id: string;
	name: string;
	price: string;
	period: string;
	description: string;
	features: PricingFeature[];
	adSpendFee: AdSpendFee;
	ctaLabel: string;
	highlighted: boolean;
}

const plans: PricingPlan[] = [
	{
		id: "free",
		name: "Free",
		price: "$0",
		period: "/forever",
		description: "Best for trying the platform.",
		features: [
			{ label: "3 Automations", included: true },
			{ label: "Frequency: every 6 hours", included: true },
			{ label: "20 Ads created / month", included: true },
			{ label: "AI Agent", included: false },
			{ label: "50 AI Credits / month", included: true },
		],
		adSpendFee: { free: "$2,500", after: "1.5%" },
		ctaLabel: "Get Started Free",
		highlighted: false,
	},
	{
		id: "starter",
		name: "Starter",
		price: "$49",
		period: "/month",
		description: "Best for small teams starting to scale.",
		features: [
			{ label: "20 Automations", included: true },
			{ label: "Frequency: every 2 hours", included: true },
			{ label: "150 Ads created / month", included: true },
			{ label: "AI Agent", included: false },
			{ label: "750 AI Credits / month", included: true },
		],
		adSpendFee: { free: "$2,500", after: "1.25%" },
		ctaLabel: "Get Started Free",
		highlighted: false,
	},
	{
		id: "pro",
		name: "Pro",
		price: "$199",
		period: "/month",
		description: "For high-scale advertising operations.",
		features: [
			{ label: "150 Automations", included: true },
			{ label: "Frequency: every 15 minutes", included: true },
			{ label: "1,000 Ads created / month", included: true },
			{ label: "AI Agent", included: false },
			{ label: "7,500 AI Credits / month", included: true },
		],
		adSpendFee: { free: "$40,000", after: "0.75%" },
		ctaLabel: "Get Started Free",
		highlighted: true,
	},
	{
		id: "enterprise",
		name: "Enterprise",
		price: "Custom pricing",
		period: "",
		description: "For large teams and agencies.",
		features: [
			{ label: "Unlimited Automations", included: true },
			{ label: "Unlimited Ads created", included: true },
			{ label: "Advanced automation scheduling", included: true },
			{ label: "Custom AI credit packages", included: false },
			{ label: "Dedicated support", included: true },
			{ label: "SLA & custom integrations", included: true },
		],
		adSpendFee: { free: "", after: "" },
		ctaLabel: "Contact sales",
		highlighted: false,
	},
];
</script>

<template>
	<main>
		<!-- Hero -->
		<section class="relative overflow-hidden bg-white">
			<TechServicesDotGridCanvas />
			<div class="relative mx-auto flex max-w-[1066px] flex-col items-center px-5 pt-[140px] pb-12 text-center lg:px-0 lg:pt-[164px] lg:pb-16">
				<Badge
					variant="secondary"
					class="px-3 py-1 text-xs font-semibold tracking-widest uppercase"
				>
					Plans
				</Badge>
				<h1 class="mt-4 text-[40px] leading-[1.14] font-medium md:text-[48px] lg:text-[56px]">
					<span class="text-primary">Rockads</span> <span class="text-foreground">Plans</span>
				</h1>
				<p class="mx-auto mt-6 max-w-[780px] text-sm leading-relaxed text-muted-foreground lg:mt-8 lg:text-base">
					Boost your advertising strategy with Rockads. Choose the plan that suits your needs and manage your campaigns efficiently.
				</p>
			</div>
		</section>

		<!-- Rockads Plans Section -->
		<section class="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-12 lg:py-16 xl:px-[150px]">
			<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<!-- Rockads Free Card -->
				<div class="flex flex-col gap-8 rounded-2xl border border-[#b8e8d4] bg-[#f0fcf8] p-6 lg:p-8">
					<div class="flex flex-col gap-1">
						<h2 class="text-2xl font-bold text-[#05cc85] lg:text-3xl">
							Rockads Free
						</h2>
						<p class="text-sm text-muted-foreground">
							Everything you need to get started
						</p>
					</div>

					<div class="flex flex-col gap-6">
						<div class="flex flex-col gap-3">
							<h3 class="text-base font-semibold text-foreground">
								What's Included
							</h3>
							<hr class="border-[#c2e8d8]">
						</div>

						<ul class="flex flex-col gap-5">
							<!-- Platform access feature -->
							<li class="flex items-start gap-3">
								<svg
									class="mt-0.5 size-4 shrink-0 text-[#05cc85]"
									viewBox="0 0 16 16"
									fill="none"
								>
									<circle
										cx="8"
										cy="8"
										r="7.5"
										stroke="currentColor"
									/>
									<path
										d="M5 8.5L7 10.5L11 6"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<div class="flex flex-col gap-2">
									<p class="text-sm text-foreground">
										Unlimited access to ad assets on all major platforms.
									</p>
									<div class="flex flex-wrap items-baseline gap-3">
										<img
											:src="imgTiktokUrl"
											alt="TikTok"
											class="h-6"
										>
										<img
											:src="imgMetaUrl"
											alt="Meta"
											class="h-6"
										>
										<img
											:src="imgGoogleUrl"
											alt="Google Ads"
											class="h-6"
										>
									</div>
								</div>
							</li>

							<li
								v-for="item in [
									'Creditline & Financial Solutions',
									'Rockads CRM unlimited access',
									'Strategic insights',
									'24/7 email support',
								]"
								:key="item"
								class="flex items-center gap-3"
							>
								<svg
									class="size-4 shrink-0 text-[#05cc85]"
									viewBox="0 0 16 16"
									fill="none"
								>
									<circle
										cx="8"
										cy="8"
										r="7.5"
										stroke="currentColor"
									/>
									<path
										d="M5 8.5L7 10.5L11 6"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<span class="text-sm text-foreground">{{ item }}</span>
							</li>
						</ul>
					</div>

					<div class="mt-auto flex flex-col gap-4">
						<div class="inline-flex w-fit items-center rounded-full bg-[#ccf2e7] px-5 py-1.5">
							<span class="text-base font-bold text-foreground">Free</span>
						</div>
						<NuxtLink
							test-id="plans-rockads-free-cta-button"
							to="/register"
							class="flex h-12 w-full items-center justify-center rounded-xl bg-[#00c088] text-sm font-semibold text-white transition-all hover:bg-[#00a876] active:scale-[0.98]"
						>
							Get Started Free
						</NuxtLink>
					</div>
				</div>

				<!-- Rockads Partner Card -->
				<div class="flex flex-col gap-8 rounded-2xl border border-[#e2d89a] bg-[#fffce7] p-6 lg:p-8">
					<div class="flex flex-col gap-1">
						<h2 class="text-2xl font-bold text-[#c2a441] lg:text-3xl">
							Rockads Partner
						</h2>
						<p class="text-sm text-muted-foreground">
							Strategic growth for your business
						</p>
					</div>

					<div class="flex flex-col gap-3">
						<h3 class="text-base font-semibold text-foreground">
							Options
						</h3>
						<hr class="border-[#e2d89a]">
					</div>

					<div class="flex flex-1 flex-col gap-6">
						<div class="flex flex-col gap-2">
							<p class="text-sm font-semibold text-foreground">
								Sales Strategy
							</p>
							<p class="text-sm leading-relaxed text-muted-foreground">
								Strategic growth planning, budget management, and media support for your business — <strong class="text-foreground">360-degree</strong> support to increase profitability.
							</p>
						</div>

						<hr class="border-[#e2d89a]">

						<div class="flex flex-col gap-2">
							<p class="text-sm font-semibold text-foreground">
								Sales Partnership
							</p>
							<p class="text-sm leading-relaxed text-muted-foreground">
								Create a sales platform for your services, define sales strategies, and design revenue-sharing partnerships including payment solutions.
							</p>
						</div>
					</div>

					<NuxtLink
						test-id="plans-rockads-partner-cta-button"
						to="/register"
						class="flex h-12 w-full items-center justify-center rounded-xl bg-[#c2a441] text-sm font-semibold text-white transition-all hover:bg-[#a88c36] active:scale-[0.98]"
					>
						Get Started Free
					</NuxtLink>
				</div>
			</div>
		</section>

		<!-- TODO: Pricing Cards Section temporarily hidden — re-enable when finalized. -->
		<section
			v-if="false"
			class="bg-muted/40 px-4 py-14 sm:px-6 lg:px-12 lg:py-20 xl:px-[150px]"
		>
			<div class="mb-14 flex flex-col items-center gap-3 text-center">
				<Badge
					variant="secondary"
					class="px-3 py-1 text-xs font-semibold tracking-widest uppercase"
				>
					Pricing
				</Badge>
				<h2 class="text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
					Simple, transparent pricing
				</h2>
				<p class="max-w-lg text-base text-muted-foreground">
					Start for free. Scale as you grow. No hidden fees.
				</p>
			</div>

			<div class="relative grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<template
					v-for="plan in plans"
					:key="plan.id"
				>
					<div
						class="relative flex flex-col gap-6 rounded-2xl p-6 transition-shadow"
						:class="{
							'bg-card shadow-sm ring-1 ring-border/60': !plan.highlighted,
							'bg-[#007ce1] shadow-xl ring-1 ring-[#007ce1]/20': plan.highlighted,
						}"
					>
						<!-- Most Popular Badge -->
						<div
							v-if="plan.highlighted"
							class="absolute -top-3.5 left-1/2 -translate-x-1/2"
						>
							<span class="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold tracking-wide text-[#007ce1] shadow-sm">
								MOST POPULAR
							</span>
						</div>

						<!-- Plan Header -->
						<div class="flex flex-col gap-4 pt-2">
							<div class="flex flex-col gap-1">
								<h3
									class="text-lg font-semibold"
									:class="plan.highlighted ? 'text-white' : 'text-foreground'"
								>
									{{ plan.name }}
								</h3>
								<p
									class="text-xs leading-relaxed"
									:class="plan.highlighted ? 'text-white/70' : 'text-muted-foreground'"
								>
									{{ plan.description }}
								</p>
							</div>

							<div class="flex items-baseline gap-1.5">
								<span
									class="leading-none font-bold"
									:class="[
										plan.id === 'enterprise' ? 'text-2xl' : 'text-4xl',
										plan.highlighted ? 'text-white' : 'text-foreground',
									]"
								>
									{{ plan.price }}
								</span>
								<span
									v-if="plan.period"
									class="text-sm font-medium"
									:class="plan.highlighted ? 'text-white/70' : 'text-muted-foreground'"
								>{{ plan.period }}</span>
							</div>
						</div>

						<!-- Divider -->
						<hr :class="plan.highlighted ? 'border-white/20' : 'border-border'">

						<!-- Features -->
						<div class="flex flex-col gap-3">
							<div
								v-for="feature in plan.features"
								:key="feature.label"
								class="flex items-center gap-2"
							>
								<template v-if="feature.included">
									<svg
										class="size-4 shrink-0"
										:class="plan.highlighted ? 'text-white' : 'text-[#007ce1]'"
										viewBox="0 0 16 16"
										fill="none"
									>
										<path
											d="M3.5 8.5L6.5 11.5L12.5 5.5"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</template>
								<template v-else>
									<svg
										class="size-4 shrink-0"
										:class="plan.highlighted ? 'text-white/40' : 'text-muted-foreground/50'"
										viewBox="0 0 16 16"
										fill="none"
									>
										<path
											d="M5 5L11 11M11 5L5 11"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
										/>
									</svg>
								</template>
								<span
									class="text-sm font-medium"
									:class="[
										!feature.included && 'line-through opacity-50',
										plan.highlighted ? 'text-white' : 'text-foreground',
									]"
								>{{ feature.label }}</span>
							</div>
						</div>

						<!-- Ad Spend Fee Box -->
						<div
							v-if="plan.adSpendFee.free"
							class="rounded-xl p-3.5"
							:class="plan.highlighted ? 'bg-white/10' : 'bg-muted/60'"
						>
							<p
								class="mb-1.5 text-[10px] font-semibold tracking-widest uppercase"
								:class="plan.highlighted ? 'text-white/60' : 'text-muted-foreground'"
							>
								Ad Spend Fee
							</p>
							<div class="flex flex-col gap-0.5">
								<p
									class="text-xs font-medium"
									:class="plan.highlighted ? 'text-white/80' : 'text-foreground'"
								>
									First <strong>{{ plan.adSpendFee.free }}</strong> managed free
								</p>
								<p
									class="text-xs font-medium"
									:class="plan.highlighted ? 'text-white/80' : 'text-foreground'"
								>
									After: <strong :class="plan.highlighted ? 'text-white' : 'text-[#007ce1]'">{{ plan.adSpendFee.after }}</strong>
								</p>
							</div>
						</div>

						<!-- CTA Button -->
						<button
							:test-id="`pricing-plan-${plan.id}-cta-button`"
							type="button"
							class="mt-auto flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
							:class="{
								'bg-foreground text-background hover:bg-foreground/90': !plan.highlighted,
								'bg-white text-[#007ce1] hover:bg-white/90': plan.highlighted,
							}"
						>
							{{ plan.ctaLabel }}
						</button>
					</div>
				</template>
			</div>
		</section>

		<!-- CTA / Numbers Section -->
		<HomeCta />
	</main>
</template>
