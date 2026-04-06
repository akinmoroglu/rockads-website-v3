<script setup lang="ts">
import { Motion } from "motion-v";
</script>

<template>
	<section class="philosophy-section border-y border-white/10 bg-(--philosophy-bg) py-20 text-white lg:py-28">
		<div class="mx-auto grid w-full max-w-[1240px] gap-12 px-5 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16 lg:px-12">
			<Motion
				as="div"
				:initial="{ opacity: 0, y: 20 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: false, amount: 0.35 }"
				:transition="{ duration: 0.65, ease: 'easeOut' }"
			>
				<span
					class="inline-flex rounded-full border border-(--philosophy-pill-border) bg-(--philosophy-pill-bg) px-5 py-2 text-xs font-medium tracking-[0.16em] text-(--philosophy-pill-text)"
				>
					OUR PHILOSOPHY
				</span>

				<h2
					class="mt-8 max-w-[520px] text-[42px] leading-[1.08] font-semibold tracking-[-0.02em] text-(--philosophy-title) sm:text-[56px] lg:text-[64px]"
				>
					<span class="text-(--philosophy-title-accent)">Built on partnership.</span><br>
					Powered by intelligence.<br>
					Designed to endure.
				</h2>
			</Motion>

			<Motion
				as="div"
				class="space-y-8 pt-1"
				:initial="{ opacity: 0, y: 22 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: false, amount: 0.35 }"
				:transition="{ duration: 0.65, delay: 0.08, ease: 'easeOut' }"
			>
				<p class="max-w-[560px] text-[20px] leading-[1.55] text-(--philosophy-body)">
					Operating at a global scale requires more than just powerful software; it requires a dedicated growth partner.
					Rockads centralizes the fragmented complexities of cross-border expansion into a single, high-performance ecosystem.
				</p>
				<p class="max-w-[560px] text-[20px] leading-[1.55] text-(--philosophy-body)">
					We manage the technical, financial, and operational heavy lifting in the background, while we strategize, guide,
					and scale alongside you. We provide the stable, intelligent core that empowers your business to grow without limits.
				</p>
			</Motion>
		</div>
	</section>
</template>

<style scoped>
.philosophy-section {
	--philosophy-bg: #070f1d;
	--philosophy-pill-border: rgba(255, 255, 255, 0.16);
	--philosophy-pill-bg: rgba(255, 255, 255, 0.03);
	--philosophy-pill-text: #d2d8e4;
	--philosophy-title: #f8fbff;
	--philosophy-title-accent: #f2c38b;
	--philosophy-body: rgba(248, 251, 255, 0.82);
}
</style>
