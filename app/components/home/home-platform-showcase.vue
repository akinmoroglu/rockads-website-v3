<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { Motion } from "motion-v";
import {
	IconRefresh,
	IconRocket,
	IconShieldCheck,
	IconSparkles,
	IconBrandWhatsapp,
} from "@tabler/icons-vue";
import techAutomationPath from "@/assets/images/services/tech/ad-automation.svg?url";
import aiCreativeStudioPath from "@/assets/images/services/tech/ai-creative-studio.svg?url";

const CYCLE_MS = 4500;
const TICK_MS = 40;

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
		id: "creative",
		icon: IconSparkles,
		title: "AI Creative Agent",
		body: "Generates, tests, and iterates ad creatives from your brand in minutes.",
		color: "#ec4899",
		url: "app.rockads.com/ai-creative",
	},
	{
		id: "whatsapp",
		icon: IconBrandWhatsapp,
		title: "WhatsApp API",
		body: "Direct onboarding to the WhatsApp Business API. Turn retention into revenue.",
		color: "#25D366",
		url: "app.rockads.com/whatsapp",
	},
];

const chatMessages = [
	{ id: 1, type: "brand", text: "Hey Alex 👋 Black Friday just went live — 30% off everything for the next 24h ⚡️", time: "09:41" },
	{ id: 2, type: "brand", text: "Your favorite ☕️ Cold Brew is back in stock too. Want me to drop the link?", time: "09:41" },
	{ id: 3, type: "user", text: "Yes please!", time: "09:42" },
	{ id: 4, type: "brand", text: "Here you go → brand.co/bf-drop Code BF30 auto-applied 🎁", time: "09:42" },
	{ id: 5, type: "user", text: "Just ordered 🙌", time: "09:43" },
	{ id: 6, type: "brand", text: "Boom 🔥 You unlocked a free sample. We'll text you when it ships.", time: "09:43" },
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

// Timers
let cycleTimer: ReturnType<typeof setInterval> | null = null;
let bulkTimer: ReturnType<typeof setInterval> | null = null;

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

function runFeatureAnimation(i: number) {
	if (i === 1) startBulkAnimation();
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
});
</script>

<template>
	<section class="platform-section py-20 lg:py-28">
		<div class="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-10 xl:px-[80px] 2xl:px-[120px]">

			<!-- Content grid -->
			<div class="flex flex-col gap-8 lg:grid lg:items-start lg:grid-cols-[340px_1fr] lg:gap-12 xl:grid-cols-[380px_1fr] xl:gap-16">

				<!-- Left Column: Header + Feature list -->
				<div class="flex flex-col">
					<!-- Header -->
					<Motion
						as="div"
						class="mb-10 max-w-[560px] lg:mb-12"
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
					<div v-if="active !== 0 && active !== 3" class="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.04] px-4 py-3">
						<span class="size-2.5 rounded-full bg-white/10" />
						<span class="size-2.5 rounded-full bg-white/10" />
						<span class="size-2.5 rounded-full bg-white/10" />
						<div class="ml-3 rounded-md bg-white/[0.05] px-3 py-1">
							<span class="text-[11px] text-white/25">{{ features[active]?.url }}</span>
						</div>
					</div>

					<!-- Content area -->
					<div class="relative min-h-[380px] bg-[#0d1420] lg:min-h-[500px] xl:min-h-[540px]">
						<Transition name="mockup" mode="out-in">
							<div :key="active" :class="[active === 0 || active === 3 ? '' : 'p-6 lg:p-10']">

								<!-- Automation -->
								<template v-if="active === 0">
									<div class="w-full">
										<img :src="techAutomationPath" alt="Automation Console" class="w-full h-auto block" />
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

								<!-- AI Creative Agent -->
								<template v-else-if="active === 3">
									<div class="w-full">
										<img :src="aiCreativeStudioPath" alt="AI Creative Studio" class="w-full h-auto block" />
									</div>
								</template>

								<!-- WhatsApp API -->
								<template v-else-if="active === 4">
									<div class="mb-4 grid grid-cols-2 gap-6 lg:gap-8">
										<!-- Left Header -->
										<div class="flex flex-col slide-in">
											<p class="text-[13px] font-semibold text-white/80">Campaign Manager</p>
											<p class="mt-0.5 text-[11px] text-[#25D366]">Meta Business API: Connected</p>
										</div>
										<!-- Right Header -->
										<div class="flex flex-col items-center slide-in" style="animation-delay: 0.4s;">
											<p class="text-[11px] text-white/30 pt-0.5">Live Chat Preview</p>
										</div>
									</div>
									<div class="grid grid-cols-2 gap-6 lg:gap-8">
										<!-- Left: Dashboard Stats -->
										<div class="flex flex-col gap-4">
											<div class="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 slide-in" style="animation-delay: 0.1s;">
												<p class="text-[12px] text-white/50">Active Broadcast</p>
												<p class="mt-1 text-[16px] font-semibold text-white">Black Friday VIP Drop</p>
												<div class="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
													<div class="h-full w-[85%] rounded-full bg-[#25D366]"></div>
												</div>
												<p class="mt-2 text-right text-[10px] text-white/40">12,450 / 15,000 sent</p>
											</div>
											<div class="grid grid-cols-2 gap-4">
												<div class="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 slide-in" style="animation-delay: 0.2s;">
													<p class="text-[24px] font-bold text-white">98%</p>
													<p class="text-[11px] text-white/50">Avg. Open Rate</p>
												</div>
												<div class="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 slide-in" style="animation-delay: 0.3s;">
													<p class="text-[24px] font-bold text-white">32%</p>
													<p class="text-[11px] text-white/50">Conv. Rate</p>
												</div>
											</div>
										</div>

										<!-- Right: Live Preview -->
										<div class="flex flex-col items-center justify-start -mt-2">
											<div class="relative h-[260px] w-[130px] shrink-0 overflow-hidden rounded-[16px] border-[3px] border-[#1a1f2e] bg-[#0b141a] shadow-lg slide-in" style="animation-delay: 0.4s;">
												<!-- Notch -->
												<div class="absolute left-1/2 top-0 z-20 h-2 w-10 -translate-x-1/2 rounded-b-[4px] bg-[#1a1f2e]"></div>
												
												<!-- Header -->
												<div class="absolute left-0 right-0 top-0 z-10 flex items-center gap-1.5 bg-[#202c33] px-1.5 pb-1 pt-4">
													<div class="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-[6px] font-bold text-[#060a14]">RB</div>
													<div class="flex flex-col">
														<span class="text-[7px] font-semibold text-white">Retail Brand</span>
													</div>
												</div>

												<!-- Chat Area -->
												<div class="absolute bottom-[28px] left-0 right-0 top-[30px] overflow-hidden bg-[#0b141a] p-1.5">
													<div class="flex flex-col justify-end space-y-1.5 pt-2">
														<div
															v-for="(msg, index) in chatMessages"
															:key="msg.id"
															class="relative max-w-[85%] rounded-[6px] px-1.5 py-1 creative-pop"
															:class="msg.type === 'user' ? 'self-end bg-[#005c4b] text-white rounded-tr-[1px]' : 'self-start bg-[#202c33] text-white rounded-tl-[1px]'"
															:style="{ animationDelay: `${0.6 + index * 0.3}s` }"
														>
															<p class="text-[5px] leading-relaxed">{{ msg.text }}</p>
														</div>
													</div>
												</div>

												<!-- Input Area -->
												<div class="absolute bottom-0 left-0 right-0 flex items-center gap-1 bg-[#202c33] p-1.5">
													<div class="flex h-4 w-full items-center rounded-full bg-[#2a3942] px-1.5"></div>
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
