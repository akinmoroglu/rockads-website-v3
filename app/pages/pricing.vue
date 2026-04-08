<script setup lang="ts">
import HomeCta from "@/components/home/home-cta.vue";

useHead({
	title: "Pricing - Rockads",
});

definePageMeta({
	layout: "marketing",
});

const imgTiktok = "https://www.figma.com/api/mcp/asset/c4523e71-4d34-4bec-b012-79517d3548f8";
const imgMeta = "https://www.figma.com/api/mcp/asset/456b7e0e-c209-4952-9f90-d515280bc3c0";
const imgGoogleAdsIcon = "https://www.figma.com/api/mcp/asset/f6a10e0b-e3ca-47dc-92d8-be478f4491d2";
const imgGoogleAdsText = "https://www.figma.com/api/mcp/asset/36b44baa-a14b-4508-9be8-e4371af83e45";

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
		<!-- Rockads Plans Section -->
		<section class="plans-section mx-auto w-full max-w-[1440px] px-[150px] py-[88px]">
			<div class="mb-8 flex flex-col items-center gap-4 text-center">
				<h1 class="text-[48px] leading-[56px] font-semibold text-[#151b26]">
					Rockads Plans
				</h1>
				<p class="text-[16px] text-[#151b26]">
					Boost your advertising strategy with Rockads. Choose the plan that suits your needs and manage your campaigns efficiently.
				</p>
			</div>

			<div class="flex gap-8">
				<!-- Rockads Free Card -->
				<div class="flex flex-1 flex-col gap-8 rounded-2xl bg-[#f0fcf8] p-8">
					<h2 class="text-[32px] leading-[40px] font-bold text-[#05cc85]">
						Rockads Free
					</h2>

					<div class="flex flex-col gap-8">
						<div class="flex flex-col gap-3">
							<h3 class="text-[20px] leading-[28px] font-bold text-[#151b26]">
								What's Included
							</h3>
							<hr class="border-[#c2e8d8]">
						</div>

						<div class="flex flex-col gap-7">
							<!-- Platform access feature -->
							<div class="flex items-start gap-2">
								<svg
									class="mt-1 size-4 shrink-0 text-[#05cc85]"
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
									<p class="text-[16px] text-[#151b26]">
										Get unlimited access to ad assets on these platforms based on your needs.
									</p>
									<div class="flex items-center gap-4">
										<img
											:src="imgTiktok"
											alt="TikTok"
											class="h-[20px]"
										>
										<img
											:src="imgMeta"
											alt="Meta"
											class="h-[20px]"
										>
										<div class="flex items-center gap-1">
											<img
												:src="imgGoogleAdsIcon"
												alt=""
												class="h-[16px]"
											>
											<img
												:src="imgGoogleAdsText"
												alt="Google Ads"
												class="h-[19px]"
											>
										</div>
									</div>
								</div>
							</div>

							<div class="flex items-center gap-2">
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
								<p class="text-[16px] text-[#151b26]">
									Creditline &amp; Financial Solutions
								</p>
							</div>

							<div class="flex items-center gap-2">
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
								<p class="text-[16px] text-[#151b26]">
									<strong>Rockads CRM</strong> unlimited access
								</p>
							</div>

							<div class="flex items-center gap-2">
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
								<p class="text-[16px] text-[#151b26]">
									Strategic insights
								</p>
							</div>

							<div class="flex items-center gap-2">
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
								<p class="text-[16px] text-[#151b26]">
									24/7 email support
								</p>
							</div>
						</div>
					</div>

					<div class="flex items-center justify-center self-start rounded-full bg-[#ccf2e7] px-7 py-2">
						<span class="text-[20px] leading-[28px] font-bold text-[#151b26]">Free</span>
					</div>

					<button class="flex h-14 w-full items-center justify-center rounded-lg bg-[#00c088] text-[16px] font-medium text-white transition-opacity hover:opacity-90">
						Contact Us
					</button>
				</div>

				<!-- Rockads Partner Card -->
				<div class="flex flex-1 flex-col justify-between rounded-2xl bg-[#fffce7] p-8">
					<div class="flex flex-col gap-8">
						<h2 class="text-[32px] leading-[40px] font-bold text-[#c2a441]">
							Rockads Partner
						</h2>

						<div class="flex flex-col gap-3">
							<h3 class="text-[20px] leading-[28px] font-bold text-[#151b26]">
								Options
							</h3>
							<hr class="border-[#e2d89a]">
						</div>

						<div class="flex flex-col gap-4 rounded-2xl">
							<p class="text-[16px] font-bold text-black">
								Sales Strategy
							</p>
							<p class="text-[16px] text-black">
								Strategic growth planning, budget management, and media support for your business — <strong>360-degree</strong> support to increase profitability.
							</p>
						</div>

						<hr class="border-[#e2d89a]">

						<div class="flex flex-col gap-4 rounded-2xl">
							<p class="text-[16px] font-bold text-black">
								Sales Partnership
							</p>
							<p class="text-[16px] text-black">
								Create a sales platform for your services, define sales strategies, and design revenue-sharing partnerships including payment solutions.
							</p>
						</div>
					</div>

					<button class="mt-8 flex h-14 w-full items-center justify-center rounded-lg bg-[#c2a441] text-[16px] font-medium text-white transition-opacity hover:opacity-90">
						Contact Us
					</button>
				</div>
			</div>
		</section>

		<!-- Pricing Cards Section -->
		<section class="relative bg-white px-[150px] py-16">
			<h2 class="mb-[115px] text-center text-[48px] leading-[56px] font-medium text-[#151b26]">
				Pricing
			</h2>

			<div class="relative flex items-start gap-3">
				<!-- Most Popular Badge -->
				<div class="absolute top-[-52px] left-[calc(50%+12px)] flex w-[148px] -translate-x-1/2 items-center justify-center rounded-[40px] bg-[#1f71ea] px-[10px] py-[10px]">
					<span class="text-[14px] leading-[20px] font-medium text-white">MOST POPULAR</span>
				</div>

				<template
					v-for="plan in plans"
					:key="plan.id"
				>
					<div
						class="flex flex-1 flex-col gap-6 rounded-2xl p-6"
						:class="{
							'bg-[#f7f9fb]': !plan.highlighted,
							'border-2 border-[#007ce1] bg-[#e8f4ff]': plan.highlighted,
						}"
					>
						<!-- Plan Header -->
						<div class="flex flex-col gap-6">
							<h3 class="text-[24px] leading-[32px] font-semibold text-[#151b26]">
								{{ plan.name }}
							</h3>

							<div class="flex items-baseline gap-2">
								<span
									class="font-bold text-[#151b26]"
									:class="plan.id === 'enterprise' ? 'text-[32px] leading-[40px]' : 'text-[40px] leading-[48px]'"
								>
									{{ plan.price }}
								</span>
								<span
									v-if="plan.period"
									class="text-[16px] font-medium text-[#898fa5]"
								>{{ plan.period }}</span>
							</div>

							<p class="text-[16px] leading-normal font-medium text-[#898fa5]">
								{{ plan.description }}
							</p>

							<div class="flex flex-col gap-4">
								<div
									v-for="feature in plan.features"
									:key="feature.label"
									class="flex items-center gap-1.5"
								>
									<!-- Checkmark icon -->
									<template v-if="feature.included">
										<svg
											class="size-5 shrink-0 text-[#007ce1]"
											viewBox="0 0 20 20"
											fill="none"
										>
											<path
												d="M5 10.5L8.5 14L15 7"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
									</template>
									<!-- X icon -->
									<template v-else>
										<svg
											class="size-5 shrink-0 text-[#e53e3e]"
											viewBox="0 0 20 20"
											fill="none"
										>
											<path
												d="M6 6L14 14M14 6L6 14"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
											/>
										</svg>
									</template>
									<span class="text-[14px] leading-[20px] font-medium text-[#151b26]">{{ feature.label }}</span>
								</div>
							</div>
						</div>

						<!-- Ad Spend Fee Box -->
						<div
							v-if="plan.adSpendFee.free"
							class="rounded-lg bg-white p-4"
						>
							<p class="mb-2 text-[12px] leading-[16px] font-medium tracking-wide text-[#898fa5] uppercase">
								AD SPEND FEE
							</p>
							<div class="flex flex-col gap-1">
								<p class="text-[14px] font-medium text-[#151b26]">
									First <strong>{{ plan.adSpendFee.free }}</strong> managed free
								</p>
								<p class="text-[14px] font-medium text-[#151b26]">
									After: <strong class="text-[#007ce1]">{{ plan.adSpendFee.after }}</strong>
								</p>
							</div>
						</div>

						<!-- CTA Button -->
						<button
							class="flex h-14 w-full items-center justify-center rounded-lg text-[16px] font-medium transition-opacity hover:opacity-90"
							:class="{
								'border border-[#e5e9ef] bg-white text-[#151b26]': !plan.highlighted,
								'bg-[#007ce1] text-white': plan.highlighted,
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
