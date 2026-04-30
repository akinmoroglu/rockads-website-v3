<script setup lang="ts">
import CookiePolicyContent from "@/components/legal/cookie-policy-content.vue";

definePageMeta({
	layout: "document-content",
});

useHead({
	title: "Cookie Policy - Rockads",
	meta: [
		{
			name: "description",
			content:
				"Learn how Rockads uses cookies and similar technologies on its websites and services.",
		},
	],
	link: [
		{
			rel: "alternate",
			type: "link",
			href: "https://www.rockads.com/en/cookie-policy",
			hreflang: "en",
		},
	],
});

useSeoMeta({ robots: "noindex, nofollow" });
useServerSeoMeta({ robots: "noindex, nofollow" });

const gtmEvent = useGtmEvent();
onMounted(() => {
	// Preserves source bug: legacy site fired the Terms-of-Service title here.
	// Analytics dashboards may segment on this exact title.
	gtmEvent.pageViewEvent("Terms of Service - Rockads");
});
</script>

<template>
	<CookiePolicyContent />
</template>
