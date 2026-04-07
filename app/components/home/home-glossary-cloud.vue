<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { Motion } from "motion-v";
import glossaryGlobeSrc from "@/assets/images/home/glossary/globe.svg?url";
import HoverCard from "@/components/ui/hover-card/HoverCard.vue";
import HoverCardContent from "@/components/ui/hover-card/HoverCardContent.vue";
import HoverCardTrigger from "@/components/ui/hover-card/HoverCardTrigger.vue";
import { cn } from "@/lib/utils";

type RawTag = {
	text: string;
	x: number;
	y: number;
	url: string;
	desc: string;
};

type Tag = RawTag & {
	baseSize: number;
	baseOpacity: number;
};

const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

const cloudRef = ref<HTMLElement | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);
const mouseInside = ref(false);

const LENS_MAX = 1.5;
const LENS_MIN = 0.5;
const LENS_POWER = 2.2;
const DIRECTIONAL_ORIGIN = false;

const CENTER_X = 50;
const CENTER_Y = 50;
const MAX_DIST = 20;
const MIN_SIZE = 18;
const MAX_SIZE = 26;
const MIN_OPACITY = 0.85;
const MAX_OPACITY = 0.95;

const rawTags: RawTag[] = [
	{ text: "billing-changes", x: 6, y: 6, url: "https://blog.rockads.com/meta-ads-billing-changes-2026/", desc: "Meta is removing credit card payments for high-spend ad accounts. Switch to invoicing or direct debit before April 2026 to keep campaigns running." },
	{ text: "shopify-automation", x: 42, y: 4, url: "https://blog.rockads.com/shopify-ad-automation/", desc: "Connect your Shopify store to ad automation so campaigns react to inventory changes, bestsellers, and new product launches in real time." },
	{ text: "manus-ai", x: 76, y: 8, url: "https://blog.rockads.com/how-to-use-manus-ai-meta-ad-library/", desc: "Use AI agents to automate competitor ad analysis in Meta Ad Library and uncover winning creative strategies at scale." },
	{ text: "mer-trap", x: 48, y: 36, url: "https://blog.rockads.com/why-your-best-roas-days-might-be-killing-your-cash-flow/", desc: "High platform ROAS can mask cannibalized organic sales. Shift focus to MER and incremental ROAS to protect your real cash flow." },
	{ text: "lookalike-audiences", x: 22, y: 16, url: "https://blog.rockads.com/expand-your-reach-with-meta-lookalike-audiences/", desc: "Reach new customers who share key attributes with your best buyers using Meta Lookalike Audiences for efficient scaling." },
	{ text: "spark-ads", x: 40, y: 56, url: "https://blog.rockads.com/what-are-tiktok-spark-ads/", desc: "Spark Ads boost existing organic content as paid ads, blending creator authenticity with scalable reach on TikTok." },
	{ text: "cpm-optimization", x: 58, y: 14, url: "https://blog.rockads.com/cpm-in-meta-ads-why-its-high-and-how-to-reduce-it/", desc: "Understand what drives high CPM in Meta Ads and apply practical tactics to bring your cost per thousand impressions down." },
	{ text: "catalog-ads", x: 86, y: 18, url: "https://blog.rockads.com/tiktok-smart-catalog-ads/", desc: "Smart+ Catalog Ads combine dynamic creative with AI-powered targeting for scalable, conversion-optimized product campaigns." },
	{ text: "creative-practices", x: 4, y: 28, url: "https://blog.rockads.com/tiktok-ads-creative-best-practices/", desc: "After TikTok's Q2 algorithm shift, creative freshness and hook clarity matter more than ever for ad delivery performance." },
	{ text: "budget-rules", x: 38, y: 24, url: "https://blog.rockads.com/budget-automation-rules-you-need-to-scale-meta-ads/", desc: "Five essential automation rules to scale Meta Ads — auto-scale winners, pause losers, cap tests, and reallocate unused spend." },
	{ text: "content-production", x: 68, y: 26, url: "https://blog.rockads.com/from-hook-ideas-to-scroll-stopping-creatives/", desc: "AI tools take you from brief to tested ad creative in 15 minutes — handling hooks, copy variations, and CTA optimization at scale." },
	{ text: "campaign-roles", x: 14, y: 38, url: "https://blog.rockads.com/campaign-role-automation-playbook/", desc: "Assign specific roles to campaigns — prospecting, retargeting, testing, loyalty — with tailored automation rules for each." },
	{ text: "capi-pixel", x: 80, y: 34, url: "https://blog.rockads.com/capi-vs-pixel/", desc: "Relying on Meta Pixel alone can lose up to 70% of conversion data. Add server-side CAPI to survive iOS privacy restrictions." },
	{ text: "reels-scoring", x: 28, y: 46, url: "https://blog.rockads.com/how-meta-scores-your-reels-ads-engagement-watch-time-more/", desc: "Meta scores Reels ads on watch time, hook strength, and engagement signals. Poor scores lead to higher CPMs and slower delivery." },
	{ text: "fix-roas", x: 60, y: 44, url: "https://blog.rockads.com/how-to-diagnose-and-fix-poor-roas-in-meta-ads/", desc: "Diagnose poor ROAS through funnel breakdown, audience saturation, and creative fatigue — then fix it with targeted optimizations." },
	{ text: "ppc-automation", x: 86, y: 46, url: "https://blog.rockads.com/signs-your-ppc-campaigns-need-automation/", desc: "Five clear signs your PPC campaigns need automation — constant manual bid adjustments, multi-platform chaos, and budget waste." },
	{ text: "ad-fatigue", x: 6, y: 54, url: "https://blog.rockads.com/what-is-ad-fatigue-and-how-to-beat-it-in-your-meta-tiktok-campaigns/", desc: "When audiences see the same ads too often, CTR drops and CPC rises. Rotate creatives weekly and cap frequency at 3–4." },
	{ text: "automation-roi", x: 72, y: 54, url: "https://blog.rockads.com/how-to-calculate-roi-from-ppc-automation-tools/", desc: "Calculate the true return from PPC automation by measuring time savings, performance lifts, and reduced manual overhead." },
	{ text: "meta-dropshipping", x: 18, y: 66, url: "https://blog.rockads.com/how-to-run-meta-ads-for-dropshipping/", desc: "Step-by-step guide to running profitable Meta Ads for dropshipping with niche targeting, Pixel setup, and optimized placements." },
	{ text: "tiktok-blackfriday", x: 52, y: 64, url: "https://blog.rockads.com/essential-tiktok-marketing-tips-to-supercharge-your-black-friday-campaigns/", desc: "Supercharge Black Friday campaigns on TikTok with trending content, retargeting strategies, and compelling ad creatives." },
	{ text: "ai-marketing", x: 82, y: 66, url: "https://blog.rockads.com/revolutionize-your-marketing-how-artificial-intelligence-is-changing-the-game/", desc: "AI is transforming marketing through advanced data analysis, personalized campaigns, chatbots, and automated optimization." },
	{ text: "blackfriday-checklist", x: 4, y: 78, url: "https://blog.rockads.com/ultimate-black-friday-checklist-for-performance-marketers/", desc: "The ultimate performance marketing checklist for Black Friday — from audience setup to creative testing and budget planning." },
	{ text: "tiktok-shadowban", x: 36, y: 76, url: "https://blog.rockads.com/tiktok-shadowban-what-is-it-and-how-to-get-unshadowbanned/", desc: "TikTok can silently limit your reach if you violate guidelines. Learn how to detect a shadowban and recover your visibility." },
	{ text: "community-guidelines", x: 66, y: 78, url: "https://blog.rockads.com/behind-the-scenes-of-tiktoks-community-guidelines/", desc: "Explore the content policies TikTok enforces to maintain a safe environment — from hate speech rules to copyright enforcement." },
	{ text: "google-suspensions", x: 24, y: 90, url: "https://blog.rockads.com/understanding-and-overcoming-circumventing-systems-suspensions/", desc: "Google Ads account suspended for circumventing systems? Learn why it happens and the exact steps to appeal and recover." },
];

const tags: Tag[] = rawTags.map((t) => {
	const dist = Math.sqrt((t.x - CENTER_X) ** 2 + (t.y - CENTER_Y) ** 2);
	const factor = Math.max(0, 1 - dist / MAX_DIST);
	return {
		...t,
		baseSize: Math.round(MIN_SIZE + factor * (MAX_SIZE - MIN_SIZE)),
		baseOpacity: +(MIN_OPACITY + factor * (MAX_OPACITY - MIN_OPACITY)).toFixed(2),
	};
});

/** One HoverCard per tag; only the open row mounts portal content (Presence). */
const tagOpen = reactive(tags.map(() => false));

const activeTagIndex = computed(() => {
	const idx = tagOpen.findIndex(open => open);
	return idx === -1 ? null : idx;
});

const allTagsMobile = [
	"/billing-changes", "/shopify-automation", "/manus-ai", "/spark-ads",
	"/budget-rules", "/lookalike-audiences", "/capi-pixel", "/fix-roas",
	"/ad-fatigue", "/cpm-optimization", "/tiktok-blackfriday", "/ai-marketing",
];

let pendingX = 0;
let pendingY = 0;
let rafPending = false;

function onTagClick(index: number) {
	if (!import.meta.client) return;
	const tag = tags[index];
	if (tag?.url) {
		window.open(tag.url, "_blank", "noopener,noreferrer");
	}
}

function onMouseMove(e: MouseEvent) {
	if (!cloudRef.value) return;
	const rect = cloudRef.value.getBoundingClientRect();
	pendingX = e.clientX - rect.left;
	pendingY = e.clientY - rect.top;
	if (!rafPending) {
		rafPending = true;
		requestAnimationFrame(() => {
			mouseX.value = pendingX;
			mouseY.value = pendingY;
			mouseInside.value = true;
			rafPending = false;
		});
	}
}

function onMouseLeave() {
	mouseInside.value = false;
}

type TagStyleOptions = {
	/** When true, paints the label above the glossary card (duplicate of the hovered hit target). */
	overlay?: boolean;
};

function getTagStyle(index: number, options?: TagStyleOptions): Record<string, string | number> {
	const overlay = options?.overlay === true;
	const tag = tags[index]!;
	const isHovered = tagOpen[index] === true;
	const reduceMotion = prefersReducedMotion.value;

	let scale = 1;
	let opacity = tag.baseOpacity;
	let color = "var(--muted-foreground)";
	let originX = 50;
	let originY = 50;

	const tooltipOpen = tagOpen.some(open => open);

	if (cloudRef.value) {
		const cw = cloudRef.value.offsetWidth;
		const ch = cloudRef.value.offsetHeight;

		const cursorX = mouseInside.value ? mouseX.value : cw / 2;
		const cursorY = mouseInside.value ? mouseY.value : ch / 2;

		const tagX = (tag.x / 100) * cw;
		const tagY = (tag.y / 100) * ch;
		const dx = cursorX - tagX;
		const dy = cursorY - tagY;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if (DIRECTIONAL_ORIGIN && distance > 0) {
			const angle = Math.atan2(dy, dx);
			originX = 50 - Math.cos(angle) * 50;
			originY = 50 - Math.sin(angle) * 50;
		}

		const maxDist = Math.sqrt(cw * cw + ch * ch) * 0.55;
		const norm = Math.min(distance / maxDist, 1);

		if (isHovered) {
			scale = LENS_MAX;
			opacity = 1;
			color = "var(--primary)";
		}
		else if (reduceMotion) {
			scale = 1;
			opacity = tag.baseOpacity * 0.85;
		}
		else {
			scale = LENS_MIN + (LENS_MAX - LENS_MIN) * Math.pow(1 - norm, LENS_POWER);
			opacity = 0.6 + 0.7 * Math.pow(1 - norm, 1.5);
		}
	}

	if (tooltipOpen && isHovered && !overlay) {
		opacity = 0;
	}

	const transition = reduceMotion
		? "color 0.2s ease"
		: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, color 0.2s ease, transform-origin 0.3s ease";

	const tagZ = tooltipOpen ? (isHovered ? (overlay ? 60 : 0) : 0) : (isHovered ? 10 : 1);

	return {
		left: tag.x + "%",
		top: tag.y + "%",
		fontSize: tag.baseSize + "px",
		transform: `scale(${scale})`,
		transformOrigin: `${originX}% ${originY}%`,
		opacity,
		color,
		transition,
		zIndex: tagZ,
	};
}

const hoveredTagOverlayStyle = computed((): Record<string, string | number> => {
	const i = activeTagIndex.value;
	if (i === null) return {};
	return getTagStyle(i, { overlay: true });
});

const hoverCardContentClass = computed(() =>
	prefersReducedMotion.value
		? "z-[70] max-h-[min(70vh,420px)] w-[min(100vw-2rem,330px)] max-w-[330px] overflow-y-auto rounded-sm border-0 bg-surface-dark p-0 shadow-none outline-none [&[data-state=closed]]:animate-none [&[data-state=open]]:animate-none"
		: "z-[70] max-h-[min(70vh,420px)] w-[min(100vw-2rem,330px)] max-w-[330px] overflow-y-auto rounded-sm border-0 bg-surface-dark p-0 shadow-none outline-none",
);

const motionTransition = computed(() => ({
	duration: prefersReducedMotion.value ? 0 : 0.55,
	ease: [0.16, 1, 0.3, 1] as const,
}));

const motionTransitionDelayed = computed(() => ({
	...motionTransition.value,
	delay: 0.06,
}));
</script>

<template>
	<section
		class="glossary-section relative overflow-hidden py-12 lg:py-20"
		aria-labelledby="glossary-heading"
	>
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
			<img
				:src="glossaryGlobeSrc"
				alt=""
				class="min-h-[105%] max-w-none min-w-[105%] shrink-0 object-cover opacity-(--glossary-globe-opacity)"
				decoding="async"
			>
		</div>

		<div class="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-12">
			<Motion
				as="div"
				class="mb-10 flex max-w-[720px] flex-col gap-4 md:mb-12 lg:mb-14"
				:initial="{ opacity: 0, y: 16 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.35 }"
				:transition="motionTransition"
			>
				<span
					class="inline-flex w-fit items-center rounded-full border border-(--glossary-pill-border) bg-(--glossary-pill-bg) px-4 py-2 text-xs font-medium tracking-[0.16em] text-(--glossary-pill-text) lg:px-6 lg:py-3 lg:text-sm"
				>
					GLOSSARY
				</span>
				<h2
					id="glossary-heading"
					class="text-[28px] leading-[36px] font-medium tracking-[-0.02em] text-(--glossary-title) md:text-[36px] md:leading-[44px] lg:text-[40px] lg:leading-[48px]"
				>
					Field notes from our
					<span class="text-primary">blog</span>
				</h2>
			</Motion>

			<Motion
				as="div"
				:initial="{ opacity: 0, y: 20 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.2 }"
				:transition="motionTransitionDelayed"
			>
				<div
					ref="cloudRef"
					class="relative isolate mx-auto h-[400px] w-full md:h-[450px] lg:h-[500px]"
					@mousemove="onMouseMove"
					@mouseleave="onMouseLeave"
				>
					<div
						class="pointer-events-none absolute z-0 hidden h-[500px] w-[500px] rounded-full transition-opacity duration-700 motion-reduce:transition-none md:block"
						:class="mouseInside ? 'opacity-100' : 'opacity-0'"
						:style="{
							left: mouseX - 250 + 'px',
							top: mouseY - 250 + 'px',
							background: 'radial-gradient(circle, color-mix(in oklch, var(--primary) 12%, transparent) 0%, transparent 70%)',
						}"
					/>

					<div class="absolute inset-0 z-10 hidden md:block">
						<HoverCard
							v-for="(tag, i) in tags"
							:key="tag.text + '-' + i"
							v-model:open="tagOpen[i]"
							:open-delay="0"
							:close-delay="120"
						>
							<HoverCardTrigger as-child>
								<span
									class="absolute cursor-pointer whitespace-nowrap select-none"
									:style="getTagStyle(i)"
									@click="onTagClick(i)"
								>
									{{ tag.text }}
								</span>
							</HoverCardTrigger>
							<HoverCardContent
								side="bottom"
								align="center"
								:side-offset="12"
								:class="cn(hoverCardContentClass)"
							>
								<div
									class="glossary-tooltip flex flex-col gap-4 rounded-sm p-4"
								>
									<h3
										class="min-w-0 text-[32px] leading-normal text-white italic"
									>
										{{ tag.text }}
									</h3>
									<p
										class="max-w-[266px] text-sm leading-5 text-balance text-white"
									>
										{{ tag.desc }}
									</p>
								</div>
							</HoverCardContent>
						</HoverCard>
					</div>

					<div class="flex flex-wrap items-center justify-center gap-3 pt-4 md:hidden">
						<span
							v-for="slug in allTagsMobile"
							:key="slug"
							class="rounded-full border border-border bg-background/80 px-3 py-1.5 text-sm font-medium text-muted-foreground"
						>
							{{ slug }}
						</span>
					</div>

					<div
						v-if="activeTagIndex !== null"
						class="pointer-events-none absolute inset-0 z-60 hidden md:block"
						aria-hidden="true"
					>
						<span
							class="absolute whitespace-nowrap select-none"
							:style="hoveredTagOverlayStyle"
						>
							{{ tags[activeTagIndex]?.text }}
						</span>
					</div>
				</div>
			</Motion>
		</div>
	</section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,400;0,500;1,400&display=swap");

.glossary-section {
	--glossary-bg: #f7f9fb;
	--glossary-globe-opacity: 0.65;
	--glossary-pill-border: oklch(0.88 0.01 245);
	--glossary-pill-bg: oklch(1 0 0 / 60%);
	--glossary-pill-text: oklch(0.48 0.02 255);
	--glossary-title: oklch(0.22 0.02 260);
	/* Figma: surface/default/dark */
	--glossary-tooltip-bg: #151b26;
	--glossary-tooltip-body: #fff5e8;
	--glossary-tooltip-shadow: 0 16px 48px -12px oklch(0.25 0.04 260 / 55%);
	background-color: var(--glossary-bg);
}

.glossary-tooltip {
	background-color: var(--glossary-tooltip-bg);
	box-shadow: var(--glossary-tooltip-shadow);
}
</style>
