<script setup lang="ts">
import TheHeader from "@/components/the-header.vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

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

const highlights = [
	{
		title: "Agency Solutions",
		description: "Fast top-up and daily operational support for active campaigns.",
	},
	{
		title: "Automation",
		description: "Reduce manual workload and scale repeated workflows with confidence.",
	},
	{
		title: "Compliance AI",
		description: "Stay policy-safe while keeping campaigns live across key platforms.",
	},
];
</script>

<template>
	<div class="min-h-screen bg-background text-foreground">
		<TheHeader transparent />

		<main class="mx-auto w-full max-w-[1440px] px-5 pt-[104px] pb-16 lg:px-12 lg:pt-[140px] lg:pb-24">
			<section class="max-w-3xl space-y-6 py-12 lg:py-16">
				<Badge variant="outline">
					Rockads
				</Badge>
				<h1 class="text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
					Grow without limits with a partner built for performance.
				</h1>
				<p class="max-w-2xl text-base text-muted-foreground sm:text-lg">
					Scale campaigns, automate operations, and keep your growth engine running with zero friction.
				</p>
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

			<section class="grid gap-4 md:grid-cols-3">
				<Card
					v-for="highlight in highlights"
					:key="highlight.title"
				>
					<CardHeader>
						<CardTitle>{{ highlight.title }}</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription>{{ highlight.description }}</CardDescription>
					</CardContent>
				</Card>
			</section>
		</main>
	</div>
</template>
