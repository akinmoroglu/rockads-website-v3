<script setup lang="ts">
import TheHeader from "~/components/the-header.vue";

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
	<div class="min-h-screen bg-background text-foreground">
		<TheHeader transparent />

		<main class="mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-5 pt-[104px] pb-16 lg:px-12 lg:pt-[140px]">
			<section class="max-w-3xl space-y-6">
				<span class="inline-flex rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
					Rockads
				</span>
				<h1 class="text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
					Grow without limits with a partner built for performance.
				</h1>
				<p class="max-w-2xl text-base text-muted-foreground sm:text-lg">
					Scale campaigns, automate operations, and keep your growth engine running with zero friction.
				</p>
				<div class="flex flex-wrap items-center gap-3">
					<button
						type="button"
						class="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
					>
						Get Started
					</button>
					<button
						type="button"
						class="rounded-lg border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-accent"
					>
						Explore Services
					</button>
				</div>
			</section>
		</main>
	</div>
</template>
