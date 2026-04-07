<script setup lang="ts">
import logoSrc from "@/assets/images/logo-rockads.svg";
</script>

<template>
	<header
		class="shrink-0 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80"
	>
		<div
			class="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-5"
		>
			<NuxtLink
				to="/"
				class="flex items-center gap-2 rounded-md ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			>
				<img
					:src="logoSrc"
					alt="Rockads"
					class="h-8 w-auto"
					width="120"
					height="32"
				>
				<span class="sr-only">Rockads home</span>
			</NuxtLink>
			<NuxtLink
				to="/"
				class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
			>
				Back to website
			</NuxtLink>
		</div>
	</header>
</template>
