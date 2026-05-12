<script setup lang="ts">
import { Mail, MailCheck, RotateCcw } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { getEmailProviderInfo } from "@/utils/email-provider";
import {
	clearRegisterVerifyState,
	readRegisterVerifyState,
	writeRegisterVerifyState,
} from "@/utils/register-verify-storage";

const props = defineProps<{
	email: string;
}>();

const RESEND_COOLDOWN_SECONDS = 60;

const secondsLeft = ref(RESEND_COOLDOWN_SECONDS);
const isResending = ref(false);
let intervalId: ReturnType<typeof setInterval> | null = null;

function computeRemaining(startedAt: number): number {
	const elapsed = Math.floor((Date.now() - startedAt) / 1000);

	return Math.max(0, RESEND_COOLDOWN_SECONDS - elapsed);
}

function tick() {
	if (secondsLeft.value > 0) {
		secondsLeft.value -= 1;

		return;
	}
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = null;
	}
}

function startCountdown(initialSeconds: number) {
	secondsLeft.value = initialSeconds;
	if (intervalId) clearInterval(intervalId);
	if (initialSeconds <= 0) return;
	intervalId = setInterval(tick, 1000);
}

onMounted(() => {
	// Resume from persisted timestamp if the user refreshed mid-countdown.
	const stored = readRegisterVerifyState();
	const startedAt = stored?.resendStartedAt ?? Date.now();

	if (!stored) {
		writeRegisterVerifyState({ email: props.email, resendStartedAt: startedAt });
	}
	startCountdown(computeRemaining(startedAt));
});

onBeforeUnmount(() => {
	if (intervalId) clearInterval(intervalId);
});

const canResend = computed(() => secondsLeft.value === 0 && !isResending.value);

const provider = computed(() => getEmailProviderInfo(props.email));

async function handleResend() {
	if (!canResend.value) return;
	isResending.value = true;

	try {
		// TODO(backend): wire to real endpoint once available.
		// Expected: POST `${goApiURL}/resend-verification` with { email, captcha_response }.
		await new Promise(resolve => setTimeout(resolve, 600));
		toast.success("Verification email resent. Check your inbox.");
		const startedAt = Date.now();

		writeRegisterVerifyState({ email: props.email, resendStartedAt: startedAt });
		startCountdown(RESEND_COOLDOWN_SECONDS);
	}
	catch (error: unknown) {
		toast.error(error instanceof Error ? error.message : "Could not resend the email. Try again in a moment.");
	}
	finally {
		isResending.value = false;
	}
}

function handleCheckEmail() {
	if (!import.meta.client) return;
	window.open(provider.value.url, "_blank", "noopener,noreferrer");
}

function handleReturnHome() {
	clearRegisterVerifyState();
}
</script>

<template>
	<Card class="relative w-full overflow-hidden">
		<CardContent class="relative space-y-8 px-6 py-10 sm:px-10 sm:py-12">
			<!-- Icon with layered halo + concentric rings -->
			<div class="relative flex justify-center pt-2">
				<div class="relative">
					<!-- Ambient radial glow centered on the icon -->
					<div
						aria-hidden="true"
						class="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,--theme(--color-primary/30),--theme(--color-primary/5)_45%,transparent_70%)] blur-2xl"
					/>

					<!-- Decorative concentric rings -->
					<div
						aria-hidden="true"
						class="pointer-events-none absolute -inset-12 rounded-full border border-primary/6"
					/>
					<div
						aria-hidden="true"
						class="pointer-events-none absolute -inset-6 rounded-full border border-primary/10"
					/>

					<!-- Slow inner pulse -->
					<div
						aria-hidden="true"
						class="pointer-events-none absolute inset-0 animate-pulse rounded-full bg-primary/25 blur-lg animation-duration-[3s]"
					/>

					<!-- Icon container with gradient + soft shadow -->
					<div class="relative flex size-20 items-center justify-center rounded-full bg-linear-to-br from-primary/25 via-primary/12 to-primary/5 shadow-lg shadow-primary/15 ring-1 ring-primary/25">
						<!-- Inner faint ring for depth -->
						<div
							aria-hidden="true"
							class="pointer-events-none absolute inset-1.5 rounded-full ring-1 ring-primary/10"
						/>
						<MailCheck class="relative size-9 text-primary" />
					</div>
				</div>
			</div>

			<!-- Headline + body -->
			<div class="space-y-3 text-center">
				<h1 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					You're in. Almost.
				</h1>
				<p class="mx-auto max-w-md text-base leading-relaxed text-muted-foreground">
					We sent a verification link to
					<span
						v-if="email"
						class="font-medium break-all text-foreground"
					>{{ email }}</span>
					<span
						v-else
						class="inline-block h-4 w-44 animate-pulse rounded bg-muted align-middle"
						aria-hidden="true"
					/>.
					Click it to access ad accounts, automation tools, and AI features built for serious advertisers.
				</p>
			</div>

			<!-- CTAs -->
			<div class="space-y-3">
				<Button
					test-id="register-success-check-email-btn"
					type="button"
					class="h-12 w-full text-base"
					@click="handleCheckEmail"
				>
					<Mail class="size-5" />
					Check your email
				</Button>

				<Button
					test-id="register-success-resend-btn"
					type="button"
					variant="outline"
					class="h-12 w-full text-base"
					:disabled="!canResend"
					@click="handleResend"
				>
					<Spinner
						v-if="isResending"
						class="size-4"
					/>
					<RotateCcw
						v-else
						class="size-4"
					/>
					<span>
						Resend verification email
					</span>
					<span
						v-if="secondsLeft > 0"
						class="ml-1 inline-flex h-6 min-w-10 items-center justify-center rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground tabular-nums"
					>
						{{ secondsLeft }}s
					</span>
				</Button>
			</div>

			<!-- Footer note + exit -->
			<div class="space-y-4 border-t pt-6">
				<p class="text-center text-sm text-muted-foreground">
					Can't find it? Check your spam folder or try a different email address.
				</p>
				<div class="text-center">
					<NuxtLink
						to="/"
						class="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
						@click="handleReturnHome"
					>
						Return to homepage
					</NuxtLink>
				</div>
			</div>
		</CardContent>
	</Card>
</template>
