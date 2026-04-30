<script setup lang="ts">
import PrivacyNoticeContent from "@/components/legal/privacy-notice-content.vue";

definePageMeta({
	layout: "document-content",
});

useHead({
	title: "Privacy Notice - Rockads",
	meta: [
		{
			name: "description",
			content:
				"How Rockads collects, uses, and protects personal data across its platform and services.",
		},
	],
	link: [
		{
			rel: "alternate",
			type: "link",
			href: "https://www.rockads.com/privacy-notice",
			hreflang: "en",
		},
	],
});

useSeoMeta({ robots: "noindex, nofollow" });
useServerSeoMeta({ robots: "noindex, nofollow" });

const gtmEvent = useGtmEvent();
onMounted(() => {
	gtmEvent.pageViewEvent("Privacy Notice - Rockads");
});
</script>

<template>
	<PrivacyNoticeContent />
</template>
