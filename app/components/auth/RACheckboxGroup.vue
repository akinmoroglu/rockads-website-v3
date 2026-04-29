<script setup lang="ts">
import type { FormOption } from "@/constants/registration";
import { Checkbox } from "@/components/ui/checkbox";

const props = defineProps<{
	label: string;
	items: readonly FormOption[];
	errorMessage?: string;
	modelValue: string[];
}>();

const emit = defineEmits<{ "update:modelValue": [ids: string[]] }>();

function handleClick(item: FormOption) {
	const next = props.modelValue.includes(item.id)
		? props.modelValue.filter(id => id !== item.id)
		: [...props.modelValue, item.id];

	emit("update:modelValue", next);
}
</script>

<template>
	<div>
		<div class="flex flex-col items-center gap-6">
			<div class="text-[18px] leading-7 font-medium text-foreground">
				{{ label }}
			</div>
			<div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
				<button
					v-for="item in items"
					:id="item.id"
					:key="item.id"
					type="button"
					class="flex h-12 cursor-pointer items-center justify-between rounded-lg border border-border px-4 text-left transition-colors hover:border-primary hover:bg-primary/5"
					:class="{ '!border-2 !border-primary !bg-primary/10': modelValue.includes(item.id) }"
					@click="handleClick(item)"
				>
					<span class="text-sm">{{ item.text }}</span>
					<Checkbox
						:model-value="modelValue.includes(item.id)"
						aria-hidden="true"
						tabindex="-1"
						class="pointer-events-none"
					/>
				</button>
			</div>
		</div>
		<div
			v-if="errorMessage"
			class="mt-2 flex justify-center text-sm text-destructive"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>
