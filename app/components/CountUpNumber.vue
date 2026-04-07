<template>
	<span ref="elementRef">{{ displayValue }}</span>
</template>

<script setup lang="ts">
import { useCountUp } from "@/composables/useCountUp";

const props = withDefaults(defineProps<{
	to: number;
	from?: number;
	duration?: number;
	delay?: number;
	direction?: "up" | "down";
	separator?: string;
	suffix?: string;
}>(), {
	from: 0,
	duration: 2,
	delay: 0,
	direction: "up",
	separator: "",
	suffix: "",
});

const { displayValue, elementRef } = useCountUp({
	from: props.from,
	to: props.to,
	duration: props.duration,
	delay: props.delay,
	direction: props.direction,
	separator: props.separator,
	suffix: props.suffix,
});
</script>
