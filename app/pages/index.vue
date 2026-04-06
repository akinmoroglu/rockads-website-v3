<script setup lang="ts">
import HomeHeroBanner from "@/components/home/home-hero-banner.vue";
import HomeOurPhilosophy from "@/components/home/home-our-philosophy.vue";
import HomeThreePillars from "@/components/home/home-three-pillars.vue";

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
	</main>
</template>
