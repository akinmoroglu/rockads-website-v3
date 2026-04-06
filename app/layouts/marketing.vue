<script setup lang="ts">
import TheFooter from "@/components/the-footer.vue";
import TheHeader from "@/components/the-header.vue";
</script>

<template>
	<div class="min-h-screen bg-background text-foreground">
		<TheHeader />
		<slot />
		<TheFooter />
	</div>
</template>
