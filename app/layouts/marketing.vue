<script setup lang="ts">
import TheFooter from "@/components/the-footer.vue";
import TheHeader from "@/components/the-header.vue";

const route = useRoute();
const { resetHeaderAppearance } = useMarketingHeaderAppearance();

watch(
	() => route.fullPath,
	() => {
		resetHeaderAppearance();
	},
	{ immediate: true },
);
</script>

<template>
	<div class="flex min-h-screen flex-col bg-background text-foreground">
		<TheHeader />
		<div class="min-h-0 flex-1">
			<slot />
		</div>
		<TheFooter />
	</div>
</template>
