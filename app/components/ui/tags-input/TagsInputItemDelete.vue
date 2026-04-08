<script setup lang="ts">
import { IconX } from "@tabler/icons-vue";
import { reactiveOmit } from "@vueuse/core";
import type { TagsInputItemDeleteProps } from "reka-ui";
import { TagsInputItemDelete, useForwardProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<
	TagsInputItemDeleteProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = reactiveOmit(props, "class");

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
	<TagsInputItemDelete
		v-bind="forwardedProps"
		:class="cn('mr-1 flex rounded bg-transparent', props.class)"
	>
		<slot>
			<IconX class="h-4 w-4" />
		</slot>
	</TagsInputItemDelete>
</template>
