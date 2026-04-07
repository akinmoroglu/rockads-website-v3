<template>
	<header
		ref="headerRef"
		class="left-0 right-0 z-50 h-[72px] lg:h-[100px]"
		:class="[
			pinned ? 'header-pinned fixed bg-surface-darker' : 'absolute',
			!pinned && !transparent ? 'bg-surface-darker' : '',
		]"
	>
		<div class="flex items-center justify-between h-full px-5 lg:px-12 max-w-[1440px] mx-auto">
			<NuxtLink
				to="/"
				class="flex items-center gap-3 h-[33.75px]"
			>
				<img
					:src="logoSrc"
					alt="Rockads"
					class="h-[27px] w-[142px]"
				>
				<div class="hidden md:block w-px h-5 bg-white/30" />
				<span class="hidden md:block text-white text-base font-medium">Your Growth Partner</span>
			</NuxtLink>

			<!-- Desktop nav -->
			<nav class="hidden lg:flex items-center gap-10">
				<div class="flex items-center gap-10 text-white text-base font-medium">
					<!-- Services with mega menu -->
					<div
						class="relative"
						@mouseenter="servicesOpen = true"
						@mouseleave="servicesOpen = false"
					>
						<button
							class="flex items-center gap-1.5 transition-opacity hover:opacity-80"
						>
							Services
							<svg
								class="w-3 h-3 transition-transform duration-200"
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

						<!-- Mega dropdown -->
						<Transition name="dropdown">
							<div
								v-if="servicesOpen"
								class="absolute top-full left-1/2 -translate-x-1/2 pt-4"
							>
								<div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex w-[560px]">
									<!-- Left: categories -->
									<div class="w-[220px] py-5 px-5 flex flex-col gap-1 border-r border-gray-100">
										<NuxtLink
											v-for="cat in serviceCategories"
											:key="cat.id"
											:to="cat.href"
											class="px-3 py-3 rounded-lg cursor-pointer transition-colors block"
											:class="activeCategory === cat.id ? 'bg-gray-50' : 'hover:bg-gray-50/50'"
											@mouseenter="activeCategory = cat.id"
										>
											<span
												class="text-sm font-semibold block leading-5"
												:class="activeCategory === cat.id ? 'text-primary' : 'text-surface-dark'"
											>
												{{ cat.title }}
											</span>
											<span class="text-xs text-text-gray-light leading-4 mt-0.5 block">
												{{ cat.subtitle }}
											</span>
										</NuxtLink>
									</div>

									<!-- Right: sub-items -->
									<div class="flex-1 py-5 px-5 flex flex-col gap-1">
										<TransitionGroup
											name="fade"
											tag="div"
											class="flex flex-col gap-1"
										>
											<div
												v-for="item in activeItems"
												:key="item.title"
												class="px-3 py-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
											>
												<span class="text-sm font-semibold text-surface-dark block leading-5">
													{{ item.title }}
												</span>
												<span class="text-xs text-text-gray-light leading-4 mt-0.5 block">
													{{ item.description }}
												</span>
											</div>
										</TransitionGroup>
									</div>
								</div>
							</div>
						</Transition>
					</div>

					<a
						href="#"
						class="hover:opacity-80 transition-opacity"
					>Solutions</a>
					<a
						href="#"
						class="hover:opacity-80 transition-opacity"
					>Pricing</a>
					<a
						href="#"
						class="hover:opacity-80 transition-opacity"
					>Resources</a>
					<a
						href="#"
						class="hover:opacity-80 transition-opacity"
					>Sign In</a>
				</div>
				<button class="bg-primary-600 text-white text-base font-medium px-4 py-3 rounded-lg h-[48px] hover:bg-primary transition-colors">
					Get Started
				</button>
			</nav>

			<!-- Mobile menu button -->
			<button
				class="lg:hidden flex items-center justify-center w-10 h-10 text-white"
				@click="mobileMenuOpen = !mobileMenuOpen"
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
					/><line
						x1="3"
						y1="12"
						x2="21"
						y2="12"
					/><line
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
					/><line
						x1="6"
						y1="6"
						x2="18"
						y2="18"
					/>
				</svg>
			</button>
		</div>

		<!-- Mobile menu overlay -->
		<Transition name="slide">
			<div
				v-if="mobileMenuOpen"
				class="lg:hidden absolute top-full left-0 right-0 bg-surface-darker/95 backdrop-blur-lg border-t border-white/10"
			>
				<div class="flex flex-col px-5 py-6 gap-1">
					<!-- Mobile Services accordion -->
					<button
						class="flex items-center justify-between text-white text-base font-medium py-3 w-full"
						@click="mobileServicesOpen = !mobileServicesOpen"
					>
						Services
						<svg
							class="w-4 h-4 transition-transform duration-200"
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
					<div
						v-if="mobileServicesOpen"
						class="pl-4 pb-2 flex flex-col gap-3"
					>
						<div
							v-for="cat in serviceCategories"
							:key="cat.id"
							class="flex flex-col gap-1"
						>
							<span class="text-primary text-sm font-semibold">{{ cat.title }}</span>
							<div
								v-for="item in cat.items"
								:key="item.title"
								class="pl-3 py-1"
							>
								<span class="text-white/90 text-sm block">{{ item.title }}</span>
								<span class="text-white/40 text-xs block">{{ item.description }}</span>
							</div>
						</div>
					</div>

					<a
						href="#"
						class="text-white text-base font-medium py-3"
					>Solutions</a>
					<a
						href="#"
						class="text-white text-base font-medium py-3"
					>Pricing</a>
					<a
						href="#"
						class="text-white text-base font-medium py-3"
					>Resources</a>
					<a
						href="#"
						class="text-white text-base font-medium py-3"
					>Sign In</a>
					<button class="bg-primary-600 text-white text-base font-medium px-4 py-3 rounded-lg mt-4 hover:bg-primary transition-colors">
						Get Started
					</button>
				</div>
			</div>
		</Transition>
	</header>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ transparent?: boolean }>(), { transparent: false });

const logoSrc = "/images/logo-rockads.svg";
const headerRef = ref<HTMLElement | null>(null);
const mobileMenuOpen = ref(false);
const mobileServicesOpen = ref(false);
const servicesOpen = ref(false);
const activeCategory = ref("core");
const pinned = ref(false);

let lastScrollY = 0;
let ticking = false;
const THRESHOLD = 100;

function onScroll() {
	if (ticking) return;
	ticking = true;
	requestAnimationFrame(() => {
		const y = window.scrollY;
		const headerH = headerRef.value?.offsetHeight ?? 100;
		if (y > headerH + THRESHOLD && y > lastScrollY) {
			pinned.value = false;
		}
		else if (y > headerH + THRESHOLD && y < lastScrollY) {
			pinned.value = true;
		}
		else if (y <= headerH) {
			pinned.value = false;
		}
		lastScrollY = y;
		ticking = false;
	});
}

onMounted(() => {
	window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
	window.removeEventListener("scroll", onScroll);
});

const serviceCategories = [
	{
		id: "core",
		title: "Core Services",
		subtitle: "The Structure Behind Serious Expansion",
		href: "/services/core",
		items: [
			{ title: "Agency Solutions", description: "Instant, 24/7 top-up support that eliminates the waiting game." },
			{ title: "Enterprise Support", description: "A dedicated team supports your growth with real-world operational experience and a commitment to long-term alignment." },
		],
	},
	{
		id: "tech",
		title: "Tech Services",
		subtitle: "The Full Stack for Global Ad Operations",
		href: "#",
		items: [
			{ title: "Automation", description: "Your operations, on autopilot." },
			{ title: "Ad Launcher", description: "One launch, every platform, every market." },
			{ title: "Compliance AI", description: "Stay compliant, stay live, stay ahead." },
		],
	},
];

const activeItems = computed(() => {
	return serviceCategories.find(c => c.id === activeCategory.value)?.items ?? [];
});
</script>

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

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px);
}

.fade-enter-active {
  transition: opacity 0.15s ease;
}
.fade-leave-active {
  transition: none;
  position: absolute;
  opacity: 0;
}
.fade-enter-from {
  opacity: 0;
}
</style>
