<script setup lang="ts">
import { Motion } from "motion-v";
import { Button } from "@/components/ui/button";
</script>

<template>
	<section class="footer-shell">
		<div class="mx-auto flex min-h-(--footer-hero-min-height) w-full max-w-(--footer-max-width) flex-col items-center justify-center px-5 py-12 text-center sm:py-16 lg:px-12">

			<div class="relative flex w-full max-w-[580px] flex-col items-center gap-8">

				<!-- Glow ellipse -->
				<div
					class="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[200px] w-[240px] -translate-x-1/2 -translate-y-1/2 sm:h-[300px] sm:w-[360px] lg:h-[460px] lg:w-[540px]"
					aria-hidden="true"
				>
					<div class="footer-hero-ellipse size-full rounded-full" />
				</div>

				<!-- Headline -->
				<Motion
					as="h2"
					class="relative z-10 text-[34px] leading-[1.1] font-extrabold tracking-[-0.03em] text-white sm:text-[48px] lg:text-[64px]"
					:initial="{ opacity: 0, y: 18, scale: 0.98 }"
					:while-in-view="{ opacity: 1, y: 0, scale: 1 }"
					:in-view-options="{ once: true, amount: 0.3 }"
					:transition="{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }"
				>
					Ready to run without limits?
				</Motion>

				<!-- Description -->
				<Motion
					as="p"
					class="relative z-10 max-w-[400px] text-[15px] leading-[1.7] text-(--footer-description-color)"
					:initial="{ opacity: 0, y: 12 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:in-view-options="{ once: true, amount: 0.3 }"
					:transition="{ duration: 0.5, delay: 0.14, ease: 'easeOut' }"
				>
					Talk to us. We'll show you exactly what changes when the infrastructure is right.
				</Motion>

				<!-- CTAs -->
				<Motion
					as="div"
					class="relative z-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
					:initial="{ opacity: 0, y: 10 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:in-view-options="{ once: true, amount: 0.3 }"
					:transition="{ duration: 0.5, delay: 0.22, ease: 'easeOut' }"
				>
					<Button as-child>
						<NuxtLink
							to="/contact-us"
							class="px-8! py-[14px] sm:px-10! sm:py-6"
						>
							Book a Call
						</NuxtLink>
					</Button>
					<Button as-child variant="outline" class="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
						<NuxtLink
							to="/services/tech"
							class="px-8! py-[14px] sm:px-10! sm:py-6"
						>
							Explore Features
						</NuxtLink>
					</Button>
				</Motion>

			</div>
		</div>
	</section>
</template>

<style scoped>
.footer-shell {
	--footer-bg-color: #060a14;
	--footer-kicker-color: #898fa5;
	--footer-description-color: #9fa6bb;
	--footer-max-width: 1440px;
	--footer-hero-min-height: 420px;

	background-color: var(--footer-bg-color);
}

@media (min-width: 640px) {
	.footer-shell {
		--footer-hero-min-height: 520px;
	}
}

@media (min-width: 1024px) {
	.footer-shell {
		--footer-hero-min-height: 620px;
	}
}

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
