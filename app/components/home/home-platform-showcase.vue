<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { Motion } from "motion-v";
import {
	IconRefresh,
	IconRocket,
	IconShieldCheck,
	IconFileDescription,
	IconSparkles,
} from "@tabler/icons-vue";

const CYCLE_MS = 4500;
const TICK_MS = 40;

const APPEAL_TEXT =
	"We respectfully appeal the rejection of AD-2024-00143. The ad content complies with Meta's advertising policies. The imagery displays educational health information, not misleading claims. Supporting documentation is attached. We request a full policy review and respectfully ask that this ad be reconsidered for approval.";

const features = [
	{
		id: "automation",
		icon: IconRefresh,
		title: "Automation",
		body: "Rules that run 24/7. Auto-budget, optimize, and pause across every platform.",
		color: "#6366f1",
		url: "app.rockads.com/automation",
	},
	{
		id: "bulk",
		icon: IconRocket,
		title: "Bulk Ad Launcher",
		body: "Hundreds of creative variations live across platforms, in seconds.",
		color: "#f59e0b",
		url: "app.rockads.com/ads-manager",
	},
	{
		id: "compliance",
		icon: IconShieldCheck,
		title: "Ad Compliance",
		body: "AI scans every creative before launch. Stay live, stay safe.",
		color: "#10b981",
		url: "app.rockads.com/compliance",
	},
	{
		id: "appeal",
		icon: IconFileDescription,
		title: "Smart Appeal",
		body: "AI-drafted appeals. Recover rejected campaigns in minutes, not days.",
		color: "#8b5cf6",
		url: "app.rockads.com/smart-appeal",
	},
	{
		id: "creative",
		icon: IconSparkles,
		title: "AI Creative Agent",
		body: "Generates, tests, and iterates ad creatives from your brand in minutes.",
		color: "#ec4899",
		url: "app.rockads.com/ai-creative",
	},
];

const automationRules = [
	{ name: "Pause Low ROAS", desc: "Pause ad sets when ROAS drops below 1.5", status: "Active" },
	{ name: "Budget Scale-Up", desc: "Increase budget when CPA is under target", status: "Active" },
	{ name: "Pause High CPA", desc: "Pause when CPA exceeds threshold", status: "Active" },
	{ name: "Scale Top Performers", desc: "Boost budget on top performing ad sets", status: "Paused" },
];

const complianceAds = [
	{ name: "Summer Sale — Hero Banner", score: 98, status: "Passed", color: "#10b981" },
	{ name: "Product Showcase — Electronics", score: 95, status: "Passed", color: "#10b981" },
	{ name: "Flash Sale — Countdown Timer", score: 72, status: "Warning", color: "#f59e0b" },
	{ name: "Weight Loss — Before/After", score: 15, status: "Rejected", color: "#ef4444" },
];

const creativeCards = [
	{ bg: "linear-gradient(135deg, #1877F2, #0a4d9e)", platform: "Meta" },
	{ bg: "linear-gradient(135deg, #ff0050, #25064c)", platform: "TikTok" },
	{ bg: "linear-gradient(135deg, #34a853, #0f5d28)", platform: "Google" },
	{ bg: "linear-gradient(135deg, #FFFC00, #9c9700)", platform: "Snap" },
	{ bg: "linear-gradient(135deg, #007ce1, #003f7a)", platform: "Meta" },
	{ bg: "linear-gradient(135deg, #444, #111)", platform: "X" },
];

// State
const active = ref(0);
const progress = ref(0);
const bulkCount = ref(0);
const bulkLive = ref(new Set<number>());
const appealText = ref("");

// Timers
let cycleTimer: ReturnType<typeof setInterval> | null = null;
let bulkTimer: ReturnType<typeof setInterval> | null = null;
let appealTimer: ReturnType<typeof setInterval> | null = null;

function startCycle() {
	if (cycleTimer) clearInterval(cycleTimer);
	progress.value = 0;
	cycleTimer = setInterval(() => {
		progress.value += (TICK_MS / CYCLE_MS) * 100;
		if (progress.value >= 100) {
			progress.value = 0;
			active.value = (active.value + 1) % features.length;
		}
	}, TICK_MS);
}

function startBulkAnimation() {
	if (bulkTimer) clearInterval(bulkTimer);
	bulkCount.value = 0;
	bulkLive.value = new Set();
	let n = 0;
	bulkTimer = setInterval(() => {
		if (n < 12) {
			n++;
			bulkCount.value = n;
			bulkLive.value = new Set([...bulkLive.value, n]);
		}
		else {
			clearInterval(bulkTimer!);
		}
	}, 220);
}

function startAppealAnimation() {
	if (appealTimer) clearInterval(appealTimer);
	appealText.value = "";
	let idx = 0;
	appealTimer = setInterval(() => {
		if (idx < APPEAL_TEXT.length) {
			appealText.value += APPEAL_TEXT[idx];
			idx++;
		}
		else {
			clearInterval(appealTimer!);
		}
	}, 22);
}

function runFeatureAnimation(i: number) {
	if (i === 1) startBulkAnimation();
	if (i === 3) startAppealAnimation();
}

function pick(i: number) {
	active.value = i;
	progress.value = 0;
	runFeatureAnimation(i);
}

watch(active, val => runFeatureAnimation(val));

onMounted(() => {
	startCycle();
});

onUnmounted(() => {
	if (cycleTimer) clearInterval(cycleTimer);
	if (bulkTimer) clearInterval(bulkTimer);
	if (appealTimer) clearInterval(appealTimer);
});
</script>

<template>
	<section class="platform-section py-20 lg:py-28">
		<div class="mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-12 xl:px-[160px]">

			<!-- Header -->
			<Motion
				as="div"
				class="mb-12 max-w-[560px] lg:mb-16"
				:initial="{ opacity: 0, y: 16 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.3 }"
				:transition="{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }"
			>
				<h2 class="text-[28px] font-medium leading-[1.2] text-white md:text-[36px] lg:text-[44px] lg:leading-[1.15]">
					The platform behind the growth.
				</h2>
				<p class="mt-4 text-[15px] leading-[1.7] text-white/55 lg:text-[17px]">
					Five tools built around one goal: keeping your campaigns live and scaling.
				</p>
			</Motion>

			<!-- Content grid -->
			<div class="flex flex-col gap-6 lg:grid lg:items-start lg:grid-cols-[380px_1fr] lg:gap-10 xl:grid-cols-[420px_1fr] xl:gap-14">

				<!-- Feature list -->
				<div class="flex flex-col gap-1">
					<button
						v-for="(f, i) in features"
						:key="f.id"
						class="feature-btn relative overflow-hidden rounded-xl px-4 py-4 text-left"
						:class="{ 'is-active': active === i }"
						@click="pick(i)"
					>
						<!-- Progress bar -->
						<div
							v-if="active === i"
							class="absolute bottom-0 left-0 h-[2px] transition-none"
							:style="{ width: progress + '%', backgroundColor: f.color }"
						/>

						<div class="flex items-start gap-3">
							<!-- Icon -->
							<div
								class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300"
								:style="active === i
									? { backgroundColor: f.color + '22', border: `1px solid ${f.color}40` }
									: { backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }"
							>
								<component
									:is="f.icon"
									class="size-[15px] transition-colors duration-300"
									:style="{ color: active === i ? f.color : 'rgba(255,255,255,0.35)' }"
									:stroke-width="1.7"
								/>
							</div>

							<!-- Text -->
							<div class="flex-1 min-w-0">
								<p
									class="text-[14px] font-semibold transition-colors duration-300"
									:class="active === i ? 'text-white' : 'text-white/45'"
								>
									{{ f.title }}
								</p>
								<div
									class="overflow-hidden transition-all duration-300"
									:style="active === i
										? 'max-height: 60px; opacity: 1; margin-top: 4px'
										: 'max-height: 0; opacity: 0; margin-top: 0'"
								>
									<p class="text-[12px] leading-relaxed text-white/40">{{ f.body }}</p>
								</div>
							</div>
						</div>
					</button>
				</div>

				<!-- Mockup window -->
				<Motion
					as="div"
					class="overflow-hidden rounded-2xl border border-white/[0.08]"
					:initial="{ opacity: 0, y: 16 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:in-view-options="{ once: true, amount: 0.2 }"
					:transition="{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }"
				>
					<!-- Window chrome -->
					<div class="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.04] px-4 py-3">
						<span class="size-2.5 rounded-full bg-white/10" />
						<span class="size-2.5 rounded-full bg-white/10" />
						<span class="size-2.5 rounded-full bg-white/10" />
						<div class="ml-3 rounded-md bg-white/[0.05] px-3 py-1">
							<span class="text-[11px] text-white/25">{{ features[active]?.url }}</span>
						</div>
					</div>

					<!-- Content area -->
					<div class="relative min-h-[380px] bg-[#0d1420] lg:min-h-[420px]">
						<Transition name="mockup" mode="out-in">
							<div :key="active" class="p-5 lg:p-6">

								<!-- Automation -->
								<template v-if="active === 0">
									<div class="mb-4 flex gap-2 overflow-x-hidden">
										<div
											v-for="t in ['Pause Low ROAS', 'Budget Scale-Up', 'Pause High CPA']"
											:key="t"
											class="shrink-0 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/40"
										>
											{{ t }}
										</div>
									</div>
									<div class="flex flex-col gap-2">
										<div
											v-for="(rule, ri) in automationRules"
											:key="ri"
											class="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 slide-in"
											:style="{ animationDelay: `${ri * 0.1}s` }"
										>
											<div>
												<p class="text-[12px] font-semibold text-white/80">{{ rule.name }}</p>
												<p class="mt-0.5 text-[11px] text-white/30">{{ rule.desc }}</p>
											</div>
											<span
												class="flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
												:class="rule.status === 'Active'
													? 'bg-emerald-500/15 text-emerald-400'
													: 'bg-white/[0.06] text-white/35'"
											>
												<span v-if="rule.status === 'Active'" class="size-1.5 shrink-0 rounded-full bg-emerald-400 pulse-dot" />
												{{ rule.status }}
											</span>
										</div>
									</div>
								</template>

								<!-- Bulk Launcher -->
								<template v-else-if="active === 1">
									<div class="mb-4 flex items-center justify-between slide-in">
										<div>
											<p class="text-[13px] font-semibold text-white/80">Campaign Launch</p>
											<p class="mt-0.5 text-[11px] text-white/30">Launching across Meta, TikTok, Google</p>
										</div>
										<div class="text-right">
											<span class="text-[28px] font-black leading-none text-white tabular-nums">{{ bulkCount }}</span>
											<p class="text-[10px] text-white/30">ads live</p>
										</div>
									</div>
									<div class="grid grid-cols-4 gap-2">
										<div
											v-for="n in 12"
											:key="n"
											class="ad-pop overflow-hidden rounded-lg border p-2 transition-all duration-300"
											:class="bulkLive.has(n)
												? 'border-emerald-500/30 bg-emerald-500/[0.07]'
												: 'border-white/[0.07] bg-white/[0.04]'"
											:style="{ animationDelay: `${(n - 1) * 0.1}s` }"
										>
											<div
												class="mb-1.5 h-9 rounded transition-colors duration-300"
												:class="bulkLive.has(n) ? 'bg-emerald-500/15' : 'bg-white/[0.07]'"
											/>
											<div class="h-1 w-3/4 rounded-full bg-white/[0.07]" />
											<div class="mt-1 h-1 w-1/2 rounded-full bg-white/[0.07]" />
											<div class="mt-2 text-center">
												<span
													class="text-[9px] font-bold transition-colors duration-300"
													:class="bulkLive.has(n) ? 'text-emerald-400' : 'text-white/20'"
												>
													{{ bulkLive.has(n) ? 'LIVE' : 'QUEUE' }}
												</span>
											</div>
										</div>
									</div>
								</template>

								<!-- Compliance -->
								<template v-else-if="active === 2">
									<div class="mb-4 grid grid-cols-4 gap-2">
										<div
											v-for="(s, si) in [
												{ val: '12', label: 'Scanned', color: 'rgba(255,255,255,0.55)' },
												{ val: '9', label: 'Passed', color: '#10b981' },
												{ val: '2', label: 'Warnings', color: '#f59e0b' },
												{ val: '1', label: 'Rejected', color: '#ef4444' },
											]"
											:key="si"
											class="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 text-center slide-in"
											:style="{ animationDelay: `${si * 0.07}s` }"
										>
											<p class="text-[20px] font-black leading-none" :style="{ color: s.color }">{{ s.val }}</p>
											<p class="mt-1 text-[10px] text-white/30">{{ s.label }}</p>
										</div>
									</div>
									<div class="flex flex-col gap-1.5">
										<div
											v-for="(ad, ai) in complianceAds"
											:key="ai"
											class="flex items-center gap-3 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 slide-in"
											:style="{ animationDelay: `${0.28 + ai * 0.09}s` }"
										>
											<div class="size-7 shrink-0 rounded bg-white/[0.07]" />
											<div class="min-w-0 flex-1">
												<p class="truncate text-[11px] font-medium text-white/70">{{ ad.name }}</p>
												<div class="mt-1.5 flex items-center gap-2">
													<div class="h-1 flex-1 rounded-full bg-white/[0.08]">
														<div
															class="h-full rounded-full score-fill"
															:style="{
																'--sw': ad.score + '%',
																'--sc': ad.color,
																animationDelay: `${0.4 + ai * 0.09}s`,
															}"
														/>
													</div>
													<span class="text-[10px] font-bold tabular-nums" :style="{ color: ad.color }">{{ ad.score }}</span>
												</div>
											</div>
											<span
												class="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold"
												:style="{ backgroundColor: ad.color + '20', color: ad.color }"
											>
												{{ ad.status }}
											</span>
										</div>
									</div>
								</template>

								<!-- Smart Appeal -->
								<template v-else-if="active === 3">
									<div class="mb-3 rounded-xl border border-red-500/25 bg-red-500/10 p-3.5 slide-in">
										<div class="flex items-start gap-3">
											<div class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
												<svg class="size-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
													<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
												</svg>
											</div>
											<div class="flex-1">
												<p class="text-[12px] font-semibold text-red-300">Rejected — Policy Violation</p>
												<p class="mt-0.5 text-[10px] text-white/35">Summer Sale — Hero Banner · Meta Ads</p>
											</div>
											<span class="shrink-0 rounded-full bg-primary/20 px-2 py-0.5 text-[9px] font-bold text-primary">Appealing</span>
										</div>
									</div>
									<div class="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 slide-in" style="animation-delay: 0.12s">
										<div class="mb-3 flex items-center gap-2">
											<div class="flex size-5 items-center justify-center rounded-full bg-primary/25">
												<svg class="size-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											</div>
											<p class="text-[11px] font-medium text-white/50">AI Writing Appeal</p>
											<span class="ml-auto tabular-nums text-[10px] text-white/25">
												{{ Math.min(100, Math.round((appealText.length / APPEAL_TEXT.length) * 100)) }}%
											</span>
										</div>
										<p class="min-h-[100px] font-mono text-[11px] leading-relaxed text-white/55">
											{{ appealText }}<span v-if="appealText.length < APPEAL_TEXT.length" class="cursor-blink">|</span>
										</p>
									</div>
								</template>

								<!-- AI Creative Agent -->
								<template v-else-if="active === 4">
									<div class="mb-3 flex items-center gap-2 slide-in">
										<div class="flex size-5 items-center justify-center rounded-full bg-pink-500/20">
											<svg class="size-3 text-pink-400" viewBox="0 0 20 20" fill="currentColor">
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
											</svg>
										</div>
										<p class="text-[12px] text-white/45">Generating ad creatives from your brand...</p>
									</div>
									<div class="grid grid-cols-3 gap-2.5">
										<div
											v-for="(card, n) in creativeCards"
											:key="n"
											class="creative-pop overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04]"
											:style="{ animationDelay: `${n * 0.15}s` }"
										>
											<div class="h-16" :style="{ background: card.bg }" />
											<div class="p-2">
												<div class="h-1.5 w-4/5 rounded-full bg-white/[0.08]" />
												<div class="mt-1 h-1.5 w-3/5 rounded-full bg-white/[0.08]" />
												<div class="mt-2 flex items-center justify-between">
													<div class="h-4 w-2/3 rounded-md bg-primary/20" />
													<span class="text-[9px] text-white/25">{{ card.platform }}</span>
												</div>
											</div>
										</div>
									</div>
								</template>

							</div>
						</Transition>
					</div>
				</Motion>

			</div>
		</div>
	</section>
</template>

<style scoped>
.platform-section {
	background-color: #070f1d;
}

.feature-btn {
	background: transparent;
	border: none;
	cursor: pointer;
	transition: background-color 0.2s ease;
}
.feature-btn:hover:not(.is-active) {
	background: rgba(255, 255, 255, 0.03);
}
.feature-btn.is-active {
	background: rgba(255, 255, 255, 0.055);
}

/* Transition */
.mockup-enter-active {
	transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.mockup-leave-active {
	transition: opacity 0.18s ease;
}
.mockup-enter-from {
	opacity: 0;
	transform: translateY(8px);
}
.mockup-leave-to {
	opacity: 0;
}

/* Slide in */
@keyframes slideIn {
	from { opacity: 0; transform: translateY(10px); }
	to { opacity: 1; transform: translateY(0); }
}
.slide-in {
	animation: slideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Pulse dot */
@keyframes pulseDot {
	0%, 100% { opacity: 1; }
	50% { opacity: 0.35; }
}
.pulse-dot {
	animation: pulseDot 1.5s ease-in-out infinite;
}

/* Ad pop */
@keyframes adPop {
	from { opacity: 0; transform: scale(0.88); }
	to { opacity: 1; transform: scale(1); }
}
.ad-pop {
	animation: adPop 0.38s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Score fill */
@keyframes scoreFill {
	from { width: 0; }
	to { width: var(--sw); }
}
.score-fill {
	animation: scoreFill 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
	background-color: var(--sc);
}

/* Creative pop */
@keyframes creativePop {
	from { opacity: 0; transform: scale(0.88) translateY(6px); }
	to { opacity: 1; transform: scale(1) translateY(0); }
}
.creative-pop {
	animation: creativePop 0.42s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Cursor blink */
@keyframes blink {
	0%, 100% { opacity: 1; }
	50% { opacity: 0; }
}
.cursor-blink {
	animation: blink 0.7s ease-in-out infinite;
	color: rgba(99, 102, 241, 0.9);
}
</style>
