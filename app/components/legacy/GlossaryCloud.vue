<template>
	<section class="relative overflow-hidden bg-[#f7f9fb] py-12 lg:py-20">
		<!-- Layer_6 topographic background -->
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
			<img
				:src="topoLayer"
				alt=""
				class="h-full w-full max-w-none object-cover opacity-75"
			>
		</div>
		<div
			ref="cloudRef"
			class="relative mx-auto h-[400px] max-w-[1440px] px-5 md:h-[450px] md:px-10 lg:h-[500px] lg:px-0"
			@mousemove="onMouseMove"
			@mouseleave="onMouseLeave"
		>
			<!-- Subtle glow following cursor -->
			<div
				class="pointer-events-none absolute hidden h-[500px] w-[500px] rounded-full transition-opacity duration-700 md:block"
				:class="mouseInside ? 'opacity-100' : 'opacity-0'"
				:style="{
					left: mouseX - 250 + 'px',
					top: mouseY - 250 + 'px',
					background: 'radial-gradient(circle, rgba(31,113,234,0.06) 0%, transparent 70%)',
				}"
			/>

			<!-- Tags (desktop) -->
			<div class="absolute inset-0 hidden md:block">
				<span
					v-for="(tag, i) in tags"
					:key="tag.text + '-' + i"
					class="absolute cursor-pointer font-medium whitespace-nowrap select-none"
					:style="getTagStyle(i)"
					@mouseenter="hoveredTag = i"
					@mouseleave="hoveredTag = null"
					@click="onTagClick(i)"
				>
					{{ tag.text }}
				</span>
			</div>

			<!-- Popup card -->
			<Transition name="glossary-popup">
				<div
					v-if="hoveredTag !== null"
					class="bg-surface-dark pointer-events-none absolute z-30 w-[280px] rounded-2xl p-5 shadow-2xl lg:w-[320px] lg:p-6"
					:style="popupStyle"
				>
					<div class="mb-3 flex items-center gap-3">
						<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15">
							<svg
								class="h-4 w-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#1F71EA"
								stroke-width="2"
								stroke-linecap="round"
							>
								<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
							</svg>
						</div>
						<h4 class="text-base leading-snug font-semibold text-white lg:text-lg">
							{{ tags[hoveredTag!]?.text }}
						</h4>
					</div>
					<p class="text-text-gray-light text-xs leading-relaxed lg:text-sm">
						{{ tags[hoveredTag!]?.desc }}
					</p>
				</div>
			</Transition>

			<!-- Mobile: simplified tag cloud -->
			<div class="flex flex-wrap items-center justify-center gap-3 pt-4 md:hidden">
				<span
					v-for="tag in allTagsMobile"
					:key="tag"
					class="text-text-gray-light/70 rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium"
				>
					{{ tag }}
				</span>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const topoLayer = "/images/layer6-topo.svg";

interface RawTag {
	text: string;
	x: number;
	y: number;
	url: string;
	desc: string;
}

interface Tag extends RawTag {
	baseSize: number;
	baseOpacity: number;
}

const cloudRef = ref<HTMLElement | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);
const mouseInside = ref(false);
const hoveredTag = ref<number | null>(null);

const LENS_MAX = 1.5;
const LENS_MIN = 0.5;
const LENS_POWER = 2.2;
const DIRECTIONAL_ORIGIN = false;

const CENTER_X = 50;
const CENTER_Y = 50;
const MAX_DIST = 20; // 62
const MIN_SIZE = 18;
const MAX_SIZE = 26;
const MIN_OPACITY = 0.85;
const MAX_OPACITY = 0.95;

const rawTags: RawTag[] = [
	{ text: "/billing-changes", x: 6, y: 6, url: "https://blog.rockads.com/meta-ads-billing-changes-2026/", desc: "Meta is removing credit card payments for high-spend ad accounts. Switch to invoicing or direct debit before April 2026 to keep campaigns running." },
	{ text: "/shopify-automation", x: 42, y: 4, url: "https://blog.rockads.com/shopify-ad-automation/", desc: "Connect your Shopify store to ad automation so campaigns react to inventory changes, bestsellers, and new product launches in real time." },
	{ text: "/manus-ai", x: 76, y: 8, url: "https://blog.rockads.com/how-to-use-manus-ai-meta-ad-library/", desc: "Use AI agents to automate competitor ad analysis in Meta Ad Library and uncover winning creative strategies at scale." },
	{ text: "/mer-trap", x: 48, y: 36, url: "https://blog.rockads.com/why-your-best-roas-days-might-be-killing-your-cash-flow/", desc: "High platform ROAS can mask cannibalized organic sales. Shift focus to MER and incremental ROAS to protect your real cash flow." },
	{ text: "/lookalike-audiences", x: 22, y: 16, url: "https://blog.rockads.com/expand-your-reach-with-meta-lookalike-audiences/", desc: "Reach new customers who share key attributes with your best buyers using Meta Lookalike Audiences for efficient scaling." },
	{ text: "/spark-ads", x: 40, y: 56, url: "https://blog.rockads.com/what-are-tiktok-spark-ads/", desc: "Spark Ads boost existing organic content as paid ads, blending creator authenticity with scalable reach on TikTok." },
	{ text: "/cpm-optimization", x: 58, y: 14, url: "https://blog.rockads.com/cpm-in-meta-ads-why-its-high-and-how-to-reduce-it/", desc: "Understand what drives high CPM in Meta Ads and apply practical tactics to bring your cost per thousand impressions down." },
	{ text: "/catalog-ads", x: 86, y: 18, url: "https://blog.rockads.com/tiktok-smart-catalog-ads/", desc: "Smart+ Catalog Ads combine dynamic creative with AI-powered targeting for scalable, conversion-optimized product campaigns." },
	{ text: "/creative-practices", x: 4, y: 28, url: "https://blog.rockads.com/tiktok-ads-creative-best-practices/", desc: "After TikTok's Q2 algorithm shift, creative freshness and hook clarity matter more than ever for ad delivery performance." },
	{ text: "/budget-rules", x: 38, y: 24, url: "https://blog.rockads.com/budget-automation-rules-you-need-to-scale-meta-ads/", desc: "Five essential automation rules to scale Meta Ads — auto-scale winners, pause losers, cap tests, and reallocate unused spend." },
	{ text: "/content-production", x: 68, y: 26, url: "https://blog.rockads.com/from-hook-ideas-to-scroll-stopping-creatives/", desc: "AI tools take you from brief to tested ad creative in 15 minutes — handling hooks, copy variations, and CTA optimization at scale." },
	{ text: "/campaign-roles", x: 14, y: 38, url: "https://blog.rockads.com/campaign-role-automation-playbook/", desc: "Assign specific roles to campaigns — prospecting, retargeting, testing, loyalty — with tailored automation rules for each." },
	{ text: "/capi-pixel", x: 80, y: 34, url: "https://blog.rockads.com/capi-vs-pixel/", desc: "Relying on Meta Pixel alone can lose up to 70% of conversion data. Add server-side CAPI to survive iOS privacy restrictions." },
	{ text: "/reels-scoring", x: 28, y: 46, url: "https://blog.rockads.com/how-meta-scores-your-reels-ads-engagement-watch-time-more/", desc: "Meta scores Reels ads on watch time, hook strength, and engagement signals. Poor scores lead to higher CPMs and slower delivery." },
	{ text: "/fix-roas", x: 60, y: 44, url: "https://blog.rockads.com/how-to-diagnose-and-fix-poor-roas-in-meta-ads/", desc: "Diagnose poor ROAS through funnel breakdown, audience saturation, and creative fatigue — then fix it with targeted optimizations." },
	{ text: "/ppc-automation", x: 86, y: 46, url: "https://blog.rockads.com/signs-your-ppc-campaigns-need-automation/", desc: "Five clear signs your PPC campaigns need automation — constant manual bid adjustments, multi-platform chaos, and budget waste." },
	{ text: "/ad-fatigue", x: 6, y: 54, url: "https://blog.rockads.com/what-is-ad-fatigue-and-how-to-beat-it-in-your-meta-tiktok-campaigns/", desc: "When audiences see the same ads too often, CTR drops and CPC rises. Rotate creatives weekly and cap frequency at 3–4." },
	{ text: "/automation-roi", x: 72, y: 54, url: "https://blog.rockads.com/how-to-calculate-roi-from-ppc-automation-tools/", desc: "Calculate the true return from PPC automation by measuring time savings, performance lifts, and reduced manual overhead." },
	{ text: "/meta-dropshipping", x: 18, y: 66, url: "https://blog.rockads.com/how-to-run-meta-ads-for-dropshipping/", desc: "Step-by-step guide to running profitable Meta Ads for dropshipping with niche targeting, Pixel setup, and optimized placements." },
	{ text: "/tiktok-blackfriday", x: 52, y: 64, url: "https://blog.rockads.com/essential-tiktok-marketing-tips-to-supercharge-your-black-friday-campaigns/", desc: "Supercharge Black Friday campaigns on TikTok with trending content, retargeting strategies, and compelling ad creatives." },
	{ text: "/ai-marketing", x: 82, y: 66, url: "https://blog.rockads.com/revolutionize-your-marketing-how-artificial-intelligence-is-changing-the-game/", desc: "AI is transforming marketing through advanced data analysis, personalized campaigns, chatbots, and automated optimization." },
	{ text: "/blackfriday-checklist", x: 4, y: 78, url: "https://blog.rockads.com/ultimate-black-friday-checklist-for-performance-marketers/", desc: "The ultimate performance marketing checklist for Black Friday — from audience setup to creative testing and budget planning." },
	{ text: "/tiktok-shadowban", x: 36, y: 76, url: "https://blog.rockads.com/tiktok-shadowban-what-is-it-and-how-to-get-unshadowbanned/", desc: "TikTok can silently limit your reach if you violate guidelines. Learn how to detect a shadowban and recover your visibility." },
	{ text: "/community-guidelines", x: 66, y: 78, url: "https://blog.rockads.com/behind-the-scenes-of-tiktoks-community-guidelines/", desc: "Explore the content policies TikTok enforces to maintain a safe environment — from hate speech rules to copyright enforcement." },
	{ text: "/google-suspensions", x: 24, y: 90, url: "https://blog.rockads.com/understanding-and-overcoming-circumventing-systems-suspensions/", desc: "Google Ads account suspended for circumventing systems? Learn why it happens and the exact steps to appeal and recover." },
];

function onTagClick(index: number) {
	const tag = tags[index];
	if (tag?.url) {
		window.open(tag.url, "_blank", "noopener,noreferrer");
	}
}

const tags: Tag[] = rawTags.map((t) => {
	const dist = Math.sqrt((t.x - CENTER_X) ** 2 + (t.y - CENTER_Y) ** 2);
	const factor = Math.max(0, 1 - dist / MAX_DIST);
	return {
		...t,
		baseSize: Math.round(MIN_SIZE + factor * (MAX_SIZE - MIN_SIZE)),
		baseOpacity: +(MIN_OPACITY + factor * (MAX_OPACITY - MIN_OPACITY)).toFixed(2),
	};
});

const allTagsMobile = [
	"/billing-changes", "/shopify-automation", "/manus-ai", "/spark-ads",
	"/budget-rules", "/lookalike-audiences", "/capi-pixel", "/fix-roas",
	"/ad-fatigue", "/cpm-optimization", "/tiktok-blackfriday", "/ai-marketing",
];

let pendingX = 0;
let pendingY = 0;
let rafPending = false;

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
	hoveredTag.value = null;
}

function getTagStyle(index: number): Record<string, string | number> {
	const tag = tags[index]!;
	const isHovered = hoveredTag.value === index;

	let scale = 1;
	let opacity = tag.baseOpacity;
	let color = "#6B7280";
	let originX = 50;
	let originY = 50;

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
			color = "#1F71EA";
		}
		else {
			scale = LENS_MIN + (LENS_MAX - LENS_MIN) * Math.pow(1 - norm, LENS_POWER);
			opacity = 0.6 + 0.7 * Math.pow(1 - norm, 1.5);
		}
	}

	return {
		left: tag.x + "%",
		top: tag.y + "%",
		fontSize: tag.baseSize + "px",
		transform: `scale(${scale})`,
		transformOrigin: `${originX}% ${originY}%`,
		opacity,
		color,
		transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, color 0.2s ease, transform-origin 0.3s ease",
		zIndex: isHovered ? 10 : 1,
	};
}

const popupStyle = computed(() => {
	if (hoveredTag.value === null || !cloudRef.value) return { display: "none" };
	const tag = tags[hoveredTag.value]!;
	const cw = cloudRef.value.offsetWidth;
	const ch = cloudRef.value.offsetHeight;

	const tagX = (tag.x / 100) * cw;
	const tagY = (tag.y / 100) * ch;

	const popupW = 320;
	const popupH = 170;
	const gap = 14;

	let left = tagX;
	let top = tagY - popupH - gap;

	if (top < 10) top = tagY + 30;
	if (left + popupW > cw - 20) left = cw - popupW - 20;
	if (left < 10) left = 10;

	return {
		left: left + "px",
		top: top + "px",
	};
});
</script>

<style scoped>
.glossary-popup-enter-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.glossary-popup-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.glossary-popup-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.96);
}
.glossary-popup-leave-to {
  opacity: 0;
  transform: translateY(6px) scale(0.98);
}
</style>
