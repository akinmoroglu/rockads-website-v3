<script setup lang="ts">
import HomeGlossaryCloud from "@/components/home/home-glossary-cloud.vue";
import HomeGlobalExpansion from "@/components/home/home-global-expansion.vue";
import HomeHeroBanner from "@/components/home/home-hero-banner.vue";
import HomeNumbersStats from "@/components/home/home-numbers-stats.vue";
import HomeOurPhilosophy from "@/components/home/home-our-philosophy.vue";
import HomeThreePillars from "@/components/home/home-three-pillars.vue";
import HomeCta from "@/components/home/home-cta.vue";

definePageMeta({
	layout: "marketing",
});

useHead({
	title: "Rockads - Grow Without Limits",
	meta: [
		{
			name: "description",
			content:
				"Rockads is a platform for growing your business without limits.",
		},
	],
});
</script>

<template>
	<main class="w-full">
		<HomeHeroBanner />
		<HomeThreePillars />
		<HomeOurPhilosophy />
		<HomeGlobalExpansion />
		<HomeNumbersStats />
		<HomeGlossaryCloud />
		<HomeCta />
	</main>
</template>
