<script setup lang="ts">
import { toRefs } from "vue";
import { cn } from "@/lib/utils";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
	size?: number | string;
	color?: string;
	strokeWidth?: number | string;
	strokeLinecap?: "butt" | "round" | "square" | "inherit";
	strokeLinejoin?: "miter" | "round" | "bevel" | "inherit";
}>(), {
	size: 24,
	color: undefined,
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round",
});

const { size, color, strokeWidth, strokeLinecap, strokeLinejoin } = toRefs(props);
</script>

<template>
	<svg
		:width="size"
		:height="size"
		:class="cn('inline-block', $attrs.class as string)"
		v-bind="{ style: color ? `color: ${color}` : undefined }"
		:stroke-width="strokeWidth"
		:stroke-linecap="strokeLinecap"
		:stroke-linejoin="strokeLinejoin"
		viewBox="0 0 1440 1096"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	> <g clip-path="url(#clip0_19821_7433)"> <line
		x1="1365.45"
		y1="0.211374"
		x2="857.453"
		y2="1089.21"
		stroke="currentColor"
	/> <line
		x1="59.4961"
		y1="-0.0619613"
		x2="195.496"
		y2="1088.94"
		stroke="currentColor"
	/> <line
		x1="1440.05"
		y1="846.498"
		x2="-22.9534"
		y2="983.498"
		stroke="currentColor"
	/> <line
		x1="1439.92"
		y1="594.494"
		x2="-8.07612"
		y2="371.494"
		stroke="currentColor"
	/> <line
		x1="1397.6"
		y1="1110.31"
		x2="542.604"
		y2="0.305147"
		stroke="currentColor"
	/> </g> <rect
		x="0.5"
		y="0.5"
		rx="23.5"
		stroke="currentColor"
	/> <defs> <clipPath id="clip0_19821_7433"> <rect
		rx="24"
		fill="white"
	/> </clipPath> </defs> </svg>
</template>
