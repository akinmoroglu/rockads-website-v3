<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
	IconBroadcast,
	IconBrush,
	IconBuildingStore,
	IconPhoto,
	IconPlayerPlay,
	IconSparkles,
	IconTopologyStar3,
} from "@tabler/icons-vue";
import { Button } from "@/components/ui/button";
import techAutomationPath from "@/assets/images/services/tech/ad-automation.svg?url";
import techMetaPath from "@/assets/images/services/tech/meta.svg?url";
import techGooglePath from "@/assets/images/services/tech/google.svg?url";
import techTikTokPath from "@/assets/images/services/tech/tiktok.svg?url";
import techXPath from "@/assets/images/services/tech/x-twitter.svg?url";
import techSnapchatPath from "@/assets/images/services/tech/snapchat.svg?url";
import complianceAiPath from "@/assets/images/services/tech/compliance-ai.svg?url";
import aiCreativeStudioPath from "@/assets/images/services/tech/ai-creative-studio.svg?url";

useHead({
	title: "Tech Services - Rockads",
});

const platformLogos = [
	{ name: "Meta", src: techMetaPath },
	{ name: "Google", src: techGooglePath },
	{ name: "TikTok", src: techTikTokPath },
	{ name: "X", src: techXPath },
	{ name: "Snapchat", src: techSnapchatPath },
];

const creativeTypes = [
	{
		title: "Ad Creatives",
		description: "Meta Ads, Google Ads, LinkedIn Ads, CTA-focused creatives, carousel ads.",
		hint: "Auto-size adaptation, balanced text areas.",
		icon: IconBrush,
	},
	{
		title: "Product Creatives",
		description: "Product cutouts, collections, pricing highlights, product mockups.",
		hint: "Visual alignment with brand identity.",
		icon: IconPhoto,
	},
	{
		title: "Video Creatives",
		description: "Short videos (Reels, TikTok), animated product demos.",
		hint: "Optional voice-over, dynamic CTA variations.",
		icon: IconPlayerPlay,
	},
	{
		title: "Stock & thematic visuals",
		description: "Seasonal visuals, background images, themed banners.",
		hint: "AI-powered stock suggestions.",
		icon: IconSparkles,
	},
];

const audienceCards = [
	{
		title: "E-Commerce Brands",
		body: "A complete tech stack for brands scaling globally — from creative production to campaign deployment to automated optimization. No more stitching together five different tools.",
		icon: IconBroadcast,
	},
	{
		title: "Digital Agencies",
		body: "Manage more clients without growing your ops team. Unified tools for launching, monitoring, and optimizing campaigns across every client and every platform.",
		icon: IconBuildingStore,
	},
	{
		title: "Enterprise & Performance Teams",
		body: "Enterprise-grade infrastructure with role-based access, approval workflows, audit trails, and compliance built into every layer. Scale without losing control.",
		icon: IconTopologyStar3,
	},
];

// ── Dot grid (matches Core services hero) ─────────────────
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
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const proxSq = PROXIMITY * PROXIMITY;

	for (const dot of dots) {
		if (dot.ox !== 0 || dot.oy !== 0 || dot.vx !== 0 || dot.vy !== 0) {
			dot.vx += -dot.ox * SPRING;
			dot.vy += -dot.oy * SPRING;
			dot.vx *= DAMPING;
			dot.vy *= DAMPING;
			dot.ox += dot.vx;
			dot.oy += dot.vy;
			if (
				Math.abs(dot.ox) < RETURN_THRESHOLD
				&& Math.abs(dot.oy) < RETURN_THRESHOLD
				&& Math.abs(dot.vx) < RETURN_THRESHOLD
				&& Math.abs(dot.vy) < RETURN_THRESHOLD
			) {
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
}

function destroyDotGrid() {
	cancelAnimationFrame(dotRaf);
	if (dotRo) dotRo.disconnect();
	window.removeEventListener("mousemove", onDotMove);
}

onMounted(() => {
	initDotGrid();
});
onUnmounted(() => {
	destroyDotGrid();
});
</script>

<template>
	<div class="font-display">
		<TheHeader />

		<!-- Hero -->
		<section class="relative overflow-hidden bg-white">
			<canvas
				ref="dotCanvas"
				class="pointer-events-none absolute inset-0 h-full w-full"
			/>
			<div class="relative mx-auto max-w-[1066px] px-5 pt-[140px] pb-12 text-center lg:px-0 lg:pt-[164px] lg:pb-16">
				<h1 class="text-[40px] leading-[1.14] font-medium md:text-[48px] lg:text-[56px]">
					<span class="text-primary">Tech</span> <span class="text-text-base">Services</span>
				</h1>
				<p class="text-text-gray-dark mt-4 text-base font-medium lg:mt-5 lg:text-lg">
					The Full Stack for Global Ad Operations
				</p>
				<p class="text-text-base mt-6 max-w-[1066px] text-sm leading-relaxed lg:mt-8 lg:text-base">
					From campaign creation to compliance, from automation to creative intelligence and more… Everything you need to run, scale, and protect your global operations.
				</p>
				<p class="text-text-base mt-4 max-w-[1066px] text-sm leading-relaxed lg:mt-5 lg:text-base">
					Running global ad operations across platforms, markets, and teams demands more than a collection of disconnected tools. It demands an integrated system where every action — from launching a campaign to checking compliance, from reallocating budget to generating creatives — flows through one intelligent layer. That's Rockads.
				</p>
				<Button
					as-child
					size="lg"
					class="mt-8 lg:mt-10"
				>
					<NuxtLink to="/sign-up">
						Get Started in Minutes
					</NuxtLink>
				</Button>
			</div>
		</section>

		<!-- Automation -->
		<section class="bg-muted/80 px-5 py-12 lg:px-0 lg:py-16">
			<div class="border-primary-light mx-auto grid max-w-[1140px] gap-10 overflow-hidden rounded-2xl border bg-surface-dark p-8 md:grid-cols-[minmax(0,336px)_1fr] md:items-start lg:gap-12 lg:p-12">
				<div class="flex flex-col">
					<h2 class="text-2xl leading-tight font-medium text-white lg:text-[32px]">
						Automation
					</h2>
					<p class="mt-6 text-sm leading-relaxed text-white lg:text-base">
						Your operations, on autopilot. Eliminate manual bottlenecks across campaign management, budget allocation, and performance optimization. Rule-based actions, smart budget redistribution, and scheduled operations — all running across every platform.
					</p>
				</div>
				<div
					class="tech-automation-mock overflow-hidden shadow-lg"
					aria-hidden="true"
				>
					<img
						:src="techAutomationPath"
						alt=""
					>
				</div>
			</div>
		</section>

		<!-- Ad Launcher + Compliance AI -->
		<section class="bg-muted/80 px-5 pb-12 lg:px-0 lg:pb-16">
			<div class="mx-auto grid max-w-[1140px] gap-6 md:grid-cols-2 lg:gap-8">
				<div class="border-primary-light flex flex-col rounded-4xl border bg-card p-8 lg:p-12">
					<h2 class="text-text-base text-2xl leading-tight font-medium lg:text-[32px]">
						Ad Launcher
					</h2>
					<p class="text-text-base mt-6 text-sm leading-relaxed lg:text-base">
						One launch. Every platform. Every market. Build once, customize per market, and deploy across Meta, Google, TikTok, Snapchat, and X simultaneously. Unified campaign builder, market-specific customization, and instant multi-platform deployment.
					</p>
					<div class="mt-8 flex flex-wrap gap-3.5">
						<div
							v-for="p in platformLogos"
							:key="p.name"
						>
							<img
								:src="p.src"
								:alt="p.name"
							>
						</div>
					</div>
				</div>
				<div class="border-primary-light flex flex-col rounded-4xl border bg-card p-8 lg:p-12">
					<h2 class="text-text-base text-2xl leading-tight font-medium lg:text-[32px]">
						Compliance AI
					</h2>
					<p class="text-text-base mt-6 text-sm leading-relaxed lg:text-base">
						Stay compliant. Stay live. Stay ahead. Continuously monitor campaigns, creatives, and account health across every platform. Pre-publish policy scanning, real-time risk monitoring, and cross-border regulatory intelligence.
					</p>
					<div class="mt-10 flex justify-start">
						<img
							:src="complianceAiPath"
							alt=""
						>
					</div>
				</div>
			</div>
		</section>

		<!-- AI Creative Studio -->
		<section class="bg-muted/80 px-5 pb-12 lg:px-0 lg:pb-20">
			<div class="relative mx-auto max-w-[1140px] rounded-4xl bg-[#e5f1ff] px-8 pt-8 lg:px-12 lg:pt-12">
				<div class="mx-auto max-w-[656px] text-center">
					<h2 class="text-text-base text-2xl leading-tight font-medium lg:text-[32px]">
						AI Creative Studio
					</h2>
					<p class="text-text-base mt-4 text-sm leading-relaxed lg:mt-6 lg:text-base">
						Creatives that perform. At any scale. Generate, iterate, and optimize ad creatives with AI powered by real-time performance data. From product feeds to multi-format output, with automated localization and brand consistency.
					</p>
				</div>
				<div class="mt-10 grid place-items-center gap-4">
					<img
						:src="aiCreativeStudioPath"
						alt="AI Creative Studio"
					>
				</div>
			</div>
		</section>

		<!-- How it works + audiences (Figma: Automation frame — two columns, dot texture) -->
		<section class="bg-muted/80 px-5 pb-12 lg:px-0 lg:pb-20">
			<div
				class="border-primary-light relative mx-auto max-w-[1140px] overflow-hidden rounded-4xl border bg-card"
			>
				<div
					class="tech-together-dots pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[min(480px,52%)]"
					aria-hidden="true"
				/>
				<div
					class="relative z-10 grid gap-10 p-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,465px)] lg:gap-x-8 lg:gap-y-0 lg:p-12 xl:grid-cols-[447px_465px] xl:gap-x-[132px]"
				>
					<div class="max-w-none xl:max-w-[447px]">
						<h2 class="text-text-base text-2xl leading-tight font-medium lg:text-[32px]">
							How It Works Together
						</h2>
						<p class="text-text-base mt-6 text-base leading-relaxed">
							AI Creative Studio generates ad creatives from your product feed and brand assets. Compliance AI scans every creative and campaign configuration for policy compliance before launch. Ad Launcher deploys compliant campaigns across all platforms and markets simultaneously.
						</p>
						<p class="text-text-base mt-4 text-base leading-relaxed">
							Automation monitors performance and automatically optimizes budgets, pauses underperformers, and scales winners. Performance data feeds back into AI Creative Studio to generate better-performing creative iterations.
						</p>
					</div>
					<div class="flex flex-col gap-6">
						<div
							v-for="a in audienceCards"
							:key="a.title"
							class="flex flex-col gap-6 rounded-2xl bg-card p-6 shadow-sm"
						>
							<component
								:is="a.icon"
								class="size-8 shrink-0 text-primary"
								stroke-width="1.5"
							/>
							<div class="flex flex-col gap-4">
								<h3 class="text-text-base text-xl leading-7 font-medium">
									{{ a.title }}
								</h3>
								<p class="text-text-gray-dark text-base leading-normal">
									{{ a.body }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section class="bg-background px-5 py-16 lg:py-20">
			<div class="mx-auto max-w-[800px] text-center">
				<h2 class="text-text-base text-[32px] leading-[1.2] font-semibold lg:text-[40px]">
					Ready to run tech that scales with you?<br><span class="text-foreground">Start on Rockads</span>
				</h2>
				<Button
					as-child
					size="lg"
					class="mt-8 lg:mt-10"
				>
					<NuxtLink to="/sign-up">
						Get Started in Minutes
					</NuxtLink>
				</Button>
			</div>
		</section>

		<section class="tech-closing relative overflow-hidden px-5 py-20 lg:py-28">
			<div
				class="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[260px] w-[300px] max-w-[calc(100%+2rem)] -translate-x-1/2 -translate-y-1/2 md:h-[350px] md:w-[400px] lg:h-[458px] lg:w-[536px]"
				aria-hidden="true"
			>
				<div class="tech-closing-ellipse size-full rounded-full" />
			</div>
			<div class="relative z-10 mx-auto flex max-w-[492px] flex-col items-center gap-9 text-center">
				<p class="text-sm leading-5 text-(--tech-closing-kicker) lg:text-base">
					The only partner you'll ever need.
				</p>
				<h2 class="w-full max-w-[536px] text-white">
					<p class="text-[40px] leading-[48px] font-normal md:text-[52px] md:leading-[60px] lg:text-[68px] lg:leading-[72px]">
						Stable.
					</p>
					<p class="text-[40px] leading-[48px] md:text-[52px] md:leading-[60px] lg:text-[68px] lg:leading-[72px]">
						<em class="tech-closing-enduring text-(--tech-closing-accent)">Enduring.</em>
					</p>
					<p class="text-[40px] leading-[48px] font-normal md:text-[52px] md:leading-[60px] lg:text-[68px] lg:leading-[72px]">
						Limitless.
					</p>
				</h2>
				<p class="max-w-[372px] text-sm leading-5 text-(--tech-closing-description)">
					When others come and go, we'll still be here. Join the infrastructure built to last.
				</p>
			</div>
		</section>

		<TheFooter />
	</div>
</template>

<style scoped>
.tech-automation-mock {
	max-height: 420px;
}

.tech-closing {
	--tech-closing-bg: #080b0f;
	--tech-closing-kicker: #898fa5;
	--tech-closing-accent: #f6ca9a;
	--tech-closing-description: #9fa6bb;
	background-color: var(--tech-closing-bg);
}

.tech-closing-enduring {
	font-family: var(--font-fraunces);
	font-style: italic;
	font-weight: 700;
	font-variation-settings: "SOFT" 0, "WONK" 1;
}

.tech-closing-ellipse {
	background: radial-gradient(
		ellipse 75% 72% at 50% 50%,
		rgb(38 56 94 / 52%) 0%,
		rgb(38 56 94 / 16%) 45%,
		rgb(8 11 15 / 0%) 72%
	);
	filter: blur(40px);
}

@media (prefers-reduced-motion: reduce) {
	.tech-closing-ellipse {
		filter: blur(20px);
		opacity: 0.9;
	}
}

.tech-together-dots {
	background-image: radial-gradient(circle, rgb(200 205 213) 1.25px, transparent 1.25px);
	background-size: 22px 22px;
	background-position: 0 0;
	mask-image: linear-gradient(to top right, black 0%, transparent 58%);
	-webkit-mask-image: linear-gradient(to top right, black 0%, transparent 58%);
	opacity: 0.55;
}
</style>
