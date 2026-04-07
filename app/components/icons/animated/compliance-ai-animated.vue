<script setup lang="ts">
import { ref, computed } from "vue";
import { useMediaQuery, useIntersectionObserver } from "@vueuse/core";
import { Motion } from "motion-v";

type PathDef = {
	d: string;
	fill?: string;
	stroke: string;
	delay: number;
};

const paths: PathDef[] = [
	{
		d: "M70.8097 2.84961C62.7015 2.84961 56.1011 8.2626 53.9104 15.6698C43.5831 15.9832 35.418 25.5842 35.418 37.3788C35.418 38.2904 35.5318 39.1736 35.6456 40.0568C28.1348 43.504 22.7578 53.0194 22.7578 64.2158C22.7578 71.3381 24.9485 77.7767 28.4762 82.4205C27.8788 85.0415 27.6796 87.8335 28.021 90.7109C29.3866 102.619 38.9742 111.28 49.4723 110.112C52.2319 117.633 59.3444 123.046 68.2776 123.046C79.5723 123.046 88.221 114.471 88.221 103.873V20.741C88.221 10.8551 80.7102 2.84961 70.8381 2.84961H70.8097Z",
		fill: "#99CBF3",
		stroke: "#2A5082",
		delay: 0,
	},
	{
		d: "M71.265 38.6601C61.3929 38.6601 53.3984 30.6545 53.3984 20.7687C53.3984 19.0024 53.6545 17.2645 54.1381 15.6406",
		stroke: "#2A5082",
		delay: 0.04,
	},
	{
		d: "M48.3086 63.3602C53.8848 66.6934 60.3998 63.7875 65.0656 58.2321C70.9547 51.2522 80.6846 48.5172 86.5737 55.4971C87.6263 56.7506 87.541 56.8931 88.2238 58.403",
		stroke: "#2A5082",
		delay: 0.08,
	},
	{
		d: "M88.9319 28.3473C81.0797 30.0282 73.9388 25.4414 71.293 18.2051",
		stroke: "#2A5082",
		delay: 0.12,
	},
	{
		d: "M88.9319 92.7028C81.0797 91.022 73.9388 95.6087 71.293 102.845",
		stroke: "#2A5082",
		delay: 0.16,
	},
	{
		d: "M58.5221 33.5312C53.4011 34.8133 48.3086 38.5454 48.3086 43.7589",
		stroke: "#2A5082",
		delay: 0.2,
	},
	{
		d: "M50.8424 92.3332C45.7214 91.0511 40.6289 87.319 40.6289 82.1055",
		stroke: "#2A5082",
		delay: 0.24,
	},
	{
		d: "M50.8428 113.159C49.2211 110.395 48.0547 107.233 48.0547 103.871C48.0547 93.2733 56.8742 84.698 68.2541 84.698V82.1339C68.2541 77.6611 74.6269 71.9062 78.6952 71.9062",
		stroke: "#2A5082",
		delay: 0.28,
	},
	{
		d: "M38.0938 53.9883C43.0156 53.9883 47.027 58.0053 47.027 62.934C47.027 67.8626 43.0156 71.8796 38.0938 71.8796",
		stroke: "#2A5082",
		delay: 0.32,
	},
	{
		d: "M105.975 2.84961C114.084 2.84961 120.143 8.2626 122.334 15.6698C132.661 15.9832 142.42 26.6667 142.42 38.4614C142.42 39.373 142.334 40.2562 142.249 41.1394C149.76 44.5866 154.397 52.991 154.397 64.2158C154.397 71.3381 152.206 77.7767 148.679 82.4205C149.276 85.0415 149.475 87.8335 149.162 90.7109C147.797 102.619 138.209 111.28 127.74 110.112C124.98 117.633 117.498 123.046 108.536 123.046C97.2413 123.046 88.2227 114.471 88.2227 103.873V20.741C88.2227 10.8551 96.1317 2.84961 106.004 2.84961H105.975Z",
		fill: "white",
		stroke: "#2A5082",
		delay: 0.06,
	},
	{
		d: "M126.289 113.161C127.911 110.398 128.85 107.235 128.85 103.873C128.85 100.512 127.911 97.3209 126.289 94.5859",
		stroke: "#2A5082",
		delay: 0.36,
	},
	{
		d: "M103.301 33.5312C108.422 34.8133 113.514 38.5454 113.514 43.7589",
		stroke: "#2A5082",
		delay: 0.4,
	},
	{
		d: "M90.5547 40.0849C100.427 40.0849 108.421 32.5637 108.421 23.3047",
		stroke: "#2A5082",
		delay: 0.44,
	},
	{
		d: "M123.729 84.6719C113.288 84.6719 108.395 91.3954 108.395 102.563",
		stroke: "#2A5082",
		delay: 0.48,
	},
	{
		d: "M110.984 91.3073C106.289 86.1792 97.4984 83.4727 87.9961 84.8972",
		stroke: "#2A5082",
		delay: 0.52,
	},
	{
		d: "M126.742 32.3633C126.742 37.3204 130.27 41.309 135.22 41.309H142.247",
		stroke: "#2A5082",
		delay: 0.56,
	},
	{
		d: "M137.781 56.5508C132.859 56.5508 128.848 60.5678 128.848 65.4965C128.848 70.4251 132.859 74.4421 137.781 74.4421",
		stroke: "#2A5082",
		delay: 0.6,
	},
	{
		d: "M98.207 53.9883C103.129 53.9883 107.14 58.0053 107.14 62.934C107.14 67.8626 103.129 71.8796 98.207 71.8796",
		stroke: "#2A5082",
		delay: 0.64,
	},
	{
		d: "M108.418 61.6511C113.397 58.3179 124.578 57.8051 128.845 64.2152",
		stroke: "#2A5082",
		delay: 0.68,
	},
	{
		d: "M148.647 82.3906C145.745 85.5814 141.905 87.7466 137.523 88.2594",
		stroke: "#2A5082",
		delay: 0.72,
	},
	{
		d: "M122.332 15.668V24.2148",
		stroke: "#2A5082",
		delay: 0.76,
	},
	{
		d: "M164.215 109.798C183.874 76.1522 177.984 31.1674 147.941 4.27344",
		stroke: "#CCE5F9",
		delay: 0.15,
	},
	{
		d: "M153.656 124.042C156.074 121.421 158.322 118.658 160.342 115.809",
		stroke: "#CCE5F9",
		delay: 0.22,
	},
	{
		d: "M14.2794 21.3672C-5.37952 55.0132 0.509607 99.9979 30.5242 126.892",
		stroke: "#CCE5F9",
		delay: 0.18,
	},
	{
		d: "M24.8381 7.12109C22.4198 9.74212 20.1723 12.5056 18.1523 15.3545",
		stroke: "#CCE5F9",
		delay: 0.25,
	},
];

const STROKE_WIDTH = 1.93985;
const STROKE_MITER = 10;

const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
const rootEl = ref<HTMLElement | null>(null);
const inView = ref(false);

useIntersectionObserver(
	rootEl,
	(entries) => {
		const e = entries[0];
		if (e?.isIntersecting) inView.value = true;
	},
	{ threshold: 0.2 },
);

const shouldPlay = computed(() => prefersReducedMotion.value || inView.value);

const pathHidden = computed(() =>
	prefersReducedMotion.value
		? { pathLength: 1, opacity: 1 }
		: { pathLength: 0, opacity: 0 },
);

const pathVisible = { pathLength: 1, opacity: 1 };

function pathTransition(delay: number) {
	if (prefersReducedMotion.value) {
		return { duration: 0 };
	}
	return {
		duration: 0.65,
		delay,
		ease: [0.42, 0, 0.58, 1] as const,
	};
}
</script>

<template>
	<div
		ref="rootEl"
		class="inline-flex"
		aria-hidden="true"
	>
		<svg
			width="179"
			height="129"
			viewBox="0 0 179 129"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="h-auto w-[179px] max-w-full"
		>
			<Motion
				v-for="(p, i) in paths"
				:key="i"
				as="path"
				:d="p.d"
				:fill="p.fill ?? 'none'"
				:stroke="p.stroke"
				:stroke-width="STROKE_WIDTH"
				:stroke-miterlimit="STROKE_MITER"
				:initial="pathHidden"
				:animate="shouldPlay ? pathVisible : pathHidden"
				:transition="pathTransition(p.delay)"
			/>
		</svg>
	</div>
</template>
