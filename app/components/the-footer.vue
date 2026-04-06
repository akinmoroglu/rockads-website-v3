<script setup lang="ts">
const legalLinks = [
	{ label: "Privacy", href: "/privacy" },
	{ label: "Terms", href: "/terms" },
	{ label: "Contact", href: "/contact" },
];
</script>

<template>
	<footer class="footer-shell mt-20 text-white">
		<div class="mx-auto flex min-h-(--footer-hero-min-height) w-full max-w-(--footer-max-width) flex-col items-center justify-center px-5 py-16 text-center lg:px-12">
			<p class="mb-12 text-base  tracking-(--footer-kicker-tracking) text-(--footer-kicker-color) uppercase">
				The only partner you'll ever need.
			</p>

			<div class="relative w-full max-w-(--footer-headline-max-width)">
				<div class="footer-glow pointer-events-none absolute inset-0 -z-10 rounded-full" />
				<h2 class="text-white">
					<span class="block text-5xl leading-[1.18] md:text-6xl md:leading-[1.2]">Stable.</span>
					<span class="block text-5xl leading-[1.18] text-(--footer-accent-color) md:text-6xl md:leading-[1.2]">Enduring.</span>
					<span class="block text-5xl leading-[1.18] md:text-6xl md:leading-[1.2]">Limitless.</span>
				</h2>
			</div>

			<p class="mt-9 max-w-(--footer-description-max-width) text-sm leading-5 text-(--footer-description-color)">
				When others come and go, we'll still be here. Join the infrastructure built to last.
			</p>
		</div>

		<div class="border-t border-(--footer-border-color)">
			<div class="mx-auto flex w-full max-w-(--footer-max-width) flex-col gap-4 px-5 py-7 text-base text-(--footer-link-color) md:flex-row md:items-center md:justify-between lg:px-12">
				<div class="flex items-center gap-5">
					<template
						v-for="(link, index) in legalLinks"
						:key="link.label"
					>
						<NuxtLink
							:to="link.href"
							class="transition-colors hover:text-(--footer-link-hover-color)"
						>
							{{ link.label }}
						</NuxtLink>
						<span
							v-if="index < legalLinks.length - 1"
							class="text-(--footer-separator-color)"
						>
							|
						</span>
					</template>
				</div>

				<p class="text-(--footer-copyright-color)">
					© 2026 Rockads. All rights reserved.
				</p>
			</div>
		</div>
	</footer>
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
	--footer-description-max-width: 272px;
	--footer-kicker-tracking: 0.3em;

	background-color: var(--footer-bg-color);
}

.footer-glow {
	background: radial-gradient(circle, rgb(38 56 94 / 45%) 0%, rgb(8 11 15 / 0%) 72%);
}
</style>
