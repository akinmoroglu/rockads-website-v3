<script setup lang="ts">
import KvkkPolicyContent from "@/components/legal/kvkk-policy-content.vue";

definePageMeta({
	layout: "document-content",
});

useHead({
	title: "KVKK Policy - Rockads",
	meta: [
		{
			name: "description",
			content:
				"Rockads policy on the protection of personal data under Turkey's KVKK regulation.",
		},
	],
	link: [
		// KVKK is a Turkish-jurisdiction regulation; no EN canonical exists.
		{
			rel: "alternate",
			type: "link",
			href: "https://www.rockads.com/tr/kvkk-policy",
			hreflang: "tr",
		},
	],
});

useSeoMeta({ robots: "noindex, nofollow" });
useServerSeoMeta({ robots: "noindex, nofollow" });

const gtmEvent = useGtmEvent();
onMounted(() => {
	gtmEvent.pageViewEvent("KVKK Policy - Rockads");
});
</script>

<template>
	<KvkkPolicyContent />
</template>
