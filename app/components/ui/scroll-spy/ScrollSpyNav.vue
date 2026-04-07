<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { inject } from "vue";
import { Primitive } from "reka-ui";
import { cn } from "@/lib/utils";
import { SCROLL_SPY_CONTEXT_KEY } from "./scroll-spy-context";

const NAV_NAME = "ScrollSpyNav";

const props = defineProps<{
	asChild?: boolean;
	class?: HTMLAttributes["class"];
}>();

const context = inject(SCROLL_SPY_CONTEXT_KEY, null);
if (context === null) {
	throw new Error(`\`${NAV_NAME}\` must be used within \`ScrollSpy\``);
}
</script>

<template>
	<Primitive
		data-slot="scroll-spy-nav"
		:data-orientation="context.orientation"
		:as-child="props.asChild"
		as="nav"
		:dir="context.dir"
		:class="
			cn(
				'flex gap-2',
				context.orientation === 'horizontal' ? 'flex-col' : 'flex-row',
				props.class,
			)
		"
	>
		<slot />
	</Primitive>
</template>
