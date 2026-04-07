<script setup lang="ts">
import logoSrc from "@/assets/images/logo-rockads.svg";
import { Button } from "./ui/button";
</script>

<template>
	<header
		class="shrink-0 border-b border-(--header-border) bg-(--header-background) backdrop-blur"
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
			<Button
				as-child
				variant="link"
			>
				<NuxtLink
					to="/"
				>
					Back to website
				</NuxtLink>
			</Button>
		</div>
	</header>
</template>
