<script setup lang="ts">
import { LineShadowText } from "@/components/ui/line-shadow-text";
import EncryptedText from "@/components/ui/encrypted-text/EncryptedText.vue";
import { TextReveal } from "@/components/ui/text-reveal";
import { motion } from "motion-v";
import { onMounted, ref } from "vue";

const isReveal = ref(false);

onMounted(() => {
	isReveal.value = true;
});
</script>

<template>
	<section class="footer-shell">
		<div class="mx-auto flex min-h-(--footer-hero-min-height) w-full max-w-(--footer-max-width) flex-col items-center justify-center px-5 py-16 text-center lg:px-12">
			<!-- <p class="mb-12 text-base tracking-(--footer-kicker-tracking) text-(--footer-kicker-color) uppercase">
				The only partner you'll ever need.
			</p> -->
			<EncryptedText
				text="The only partner you'll ever need."
				encrypted-class="text-neutral-500"
				revealed-class="text-(--footer-kicker-color)"
				class="mb-12 text-base tracking-(--footer-kicker-tracking) uppercase"
				:reveal-delay-ms="50"
			/>

			<div class="relative flex w-full max-w-[492px] flex-col items-center gap-9">
				<div
					class="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[260px] w-[300px] max-w-[calc(100%+2rem)] -translate-x-1/2 -translate-y-1/2 md:h-[350px] md:w-[400px] lg:h-[458px] lg:w-[536px]"
					aria-hidden="true"
				>
					<div class="footer-hero-ellipse size-full rounded-full" />
				</div>

				<div
					v-if="isReveal"
					class="relative z-10 w-full max-w-(--footer-headline-max-width)"
				>
					<TextReveal>
						<LineShadowText
							class="text-[40px] leading-[48px] font-normal text-white italic md:text-[52px] md:leading-[60px] lg:text-[68px] lg:leading-[72px]"
							shadow-color="white"
						>
							Stable.
						</LineShadowText>

						<p class="text-[40px] leading-[50px] md:text-[52px] md:leading-[65px] lg:text-[68px] lg:leading-[88px]">
							<em class="footer-enduring text-(--footer-accent-color)">Enduring.</em>
						</p>

						<LineShadowText
							class="text-[40px] leading-[48px] font-normal text-white italic md:text-[52px] md:leading-[60px] lg:text-[68px] lg:leading-[72px]"
							shadow-color="white"
						>
							Limitless.
						</LineShadowText>
					</TextReveal>
				</div>

				<p class="relative z-10 max-w-(--footer-description-max-width) text-sm leading-5 text-(--footer-description-color)">
					When others come and go, we'll still be here. Join the infrastructure built to last.
				</p>
			</div>
		</div>
	</section>
</template>

<style scoped>
.footer-shell {
	--footer-bg-color: #080b0f;
	--footer-kicker-color: #898fa5;
	--footer-accent-color: #f6ca9a;
	--footer-description-color: #9fa6bb;
	--footer-border-color: #23293a;
	--footer-link-color: #747a8e;
	--footer-link-hover-color: #a3abc1;
	--footer-separator-color: #3a4153;
	--footer-copyright-color: #4b5061;

	--footer-max-width: 1440px;
	--footer-hero-min-height: 686px;
	--footer-headline-max-width: 536px;
	--footer-description-max-width: 372px;
	--footer-kicker-tracking: 0.3em;

	background-color: var(--footer-bg-color);
}

/* Fraunces italic bold — matches Figma footer headline accent (SOFT / WONK axes) */
.footer-enduring {
	font-family: var(--font-fraunces);
	font-style: italic;
	font-weight: 700;
	font-variation-settings: "SOFT" 0, "WONK" 1;
}

/* Figma footer CTA: large blurred ellipse behind headline stack (node 19822:38117) */
.footer-hero-ellipse {
	background: radial-gradient(
		ellipse 75% 72% at 50% 50%,
		rgb(38 56 94 / 52%) 0%,
		rgb(38 56 94 / 16%) 45%,
		rgb(8 11 15 / 0%) 72%
	);
	filter: blur(40px);
}

@media (prefers-reduced-motion: reduce) {
	.footer-hero-ellipse {
		filter: blur(20px);
		opacity: 0.9;
	}
}
</style>
