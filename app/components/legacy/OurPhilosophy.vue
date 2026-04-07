<template>
	<!-- Outer scroll-space wrapper (desktop only) -->
	<div
		ref="scrollWrapper"
		class="relative"
		:style="{ height: isDesktop ? scrollHeight + 'px' : 'auto' }"
	>
		<section
			class="bg-surface-dark"
			:class="isDesktop ? 'sticky top-0' : ''"
		>
			<div class="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24 lg:px-[160px] lg:py-[144px]">
				<div class="flex flex-col gap-6 lg:gap-8">
					<span class="border-text-gray-darker rounded-rounded text-text-gray-light inline-flex items-center self-start border px-4 py-2 text-xs font-medium tracking-[2.24px] lg:px-6 lg:py-3 lg:text-sm">
						OUR PHILOSOPHY
					</span>

					<div class="flex flex-col items-start gap-8 lg:flex-row lg:gap-[94px]">
						<!-- Left - Titles -->
						<div class="flex shrink-0 flex-col gap-3 lg:w-[520px] lg:gap-4">
							<h2
								v-for="(item, i) in items"
								:key="item.id"
								class="cursor-pointer text-[24px] leading-[1.2] font-medium whitespace-nowrap transition-colors duration-500 md:text-[32px] lg:text-[44px]"
								:class="activeIndex === i ? 'text-accent-orange' : 'text-white/20'"
								@click="activeIndex = i"
							>
								{{ item.title }}
							</h2>

							<!-- Progress indicator (desktop) -->
							<div
								v-if="isDesktop"
								class="mt-6 hidden items-center gap-2 lg:flex"
							>
								<div
									v-for="(item, i) in items"
									:key="'dot-' + item.id"
									class="h-[3px] rounded-full transition-all duration-500"
									:class="activeIndex === i ? 'w-8 bg-accent-orange' : 'w-3 bg-white/15'"
								/>
							</div>
						</div>

						<!-- Right - Description -->
						<div class="relative min-h-[200px] flex-1 lg:min-h-[260px]">
							<Transition
								name="philosophy-text"
								mode="out-in"
							>
								<p
									:key="activeItem?.id"
									class="text-base leading-[24px] font-normal text-white/80 lg:text-lg lg:leading-[28px]"
								>
									{{ activeItem?.p1 }}
									<br><br>
									{{ activeItem?.p2 }}
								</p>
							</Transition>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
const scrollWrapper = ref<HTMLElement | null>(null);
const activeIndex = ref(0);
const isDesktop = ref(false);
const scrollHeight = ref(0);

const items = [
	{
		id: "partnership",
		title: "Built on partnership.",
		p1: "Operating at a global scale requires more than just powerful software; it requires a dedicated growth partner. Rockads centralizes the fragmented complexities of cross-border expansion into a single, high-performance ecosystem.",
		p2: "We manage the technical, financial, and operational heavy lifting in the background, while we strategize, guide, and scale alongside you. You gain a stable core that keeps expansion fast, clear, and sustainable.",
	},
	{
		id: "intelligence",
		title: "Powered by intelligence.",
		p1: "Data without direction creates noise. Our intelligence layer translates real-time signals into concrete actions, helping you prioritize the markets, campaigns, and channels that carry the highest upside.",
		p2: "From predictive insights to live performance diagnostics, you move with confidence instead of guesswork. The result is faster iteration, better capital efficiency, and decisions made at the right moment.",
	},
	{
		id: "endure",
		title: "Designed to endure.",
		p1: "Sustained growth requires systems that do not break under pressure. We build for consistency, resilience, and long-term alignment so your operations stay strong as volume and complexity increase.",
		p2: "Our teams, infrastructure, and platform partnerships are structured for continuity. You can scale aggressively today while protecting performance and strategic flexibility for tomorrow.",
	},
];

const activeItem = computed(() => items[activeIndex.value]);

const SCROLL_PER_ITEM = 500;

function checkDesktop() {
	isDesktop.value = window.innerWidth >= 1024;
}

function calcScrollHeight() {
	if (!scrollWrapper.value || !isDesktop.value) {
		scrollHeight.value = 0;
		return;
	}
	const sectionEl = scrollWrapper.value.querySelector("section");
	if (!sectionEl) return;
	scrollHeight.value = sectionEl.offsetHeight + SCROLL_PER_ITEM * items.length;
}

function onScroll() {
	if (!scrollWrapper.value || !isDesktop.value) return;
	const rect = scrollWrapper.value.getBoundingClientRect();
	const scrolled = -rect.top;
	if (scrolled < 0) {
		activeIndex.value = 0;
		return;
	}
	activeIndex.value = Math.min(
		Math.floor(scrolled / SCROLL_PER_ITEM),
		items.length - 1,
	);
}

function onResize() {
	checkDesktop();
	calcScrollHeight();
}

onMounted(() => {
	checkDesktop();
	calcScrollHeight();
	window.addEventListener("scroll", onScroll, { passive: true });
	window.addEventListener("resize", onResize);
});

onUnmounted(() => {
	window.removeEventListener("scroll", onScroll);
	window.removeEventListener("resize", onResize);
});
</script>

<style scoped>
.philosophy-text-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.philosophy-text-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.philosophy-text-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.philosophy-text-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
