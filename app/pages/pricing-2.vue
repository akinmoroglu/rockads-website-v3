<script setup lang="ts">
import HomeCta from "@/components/home/home-cta.vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import imgTiktokUrl from "@/assets/icons/brands/tiktok-wordmark.svg?url";
import imgMetaUrl from "@/assets/icons/brands/meta-wordmark.svg?url";
import imgGoogleUrl from "@/assets/icons/brands/google-ads-wordmark.svg?url";

import { onMounted } from "vue";
import { useRouter } from "vue-router";

useHead({
	title: "Pricing - Rockads",
});

definePageMeta({
	layout: "marketing",
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

const router = useRouter();

onMounted(() => {
	router.push("/plans");
});
</script>

<template>
	<main>
		<!-- Hero -->
		<section class="relative overflow-hidden bg-slate-50">
			<TechServicesDotGridCanvas />
			<div class="relative mx-auto max-w-[1066px] px-5 pt-[140px] pb-12 text-center lg:px-0 lg:pt-[164px] lg:pb-16">
				<h1 class="text-[40px] leading-[1.14] font-medium md:text-[48px] lg:text-[56px]">
					<span class="text-primary">Rockads</span> <span class="text-foreground">Pricing</span>
				</h1>
				<p class="mt-4 text-base font-medium text-foreground lg:mt-5 lg:text-lg">
					The Plan for Every Stage of Growth
				</p>
				<p class="mx-auto mt-6 max-w-[780px] text-sm leading-relaxed text-muted-foreground lg:mt-8 lg:text-base">
					From your first campaign to enterprise scale — Rockads gives you the tools, the infrastructure, and the partner support to grow without friction. Choose the plan that fits where you are today, and upgrade as you accelerate.
				</p>
				<Button
					as-child
					size="lg"
					class="mt-8 lg:mt-10"
				>
					<NuxtLink to="/register">
						Get Started Free
					</NuxtLink>
				</Button>
			</div>
		</section>

		<!-- Rockads Plans Section -->
		<section class="w-full bg-slate-50 py-12 sm:py-16">
			<div class="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-[150px]">
				<!-- Section header -->
				<div class="mb-8 flex flex-col items-center gap-3 text-center sm:mb-10">
					<Badge
						variant="secondary"
						class="bg-slate-200 px-3 py-1 text-xs font-semibold tracking-widest text-slate-700 uppercase"
					>
						Plans
					</Badge>
					<h2 class="text-3xl font-semibold text-foreground sm:text-4xl">
						Rockads Plans
					</h2>
					<p class="max-w-xl text-sm text-muted-foreground">
						Boost your advertising strategy with Rockads. Choose the plan that suits your needs and manage your campaigns efficiently.
					</p>
				</div>

				<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
					<!-- Rockads Free Card -->
					<div class="flex flex-col gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
						<div class="flex flex-col gap-1">
							<h2 class="text-2xl font-bold text-foreground sm:text-3xl">
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
								<hr class="border-slate-200">
							</div>

							<ul class="flex flex-col gap-5">
								<!-- Platform access feature -->
								<li class="flex items-start gap-3">
									<svg
										class="mt-0.5 size-4 shrink-0 text-slate-500"
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
										<div class="flex items-center gap-4">
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
										class="size-4 shrink-0 text-slate-500"
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
							<div class="inline-flex w-fit items-center rounded-full bg-slate-100 px-5 py-1.5">
								<span class="text-base font-bold text-slate-700">Free</span>
							</div>
							<button
								test-id="pricing-free-contact-button"
								type="button"
								class="flex h-12 w-full items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
							>
								Contact Us
							</button>
						</div>
					</div>

					<!-- Rockads Partner Card -->
					<div class="flex flex-col gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
						<div class="flex flex-col gap-1">
							<h2 class="text-2xl font-bold text-foreground sm:text-3xl">
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
							<hr class="border-slate-200">
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

							<hr class="border-slate-200">

							<div class="flex flex-col gap-2">
								<p class="text-sm font-semibold text-foreground">
									Sales Partnership
								</p>
								<p class="text-sm leading-relaxed text-muted-foreground">
									Create a sales platform for your services, define sales strategies, and design revenue-sharing partnerships including payment solutions.
								</p>
							</div>
						</div>

						<button
							test-id="pricing-partner-contact-button"
							type="button"
							class="flex h-12 w-full items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
						>
							Contact Us
						</button>
					</div>
				</div>
			</div>
		</section>

		<!-- Pricing Cards Section -->
		<section class="bg-slate-900 px-4 py-14 sm:px-6 sm:py-16 lg:px-[150px] lg:py-20">
			<div class="mb-10 flex flex-col items-center gap-3 text-center sm:mb-14">
				<Badge
					variant="secondary"
					class="bg-slate-800 px-3 py-1 text-xs font-semibold tracking-widest text-slate-200 uppercase"
				>
					Pricing
				</Badge>
				<h2 class="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
					Simple, transparent pricing
				</h2>
				<p class="max-w-lg text-sm text-slate-300 sm:text-base">
					Start for free. Scale as you grow. No hidden fees.
				</p>
			</div>

			<div class="relative grid grid-cols-1 items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<template
					v-for="plan in plans"
					:key="plan.id"
				>
					<div
						class="relative flex flex-col gap-6 rounded-2xl p-6 transition-shadow"
						:class="{
							'bg-slate-950 shadow-sm ring-1 ring-slate-700/80': !plan.highlighted,
							'bg-slate-900 shadow-xl ring-1 ring-blue-400/40': plan.highlighted,
						}"
					>
						<!-- Most Popular Badge -->
						<div
							v-if="plan.highlighted"
							class="absolute -top-3.5 left-1/2 -translate-x-1/2"
						>
							<span class="inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold tracking-wide text-blue-200 shadow-sm ring-1 ring-blue-400/40">
								MOST POPULAR
							</span>
						</div>

						<!-- Plan Header -->
						<div class="flex flex-col gap-4 pt-2">
							<div class="flex flex-col gap-1">
								<h3
									class="text-lg font-semibold"
									:class="plan.highlighted ? 'text-white' : 'text-slate-100'"
								>
									{{ plan.name }}
								</h3>
								<p
									class="text-xs leading-relaxed"
									:class="plan.highlighted ? 'text-white/70' : 'text-slate-300'"
								>
									{{ plan.description }}
								</p>
							</div>

							<div class="flex items-baseline gap-1.5">
								<span
									class="leading-none font-bold wrap-break-word"
									:class="[
										plan.id === 'enterprise' ? 'text-2xl' : 'text-4xl',
										plan.highlighted ? 'text-white' : 'text-slate-100',
									]"
								>
									{{ plan.price }}
								</span>
								<span
									v-if="plan.period"
									class="text-sm font-medium"
									:class="plan.highlighted ? 'text-white/70' : 'text-slate-400'"
								>{{ plan.period }}</span>
							</div>
						</div>

						<!-- Divider -->
						<hr :class="plan.highlighted ? 'border-white/20' : 'border-slate-700'">

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
										:class="plan.highlighted ? 'text-blue-200' : 'text-slate-300'"
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
										plan.highlighted ? 'text-white' : 'text-slate-100',
									]"
								>{{ feature.label }}</span>
							</div>
						</div>

						<!-- Ad Spend Fee Box -->
						<div
							v-if="plan.adSpendFee.free"
							class="rounded-xl p-3.5"
							:class="plan.highlighted ? 'bg-white/10' : 'bg-slate-800/70'"
						>
							<p
								class="mb-1.5 text-[10px] font-semibold tracking-widest uppercase"
								:class="plan.highlighted ? 'text-white/60' : 'text-slate-400'"
							>
								Ad Spend Fee
							</p>
							<div class="flex flex-col gap-0.5">
								<p
									class="text-xs font-medium"
									:class="plan.highlighted ? 'text-white/80' : 'text-slate-100'"
								>
									First <strong>{{ plan.adSpendFee.free }}</strong> managed free
								</p>
								<p
									class="text-xs font-medium"
									:class="plan.highlighted ? 'text-white/80' : 'text-slate-100'"
								>
									After: <strong :class="plan.highlighted ? 'text-blue-200' : 'text-slate-200'">{{ plan.adSpendFee.after }}</strong>
								</p>
							</div>
						</div>

						<!-- CTA Button -->
						<button
							:test-id="`pricing-${plan.id}-cta-button`"
							type="button"
							class="mt-auto flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
							:class="{
								'bg-slate-100 text-slate-900 hover:bg-white': !plan.highlighted,
								'bg-blue-500/20 text-blue-100 ring-1 ring-blue-400/40 hover:bg-blue-500/30': plan.highlighted,
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
