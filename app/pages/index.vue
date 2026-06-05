<script setup lang="ts">
import HomePlatformShowcase from "@/components/home/home-platform-showcase.vue";
import HomeGlossaryCloud from "@/components/home/home-glossary-cloud.vue";
import HomeHeroBanner from "@/components/home/home-hero-banner.vue";
import HomeNumbersStats from "@/components/home/home-numbers-stats.vue";
import HomeOurPhilosophy from "@/components/home/home-our-philosophy.vue";
import HomeHowWeDoIt from "@/components/home/home-how-we-do-it.vue";
import HomeWhoWeServe from "@/components/home/home-who-we-serve.vue";
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

const gtmEvent = useGtmEvent();

onMounted(() => {
	gtmEvent.pageViewEvent("Rockads - Grow Without Limits");
});
</script>

<template>
	<main class="w-full">
		<HomeHeroBanner />
		<HomeOurPhilosophy />
		<HomeHowWeDoIt />
		<HomePlatformShowcase />
		<HomeWhoWeServe />
		<HomeNumbersStats />
		<HomeGlossaryCloud />
		<HomeCta />
	</main>
</template>
