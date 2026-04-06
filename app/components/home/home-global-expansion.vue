<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
import { Motion } from "motion-v";
</script>

<template>
	<section class="expansion-section bg-(--expansion-bg) py-20 text-(--expansion-text) lg:py-28">
		<div class="mx-auto grid w-full max-w-[1240px] gap-10 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:px-12">
			<Motion
				as="div"
				:initial="{ opacity: 0, y: 24 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: false, amount: 0.3 }"
				:transition="{ duration: 0.65, ease: 'easeOut' }"
			>
				<span
					class="inline-flex rounded-full border border-(--expansion-pill-border) bg-(--expansion-pill-bg) px-5 py-2 text-xs font-medium tracking-[0.16em] text-(--expansion-pill-text)"
				>
					GLOBAL EXPANSION
				</span>
				<h2 class="mt-7 max-w-[700px] text-[38px] leading-[1.1] font-semibold tracking-[-0.02em] sm:text-[52px] lg:text-[62px]">
					Expand into new markets
					<span class="text-primary">with confidence</span>
				</h2>
				<p class="mt-6 max-w-[680px] text-lg leading-[1.65] text-(--expansion-muted)">
					From payments to operational compliance, Rockads removes the complexity of global growth so your team can focus
					on performance, speed, and sustainable scaling.
				</p>
			</Motion>

			<Motion
				as="div"
				class="rounded-2xl border border-(--expansion-card-border) bg-(--expansion-card-bg) p-7 shadow-[0_20px_60px_rgba(7,15,29,0.1)] lg:p-9"
				:initial="{ opacity: 0, y: 20 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: false, amount: 0.35 }"
				:transition="{ duration: 0.65, delay: 0.08, ease: 'easeOut' }"
			>
				<h3 class="text-2xl leading-tight font-semibold text-(--expansion-text)">
					Ready to unlock your next region?
				</h3>
				<p class="mt-4 text-base leading-7 text-(--expansion-muted)">
					Work with a dedicated team that combines strategic guidance, technical execution, and enterprise-grade
					infrastructure for high-volume growth.
				</p>
				<NuxtLink
					to="/contact"
					class="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
				>
					Schedule a strategy call
					<ArrowRight class="size-4" />
				</NuxtLink>
			</Motion>
		</div>
	</section>
</template>

<style scoped>
.expansion-section {
	--expansion-bg: #f8fafc;
	--expansion-text: #0f172a;
	--expansion-muted: rgba(15, 23, 42, 0.74);
	--expansion-pill-border: rgba(15, 23, 42, 0.14);
	--expansion-pill-bg: rgba(15, 23, 42, 0.03);
	--expansion-pill-text: #334155;
	--expansion-card-border: rgba(15, 23, 42, 0.1);
	--expansion-card-bg: #ffffff;
}
</style>
