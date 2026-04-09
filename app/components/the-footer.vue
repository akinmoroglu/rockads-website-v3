<script setup lang="ts">
import FacebookIcon from "@/assets/icons/partners/facebook.svg?url";
import XTwitterIcon from "@/assets/icons/partners/x-twitter.svg?url";
import InstagramIcon from "@/assets/icons/partners/instagram.svg?url";
import LinkedInIcon from "@/assets/icons/partners/linkedin.svg?url";
import TikTokIcon from "@/assets/icons/partners/tiktok.svg?url";

import VisaLogo from "@/assets/icons/brands/visa.svg?url";
import MastercardLogo from "@/assets/icons/brands/mastercard.svg?url";
import MaestroLogo from "@/assets/icons/brands/maestro.svg?url";
import AmexLogo from "@/assets/icons/brands/amex.svg?url";
import TroyLogo from "@/assets/icons/brands/troy.svg?url";

type FooterLink = {
	label: string;
	href: string;
	/** Opens in a new tab when true (matches rockads.com behavior for docs and social). */
	external?: boolean;
};

const marketingSiteBase = "https://www.rockads.com";

const supportLinks: FooterLink[] = [
	{ label: "Documentation", href: "https://docs.rockads.com/", external: true },
	{ label: "Blog", href: "https://blog.rockads.com/" },
	{ label: "FAQ", href: "https://rockads.faq.desk360.com/" },
	{
		label: "Contact Us",
		href: `${marketingSiteBase}/en/contact-us/`,
	},
];

const featureLinks: FooterLink[] = [
	{
		label: "Ad Automation",
		href: `${marketingSiteBase}/en/tools-and-tech/#ad-automation`,
	},
	{
		label: "Segmented Wallets",
		href: `${marketingSiteBase}/en/tools-and-tech/#segmented-wallets`,
	},
	{
		label: "Customizable Dashboard",
		href: `${marketingSiteBase}/en/tools-and-tech/#dashboard`,
	},
	{
		label: "Grow with REST API",
		href: `${marketingSiteBase}/en/tools-and-tech/#api`,
	},
	{
		label: "Access Management",
		href: `${marketingSiteBase}/en/tools-and-tech/#access-management`,
	},
];

const legalLinks: FooterLink[] = [
	{
		label: "Service Agreement",
		href: `${marketingSiteBase}/en/terms-of-service-of-rockads/`,
	},
	{
		label: "Purchase Policy",
		href: `${marketingSiteBase}/en/purchase-policy/`,
	},
	{
		label: "Privacy Notice",
		href: `${marketingSiteBase}/en/privacy-notice/`,
	},
	{
		label: "Cookie Policy",
		href: `${marketingSiteBase}/en/cookie-policy/`,
	},
];

type SocialLink = FooterLink & { icon: string; iconAlt: string };

const socialLinks: SocialLink[] = [
	{
		label: "Facebook",
		href: "https://www.facebook.com/rockadscom/",
		external: true,
		icon: FacebookIcon,
		iconAlt: "Facebook",
	},
	{
		label: "X",
		href: "https://twitter.com/rockadscom",
		external: true,
		icon: XTwitterIcon,
		iconAlt: "X (Twitter)",
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/rockadscom/",
		external: true,
		icon: InstagramIcon,
		iconAlt: "Instagram",
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/company/rockads/",
		external: true,
		icon: LinkedInIcon,
		iconAlt: "LinkedIn",
	},
	{
		label: "TikTok",
		href: "https://www.tiktok.com/@rockadscom",
		external: true,
		icon: TikTokIcon,
		iconAlt: "TikTok",
	},
];

type FinancialLogo = { name: string; icon: string };

const financialLogos: FinancialLogo[] = [
	{ name: "Visa", icon: VisaLogo },
	{ name: "Mastercard", icon: MastercardLogo },
	{ name: "Maestro", icon: MaestroLogo },
	{ name: "American Express", icon: AmexLogo },
	{ name: "Troy", icon: TroyLogo },
];

function linkAttrs(link: FooterLink) {
	return link.external
		? { target: "_blank" as const, rel: "noopener noreferrer" as const }
		: {};
}
</script>

<template>
	<footer class="footer-shell text-white">
		<div class="border-t border-(--footer-border-color)">
			<div
				class="mx-auto w-full max-w-(--footer-max-width) px-5 py-10 text-base lg:px-12"
			>
				<!-- Navigation link columns -->
				<div
					class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12"
				>
					<div>
						<h2
							class="mb-4 text-sm font-semibold tracking-wide text-(--footer-link-hover-color)"
						>
							Support
						</h2>
						<ul class="flex flex-col gap-2">
							<li
								v-for="link in supportLinks"
								:key="link.label"
							>
								<NuxtLink
									:to="link.href"
									v-bind="linkAttrs(link)"
									class="text-sm leading-5 font-normal text-(--footer-link-color) transition-colors hover:text-(--footer-link-hover-color)"
								>
									{{ link.label }}
								</NuxtLink>
							</li>
						</ul>
					</div>

					<div>
						<h2
							class="mb-4 text-sm font-semibold tracking-wide text-(--footer-link-hover-color)"
						>
							Features
						</h2>
						<ul class="flex flex-col gap-2">
							<li
								v-for="link in featureLinks"
								:key="link.label"
							>
								<NuxtLink
									:to="link.href"
									v-bind="linkAttrs(link)"
									class="text-sm leading-5 font-normal text-(--footer-link-color) transition-colors hover:text-(--footer-link-hover-color)"
								>
									{{ link.label }}
								</NuxtLink>
							</li>
						</ul>
					</div>

					<div>
						<h2
							class="mb-4 text-sm font-semibold tracking-wide text-(--footer-link-hover-color)"
						>
							Terms
						</h2>
						<ul class="flex flex-col gap-2">
							<li
								v-for="link in legalLinks"
								:key="link.label"
							>
								<NuxtLink
									:to="link.href"
									v-bind="linkAttrs(link)"
									class="text-sm leading-5 font-normal text-(--footer-link-color) transition-colors hover:text-(--footer-link-hover-color)"
								>
									{{ link.label }}
								</NuxtLink>
							</li>
						</ul>
					</div>
				</div>

				<!-- Financial Solutions section -->
				<div class="mt-10 border-t border-(--footer-border-color) pt-8">
					<h2
						class="mb-4 text-sm font-semibold tracking-wide text-(--footer-link-hover-color)"
					>
						Our Financial Solutions
					</h2>
					<ul class="flex flex-wrap items-center gap-3">
						<li
							v-for="logo in financialLogos"
							:key="logo.name"
						>
							<div
								class="flex h-9 min-w-13 items-center justify-center rounded-md bg-white/6 px-3 ring-1 ring-white/8"
							>
								<img
									:src="logo.icon"
									:alt="logo.name"
									class="h-5 w-auto max-w-11 object-contain"
									loading="lazy"
								>
							</div>
						</li>
					</ul>
				</div>

				<!-- Social icons + copyright -->
				<div
					class="mt-10 flex flex-col gap-6 border-t border-(--footer-border-color) pt-8 md:flex-row md:items-center md:justify-between"
				>
					<div>
						<h2
							class="mb-3 text-sm font-semibold tracking-wide text-(--footer-link-hover-color)"
						>
							Social
						</h2>
						<ul class="flex flex-wrap items-center gap-3">
							<li
								v-for="link in socialLinks"
								:key="link.label"
							>
								<NuxtLink
									:to="link.href"
									v-bind="linkAttrs(link)"
									:aria-label="link.label"
									class="block transition-opacity hover:opacity-75"
								>
									<img
										:src="link.icon"
										:alt="link.iconAlt"
										class="h-8 w-8 object-contain"
										loading="lazy"
									>
								</NuxtLink>
							</li>
						</ul>
					</div>

					<p class="text-sm text-(--footer-copyright-color)">
						© 2026 Rockads. All rights reserved.
					</p>
				</div>
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
