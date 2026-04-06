<script setup lang="ts">
import logoSrc from "@/assets/images/logo-rockads.svg";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const footerNav = {
	solutions: [
		{ label: "Agency Solutions", href: "/services/core" },
		{ label: "Automation", href: "/services/tech" },
		{ label: "Compliance AI", href: "/services/tech" },
	],
	company: [
		{ label: "About", href: "/about" },
		{ label: "Pricing", href: "/pricing" },
		{ label: "Contact", href: "/contact" },
	],
	resources: [
		{ label: "Blog", href: "/blog" },
		{ label: "Guides", href: "/resources" },
		{ label: "Help Center", href: "/help" },
	],
};
</script>

<template>
	<footer class="mt-20 border-t border-(--header-border) bg-(--header-background) text-white">
		<div class="mx-auto w-full max-w-[1440px] px-5 py-12 lg:px-12 lg:py-16">
			<div class="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
				<div class="space-y-5">
					<NuxtLink
						to="/"
						class="inline-flex items-center"
					>
						<img
							:src="logoSrc"
							alt="Rockads"
							class="h-[27px] w-[142px]"
						>
					</NuxtLink>
					<p class="max-w-sm text-sm leading-6 text-white/70">
						Grow without limits with a partner built for scalable campaign operations.
					</p>
					<Button
						as-child
						size="lg"
						class="h-11 rounded-lg"
					>
						<NuxtLink to="/contact">
							Get Started
						</NuxtLink>
					</Button>
				</div>

				<div class="space-y-4">
					<h3 class="text-sm font-semibold tracking-wide text-white/90 uppercase">
						Solutions
					</h3>
					<ul class="space-y-2.5 text-sm">
						<li
							v-for="item in footerNav.solutions"
							:key="item.label"
						>
							<NuxtLink
								:to="item.href"
								class="text-white/70 transition-colors hover:text-white"
							>
								{{ item.label }}
							</NuxtLink>
						</li>
					</ul>
				</div>

				<div class="space-y-4">
					<h3 class="text-sm font-semibold tracking-wide text-white/90 uppercase">
						Company
					</h3>
					<ul class="space-y-2.5 text-sm">
						<li
							v-for="item in footerNav.company"
							:key="item.label"
						>
							<NuxtLink
								:to="item.href"
								class="text-white/70 transition-colors hover:text-white"
							>
								{{ item.label }}
							</NuxtLink>
						</li>
					</ul>
				</div>

				<div class="space-y-4">
					<h3 class="text-sm font-semibold tracking-wide text-white/90 uppercase">
						Resources
					</h3>
					<ul class="space-y-2.5 text-sm">
						<li
							v-for="item in footerNav.resources"
							:key="item.label"
						>
							<NuxtLink
								:to="item.href"
								class="text-white/70 transition-colors hover:text-white"
							>
								{{ item.label }}
							</NuxtLink>
						</li>
					</ul>
				</div>
			</div>

			<Separator class="my-8 bg-white/15" />

			<div class="flex flex-col gap-3 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
				<p>© {{ new Date().getFullYear() }} Rockads. All rights reserved.</p>
				<div class="flex items-center gap-4">
					<NuxtLink
						to="/privacy"
						class="transition-colors hover:text-white/80"
					>
						Privacy Policy
					</NuxtLink>
					<NuxtLink
						to="/terms"
						class="transition-colors hover:text-white/80"
					>
						Terms of Service
					</NuxtLink>
				</div>
			</div>
		</div>
	</footer>
</template>
