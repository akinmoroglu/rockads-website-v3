<script setup lang="ts">
type PhilosophyItem = {
	id: string;
	title: string;
	p1: string;
	p2: string;
};

const scrollWrapper = ref<HTMLElement | null>(null);
const contentPanelRef = ref<HTMLElement | null>(null);
const activeIndex = ref(0);
const isDesktop = ref(false);
const scrollHeight = ref(0);

const items: PhilosophyItem[] = [
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
	if (!import.meta.client) return;
	isDesktop.value = window.innerWidth >= 1024;
}

function calcScrollHeight() {
	if (!import.meta.client || !scrollWrapper.value || !isDesktop.value) {
		scrollHeight.value = 0;

		return;
	}
	const sectionEl = scrollWrapper.value.querySelector("section");

	if (!sectionEl) return;
	scrollHeight.value = sectionEl.offsetHeight + SCROLL_PER_ITEM * items.length;
}

function onScroll() {
	if (!import.meta.client || !scrollWrapper.value || !isDesktop.value) return;
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

function setActiveIndex(i: number) {
	activeIndex.value = i;
	// On mobile/tablet, scroll the text panel into view after the state updates
	if (!isDesktop.value && import.meta.client) {
		nextTick(() => {
			contentPanelRef.value?.scrollIntoView({ behavior: "smooth", block: "nearest" });
		});
	}
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

<template>
	<!-- Outer scroll-space wrapper (desktop only), matches legacy OurPhilosophy -->
	<div
		ref="scrollWrapper"
		class="relative"
		:style="{ height: isDesktop ? scrollHeight + 'px' : 'auto' }"
	>
		<section
			class="philosophy-section border-y border-white/10 bg-(--philosophy-bg) py-14 text-white md:py-20 lg:py-28"
			:class="isDesktop ? 'sticky top-0' : ''"
		>
			<div class="mx-auto w-full max-w-[1240px] px-5 lg:px-12">
				<div class="flex flex-col gap-8 lg:gap-10">
					<span
						class="inline-flex w-fit rounded-full border border-(--philosophy-pill-border) bg-(--philosophy-pill-bg) px-5 py-2 text-xs font-medium tracking-[0.16em] text-(--philosophy-pill-text)"
					>
						OUR PHILOSOPHY
					</span>

					<div class="flex flex-col items-start gap-8 md:flex-row md:gap-10 lg:gap-16">
						<!-- Left: titles + progress -->
						<div class="flex w-full shrink-0 flex-col gap-3 md:max-w-[260px] md:gap-4 lg:max-w-[520px]">
							<button
								v-for="(item, i) in items"
								:key="item.id"
								type="button"
								class="cursor-pointer text-left text-[22px] leading-[1.2] font-semibold tracking-[-0.02em] transition-colors duration-500 md:text-[26px] lg:text-[44px]"
								:class="
									activeIndex === i
										? 'text-(--philosophy-title-accent)'
										: 'text-(--philosophy-title-muted)'
								"
								@click="setActiveIndex(i)"
							>
								{{ item.title }}
							</button>

							<div
								v-if="isDesktop"
								class="mt-4 hidden items-center gap-2 lg:flex"
								aria-hidden="true"
							>
								<div
									v-for="(item, i) in items"
									:key="'dot-' + item.id"
									class="h-[3px] rounded-full transition-all duration-500"
									:class="
										activeIndex === i
											? 'w-8 bg-(--philosophy-title-accent)'
											: 'w-3 bg-white/15'
									"
								/>
							</div>
						</div>

						<!-- Right: copy with transition -->
						<div
							ref="contentPanelRef"
							class="relative w-full flex-1 lg:min-h-[260px]"
						>
							<Transition
								name="philosophy-text"
								mode="out-in"
							>
								<p
									:key="activeItem?.id"
									class="max-w-[560px] text-[16px] leading-[1.6] text-(--philosophy-body) md:text-[18px] lg:text-[20px] lg:leading-[1.55]"
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

<style scoped>
.philosophy-section {
	--philosophy-bg: #070f1d;
	--philosophy-pill-border: rgba(255, 255, 255, 0.16);
	--philosophy-pill-bg: rgba(255, 255, 255, 0.03);
	--philosophy-pill-text: #d2d8e4;
	--philosophy-title-accent: #f2c38b;
	--philosophy-title-muted: rgba(248, 251, 255, 0.2);
	--philosophy-body: rgba(248, 251, 255, 0.82);
}

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
