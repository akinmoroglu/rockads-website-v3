<script setup lang="ts">
import PurchasePolicyContent from "@/components/legal/purchase-policy-content.vue";

definePageMeta({
	layout: "document-content",
});

useHead({
	title: "Purchase Policy - Rockads",
	meta: [
		{
			name: "description",
			content:
				"Read the Rockads purchase policy covering payments, refunds, and order terms.",
		},
	],
	link: [
		{
			rel: "alternate",
			type: "link",
			href: "https://www.rockads.com/purchase-policy",
			hreflang: "en",
		},
	],
});

useSeoMeta({ robots: "noindex, nofollow" });
useServerSeoMeta({ robots: "noindex, nofollow" });

const gtmEvent = useGtmEvent();
onMounted(() => {
	gtmEvent.pageViewEvent("Purchase Policy - Rockads");
});
</script>

<template>
	<PurchasePolicyContent />
</template>
