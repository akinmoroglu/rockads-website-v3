<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import GrowthSvg from "@/components/services/core/GrowthSvg.vue";
import OperationSvg from "@/components/services/core/OperationSvg.vue";
import strategicSvg from "@/assets/images/services/core/strategic.svg?url";
import ecosystemSvg from "@/assets/images/services/core/ecosystem.svg?url";
import integritySvg from "@/assets/images/services/core/integrity.svg?url";
import dashboardSvg from "@/assets/images/services/core/dashboardh.svg?url";
import { Button } from "@/components/ui/button";

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

	if (!canvas)
		return;

	const ctx = canvas.getContext("2d");

	if (!ctx)
		return;

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
			<div class="relative mx-auto max-w-[1066px] space-y-8 px-5 pt-[140px] pb-12 text-center lg:px-0 lg:pt-[164px] lg:pb-16">
				<h1 class="text-[40px] leading-[1.14] font-medium md:text-[48px] lg:text-[56px]">
					<span class="text-primary">Core</span> <span class="text-text-base">Services</span>
				</h1>
				<div class="space-y-4">
					<p class="font-medium lg:text-lg">
						The Structure Behind Serious Expansion
					</p>
					<p class="max-w-[1066px] text-sm leading-relaxed lg:text-base">
						True global scale isn't just built on technology. It's built on a foundation of operational excellence. Rockads Core is the operational backbone for advertisers who refuse to slow down. We remove every obstacle that stands between you and sustainable global growth: financial friction, operational gaps, compliance risks, and platform complexity. What remains is a clear, stable path to scale, backed by infrastructure, not promises.
					</p>
				</div>
				<Button
					size="lg"
					as-child
				>
					<NuxtLink to="/sign-up">
						Get Started in Minutes
					</NuxtLink>
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
							<ServicesCoreFinancialSvg />
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
							<GrowthSvg />
						</div>
					</div>
				</div>

				<!-- Row 2: Operational Continuity (full width, dark) -->
				<div class="grid gap-8 rounded-2xl border border-white/10 bg-surface-dark p-8 md:grid-cols-2 lg:gap-12 lg:p-12">
					<div class="flex flex-col">
						<h2 class="text-2xl leading-tight font-medium text-white lg:text-[32px]">
							Operational Continuity
						</h2>
						<p class="mt-3 text-base font-medium text-white lg:text-lg ">
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
								<span class="text-sm text-white lg:text-base">{{ item }}</span>
							</li>
						</ul>
					</div>
					<div class="flex items-center justify-center">
						<OperationSvg />
					</div>
				</div>

				<!-- Row 3: Strategic Support (dark, reversed layout) -->
				<div class="grid gap-8 rounded-2xl border border-white/10 bg-surface-dark p-8 md:grid-cols-2 lg:gap-12 lg:p-12">
					<div class="order-2 flex items-center justify-center md:order-1">
						<img
							:src="strategicSvg"
							alt=""
							class="w-full max-w-[340px]"
						>
					</div>
					<div class="order-1 flex flex-col md:order-2">
						<h2 class="text-2xl leading-tight font-medium text-white lg:text-[32px]">
							Strategic Support
						</h2>
						<p class="mt-3 text-base font-medium text-white lg:text-lg">
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
								<span class="text-sm text-white lg:text-base">{{ item }}</span>
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
							<img
								:src="ecosystemSvg"
								alt=""
								class="w-full max-w-[522px]"
							>
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
							<img
								:src="integritySvg"
								alt=""
								class="w-full max-w-[300px]"
							>
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
					<div class="flex items-start justify-center">
						<img
							:src="dashboardSvg"
							alt=""
							class="w-full max-w-[656px] rounded-xl"
						>
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
