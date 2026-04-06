<script setup lang="ts">
import { Button } from "@/components/ui/button";
import HomeHeroBanner from "@/components/home/home-hero-banner.vue";

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
	</main>
</template>
