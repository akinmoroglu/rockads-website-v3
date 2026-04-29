<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<Toaster
		position="top-right"
		rich-colors
		close-button
	/>
</template>
