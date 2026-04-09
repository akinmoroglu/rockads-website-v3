<script setup lang="ts">
import { CheckCircle2 } from "lucide-vue-next";
import logoSrc from "@/assets/images/logo-rockads.svg";

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
		<div class="flex w-full flex-col lg:w-[560px] lg:shrink-0 xl:w-[620px]">
			<!-- Logo -->
			<header class="shrink-0 px-8 pt-8 pb-4">
				<NuxtLink
					to="/"
					class="inline-flex items-center rounded-md ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				>
					<img
						:src="logoSrc"
						alt="Rockads"
						class="h-8 w-auto"
						width="120"
						height="32"
					>
					<span class="sr-only">Rockads home</span>
				</NuxtLink>
			</header>

			<!-- Slot: page content -->
			<main class="flex flex-1 flex-col justify-center px-8 py-6">
				<div class="mx-auto w-full max-w-[440px]">
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
		<div
			class="relative hidden flex-1 overflow-hidden lg:flex lg:flex-col lg:justify-center"
			style="background: linear-gradient(145deg, oklch(0.17 0.04 264) 0%, oklch(0.21 0.045 258) 45%, oklch(0.19 0.055 272) 100%);"
		>
			<!-- Decorative glow blobs -->
			<div
				class="pointer-events-none absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full blur-[120px]"
				style="background: oklch(0.55 0.17 240 / 0.22);"
			/>
			<div
				class="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full blur-[100px]"
				style="background: oklch(0.55 0.17 240 / 0.15);"
			/>

			<!-- Subtle dot grid -->
			<div
				class="pointer-events-none absolute inset-0 opacity-[0.06]"
				style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 28px 28px;"
			/>

			<!-- Panel content -->
			<div class="relative z-10 px-14 py-16 xl:px-20">
				<!-- Eye-brow label -->
				<p class="mb-4 text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
					Performance Marketing Platform
				</p>

				<!-- Headline -->
				<h2 class="text-[2.6rem] leading-[1.15] font-bold tracking-tight text-white">
					Scale Your Ads.<br>
					<span style="color: oklch(0.72 0.16 238);">Grow Your Revenue.</span>
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
						<CheckCircle2
							class="mt-0.5 size-5 shrink-0"
							style="color: oklch(0.72 0.16 238);"
						/>
						<span class="text-sm leading-snug text-white/75">{{ feature }}</span>
					</li>
				</ul>

				<!-- Stats row -->
				<div
					class="mt-12 grid grid-cols-3 gap-6 border-t pt-10"
					style="border-color: oklch(1 0 0 / 0.08);"
				>
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
```

Harika! Layout'u tamamen yeniden yazdım. İşte yapılanlar:

**Sol kolon (form alanı):**
- Logo, `NuxtLink` ile anasayfaya yönlendiriyor
- `<slot />` mevcut sign-in / sign-up sayfalarını olduğu gibi render ediyor
- Alt footer: yıl + Privacy Notice + Terms of Service linkleri

**Sağ kolon (marketing paneli) — sadece `lg:` ve üzeri görünür:**
- Koyu lacivert → mavi gradient arka plan (`oklch` renk sistemi projeyle uyumlu)
- İki adet bulanık ışık "blob" dekorasyon + ince nokta grid deseni
- Eye-brow etiket, büyük başlık, alt başlık
- 4 madde halinde feature listesi (CheckCircle2 ikonu)
- 3 sütunlu istatistik satırı: `5K+ aktif reklamveren`, `$2B+ yönetilen harcama`, `3.2× ortalama ROAS`

**Mobil:** Sağ panel gizlenir, form tam ekran gösterilir. `AuthHeader` ve `AuthFooter` bileşenleri artık kullanılmıyor — logo ve footer linkleri doğrudan layout içine entegre edildi.

Eğer sign-in / sign-up sayfalarındaki `Card` bileşeninin kutucuk görünümünü kaldırıp form'u beyaz arka plana düz render etmek istersen, sayfalara `class="border-0 shadow-none"` eklemememi ya da Card wrapper'ı kaldırmamı söyleyebilirsin.
