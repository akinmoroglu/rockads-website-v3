<script setup lang="ts">
import type { HTMLAttributes, VNodeRef } from "vue";
import { computed, inject, ref, useAttrs, watch } from "vue";
import { Primitive } from "reka-ui";
import { useComposedRefs, type ComposableRef } from "@/lib/composeRef";
import { SCROLL_SPY_CONTEXT_KEY } from "./scroll-spy-context";

const SECTION_NAME = "ScrollSpySection";

const props = defineProps<{
	value: string;
	asChild?: boolean;
	class?: HTMLAttributes["class"];
}>();

defineOptions({
	inheritAttrs: false,
});

const attrs = useAttrs();

const context = inject(SCROLL_SPY_CONTEXT_KEY, null);
if (context === null) {
	throw new Error(`\`${SECTION_NAME}\` must be used within \`ScrollSpy\``);
}

const sectionRef = ref<Element | null>(null);
const composedRef = useComposedRefs(
	sectionRef,
	attrs.ref as ComposableRef<Element>,
) as VNodeRef;

const passthroughAttrs = computed(() => {
	const raw = { ...attrs } as Record<string, unknown>;
	delete raw.ref;
	delete raw.class;
	return raw;
});

watch(
	() => [sectionRef.value, props.value] as const,
	([element, value], old) => {
		const [prevEl, prevVal] = (old ?? [null, ""]) as [Element | null, string];
		if (prevVal && prevEl) {
			context.onSectionUnregister(prevVal);
		}
		if (element && value) {
			context.onSectionRegister(value, element);
		}
	},
	{ flush: "post", immediate: true },
);
</script>

<template>
	<Primitive
		:id="props.value"
		:ref="composedRef"
		data-slot="scroll-spy-section"
		:data-orientation="context.orientation"
		:as-child="props.asChild"
		as="div"
		:class="props.class"
		v-bind="passthroughAttrs"
	>
		<slot />
	</Primitive>
</template>
