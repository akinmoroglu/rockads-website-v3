<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import financialSvg from "@/assets/images/services/core/financial.svg?url";
import growthSvg from "@/assets/images/services/core/growth.svg?url";
import operationSvg from "@/assets/images/services/core/operation.svg?url";
import strategicSvg from "@/assets/images/services/core/strategic.svg?url";
import ecosystemSvg from "@/assets/images/services/core/ecosystem.svg?url";
import integritySvg from "@/assets/images/services/core/integrity.svg?url";
import dashboardSvg from "@/assets/images/services/core/dashboardh.svg?url";
import HomeCta from "@/components/home/home-cta.vue";

useHead({
	title: "Core Services - Rockads",
});

// ── Dot Grid ──────────────────────────────────────────────
const heroRef = ref<HTMLElement | null>(null);
const dotCanvas = ref<HTMLCanvasElement | null>(null);

interface Dot {
	cx: number;
	cy: number;
	ox: number;
	oy: number;
	vx: number;
	vy: number;
}

const DOT_SIZE = 2;
const DOT_GAP = 22;
const DOT_COLOR = "#c8cdd5";
const DOT_ACTIVE = "#1F71EA";
const PROXIMITY = 100;
const SPEED_TRIGGER = 80;
const SHOCK_RADIUS = 0;
const SHOCK_STRENGTH = 0;
const SPRING = 0.135;
const DAMPING = 0.15;
const RETURN_THRESHOLD = 0.01;

let dots: Dot[] = [];
let dotRaf = 0;
let gridW = 0;
let gridH = 0;
const pointer = { x: -9999, y: -9999, vx: 0, vy: 0, speed: 0, lastX: 0, lastY: 0, lastTime: 0 };

function buildDots(canvas: HTMLCanvasElement) {
	const wrap = canvas.parentElement;

	if (!wrap) return;
	const { width, height } = wrap.getBoundingClientRect();

	gridW = width;
	gridH = height;
	const dpr = window.devicePixelRatio || 1;

	canvas.width = width * dpr;
	canvas.height = height * dpr;
	canvas.style.width = `${width}px`;
	canvas.style.height = `${height}px`;
	const ctx = canvas.getContext("2d");

	if (ctx) ctx.scale(dpr, dpr);

	const cell = DOT_SIZE + DOT_GAP;
	const cols = Math.floor((width + DOT_GAP) / cell);
	const rows = Math.floor((height + DOT_GAP) / cell);
	const startX = (width - (cell * cols - DOT_GAP)) / 2 + DOT_SIZE / 2;
	const startY = (height - (cell * rows - DOT_GAP)) / 2 + DOT_SIZE / 2;

	dots = [];
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			dots.push({ cx: startX + c * cell, cy: startY + r * cell, ox: 0, oy: 0, vx: 0, vy: 0 });
		}
	}
}

function hexToRgb(hex: string): [number, number, number] {
	const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);

	if (!m) return [0, 0, 0];

	return [parseInt(m[1]!, 16), parseInt(m[2]!, 16), parseInt(m[3]!, 16)];
}

const baseRgb = hexToRgb(DOT_COLOR);
const activeRgb = hexToRgb(DOT_ACTIVE);

function drawDots() {
	const canvas = dotCanvas.value;

	if (!canvas) return;
	const ctx = canvas.getContext("2d");

	if (!ctx) return;
	const dpr = window.devicePixelRatio || 1;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const proxSq = PROXIMITY * PROXIMITY;

	for (const dot of dots) {
		// spring physics
		if (dot.ox !== 0 || dot.oy !== 0 || dot.vx !== 0 || dot.vy !== 0) {
			dot.vx += -dot.ox * SPRING;
			dot.vy += -dot.oy * SPRING;
			dot.vx *= DAMPING;
			dot.vy *= DAMPING;
			dot.ox += dot.vx;
			dot.oy += dot.vy;
			if (Math.abs(dot.ox) < RETURN_THRESHOLD && Math.abs(dot.oy) < RETURN_THRESHOLD && Math.abs(dot.vx) < RETURN_THRESHOLD && Math.abs(dot.vy) < RETURN_THRESHOLD) {
				dot.ox = 0;
				dot.oy = 0;
				dot.vx = 0;
				dot.vy = 0;
			}
		}

		const px = dot.cx + dot.ox;
		const py = dot.cy + dot.oy;
		const dx = dot.cx - pointer.x;
		const dy = dot.cy - pointer.y;
		const dsq = dx * dx + dy * dy;

		let r = baseRgb[0], g = baseRgb[1], b = baseRgb[2];

		if (dsq <= proxSq) {
			const t = 1 - Math.sqrt(dsq) / PROXIMITY;

			r = Math.round(r + (activeRgb[0] - r) * t);
			g = Math.round(g + (activeRgb[1] - g) * t);
			b = Math.round(b + (activeRgb[2] - b) * t);
		}

		const diag = gridW + gridH;
		const fromTopRight = (gridW - dot.cx) + dot.cy;
		const baseAlpha = Math.max(0, 1 - fromTopRight / diag) * 0.55;

		ctx.beginPath();
		ctx.arc(px, py, DOT_SIZE / 2, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(${r},${g},${b},${baseAlpha})`;
		ctx.fill();
	}

	dotRaf = requestAnimationFrame(drawDots);
}

let moveThrottleTime = 0;

function onDotMove(e: MouseEvent) {
	const now = performance.now();

	if (now - moveThrottleTime < 30) return;
	moveThrottleTime = now;

	const canvas = dotCanvas.value;

	if (!canvas) return;
	const rect = canvas.getBoundingClientRect();
	const dt = pointer.lastTime ? now - pointer.lastTime : 16;
	const dx = e.clientX - pointer.lastX;
	const dy = e.clientY - pointer.lastY;
	let vx = (dx / dt) * 1000;
	let vy = (dy / dt) * 1000;
	let speed = Math.hypot(vx, vy);
	const MAX_SPEED = 5000;

	if (speed > MAX_SPEED) {
		const s = MAX_SPEED / speed;

		vx *= s;
		vy *= s;
		speed = MAX_SPEED;
	}

	pointer.lastTime = now;
	pointer.lastX = e.clientX;
	pointer.lastY = e.clientY;
	pointer.vx = vx;
	pointer.vy = vy;
	pointer.speed = speed;
	pointer.x = e.clientX - rect.left;
	pointer.y = e.clientY - rect.top;

	if (speed > SPEED_TRIGGER) {
		for (const dot of dots) {
			const dist = Math.hypot(dot.cx - pointer.x, dot.cy - pointer.y);

			if (dist < PROXIMITY) {
				const pushX = (dot.cx - pointer.x) + vx * 0.004;
				const pushY = (dot.cy - pointer.y) + vy * 0.004;
				const falloff = 1 - dist / PROXIMITY;

				dot.vx += pushX * falloff * 0.8;
				dot.vy += pushY * falloff * 0.8;
			}
		}
	}
}

function onDotClick(e: MouseEvent) {
	const canvas = dotCanvas.value;

	if (!canvas) return;
	const rect = canvas.getBoundingClientRect();
	const cx = e.clientX - rect.left;
	const cy = e.clientY - rect.top;

	for (const dot of dots) {
		const dist = Math.hypot(dot.cx - cx, dot.cy - cy);

		if (dist < SHOCK_RADIUS) {
			const falloff = Math.max(0, 1 - dist / SHOCK_RADIUS);

			dot.vx += (dot.cx - cx) * SHOCK_STRENGTH * falloff;
			dot.vy += (dot.cy - cy) * SHOCK_STRENGTH * falloff;
		}
	}
}

let dotRo: ResizeObserver | null = null;

function initDotGrid() {
	const canvas = dotCanvas.value;

	if (!canvas) return;
	buildDots(canvas);
	dotRaf = requestAnimationFrame(drawDots);

	dotRo = new ResizeObserver(() => {
		const c = dotCanvas.value;

		if (c) buildDots(c);
	});
	if (canvas.parentElement) dotRo.observe(canvas.parentElement);

	window.addEventListener("mousemove", onDotMove, { passive: true });
	window.addEventListener("click", onDotClick);
}

function destroyDotGrid() {
	cancelAnimationFrame(dotRaf);
	if (dotRo) dotRo.disconnect();
	window.removeEventListener("mousemove", onDotMove);
	window.removeEventListener("click", onDotClick);
}

onMounted(() => {
	initDotGrid();
});
onUnmounted(() => {
	destroyDotGrid();
});

const opContinuityBullets = [
	"Instant 24/7 top-up availability for uninterrupted delivery.",
	"Minimal latency in critical financial moments.",
	"Faster response for campaigns that can't afford downtime.",
	"Continuity-first flow designed around real operational rhythms, not office hours.",
];

const strategicBullets = [
	"Hands-on partner support with direct operational access.",
	"Practical growth guidance informed by real platform experience.",
	"Market-aware thinking that goes beyond generic playbooks.",
	"Alignment that extends well beyond software alone.",
];

const ecosystemBullets = [
	"Deeply integrated with Meta, Google, TikTok, X, and Snapchat.",
	"Strategies shaped by the real-world dynamics of global advertising, not theory.",
	"Long-standing platform partnerships that solve problems faster and unlock opportunities.",
	"A central ecosystem position that gives you a unique vantage point on where the industry is heading.",
];

const integrityBullets = [
	"Structured review logic ensuring all operations meet the highest standards.",
	"Proactive, platform-aware safeguards that protect accounts before risks surface.",
	"Every process designed with long-term operational continuity as the objective.",
	"Architected for stable, predictable, and enduring success.",
];

const dashboardBullets = [
	"Multi-account management with real-time status across all ad accounts and platforms.",
	"User and role management with granular permissions and team structures.",
	"Financial overview with live balance tracking, payment history, and credit utilization.",
	"Consolidated reporting across platforms, accounts, and markets.",
	"Direct operational controls for top-ups, budget allocations, and account configurations.",
];
</script>

<template>
	<div class="font-display">
		<TheHeader />

		<!-- Hero -->
		<section
			ref="heroRef"
			class="relative overflow-hidden bg-[#f7f9fb]"
		>
			<canvas
				ref="dotCanvas"
				class="pointer-events-none absolute inset-0 h-full w-full"
			/>
			<div class="relative mx-auto max-w-[1066px] px-5 pt-[140px] pb-12 text-center lg:px-0 lg:pt-[164px] lg:pb-16">
				<h1 class="text-[40px] leading-[1.14] font-medium md:text-[48px] lg:text-[56px]">
					<span class="text-primary">Core</span> <span class="text-text-base">Services</span>
				</h1>
				<p class="text-text-gray-dark mt-4 text-base font-medium lg:mt-5 lg:text-lg">
					The Structure Behind Serious Expansion
				</p>
				<p class="text-text-base mt-6 max-w-[1066px] text-sm leading-relaxed lg:mt-8 lg:text-base">
					True global scale isn't just built on technology. It's built on a foundation of operational excellence. Rockads Core is the operational backbone for advertisers who refuse to slow down. We remove every obstacle that stands between you and sustainable global growth: financial friction, operational gaps, compliance risks, and platform complexity. What remains is a clear, stable path to scale, backed by infrastructure, not promises.
				</p>
				<button class="bg-primary-600 mt-8 rounded-lg px-6 py-3 text-base font-medium text-white transition-colors hover:bg-primary lg:mt-10">
					Get Started in Minutes
				</button>
			</div>
		</section>

		<!-- Service Cards -->
		<section class="bg-[#f7f9fb] px-5 lg:px-0">
			<div class="mx-auto flex max-w-[1141px] flex-col gap-6 lg:gap-8">
				<!-- Row 1: Financial Infrastructure + Growth Capacity -->
				<div class="grid gap-6 md:grid-cols-2 lg:gap-8">
					<!-- Financial Infrastructure -->
					<div
						class="border-primary-light flex flex-col rounded-2xl border p-8 lg:p-12"
						style="background-color: #F8F9FB;"
					>
						<h2 class="text-text-base text-2xl leading-tight font-medium lg:text-[32px]">
							Financial Infrastructure
						</h2>
						<p class="text-text-gray-dark mt-3 text-base font-medium lg:text-lg">
							Resilient foundations. Zero friction.
						</p>
						<p class="text-text-base mt-5 text-sm leading-relaxed lg:text-base">
							Our financial infrastructure gives partners more room to operate, greater stability, and the flexibility to move fast. Versatile payment models, flexible settlement structures, compliance-first account foundations, and credit-backed continuity, engineered so your most ambitious moves are never constrained by cash mechanics.
						</p>
						<div class="mt-6 flex flex-1 items-end justify-center pb-2">
							<img
								:src="financialSvg"
								alt=""
								class="w-full max-w-[429px]"
							>
						</div>
					</div>

					<!-- Growth Capacity -->
					<div
						class="border-primary-light flex flex-col overflow-hidden rounded-2xl border p-8 lg:p-12"
						style="background-color:#F8F9FB;"
					>
						<BlurText
							text="Growth Capacity"
							class="text-text-base text-2xl leading-tight font-medium lg:text-[32px]"
						/>
						<p class="text-text-gray-dark mt-3 text-base font-medium lg:text-lg">
							Scale without ceilings.
						</p>
						<p class="text-text-base mt-5 text-sm leading-relaxed lg:text-base">
							An operating environment designed to absorb expansion without bottlenecks. New markets, increased spend, new accounts. Core's infrastructure scales with you, never against you. There are no artificial limits on where or how fast you can grow.
						</p>
						<div class="mt-6 flex flex-1 items-end justify-center">
							<div class="gc-globe-wrap">
								<!-- Globe hemisphere arcs -->
								<svg
									class="gc-globe-svg"
									viewBox="0 0 522 326"
									fill="none"
								>
									<!-- Dot pattern for globe surface -->
									<defs>
										<clipPath id="gcClip"><rect
											x="0"
											y="30"
											width="522"
											height="296"
										/></clipPath>
									</defs>
									<g clip-path="url(#gcClip)">
										<!-- Outer arc -->
										<ellipse
											cx="261"
											cy="343"
											rx="304"
											ry="304"
											stroke="#c5d8f0"
											stroke-width="1"
											fill="none"
											stroke-dasharray="3 6"
										/>
										<!-- Middle arc -->
										<ellipse
											cx="261"
											cy="343"
											rx="241"
											ry="241"
											stroke="#c5d8f0"
											stroke-width="1"
											fill="none"
											stroke-dasharray="3 6"
										/>
										<!-- Inner arc -->
										<ellipse
											cx="261"
											cy="343"
											rx="167"
											ry="167"
											stroke="#c5d8f0"
											stroke-width="1"
											fill="none"
											stroke-dasharray="3 6"
										/>
										<!-- Latitude lines -->
										<ellipse
											cx="261"
											cy="343"
											rx="290"
											ry="80"
											stroke="#d5e3f3"
											stroke-width="0.8"
											fill="none"
											stroke-dasharray="2 5"
										/>
										<ellipse
											cx="261"
											cy="295"
											rx="250"
											ry="60"
											stroke="#d5e3f3"
											stroke-width="0.8"
											fill="none"
											stroke-dasharray="2 5"
										/>
										<ellipse
											cx="261"
											cy="250"
											rx="195"
											ry="42"
											stroke="#d5e3f3"
											stroke-width="0.8"
											fill="none"
											stroke-dasharray="2 5"
										/>
										<ellipse
											cx="261"
											cy="210"
											rx="130"
											ry="28"
											stroke="#d5e3f3"
											stroke-width="0.8"
											fill="none"
											stroke-dasharray="2 5"
										/>
										<!-- Scattered dots -->
										<g
											fill="#b8cce6"
											opacity="0.7"
										>
											<circle
												cx="90"
												cy="280"
												r="1.5"
											/><circle
												cx="120"
												cy="250"
												r="1.5"
											/><circle
												cx="150"
												cy="225"
												r="1.5"
											/>
											<circle
												cx="80"
												cy="310"
												r="1.5"
											/><circle
												cx="110"
												cy="290"
												r="1.5"
											/><circle
												cx="140"
												cy="260"
												r="1.5"
											/>
											<circle
												cx="170"
												cy="240"
												r="1.5"
											/><circle
												cx="195"
												cy="220"
												r="1.5"
											/><circle
												cx="220"
												cy="205"
												r="1.5"
											/>
											<circle
												cx="245"
												cy="195"
												r="1.5"
											/><circle
												cx="270"
												cy="190"
												r="1.5"
											/><circle
												cx="295"
												cy="195"
												r="1.5"
											/>
											<circle
												cx="320"
												cy="205"
												r="1.5"
											/><circle
												cx="345"
												cy="220"
												r="1.5"
											/><circle
												cx="370"
												cy="240"
												r="1.5"
											/>
											<circle
												cx="395"
												cy="260"
												r="1.5"
											/><circle
												cx="420"
												cy="285"
												r="1.5"
											/><circle
												cx="440"
												cy="310"
												r="1.5"
											/>
											<circle
												cx="100"
												cy="265"
												r="1.3"
											/><circle
												cx="130"
												cy="240"
												r="1.3"
											/><circle
												cx="160"
												cy="215"
												r="1.3"
											/>
											<circle
												cx="190"
												cy="200"
												r="1.3"
											/><circle
												cx="215"
												cy="188"
												r="1.3"
											/><circle
												cx="250"
												cy="180"
												r="1.3"
											/>
											<circle
												cx="280"
												cy="178"
												r="1.3"
											/><circle
												cx="310"
												cy="185"
												r="1.3"
											/><circle
												cx="340"
												cy="198"
												r="1.3"
											/>
											<circle
												cx="365"
												cy="215"
												r="1.3"
											/><circle
												cx="390"
												cy="238"
												r="1.3"
											/><circle
												cx="415"
												cy="265"
												r="1.3"
											/>
											<circle
												cx="435"
												cy="295"
												r="1.3"
											/>
											<circle
												cx="135"
												cy="275"
												r="1.2"
											/><circle
												cx="165"
												cy="255"
												r="1.2"
											/><circle
												cx="200"
												cy="235"
												r="1.2"
											/>
											<circle
												cx="230"
												cy="218"
												r="1.2"
											/><circle
												cx="260"
												cy="210"
												r="1.2"
											/><circle
												cx="290"
												cy="215"
												r="1.2"
											/>
											<circle
												cx="325"
												cy="230"
												r="1.2"
											/><circle
												cx="355"
												cy="250"
												r="1.2"
											/><circle
												cx="380"
												cy="275"
												r="1.2"
											/>
											<circle
												cx="405"
												cy="300"
												r="1.2"
											/>
											<circle
												cx="175"
												cy="270"
												r="1"
											/><circle
												cx="210"
												cy="252"
												r="1"
											/><circle
												cx="245"
												cy="240"
												r="1"
											/>
											<circle
												cx="275"
												cy="238"
												r="1"
											/><circle
												cx="305"
												cy="245"
												r="1"
											/><circle
												cx="335"
												cy="260"
												r="1"
											/>
											<circle
												cx="365"
												cy="280"
												r="1"
											/><circle
												cx="55"
												cy="310"
												r="1.5"
											/><circle
												cx="465"
												cy="310"
												r="1.5"
											/>
											<circle
												cx="70"
												cy="295"
												r="1.3"
											/><circle
												cx="450"
												cy="295"
												r="1.3"
											/>
										</g>
									</g>
								</svg>
								<!-- Badge pills -->
								<!-- <div class="gc-badges">
									<div class="gc-pill">
										<img
											src="/images/icons/cash-banknote-chart.svg"
											alt=""
											class="gc-pill-icon"
										>
										<span>Increasing budgets</span>
									</div>
									<div
										class="gc-pill"
										style="margin-left:16px"
									>
										<img
											src="/images/icons/user-stop.svg"
											alt=""
											class="gc-pill-icon"
										>
										<span>New accounts</span>
									</div>
									<div
										class="gc-pill"
										style="margin-left:20px"
									>
										<img
											src="/images/icons/store-modern.svg"
											alt=""
											class="gc-pill-icon"
										>
										<span>New markets</span>
									</div>
								</div> -->
							</div>
						</div>
					</div>
				</div>

				<!-- Row 2: Operational Continuity (full width, dark) -->
				<div class="grid gap-8 rounded-2xl border border-white/10 bg-surface-dark p-8 md:grid-cols-2 lg:gap-12 lg:p-12">
					<div class="flex flex-col">
						<h2 class="text-2xl leading-tight font-medium text-white lg:text-[32px]">
							Operational Continuity
						</h2>
						<p class="text-text-gray-light mt-3 text-base font-medium lg:text-lg">
							Always on. No exceptions.
						</p>
						<p class="mt-5 text-sm leading-relaxed text-white/80 lg:text-base">
							Instant, 24/7 top-up support that eliminates the waiting game. When campaigns are live and budgets need to move, we ensure operations keep running. Not tomorrow, not next shift. Now.
						</p>
						<ul class="mt-6 flex flex-col gap-3">
							<li
								v-for="item in opContinuityBullets"
								:key="item"
								class="flex items-start gap-3"
							>
								<svg
									class="mt-0.5 h-5 w-5 shrink-0 text-primary"
									viewBox="0 0 20 20"
									fill="currentColor"
								><path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/></svg>
								<span class="text-text-gray-light text-sm lg:text-base">{{ item }}</span>
							</li>
						</ul>
					</div>
					<div class="flex items-center justify-center">
						<div class="relative w-full max-w-[380px]">
							<div class="flex items-center justify-center gap-4">
								<span class="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white">Instant Top-ups</span>
								<span class="inline-flex items-center gap-2 rounded-full bg-[#22c55e] px-4 py-2 text-sm font-medium text-white">Always-On Operations</span>
							</div>
							<div class="mt-8 flex justify-center">
								<div class="relative">
									<svg
										class="h-24 w-24 text-primary/20"
										viewBox="0 0 100 100"
									><circle
										cx="50"
										cy="50"
										r="48"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
									/></svg>
									<div class="absolute inset-0 flex items-center justify-center">
										<svg
											class="h-8 w-8 text-[#22c55e]"
											viewBox="0 0 24 24"
											fill="currentColor"
										><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
									</div>
								</div>
							</div>
							<div class="mt-6 flex justify-center">
								<span class="inline-flex items-center gap-2 rounded-full bg-[#f3cd02] px-5 py-2.5 text-sm font-semibold text-surface-dark">Real-time Budget Flow</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Row 3: Strategic Support (dark, reversed layout) -->
				<div class="grid gap-8 rounded-2xl border border-white/10 bg-surface-dark p-8 md:grid-cols-2 lg:gap-12 lg:p-12">
					<div class="order-2 flex items-center justify-center md:order-1">
						<div class="relative w-full max-w-[340px]">
							<span
								class="strat-badge"
								style="top:0;left:0"
							>Direct Operational Access</span>
							<span
								class="strat-badge"
								style="top:0;right:0"
							>Platform-Level Expertise</span>
							<div class="my-6 flex justify-center">
								<div class="relative">
									<div class="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
										<svg
											class="h-9 w-9 text-white"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
										><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle
											cx="9"
											cy="7"
											r="4"
										/><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
									</div>
									<div class="absolute top-1/2 -left-10 h-6 w-6 -translate-y-1/2 rounded-full bg-[#f3cd02]" />
									<div class="absolute top-1/2 -right-10 h-6 w-6 -translate-y-1/2 rounded-full bg-[#22c55e]" />
								</div>
							</div>
							<span
								class="strat-badge"
								style="bottom:0;left:0"
							>Pazara Özel Strateji</span>
							<span
								class="strat-badge"
								style="bottom:0;right:0"
							>True Partnership</span>
						</div>
					</div>
					<div class="order-1 flex flex-col md:order-2">
						<h2 class="text-2xl leading-tight font-medium text-white lg:text-[32px]">
							Strategic Support
						</h2>
						<p class="text-text-gray-light mt-3 text-base font-medium lg:text-lg">
							Partnership in practice.
						</p>
						<p class="mt-5 text-sm leading-relaxed text-white/80 lg:text-base">
							Software alone is not a strategy. A dedicated team supports your growth with real-world operational experience and a commitment to long-term alignment. Not a helpdesk. A growth partner that understands your business, your markets, and your goals.
						</p>
						<ul class="mt-6 flex flex-col gap-3">
							<li
								v-for="item in strategicBullets"
								:key="item"
								class="flex items-start gap-3"
							>
								<svg
									class="mt-0.5 h-5 w-5 shrink-0 text-primary"
									viewBox="0 0 20 20"
									fill="currentColor"
								><path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/></svg>
								<span class="text-text-gray-light text-sm lg:text-base">{{ item }}</span>
							</li>
						</ul>
					</div>
				</div>

				<!-- Row 4: Ecosystem Alignment + Integrity Framework -->
				<div class="grid gap-6 md:grid-cols-2 lg:gap-8">
					<!-- Ecosystem Alignment -->
					<div class="border-primary-light flex flex-col rounded-2xl border bg-white p-8 lg:p-12">
						<h2 class="text-text-base text-2xl leading-tight font-medium lg:text-[32px]">
							Ecosystem Alignment
						</h2>
						<p class="text-text-gray-dark mt-3 text-base font-medium lg:text-lg">
							Connected by design.
						</p>
						<p class="text-text-base mt-5 text-sm leading-relaxed lg:text-base">
							Our platform relationships and deep understanding of the digital advertising ecosystem are brought together in one cohesive structure. We are positioned at the center of global ad infrastructure, and we bring that advantage to you.
						</p>
						<ul class="mt-6 flex flex-col gap-3">
							<li
								v-for="item in ecosystemBullets"
								:key="item"
								class="flex items-start gap-3"
							>
								<svg
									class="mt-0.5 h-5 w-5 shrink-0 text-primary"
									viewBox="0 0 20 20"
									fill="currentColor"
								><path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/></svg>
								<span class="text-text-gray-dark text-sm lg:text-base">{{ item }}</span>
							</li>
						</ul>
						<div class="mt-8 flex flex-1 items-end">
							<div class="grid w-full grid-cols-3 gap-4">
								<div
									v-for="p in ecosystemLogos"
									:key="p.name"
									class="flex h-12 items-center justify-center"
								>
									<img
										:src="p.src"
										:alt="p.name"
										class="h-7 opacity-60"
									>
								</div>
							</div>
						</div>
					</div>

					<!-- Integrity Framework -->
					<div class="border-primary-light flex flex-col rounded-2xl border bg-white p-8 lg:p-12">
						<h2 class="text-text-base text-2xl leading-tight font-medium lg:text-[32px]">
							Integrity Framework
						</h2>
						<p class="text-text-gray-dark mt-3 text-base font-medium lg:text-lg">
							Built to last.
						</p>
						<p class="text-text-base mt-5 text-sm leading-relaxed lg:text-base">
							Operational safeguards that protect consistency, clarity, and long-term platform health. Compliance isn't left to chance. It's built into every layer.
						</p>
						<ul class="mt-6 flex flex-col gap-3">
							<li
								v-for="item in integrityBullets"
								:key="item"
								class="flex items-start gap-3"
							>
								<svg
									class="mt-0.5 h-5 w-5 shrink-0 text-primary"
									viewBox="0 0 20 20"
									fill="currentColor"
								><path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/></svg>
								<span class="text-text-gray-dark text-sm lg:text-base">{{ item }}</span>
							</li>
						</ul>
						<div class="mt-8 flex flex-1 items-end justify-center">
							<div class="relative w-full max-w-[300px]">
								<div class="flex flex-wrap justify-center gap-2">
									<span class="text-text-gray-dark rounded-full bg-[#f0f4f8] px-3 py-1.5 text-xs font-medium">Layered Protection</span>
									<span class="text-text-gray-dark rounded-full bg-[#f0f4f8] px-3 py-1.5 text-xs font-medium">Stable Systems</span>
								</div>
								<div class="my-4 flex justify-center">
									<div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
										<svg
											class="h-7 w-7 text-white"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
										><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
									</div>
								</div>
								<div class="flex flex-wrap justify-center gap-2">
									<span class="rounded-full bg-[#22c55e] px-3 py-1.5 text-xs font-medium text-white">Built Control</span>
									<span class="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white">Platform-Aware</span>
								</div>
								<div class="mt-2 flex justify-center">
									<span class="text-text-gray-dark rounded-full bg-[#f0f4f8] px-3 py-1.5 text-xs font-medium">Proactive Defense</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Dashboard -->
		<section class="bg-[#f7f9fb] px-5 pt-12 pb-12 lg:px-0 lg:pt-20 lg:pb-20">
			<div class="border-primary-light mx-auto grid max-w-[1140px] gap-8 rounded-2xl border bg-white p-8 md:grid-cols-[380px_1fr] lg:gap-12 lg:p-12">
				<div class="flex flex-col">
					<h2 class="text-text-base text-2xl leading-tight font-medium lg:text-[32px]">
						Rockads Dashboard
					</h2>
					<p class="text-text-gray-dark mt-3 text-lg font-medium italic">
						Every service. One screen. Full control.
					</p>
					<p class="text-text-base mt-5 text-sm leading-relaxed lg:text-base">
						Every layer of Rockads Core, your financial infrastructure, account health, operational workflows, team access, and performance data, managed from a single, purpose-built interface. The Rockads Dashboard doesn't replace what we do. It gives you full visibility and control over everything we provide.
					</p>
					<ul class="mt-6 flex flex-col gap-3">
						<li
							v-for="item in dashboardBullets"
							:key="item"
							class="flex items-start gap-3"
						>
							<svg
								class="mt-0.5 h-5 w-5 shrink-0 text-primary"
								viewBox="0 0 20 20"
								fill="currentColor"
							><path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/></svg>
							<span class="text-text-gray-dark text-sm lg:text-base">{{ item }}</span>
						</li>
					</ul>
				</div>
				<div class="flex items-start justify-center">
					<div class="w-full overflow-hidden rounded-xl border border-gray-200 shadow-lg">
						<div class="flex items-center gap-2 bg-[#1e1e2e] px-4 py-2.5">
							<div class="flex gap-1.5">
								<div class="h-3 w-3 rounded-full bg-[#ff5f57]" />
								<div class="h-3 w-3 rounded-full bg-[#febc2e]" />
								<div class="h-3 w-3 rounded-full bg-[#28c840]" />
							</div>
							<div class="mx-8 flex-1">
								<div class="rounded-md bg-[#2d2d3f] px-3 py-1 text-center">
									<span class="text-xs text-gray-400">console.rockads.com/</span>
								</div>
							</div>
						</div>
						<div class="bg-white p-4 lg:p-6">
							<div class="mb-4 flex items-center justify-between">
								<span class="text-text-base text-sm font-semibold">Dashboard</span>
								<div class="flex gap-2">
									<div class="h-7 w-7 rounded-full bg-gray-100" />
								</div>
							</div>
							<div class="mb-4 grid grid-cols-4 gap-3">
								<div class="rounded-lg bg-gray-50 p-3">
									<span class="text-text-gray-dark block text-[10px]">Total Spend (USD)</span>
									<span class="text-text-base text-base font-semibold">$58.29K</span>
								</div>
								<div class="rounded-lg bg-gray-50 p-3">
									<span class="text-text-gray-dark block text-[10px]">Impressions</span>
									<span class="text-text-base text-base font-semibold">257,29K</span>
								</div>
								<div class="rounded-lg bg-gray-50 p-3">
									<span class="text-text-gray-dark block text-[10px]">Clicks</span>
									<span class="text-text-base text-base font-semibold">39,8K</span>
								</div>
								<div class="rounded-lg bg-gray-50 p-3">
									<span class="text-text-gray-dark block text-[10px]">Conversion</span>
									<span class="text-text-base text-base font-semibold">1267</span>
								</div>
							</div>
							<div class="flex h-[140px] items-end rounded-lg bg-gray-50 p-4">
								<svg
									class="h-[100px] w-full"
									viewBox="0 0 400 80"
									fill="none"
									preserveAspectRatio="none"
								>
									<path
										d="M0 60 C50 55, 80 50, 120 45 S180 30, 220 35 S280 20, 320 25 S370 15, 400 10"
										stroke="#1f71ea"
										stroke-width="2"
										fill="none"
									/>
									<path
										d="M0 60 C50 55, 80 50, 120 45 S180 30, 220 35 S280 20, 320 25 S370 15, 400 10 V80 H0 Z"
										fill="url(#chartGrad)"
										opacity="0.15"
									/>
									<defs><linearGradient
										id="chartGrad"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									><stop
										offset="0%"
										stop-color="#1f71ea"
									/><stop
										offset="100%"
										stop-color="#1f71ea"
										stop-opacity="0"
									/></linearGradient></defs>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section class="bg-white px-5 py-16 lg:py-20">
			<div class="mx-auto max-w-[800px] text-center">
				<h2 class="text-text-base text-[32px] leading-[1.2] font-semibold lg:text-[40px]">
					Built for growth that holds.<br>Discuss Your Growth Plan
				</h2>
				<button class="bg-primary-600 mt-8 rounded-lg px-6 py-3 text-base font-medium text-white transition-colors hover:bg-primary lg:mt-10">
					Get Started in Minutes
				</button>
			</div>
		</section>

		<HomeCta />

		<TheFooter />
	</div>
</template>

  <style scoped>
  .fi-illustration {
    position: relative;
    width: 404px;
    height: 290px;
    margin: 0 auto;
  }

  .fi-ring {
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
  }

  .fi-ring--outer {
    width: 260px;
    height: 260px;
    margin-left: -130px;
    margin-top: -130px;
    background: white;
  }

  .fi-ring--glow {
    width: 180px;
    height: 180px;
    margin-left: -90px;
    margin-top: -90px;
    background: radial-gradient(circle, rgba(31, 113, 234, 0.15) 0%, rgba(31, 113, 234, 0.04) 60%, transparent 100%);
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    filter: blur(8px);
    box-shadow: 0px 0px 5px 5px rgba(53, 123, 255, 0.5);
  }

  .fi-ring--inner {
    width: 175px;
    height: 175px;
    margin-left: -87.5px;
    margin-top: -87.5px;
    background: white;
  }

  .fi-center-circle {
    width: 112px;
    height: 112px;
    border-radius: 50%;
    background: #1F71EA;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(31, 113, 234, 0.3);
    position: relative;
    overflow: hidden;
  }

  .fi-center-dots {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
    background-size: 10px 10px;
    border-radius: 50%;
  }

  .fi-badge {
    position: absolute;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #151b26;
    background: #ffffff;
    padding: 11px 16px;
    border-radius: 60px;
    white-space: nowrap;
    border: 1.5px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 5px 10px rgba(31, 113, 234, 0.12);
    z-index: 20;
  }

  .fi-float {
    animation: fiBob 4s ease-in-out infinite;
    animation-delay: var(--fd, 0s);
  }

  .fi-float--y {
    transform: translateY(-50%);
    animation-name: fiBobY;
  }

  @keyframes fiBob {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(var(--fx, 0px), var(--fy, 0px)); }
  }

  @keyframes fiBobY {
    0%, 100% { transform: translateY(-50%) translate(0, 0); }
    50% { transform: translateY(-50%) translate(var(--fx, 0px), var(--fy, 0px)); }
  }

  .fi-badge-icon {
    width: 20px;
    height: 20px;
    color: #6b7280;
    flex-shrink: 0;
  }

  .strat-badge {
    position: absolute;
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 6px 14px;
    border-radius: 999px;
    white-space: nowrap;
  }

  .gc-globe-wrap {
    position: relative;
    width: 100%;
    max-width: 522px;
    height: 280px;
    margin: 0 auto;
  }

  .gc-globe-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .gc-badges {
    position: absolute;
    top: 46%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 28px;
    z-index: 10;
  }

  .gc-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #20253a;
    color: white;
    font-size: 14px;
    font-weight: 500;
    padding: 12px 20px;
    border-radius: 24px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 6px 12px rgba(31, 113, 234, 0.3);
    white-space: nowrap;
  }

  .gc-pill-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    opacity: 0.7;
  }
  </style>
