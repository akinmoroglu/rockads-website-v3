<script setup lang="ts" generic="T extends { value: string; label?: string }">
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { computed, ref } from "vue";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const props = defineProps<{
	modelValue: T | undefined;
	options: readonly T[];
	placeholder?: string;
	searchPlaceholder?: string;
	emptyMessage?: string;
	displayLabel?: (option: T) => string;
	error?: boolean;
	id?: string;
	triggerClass?: string;
}>();

const emit = defineEmits<{ "update:modelValue": [value: T] }>();

const open = ref(false);

const renderLabel = (option: T) =>
	props.displayLabel ? props.displayLabel(option) : (option.label ?? option.value);

const triggerLabel = computed(() => {
	if (!props.modelValue) return props.placeholder ?? "Select...";

	return renderLabel(props.modelValue);
});

function select(option: T) {
	emit("update:modelValue", option);
	open.value = false;
}
</script>

<template>
	<Popover v-model:open="open">
		<PopoverTrigger as-child>
			<Button
				:id="id"
				type="button"
				variant="outline"
				role="combobox"
				:aria-expanded="open"
				class="h-12 w-full justify-between font-normal"
				:class="[
					!modelValue ? 'text-muted-foreground' : '',
					error ? 'border-destructive' : '',
					triggerClass,
				]"
			>
				<span class="truncate">{{ triggerLabel }}</span>
				<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
			</Button>
		</PopoverTrigger>
		<PopoverContent
			class="w-[var(--reka-popover-trigger-width)] p-0"
			align="start"
		>
			<Command>
				<CommandInput :placeholder="searchPlaceholder ?? placeholder ?? 'Search...'" />
				<CommandList>
					<CommandEmpty>{{ emptyMessage ?? "No results." }}</CommandEmpty>
					<CommandGroup>
						<CommandItem
							v-for="option in options"
							:key="option.value"
							:value="renderLabel(option)"
							@select="select(option)"
						>
							<Check
								class="mr-2 size-4"
								:class="cn(modelValue?.value === option.value ? 'opacity-100' : 'opacity-0')"
							/>
							{{ renderLabel(option) }}
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</PopoverContent>
	</Popover>
</template>
