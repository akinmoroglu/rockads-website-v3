<script setup lang="ts">
import { CheckCircle2, ArrowLeft } from "lucide-vue-next";
import logoSrc from "@/assets/images/logo-rockads.svg";

const legalLinks = [
	{ label: "Privacy Notice", href: "/privacy-notice" },
	{ label: "Terms of Service", href: "/terms-of-service-of-rockads" },
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

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const isApplicationRoute = computed(() => route.path.includes("ad-account-application"));
const isApplicationSuccess = computed(() => route.path.includes("ad-account-application/success"));
const isApplicationForm = computed(() => isApplicationRoute.value && !isApplicationSuccess.value);

const isBackBtnVisible = computed(() => {
	if (!isApplicationForm.value) return false;
	const step = Number(route.query.step);
	const sub = Number(route.query.sub);

	return step > 1 || sub > 1;
});

function handleBack() {
	router.back();
}

const logoHref = computed(() => {
	if (!isApplicationRoute.value) return "/";

	const appURL = (config.public.appURL as string) ?? "";
	const isStaging = appURL.includes("stage");

	return isStaging ? "https://stage-panel.rockads.com" : "https://marketing.rockads.com/";
});
</script>

<template>
	<div class="flex min-h-screen bg-background text-foreground">
		<!-- ───────────────────────────── Left: Form column ───────────────────────────── -->
		<div
			class="flex w-full flex-col"
			:class="isApplicationRoute ? '' : 'lg:w-1/2 lg:shrink-0'"
		>
			<!-- Logo + (optional) back button -->
			<header
				class="relative flex shrink-0 items-center px-8 pt-8 pb-4"
				:class="isApplicationRoute ? 'justify-center' : ''"
			>
				<button
					v-if="isBackBtnVisible"
					type="button"
					class="absolute left-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
					@click="handleBack"
				>
					<ArrowLeft class="size-4" />
					<span class="hidden sm:inline">Back</span>
				</button>

				<NuxtLink
					v-if="isApplicationRoute"
					:to="logoHref"
					external
					target="_self"
					class="flex h-[33.75px] items-center gap-3 rounded-md ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				>
					<img
						:src="logoSrc"
						alt="Rockads"
						class="h-6.75 w-35.5 brightness-0"
					>
				</NuxtLink>
				<NuxtLink
					v-else
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
				<div
					class="mx-auto w-full"
					:class="isApplicationRoute ? 'max-w-4xl' : 'max-w-130'"
				>
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
						<NuxtLink
							:to="link.href"
							class="underline-offset-4 transition-colors hover:text-foreground hover:underline"
						>
							{{ link.label }}
						</NuxtLink>
					</template>
				</div>
			</footer>
		</div>

		<!-- ─────────────────────────── Right: Marketing panel (sign-in/up only) ──────────────────────── -->
		<div
			v-if="!isApplicationRoute"
			class="relative hidden overflow-hidden bg-linear-to-b from-black to-[#02123e] lg:flex lg:w-1/2 lg:shrink-0 lg:flex-col lg:justify-center"
		>
			<!-- Subtle dot-grid texture (same as hero) -->
			<div
				class="pointer-events-none absolute inset-0 bg-size-[22px_22px] opacity-[0.06]"
				style="background-image: radial-gradient(circle, white 1px, transparent 1px);"
			/>

			<!-- Panel content -->
			<div class="relative z-10 px-14 py-16 xl:px-20">
				<p class="mb-4 text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
					Performance Marketing Platform
				</p>

				<h2 class="text-[2.6rem] leading-[1.12] font-extrabold tracking-[-0.03em] text-[#99CBF3]">
					Scale Your Ads.<br>
					<span class="text-white/70">Grow Your Revenue.</span>
				</h2>
				<p class="mt-4 max-w-sm text-base leading-relaxed text-white/55">
					Everything you need to run profitable ad campaigns, all in one place.
				</p>

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
