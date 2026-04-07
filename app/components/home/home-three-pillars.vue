<script setup lang="ts">
import { Bolt } from "lucide-vue-next";
import { Motion } from "motion-v";
import pillarsLineAsset from "@/assets/images/home/pillars/line.svg?url";
import {
	ScrollSpy,
	ScrollSpyLink,
	ScrollSpyNav,
	ScrollSpySection,
	ScrollSpyViewport,
} from "@/components/ui/scroll-spy";
</script>

<template>
	<section class="pillars-section relative overflow-hidden bg-(--pillars-bg) py-20 lg:py-28">
		<img
			:src="pillarsLineAsset"
			alt=""
			aria-hidden="true"
			class="pointer-events-none absolute left-1/2 top-0 z-0 h-auto w-full max-w-(--pillars-line-max-width) -translate-x-1/2 opacity-(--pillars-line-opacity)"
		>

		<div class="relative z-10 mx-auto grid w-full max-w-[1240px] gap-10 px-5 lg:grid-cols-[460px_1fr] lg:items-start lg:gap-10 lg:px-12">
			<ScrollSpy
				class="contents"
				:offset="96"
				default-value="growth-engine"
				orientation="horizontal"
			>
				<Motion
					as="div"
					class="pt-4 lg:sticky lg:top-24 lg:col-start-1 lg:self-start lg:pt-7"
					:initial="{ opacity: 0, x: -24 }"
					:while-in-view="{ opacity: 1, x: 0 }"
					:in-view-options="{ once: false, amount: 0.35 }"
					:transition="{ duration: 0.65, ease: 'easeOut' }"
				>
					<span
						class="inline-flex rounded-full border border-(--pillars-label-border) px-6 py-3 text-xs font-medium tracking-[0.16em] text-(--pillars-label-text)"
					>
						CORE PILLARS
					</span>
					<h2 class="mt-7 max-w-(--pillars-title-max-width) text-4xl leading-[1.15] font-medium text-(--pillars-heading) sm:text-[48px] sm:leading-[56px]">
						The Three Pillars
						<span class="text-primary">of Rockads</span>
					</h2>
					<ScrollSpyNav class="mt-8 max-w-(--pillars-title-max-width) gap-1">
						<ScrollSpyLink
							class="w-full justify-start px-0 text-left text-base text-(--pillars-heading) hover:bg-transparent hover:text-primary data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-primary"
							value="growth-engine"
						>
							Growth Engine
						</ScrollSpyLink>
						<ScrollSpyLink
							class="w-full justify-start px-0 text-left text-base text-(--pillars-heading) hover:bg-transparent hover:text-primary data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-primary"
							value="partnership"
						>
							Partnership
						</ScrollSpyLink>
					</ScrollSpyNav>
				</Motion>

				<ScrollSpyViewport class="min-w-0 lg:col-start-2">
					<Motion
						as="div"
						class="border border-(--pillars-card-border) bg-(--pillars-card-bg)"
						:initial="{ opacity: 0, y: 22 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:in-view-options="{ once: false, amount: 0.3 }"
						:transition="{ duration: 0.7, delay: 0.08, ease: 'easeOut' }"
					>
						<ScrollSpySection value="growth-engine">
							<div class="space-y-8 p-(--pillars-content-padding)">
								<div class="space-y-2">
									<h3 class="text-[32px] leading-10 font-semibold text-(--pillars-heading)">
										Growth Engine
									</h3>
									<p class="text-sm leading-5 font-medium text-(--pillars-subtext)">
										Limit Scale
									</p>
								</div>
								<p class="text-lg leading-[26px] text-(--pillars-body)">
									Scaling across borders is an operational and financial challenge. True global scale requires a frictionless
									ecosystem. We deliver the complete financial architecture, enterprise-grade resilience, and AI-backed precision
									necessary to sustain massive operations.
								</p>
							</div>

							<Motion
								as="div"
								class="relative bg-(--pillars-highlight-bg) px-(--pillars-content-padding-x) py-(--pillars-highlight-padding-y) text-(--pillars-highlight-text) lg:-ml-(--pillars-highlight-offset)"
								:initial="{ opacity: 0, y: 18 }"
								:while-in-view="{ opacity: 1, y: 0 }"
								:in-view-options="{ once: false, amount: 0.45 }"
								:transition="{ duration: 0.65, delay: 0.2, ease: 'easeOut' }"
							>
								<div class="absolute inset-y-0 left-0 w-(--pillars-highlight-bar-width) bg-primary" />
								<div class="space-y-6">
									<Bolt class="size-8 stroke-[1.8]" />
									<p class="max-w-(--pillars-highlight-max-width) text-4xl leading-tight font-semibold tracking-[-0.01em] text-(--pillars-highlight-text) sm:text-[44px] sm:leading-[54px]">
										This means you can instantly expand into any market you want, without operational barriers.
									</p>
								</div>
							</Motion>
						</ScrollSpySection>

						<ScrollSpySection value="partnership">
							<div class="space-y-8 p-(--pillars-content-padding)">
								<div class="space-y-2">
									<h3 class="text-[32px] leading-10 font-semibold text-(--pillars-heading)">
										Partnership
									</h3>
									<p class="text-sm leading-5 font-medium text-(--pillars-subtext)">
										Enduring Alignment
									</p>
								</div>
								<p class="text-lg leading-[26px] text-(--pillars-body)">
									Elite platform connections meet absolute client alignment. Our strength lies in official partnerships with
									platforms like <span class="font-semibold">Meta, Google, TikTok, X, and Snapchat</span>, combined with a fierce
									commitment to our users. You get dedicated account management, strategic growth support, and a team that
									understands your business as deeply as you do.
								</p>
							</div>
						</ScrollSpySection>
					</Motion>
				</ScrollSpyViewport>
			</ScrollSpy>
		</div>
	</section>
</template>

<style scoped>
.pillars-section {
	--pillars-bg: #fef8f1;
	--pillars-line-max-width: 1440px;
	--pillars-line-opacity: 0.8;
	--pillars-label-border: #f6e3c0;
	--pillars-label-text: #705e00;
	--pillars-title-max-width: 390px;
	--pillars-card-border: #f9e9cc;
	--pillars-card-bg: #ffffff;
	--pillars-heading: #151b26;
	--pillars-subtext: #747a8e;
	--pillars-body: #151b26;
	--pillars-highlight-bg: #0e1627;
	--pillars-highlight-text: #ffffff;
	--pillars-highlight-bar-width: 7px;
	--pillars-highlight-max-width: 540px;
	--pillars-content-padding: 2rem;
	--pillars-content-padding-x: 2rem;
	--pillars-highlight-padding-y: 2.5rem;
	--pillars-highlight-offset: 1rem;
}

@media (min-width: 1024px) {
	.pillars-section {
		--pillars-content-padding: 3rem;
		--pillars-content-padding-x: 3rem;
		--pillars-highlight-padding-y: 3rem;
		--pillars-highlight-offset: 1rem;
	}
}
</style>
