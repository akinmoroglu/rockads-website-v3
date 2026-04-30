<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import QrcodeVue from "qrcode.vue";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const props = defineProps<{
	open: boolean;
	/** Whether the user already has 2FA enabled (skip QR setup, jump to code entry). */
	twoFactorEnabled: boolean;
	/** True when the customer/org mandates 2FA — show extra explainer copy. */
	customerTwoFactorRequired: boolean;
	/** OTP-auth URL to render as QR — only meaningful in setup mode. */
	otpAuthUrl: string;
	/** Manual setup secret — paired with `otpAuthUrl`. */
	otpSecret: string;
	/** Show inline spinner on the complete button. */
	submitting?: boolean;
}>();

const emit = defineEmits<{
	"update:open": [value: boolean];
	"complete": [code: string];
}>();

/**
 * Source flow: setup phase (QR → "Next") → verify phase (6-digit code → "Complete").
 * For already-enrolled users we skip the setup phase entirely.
 */
const setupCompleted = ref(props.twoFactorEnabled);
const code = ref("");
const codeInputRef = ref<{ $el?: HTMLInputElement } | null>(null);

const isOpen = computed({
	get: () => props.open,
	set: (value: boolean) => emit("update:open", value),
});

watch(
	() => props.open,
	(open) => {
		if (open) {
			setupCompleted.value = props.twoFactorEnabled;
			code.value = "";
		}
	},
);

watch(
	() => props.twoFactorEnabled,
	(enabled) => {
		if (props.open) setupCompleted.value = enabled;
	},
);

watch(setupCompleted, async (value) => {
	if (!value) return;
	await nextTick();
	const el = codeInputRef.value?.$el as HTMLInputElement | undefined;

	if (el && typeof el.focus === "function") {
		setTimeout(() => el.focus(), 100);
	}
});

function onCodeInput(event: Event) {
	const raw = (event.target as HTMLInputElement).value;

	code.value = raw.replace(/\D/g, "").slice(0, 6);
}

function handleNext() {
	setupCompleted.value = true;
}

function handleBack() {
	setupCompleted.value = false;
	code.value = "";
}

function handleCancel() {
	isOpen.value = false;
}

function handleComplete() {
	if (code.value.length < 6 || props.submitting) return;
	emit("complete", code.value);
}

function openChat() {
	if (typeof window === "undefined") return;
	const chat = window.desk360Chat;

	if (!chat) return;
	if (chat.open) {
		chat.open();

		return;
	}
	if (chat.show) chat.show();
}
</script>

<template>
	<Dialog
		v-model:open="isOpen"
	>
		<DialogContent class="sm:max-w-md">
			<DialogHeader>
				<DialogTitle>
					{{ setupCompleted ? "Verify your authenticator code" : "Set up two-factor authentication" }}
				</DialogTitle>
				<DialogDescription class="sr-only">
					Two-factor authentication
				</DialogDescription>
			</DialogHeader>

			<div
				v-if="!setupCompleted"
				class="flex flex-col gap-4 text-sm text-muted-foreground"
			>
				<p v-if="customerTwoFactorRequired">
					Your organization requires every user to set up an authenticator app before signing in.
				</p>
				<p>
					Open your authenticator app (Google Authenticator, 1Password, Authy…) and scan the QR code below to add Rockads.
				</p>
				<p>
					Can't scan? Add the account manually with the secret shown beneath the code.
				</p>
				<div class="flex flex-col items-center gap-3 py-2">
					<div class="rounded-md border bg-white p-3">
						<QrcodeVue
							v-if="otpAuthUrl"
							:value="otpAuthUrl"
							:size="160"
							level="M"
							render-as="svg"
						/>
						<div
							v-else
							class="flex size-40 items-center justify-center"
						>
							<Spinner />
						</div>
					</div>
					<code
						v-if="otpSecret"
						class="rounded bg-muted px-2 py-1 font-mono text-xs text-foreground select-all"
					>
						{{ otpSecret }}
					</code>
				</div>
			</div>

			<div
				v-else
				class="flex flex-col gap-4"
			>
				<p class="text-sm text-muted-foreground">
					Enter the 6-digit code from your authenticator app.
				</p>
				<Input
					ref="codeInputRef"
					test-id="signin-2fa-code-input"
					:model-value="code"
					inputmode="numeric"
					autocomplete="one-time-code"
					maxlength="6"
					placeholder="••••••"
					class="text-center text-lg tracking-[0.5em]"
					@input="onCodeInput"
					@keyup.enter="handleComplete"
				/>
			</div>

			<div class="flex flex-col gap-2">
				<template v-if="!setupCompleted">
					<Button
						test-id="signin-2fa-next-btn"
						class="w-full"
						@click="handleNext"
					>
						Next
					</Button>
					<Button
						test-id="signin-2fa-cancel-btn"
						variant="outline"
						class="w-full"
						@click="handleCancel"
					>
						Cancel
					</Button>
				</template>
				<template v-else>
					<Button
						test-id="signin-2fa-complete-btn"
						class="w-full"
						:disabled="code.length < 6 || submitting"
						@click="handleComplete"
					>
						<Spinner
							v-if="submitting"
							class="mr-2"
						/>
						Verify and continue
					</Button>
					<Button
						v-if="!twoFactorEnabled"
						test-id="signin-2fa-back-btn"
						variant="outline"
						class="w-full"
						@click="handleBack"
					>
						Back
					</Button>
					<p class="mt-2 flex justify-center gap-1 text-sm text-muted-foreground">
						<span>Having trouble?</span>
						<button
							test-id="signin-2fa-chat-btn"
							type="button"
							class="font-medium text-primary hover:underline"
							@click="openChat"
						>
							Chat to our team
						</button>
					</p>
				</template>
			</div>
		</DialogContent>
	</Dialog>
</template>
