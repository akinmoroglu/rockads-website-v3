<script setup lang="ts">
const legalLinks = [
	{ label: "Privacy", href: "/privacy" },
	{ label: "Terms", href: "/terms" },
	{ label: "Contact", href: "/contact" },
];
</script>

<template>
	<footer class="footer-shell  text-white">
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
