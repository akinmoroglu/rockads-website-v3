<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { inject } from "vue";
import { Primitive } from "reka-ui";
import { cn } from "@/lib/utils";
import { SCROLL_SPY_CONTEXT_KEY } from "./scroll-spy-context";

const VIEWPORT_NAME = "ScrollSpyViewport";

const props = defineProps<{
	asChild?: boolean;
	class?: HTMLAttributes["class"];
}>();

const context = inject(SCROLL_SPY_CONTEXT_KEY, null);

if (context === null) {
	throw new Error(`\`${VIEWPORT_NAME}\` must be used within \`ScrollSpy\``);
}
</script>

<template>
	<Primitive
		data-slot="scroll-spy-viewport"
		:data-orientation="context.orientation"
		:as-child="props.asChild"
		as="div"
		:dir="context.dir"
		:class="cn('flex flex-1 flex-col gap-8', props.class)"
	>
		<slot />
	</Primitive>
</template>
