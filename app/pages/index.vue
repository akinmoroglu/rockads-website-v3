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

		<section class="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-12 lg:px-12 lg:pb-24">
			<div class="flex flex-wrap items-center gap-3">
				<Button
					as-child
					size="lg"
				>
					<NuxtLink to="/contact">
						Get Started
					</NuxtLink>
				</Button>
				<Button
					as-child
					variant="outline"
					size="lg"
				>
					<NuxtLink to="/services/core">
						Explore Services
					</NuxtLink>
				</Button>
			</div>
		</section>
	</main>
</template>
