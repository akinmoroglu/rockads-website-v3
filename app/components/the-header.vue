<script setup lang="ts">
import { Motion } from "motion-v";
import logoSrc from "@/assets/images/logo-rockads.svg";
import { Button } from "@/components/ui/button";

type ServiceItem = {
	title: string;
	description: string;
};

type ServiceCategory = {
	id: string;
	title: string;
	subtitle: string;
	href: string;
	items: ServiceItem[];
};

const headerRef = ref<HTMLElement | null>(null);
const route = useRoute();

const mobileMenuOpen = ref(false);
const mobileServicesOpen = ref(false);
const servicesOpen = ref(false);
const activeCategory = ref("core");
const pinned = ref(false);

const desktopLinks = [
	{ label: "Solutions", href: "/solutions" },
	{ label: "Pricing", href: "/pricing" },
	{ label: "Resources", href: "/resources" },
	{ label: "Sign In", href: "/sign-in" },
];

const serviceCategories: ServiceCategory[] = [
	{
		id: "core",
		title: "Core Services",
		subtitle: "The Structure Behind Serious Expansion",
		href: "/services/core",
		items: [
			{
				title: "Agency Solutions",
				description:
          "Instant, 24/7 top-up support that eliminates the waiting game.",
			},
			{
				title: "Enterprise Support",
				description:
          "A dedicated team supports your growth with real-world operational experience and a commitment to long-term alignment.",
			},
		],
	},
	{
		id: "tech",
		title: "Tech Services",
		subtitle: "The Full Stack for Global Ad Operations",
		href: "/services/tech",
		items: [
			{ title: "Automation", description: "Your operations, on autopilot." },
			{

				title: "Ad Launcher",
				description: "One launch, every platform, every market.",
			},
			{
				title: "Compliance AI",
				description: "Stay compliant, stay live, stay ahead.",
			},
		],
	},
];

const activeItems = computed(() => {
	return (
		serviceCategories.find(category => category.id === activeCategory.value)
			?.items ?? []
	);
});

const headerClasses = computed(() => {
	return [
		pinned.value ? "fixed header-pinned" : "absolute",
		"border-b border-[var(--header-border)] bg-[var(--header-background)] backdrop-blur transition-colors duration-200",
	];
});

let lastScrollY = 0;
let ticking = false;
const THRESHOLD = 100;

const onScroll = () => {
	if (ticking) {
		return;
	}

	ticking = true;
	requestAnimationFrame(() => {
		const currentScrollY = window.scrollY;
		const headerHeight = headerRef.value?.offsetHeight ?? 100;

		if (
			currentScrollY > headerHeight + THRESHOLD
			&& currentScrollY > lastScrollY
		) {
			pinned.value = false;
		}
		else if (
			currentScrollY > headerHeight + THRESHOLD
			&& currentScrollY < lastScrollY
		) {
			pinned.value = true;
		}
		else if (currentScrollY <= headerHeight) {
			pinned.value = false;
		}

		lastScrollY = currentScrollY;
		ticking = false;
	});
};

const openDesktopServices = () => {
	servicesOpen.value = true;
};

const closeDesktopServices = () => {
	servicesOpen.value = false;
};

const toggleMobileMenu = () => {
	mobileMenuOpen.value = !mobileMenuOpen.value;

	if (!mobileMenuOpen.value) {
		mobileServicesOpen.value = false;
	}
};

watch(
	() => route.path,
	() => {
		mobileMenuOpen.value = false;
		mobileServicesOpen.value = false;
		servicesOpen.value = false;
	},
);

onMounted(() => {
	window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
	window.removeEventListener("scroll", onScroll);
});
</script>

<template>
	<header
		ref="headerRef"
		class="left-0 right-0 top-0 z-50 h-[72px] lg:h-[100px]"
		:class="headerClasses"
	>
		<div class="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-5 lg:px-12">
			<NuxtLink
				to="/"
				class="flex h-[33.75px] items-center gap-3"
			>
				<img
					:src="logoSrc"
					alt="Rockads"
					class="h-[27px] w-[142px]"
				>
				<div
					class="hidden h-5 w-px bg-white/30 md:block"
				/>
				<span
					class="hidden text-base font-medium text-white md:block"
				>
					Your Growth Partner
				</span>
			</NuxtLink>

			<nav class="hidden items-center gap-10 lg:flex">
				<div
					class="flex items-center gap-10 text-base font-medium text-white"
				>
					<div
						class="relative"
						@mouseenter="openDesktopServices"
						@mouseleave="closeDesktopServices"
					>
						<button
							class="flex items-center gap-1.5 transition-opacity hover:opacity-80"
							type="button"
							aria-haspopup="menu"
							:aria-expanded="servicesOpen"
						>
							Services
							<svg
								class="h-3 w-3 transition-transform duration-200"
								:class="servicesOpen ? 'rotate-180' : ''"
								viewBox="0 0 12 12"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
							>
								<path d="M3 5l3 3 3-3" />
							</svg>
						</button>

						<Motion
							v-if="servicesOpen"
							as="div"
							class="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4"
							:initial="{ opacity: 0, y: -8 }"
							:animate="{ opacity: 1, y: 0 }"
							:exit="{ opacity: 0, y: -8 }"
							:transition="{ duration: 0.18, ease: 'easeOut' }"
						>
							<div class="flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
								<div class="flex w-[220px] flex-col gap-1 border-r border-gray-100 px-5 py-5">
									<NuxtLink
										v-for="category in serviceCategories"
										:key="category.id"
										:to="category.href"
										class="block cursor-pointer rounded-lg px-3 py-3 transition-colors"
										:class="activeCategory === category.id ? 'bg-gray-50' : 'hover:bg-gray-50/50'"
										@mouseenter="activeCategory = category.id"
									>
										<span
											class="block text-sm leading-5 font-semibold"
											:class="activeCategory === category.id ? 'text-primary' : 'text-foreground'"
										>
											{{ category.title }}
										</span>
										<span class="mt-0.5 block text-xs leading-4 text-muted-foreground">
											{{ category.subtitle }}
										</span>
									</NuxtLink>
								</div>

								<div class="flex flex-1 flex-col gap-1 px-5 py-5">
									<Motion
										v-for="item in activeItems"
										:key="item.title"
										as="div"
										class="rounded-lg px-3 py-3 transition-colors hover:bg-gray-50"
										:initial="{ opacity: 0, y: 6 }"
										:animate="{ opacity: 1, y: 0 }"
										:transition="{ duration: 0.14, ease: 'easeOut' }"
									>
										<span class="block text-sm leading-5 font-semibold text-foreground">
											{{ item.title }}
										</span>
										<span class="mt-0.5 block text-xs leading-4 text-muted-foreground">
											{{ item.description }}
										</span>
									</Motion>
								</div>
							</div>
						</Motion>
					</div>

					<NuxtLink
						v-for="link in desktopLinks"
						:key="link.label"
						:to="link.href"
						class="transition-opacity hover:opacity-80"
					>
						{{ link.label }}
					</NuxtLink>
				</div>

				<Button
					type="button"
					size="lg"
					class="h-[48px] rounded-lg px-5 text-base font-medium"
				>
					Get Started
				</Button>
			</nav>

			<Button
				type="button"
				variant="ghost"
				size="icon"
				class="text-white hover:bg-white/10 lg:hidden"
				:aria-expanded="mobileMenuOpen"
				aria-label="Toggle navigation menu"
				@click="toggleMobileMenu"
			>
				<svg
					v-if="!mobileMenuOpen"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				>
					<line
						x1="3"
						y1="6"
						x2="21"
						y2="6"
					/>
					<line
						x1="3"
						y1="12"
						x2="21"
						y2="12"
					/>
					<line
						x1="3"
						y1="18"
						x2="21"
						y2="18"
					/>
				</svg>
				<svg
					v-else
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				>
					<line
						x1="18"
						y1="6"
						x2="6"
						y2="18"
					/>
					<line
						x1="6"
						y1="6"
						x2="18"
						y2="18"
					/>
				</svg>
			</Button>
		</div>

		<Motion
			v-if="mobileMenuOpen"
			as="div"
			class="absolute left-0 right-0 top-full border-t border-(--header-border) bg-(--header-background)/95 backdrop-blur-lg lg:hidden"
			:initial="{ opacity: 0, y: -8 }"
			:animate="{ opacity: 1, y: 0 }"
			:exit="{ opacity: 0, y: -8 }"
			:transition="{ duration: 0.2, ease: 'easeOut' }"
		>
			<div class="flex flex-col gap-1 px-5 py-6">
				<button
					type="button"
					class="flex w-full items-center justify-between py-3 text-base font-medium text-white"
					:aria-expanded="mobileServicesOpen"
					@click="mobileServicesOpen = !mobileServicesOpen"
				>
					Services
					<svg
						class="h-4 w-4 transition-transform duration-200"
						:class="mobileServicesOpen ? 'rotate-180' : ''"
						viewBox="0 0 12 12"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					>
						<path d="M3 5l3 3 3-3" />
					</svg>
				</button>

				<Motion
					v-if="mobileServicesOpen"
					as="div"
					class="flex flex-col gap-3 pb-2 pl-4"
					:initial="{ opacity: 0, height: 0 }"
					:animate="{ opacity: 1, height: 'auto' }"
					:exit="{ opacity: 0, height: 0 }"
					:transition="{ duration: 0.2, ease: 'easeInOut' }"
				>
					<div
						v-for="category in serviceCategories"
						:key="category.id"
						class="flex flex-col gap-1"
					>
						<span class="text-sm font-semibold text-primary">{{ category.title }}</span>
						<div
							v-for="item in category.items"
							:key="item.title"
							class="py-1 pl-3"
						>
							<span class="block text-sm text-white">{{ item.title }}</span>
							<span class="block text-xs text-white/60">{{ item.description }}</span>
						</div>
					</div>
				</Motion>

				<NuxtLink
					v-for="link in desktopLinks"
					:key="`mobile-${link.label}`"
					:to="link.href"
					class="py-3 text-base font-medium text-white"
				>
					{{ link.label }}
				</NuxtLink>
				<Button
					type="button"
					size="lg"
					class="mt-4 text-base font-medium"
				>
					Get Started
				</Button>
			</div>
		</Motion>
	</header>
</template>

<style scoped>
.header-pinned {
  animation: slideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}
</style>
