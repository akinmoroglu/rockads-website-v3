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
	<div class="relative flex min-h-screen flex-col bg-background text-foreground">
		<TheHeader />
		<div class="document-content mx-auto w-full max-w-[1066px] flex-1 px-5 pt-[140px] pb-12 lg:pt-[164px] lg:pb-16">
			<slot />
		</div>
		<TheFooter />
	</div>
</template>

<style>
@reference "@/assets/css/tailwind.css";

.document-content h1 {
	@apply mb-5 text-3xl font-semibold;
}
.document-content .headline {
	@apply mb-8 text-center text-2xl font-semibold text-neutral-900;
}
.document-content p {
	@apply mb-5 leading-relaxed;
}
.document-content ol {
	@apply list-outside list-decimal ps-10;
}
.document-content ul {
	@apply list-outside list-disc ps-10;
}
.document-content a {
	@apply text-primary underline underline-offset-2;
}
.document-content table {
	@apply w-full;
}
.document-content table tbody tr td table {
	@apply w-full;
}
.document-content table tbody tr td table tr td {
	@apply border border-neutral-800 p-1 md:p-4;
}
</style>
