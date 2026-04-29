<script setup lang="ts">
import type { CustomerType } from "@/constants/registration";

defineEmits<{ customerType: [type: CustomerType] }>();

const options: { id: string; type: CustomerType; lead: string; bold: string }[] = [
	{
		id: "registration-advertiser-button",
		type: "advertiser",
		lead: "I want to grow my business as an",
		bold: "Advertiser",
	},
	{
		id: "registration-agency-button",
		type: "agency",
		lead: "I run a marketing",
		bold: "Agency",
	},
	{
		id: "registration-partner-button",
		type: "partner",
		lead: "I want to become a Rockads",
		bold: "Partner",
	},
];
</script>

<template>
	<div
		id="registration-step-first"
		class="mt-8 flex flex-col items-center gap-[18px] sm:mt-[60px]"
	>
		<button
			v-for="opt in options"
			:id="opt.id"
			:key="opt.type"
			type="button"
			class="h-12 w-full rounded-lg border border-border bg-background px-4 text-sm font-normal text-foreground transition-colors hover:border-primary hover:bg-primary/5 sm:w-[330px]"
			@click="$emit('customerType', opt.type)"
		>
			{{ opt.lead }}
			<span class="text-base leading-6 font-semibold">{{ opt.bold }}</span>
		</button>
	</div>
</template>
