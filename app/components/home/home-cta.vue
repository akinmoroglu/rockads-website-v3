<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
	<section class="footer-shell">
		<div class="mx-auto flex min-h-(--footer-hero-min-height) w-full max-w-(--footer-max-width) flex-col items-center justify-center px-5 py-12 text-center sm:py-16 lg:px-12">

			<!-- Kicker -->
			<span class="mb-8 text-xs font-medium tracking-[0.2em] text-(--footer-kicker-color) uppercase sm:mb-10">
				THE ONLY PARTNER YOU'LL EVER NEED
			</span>

			<div class="relative flex w-full max-w-[580px] flex-col items-center gap-8">

				<!-- Glow ellipse -->
				<div
					class="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[200px] w-[240px] -translate-x-1/2 -translate-y-1/2 sm:h-[300px] sm:w-[360px] lg:h-[460px] lg:w-[540px]"
					aria-hidden="true"
				>
					<div class="footer-hero-ellipse size-full rounded-full" />
				</div>

				<!-- Headline -->
				<h2 class="relative z-10 text-[34px] leading-[1.1] font-extrabold tracking-[-0.03em] text-white sm:text-[48px] lg:text-[64px]">
					Ready to run without limits?
				</h2>

				<!-- Description -->
				<p class="relative z-10 max-w-[400px] text-[15px] leading-[1.7] text-(--footer-description-color)">
					Talk to us. We'll show you exactly what changes when the infrastructure is right.
				</p>

				<!-- CTAs -->
				<div class="relative z-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
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
				</div>

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
