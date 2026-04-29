<script setup lang="ts">
import { CalendarDays, CheckCircle2 } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import { MONTHLY_SPEND_OPTIONS } from "@/constants/registration";
import { clearReferrer } from "@/utils/cookie";

definePageMeta({ layout: "auth" });

useHead({ title: "Application Received - Rockads" });
useSeoMeta({ robots: "noindex, nofollow" });
useServerSeoMeta({ robots: "noindex, nofollow" });

const config = useRuntimeConfig();

const isHighValueLead = ref(false);

const panelUrl = computed(() => {
	const appURL = (config.public.appURL as string) ?? "";
	const isStaging = appURL.includes("stage");

	return isStaging ? "https://stage-panel.rockads.com" : "https://marketing.rockads.com/";
});

const calendlyUrl = "http://calendly.com/d/3ff-sbz-7jf/rockads-intro";
const blogUrl = "https://blog.rockads.com/";

function evaluateLeadValue() {
	if (typeof window === "undefined") return;

	const stored = localStorage.getItem("m_s");

	if (!stored) return;

	const decodedSpendText = decodeURIComponent(stored);

	const lowValueAdvertiser = MONTHLY_SPEND_OPTIONS.ADVERTISER.filter(o =>
		["spend-25k", "spend-50k", "spend-100k"].includes(o.id),
	).map(o => o.id);

	const firstAgencyPartnerId = MONTHLY_SPEND_OPTIONS.AGENCY_PARTNER[0]!.id;

	const lowValueIds: string[] = [...lowValueAdvertiser, firstAgencyPartnerId];

	const allOptions = [
		...MONTHLY_SPEND_OPTIONS.ADVERTISER,
		...MONTHLY_SPEND_OPTIONS.AGENCY_PARTNER,
	];

	const matchedId = allOptions.find(o => o.text === decodedSpendText)?.id;

	isHighValueLead.value = matchedId ? !lowValueIds.includes(matchedId) : false;
}

onMounted(() => {
	clearReferrer();
	evaluateLeadValue();
});

function redirectToBlog() {
	window.open(blogUrl, "_self");
}

function redirectToPanel() {
	window.open(panelUrl.value, "_self");
}

function redirectToCalendly() {
	window.open(calendlyUrl, "_blank");
}
</script>

<template>
	<div class="flex flex-col items-center gap-7">
		<CheckCircle2 class="size-20 text-primary" />

		<div class="text-center text-2xl leading-8 font-bold sm:text-[44px] sm:leading-[52px]">
			Thanks for your application!
		</div>

		<div class="flex max-w-xl flex-col items-center gap-1 text-center text-base leading-relaxed text-muted-foreground">
			<p>We've received your details and our team will review them shortly.</p>
			<p>Expect to hear from us within one business day.</p>
		</div>

		<div
			v-if="isHighValueLead"
			class="mt-2 flex w-full flex-col gap-4 sm:items-center"
		>
			<Button
				class="h-14 w-full text-base sm:w-[260px]"
				@click="redirectToCalendly"
			>
				<CalendarDays class="mr-2 size-5" />
				Schedule a meeting
			</Button>
			<Button
				variant="secondary"
				class="h-14 w-full text-base sm:w-[260px]"
				@click="redirectToBlog"
			>
				Explore the blog
			</Button>
			<Button
				variant="outline"
				class="h-14 w-full text-base sm:w-[260px]"
				@click="redirectToPanel"
			>
				Return to panel
			</Button>
		</div>

		<div
			v-else
			class="mt-2 flex w-full flex-col-reverse gap-4 sm:flex-row sm:justify-center"
		>
			<Button
				variant="secondary"
				class="h-14 w-full text-base sm:w-[220px]"
				@click="redirectToBlog"
			>
				Explore the blog
			</Button>
			<Button
				class="h-14 w-full text-base sm:w-[220px]"
				@click="redirectToPanel"
			>
				Return to panel
			</Button>
		</div>
	</div>
</template>
