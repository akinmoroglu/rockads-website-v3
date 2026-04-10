<script setup lang="ts">
import { Motion } from "motion-v";
import { CheckCircle2 } from "lucide-vue-next";
import logoSrc from "@/assets/images/logo-rockads.svg";
import leftGlowAsset from "@/assets/images/home/hero/left-glow.svg?url";
import rightGlowAsset from "@/assets/images/home/hero/right-glow.svg?url";

const marketingSiteBase = "https://www.rockads.com";

const legalLinks = [
	{ label: "Privacy Notice", href: `${marketingSiteBase}/en/privacy-notice/` },
	{ label: "Terms of Service", href: `${marketingSiteBase}/en/terms-of-service-of-rockads/` },
] as const;

const year = new Date().getFullYear();

const features = [
	"Manage campaigns across Meta, Google & TikTok from one dashboard",
	"Smart budget allocation powered by real-time performance data",
	"Detailed analytics to track ROAS, CPA and revenue growth",
	"Expert guidance from dedicated performance marketing specialists",
];

const stats = [
	{ value: "5K+", label: "Active advertisers" },
	{ value: "$2B+", label: "Ad spend managed" },
	{ value: "3.2×", label: "Average ROAS" },
];
</script>

<template>
	<div class="flex min-h-screen bg-background text-foreground">
		<!-- ───────────────────────────── Left: Form column ───────────────────────────── -->
		<div class="flex w-full flex-col lg:w-140 lg:shrink-0 xl:w-155">
			<!-- Logo -->
			<header class="shrink-0 px-8 pt-8 pb-4">
				<NuxtLink
					to="/"
					class="flex h-[33.75px] items-center gap-3 rounded-md ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				>
					<img
						:src="logoSrc"
						alt="Rockads"
						class="h-6.75 w-35.5 brightness-0"
					>
					<div class="h-5 w-px bg-foreground/25" />
					<span class="text-base text-foreground/60">
						Your Growth Partner
					</span>
				</NuxtLink>
			</header>

			<!-- Slot: page content -->
			<main class="flex flex-1 flex-col justify-center px-8 py-6">
				<div class="mx-auto w-full max-w-110">
					<slot />
				</div>
			</main>

			<!-- Footer -->
			<footer class="shrink-0 px-8 pt-4 pb-8">
				<div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:justify-start">
					<p>© {{ year }} Rockads</p>
					<template
						v-for="link in legalLinks"
						:key="link.href"
					>
						<span
							class="text-border select-none"
							aria-hidden="true"
						>·</span>
						<a
							:href="link.href"
							target="_blank"
							rel="noopener noreferrer"
							class="underline-offset-4 transition-colors hover:text-foreground hover:underline"
						>
							{{ link.label }}
						</a>
					</template>
				</div>
			</footer>
		</div>

		<!-- ─────────────────────────── Right: Marketing panel ──────────────────────── -->
		<div class="relative hidden flex-1 overflow-hidden bg-linear-to-b from-black to-[#02123e] lg:flex lg:flex-col lg:justify-center">
			<!-- Subtle dot-grid texture (same as hero) -->
			<div
				class="pointer-events-none absolute inset-0 bg-size-[22px_22px] opacity-[0.06]"
				style="background-image: radial-gradient(circle, white 1px, transparent 1px);"
			/>

			<!-- Left glow — entry fade-in + infinite float, mirroring hero banner -->
			<!-- <div
				aria-hidden="true"
				class="pointer-events-none absolute inset-y-0 -left-80 flex w-[min(720px,90%)] items-center"
			>
				<Motion
					as="div"
					class="h-[min(970px,92vh)] w-full"
					:initial="{ opacity: 0, x: -160 }"
					:animate="{ opacity: 1, x: 0 }"
					:transition="{ duration: 1.1, ease: 'easeOut' }"
				>
					<Motion
						as="div"
						class="h-full w-full"
						:animate="{ opacity: [0.88, 0.96, 0.88], x: [0, 6, 0], y: [10, -8, 10] }"
						:transition="{ duration: 6.2, delay: 1.1, repeat: Infinity, ease: 'easeInOut' }"
					>
						<img
							:src="leftGlowAsset"
							alt=""
							class="h-full w-full object-contain brightness-[1.2] saturate-[1.25] filter-[drop-shadow(0_0_28px_rgba(18,131,255,0.24))]"
						>
					</Motion>
				</Motion>
			</div> -->

			<!-- Right glow — entry fade-in + infinite float, mirroring hero banner -->
			<!-- <div
				aria-hidden="true"
				class="pointer-events-none absolute inset-y-0 -right-80 flex w-[min(720px,90%)] items-center"
			>
				<Motion
					as="div"
					class="h-[min(970px,92vh)] w-full"
					:initial="{ opacity: 0, x: 160 }"
					:animate="{ opacity: 1, x: 0 }"
					:transition="{ duration: 1.1, ease: 'easeOut' }"
				>
					<Motion
						as="div"
						class="h-full w-full"
						:animate="{ opacity: [0.88, 0.96, 0.88], x: [0, -6, 0], y: [-10, 8, -10] }"
						:transition="{ duration: 6.6, delay: 1.1, repeat: Infinity, ease: 'easeInOut' }"
					>
						<img
							:src="rightGlowAsset"
							alt=""
							class="h-full w-full object-contain brightness-[1.2] saturate-[1.25] filter-[drop-shadow(0_0_28px_rgba(18,131,255,0.24))]"
						>
					</Motion>
				</Motion>
			</div> -->

			<!-- Panel content -->
			<div class="relative z-10 px-14 py-16 xl:px-20">
				<!-- Eye-brow -->
				<p class="mb-4 text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
					Performance Marketing Platform
				</p>

				<!-- Headline — same colour as hero h1 -->
				<h2 class="text-[2.6rem] leading-[1.12] font-extrabold tracking-[-0.03em] text-[#99CBF3]">
					Scale Your Ads.<br>
					<span class="text-white/70">Grow Your Revenue.</span>
				</h2>
				<p class="mt-4 max-w-sm text-base leading-relaxed text-white/55">
					Everything you need to run profitable ad campaigns — all in one place.
				</p>

				<!-- Feature list -->
				<ul class="mt-10 space-y-4">
					<li
						v-for="feature in features"
						:key="feature"
						class="flex items-start gap-3"
					>
						<CheckCircle2 class="mt-0.5 size-5 shrink-0 text-[#37A4FF]" />
						<span class="text-sm leading-snug text-white/75">{{ feature }}</span>
					</li>
				</ul>

				<!-- Stats -->
				<div class="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
					<div
						v-for="stat in stats"
						:key="stat.label"
					>
						<p class="text-2xl font-bold text-white">
							{{ stat.value }}
						</p>
						<p class="mt-1 text-xs text-white/45">
							{{ stat.label }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
