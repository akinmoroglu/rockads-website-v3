<script setup lang="ts">
const legalLinks = [
	{
		label: "Privacy Notice",
		href: "/privacy-notice",
	},
	{
		label: "Terms of Service",
		href: "/terms-of-service-of-rockads",
	},
] as const;

const year = new Date().getFullYear();
</script>

<template>
	<footer class="shrink-0 border-t border-border bg-background">
		<div
			class="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-3 px-5 py-8 text-center text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:justify-between sm:text-left"
		>
			<p class="order-2 sm:order-1">
				© {{ year }} Rockads. All rights reserved.
			</p>
			<nav
				class="order-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:order-2 sm:justify-end"
				aria-label="Legal"
			>
				<NuxtLink
					v-for="link in legalLinks"
					:key="link.href"
					:to="link.href"
					class="font-medium underline-offset-4 transition-colors hover:text-foreground hover:underline"
				>
					{{ link.label }}
				</NuxtLink>
			</nav>
		</div>
	</footer>
</template>
