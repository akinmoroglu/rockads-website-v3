<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

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

onMounted(() => {
	if (!import.meta.client) return;

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
});

onUnmounted(() => {
	cancelAnimationFrame(dotRaf);
	if (dotRo) dotRo.disconnect();
	window.removeEventListener("mousemove", onDotMove);
	window.removeEventListener("click", onDotClick);
});
</script>

<template>
	<canvas
		ref="dotCanvas"
		class="pointer-events-none absolute inset-0 h-full w-full"
	/>
</template>
