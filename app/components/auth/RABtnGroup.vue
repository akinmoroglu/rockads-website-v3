<script setup lang="ts">
import type { FormOption } from "@/constants/registration";

defineProps<{
	label: string;
	items: readonly FormOption[];
	errorMessage?: string;
	selectedId?: string;
}>();

const emit = defineEmits<{ change: [option: FormOption] }>();

function handleClick(item: FormOption) {
	emit("change", item);
}
</script>

<template>
	<div>
		<div class="flex flex-col items-center gap-6 text-center">
			<div class="text-[18px] leading-7 font-medium text-foreground">
				{{ label }}
			</div>
			<div
				class="flex flex-wrap justify-center gap-4 sm:justify-start"
				role="group"
			>
				<button
					v-for="item in items"
					:id="item.id"
					:key="item.id"
					type="button"
					class="h-12 w-full rounded-lg border border-border bg-background px-4 text-sm transition-colors hover:border-primary hover:bg-primary/5 sm:w-auto sm:min-w-[122px]"
					:class="{ '!border-2 !border-primary !bg-primary/10': selectedId === item.id }"
					@click="handleClick(item)"
				>
					{{ item.text }}
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
