<script setup lang="ts">
/**
 * Interactive dot grid (Core / Tech services hero pattern).
 * Each instance owns its own animation loop and pointer mapping.
 */
import { computed, ref, onMounted, onUnmounted } from "vue";

const props = withDefaults(
	defineProps<{
		/** `hero`: white hero. `lightCard`: pale surfaces (e.g. #f7f9fb) — stronger dots. */
		variant?: "hero" | "lightCard";
	}>(),
	{ variant: "hero" },
);

const dotCanvas = ref<HTMLCanvasElement | null>(null);

const palette = computed(() => {
	if (props.variant === "lightCard") {
		return {
			dot: "#7d8fa3",
			active: "#1F71EA",
			/** Peak opacity at the strongest corner */
			alphaScale: 0.95,
			/** Fully transparent toward top-right */
			alphaFloor: 0,
			/** Bottom-left strong → fades toward top-right */
			fadeOrigin: "bottomLeft" as const,
		};
	}

	return {
		dot: "#c8cdd5",
		active: "#1F71EA",
		alphaScale: 0.55,
		alphaFloor: 0,
		fadeOrigin: "topRight" as const,
	};
});

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

function drawDots() {
	const canvas = dotCanvas.value;

	if (!canvas) return;
	const ctx = canvas.getContext("2d");

	if (!ctx) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const baseRgb = hexToRgb(palette.value.dot);
	const activeRgb = hexToRgb(palette.value.active);
	const { alphaScale, alphaFloor, fadeOrigin } = palette.value;

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

		const diag = Math.max(gridW + gridH, 1);
		let fade: number;

		if (fadeOrigin === "bottomLeft") {
			const fromBottomLeft = dot.cx + (gridH - dot.cy);

			fade = 1 - Math.min(1, fromBottomLeft / diag);
		}
		else {
			const fromTopRight = (gridW - dot.cx) + dot.cy;

			fade = Math.max(0, 1 - fromTopRight / diag);
		}
		const baseAlpha = Math.min(1, alphaFloor + fade * alphaScale);

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
	dotRo = null;
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
	<canvas
		ref="dotCanvas"
		class="pointer-events-none absolute inset-0 h-full w-full"
		aria-hidden="true"
	/>
</template>
