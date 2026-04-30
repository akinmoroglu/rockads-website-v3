<script setup lang="ts">
import PrivateTermsContent from "@/components/legal/private-terms-content.vue";

definePageMeta({
	layout: "document-content",
});

useHead({
	title: "Private Terms - Rockads",
	meta: [
		{
			name: "description",
			content:
				"Rockads private terms applying to specific partner and account arrangements.",
		},
	],
	link: [
		{
			rel: "alternate",
			type: "link",
			href: "https://www.rockads.com/en/private-terms",
			hreflang: "en",
		},
	],
});

useSeoMeta({ robots: "noindex, nofollow" });
useServerSeoMeta({ robots: "noindex, nofollow" });

const gtmEvent = useGtmEvent();
onMounted(() => {
	gtmEvent.pageViewEvent("Private Terms - Rockads");
});
</script>

<template>
	<PrivateTermsContent />
</template>
