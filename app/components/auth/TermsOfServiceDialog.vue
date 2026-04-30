<script setup lang="ts">
import { ArrowDownCircle } from "lucide-vue-next";
import { computed, ref } from "vue";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import TermsOfServiceContent from "./TermsOfServiceContent.vue";

const props = defineProps<{
	open: boolean;
}>();

const emit = defineEmits<{
	"update:open": [value: boolean];
	"confirm": [];
	"cancel": [];
}>();

const SCROLL_BOTTOM_TOLERANCE_PX = 50;

const scrollableRef = ref<HTMLElement | null>(null);
const reachedBottom = ref(false);

const isOpen = computed({
	get: () => props.open,
	set: (value: boolean) => emit("update:open", value),
});

function handleOpenUpdate(open: boolean) {
	if (!open && props.open) {
		// User dismissed the modal via overlay/Escape/X — treat as cancel.
		emit("cancel");
	}
	emit("update:open", open);
	if (open) reachedBottom.value = false;
}

function checkBottom(target: HTMLElement) {
	const remaining = target.scrollHeight - target.scrollTop - target.clientHeight;

	reachedBottom.value = remaining < SCROLL_BOTTOM_TOLERANCE_PX;
}

function handleScroll(event: Event) {
	checkBottom(event.target as HTMLElement);
}

function scrollToBottom() {
	const el = scrollableRef.value;

	if (!el) return;
	el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
}

function handleConfirm() {
	emit("confirm");
	emit("update:open", false);
}

function handleCancel() {
	emit("cancel");
	emit("update:open", false);
}
</script>

<template>
	<Dialog
		:open="isOpen"
		@update:open="handleOpenUpdate"
	>
		<DialogContent
			class="flex max-h-[85vh] flex-col gap-0 p-0 sm:max-w-2xl"
		>
			<DialogHeader class="border-b px-6 py-4">
				<DialogTitle>Service Agreement</DialogTitle>
				<DialogDescription>
					Please read the agreement and scroll to the end to accept.
				</DialogDescription>
			</DialogHeader>

			<div class="relative flex-1 overflow-hidden">
				<div
					ref="scrollableRef"
					test-id="terms-modal-scroll-area"
					class="h-[55vh] overflow-y-auto px-6 py-4"
					@scroll="handleScroll"
				>
					<TermsOfServiceContent />
				</div>

				<button
					v-if="!reachedBottom"
					type="button"
					test-id="terms-modal-scroll-to-bottom"
					class="absolute right-4 bottom-4 grid size-10 place-items-center rounded-full bg-foreground/80 text-background shadow-lg transition hover:bg-foreground"
					@click="scrollToBottom"
				>
					<ArrowDownCircle class="size-6" />
					<span class="sr-only">Scroll to bottom</span>
				</button>
			</div>

			<div class="flex flex-col-reverse gap-2 border-t px-6 py-4 sm:flex-row sm:justify-end">
				<Button
					test-id="terms-modal-cancel-btn"
					variant="outline"
					@click="handleCancel"
				>
					Cancel
				</Button>
				<Button
					test-id="terms-modal-confirm-btn"
					:disabled="!reachedBottom"
					@click="handleConfirm"
				>
					Accept and continue
				</Button>
			</div>
		</DialogContent>
	</Dialog>
</template>
