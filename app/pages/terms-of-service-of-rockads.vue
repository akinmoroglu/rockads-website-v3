<script setup lang="ts">
import TermsOfServiceContent from "@/components/legal/terms-of-service-content.vue";

definePageMeta({
	layout: "document-content",
});

useHead({
	title: "Terms of Service - Rockads",
	meta: [
		{
			name: "description",
			content:
				"Read the Rockads Terms of Service governing your use of the Rockads platform and services.",
		},
	],
	link: [
		{
			rel: "alternate",
			type: "link",
			href: "https://www.rockads.com/terms-of-service-of-rockads",
			hreflang: "en",
		},
	],
});

useSeoMeta({ robots: "noindex, nofollow" });
useServerSeoMeta({ robots: "noindex, nofollow" });

const gtmEvent = useGtmEvent();
onMounted(() => {
	gtmEvent.pageViewEvent("Terms of Service - Rockads");
});
</script>

<template>
	<TermsOfServiceContent />
</template>
