<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, inject, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { cn } from "@/lib/utils";
import { SCROLL_SPY_CONTEXT_KEY } from "./scroll-spy-context";

const LINK_NAME = "ScrollSpyLink";

const props = defineProps<{
	value: string;
	asChild?: boolean;
	class?: HTMLAttributes["class"];
}>();

defineOptions({
	inheritAttrs: false,
});

const attrs = useAttrs();

const passthroughAttrs = computed(() => {
	const raw = { ...attrs } as Record<string, unknown>;
	delete raw.onClick;
	delete raw.class;
	delete raw.ref;
	return raw;
});

const context = inject(SCROLL_SPY_CONTEXT_KEY, null);
if (context === null) {
	throw new Error(`\`${LINK_NAME}\` must be used within \`ScrollSpy\``);
}

const isActive = computed(() => context.activeId.value === props.value);

function onLinkClick(event: MouseEvent) {
	event.preventDefault();
	const userClick = attrs.onClick as ((e: MouseEvent) => void) | undefined;
	if (typeof userClick === "function") {
		userClick(event);
	}
	context?.onScrollToSection(props.value);
}
</script>

<template>
	<Primitive
		data-slot="scroll-spy-link"
		:data-orientation="context.orientation"
		:data-state="isActive ? 'active' : 'inactive'"
		:as-child="props.asChild"
		as="a"
		:href="props.asChild ? undefined : `#${props.value}`"
		:class="
			cn(
				'rounded px-3 py-1.5 font-medium text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-accent data-[state=active]:text-foreground',
				props.class,
			)
		"
		v-bind="passthroughAttrs"
		@click="onLinkClick"
	>
		<slot />
	</Primitive>
</template>
