<template>
	<!-- Outer scroll-space wrapper (desktop only) -->
	<div
		ref="scrollWrapper"
		class="relative"
		:style="{ height: isDesktop ? scrollHeight + 'px' : 'auto' }"
	>
		<section
			class="relative bg-surface-cream overflow-hidden"
			:class="isDesktop ? 'sticky top-0 min-h-screen' : ''"
		>
			<!-- Decorative lines background -->
			<div class="absolute inset-0 border border-border-cream-bg rounded-3xl overflow-hidden">
				<svg
					class="absolute inset-0 w-full h-full"
					viewBox="0 0 1440 1096"
					fill="none"
					preserveAspectRatio="none"
				>
					<line
						x1="1342"
						y1="0"
						x2="880"
						y2="1096"
						stroke="#fff5e8"
						stroke-width="1"
					/>
					<line
						x1="36"
						y1="0"
						x2="172"
						y2="1096"
						stroke="#fff5e8"
						stroke-width="1"
					/>
					<line
						x1="1440"
						y1="846"
						x2="0"
						y2="983"
						stroke="#fff5e8"
						stroke-width="1"
					/>
					<line
						x1="1440"
						y1="594"
						x2="0"
						y2="817"
						stroke="#fff5e8"
						stroke-width="1"
					/>
					<line
						x1="1398"
						y1="1096"
						x2="544"
						y2="0"
						stroke="#fff5e8"
						stroke-width="1"
					/>
				</svg>
			</div>

			<div class="relative max-w-[1440px] mx-auto px-5 md:px-10 lg:px-[160px] py-16 lg:py-[117px]">
				<div class="flex flex-col lg:flex-row gap-8 lg:gap-[42px]">
					<!-- Left column -->
					<div class="lg:w-[447px] shrink-0 flex flex-col gap-6 lg:gap-8">
						<span class="inline-flex self-start items-center px-4 lg:px-6 py-2 lg:py-3 border border-border-cream-light rounded-rounded text-accent-warning text-xs lg:text-sm font-medium tracking-[2.24px]">
							CORE PILLARS
						</span>
						<h2 class="text-[32px] lg:text-[48px] font-medium leading-[40px] lg:leading-[56px] text-text-base">
							The Three Pillars <span class="text-primary">of Rockads</span>
						</h2>

						<!-- Scroll progress indicator (desktop) -->
						<div
							v-if="isDesktop"
							class="hidden lg:flex flex-col gap-2 mt-4"
						>
							<div
								v-for="(pillar, i) in pillars"
								:key="pillar.id"
								class="flex items-center gap-3"
							>
								<div
									class="h-[3px] rounded-full transition-all duration-500"
									:class="activeId === pillar.id ? 'w-8 bg-primary' : 'w-4 bg-text-gray-light/30'"
								/>
								<span
									class="text-xs font-medium transition-colors duration-300"
									:class="activeId === pillar.id ? 'text-primary' : 'text-text-gray-light/50'"
								>
									{{ String(i + 1).padStart(2, '0') }}
								</span>
							</div>
						</div>
					</div>

					<!-- Right column - accordion -->
					<div class="flex-1 flex flex-col">
						<div
							v-for="(pillar, index) in pillars"
							:key="pillar.id"
							class="transition-colors duration-300 rounded-2xl"
							:class="activeId === pillar.id ? 'bg-surface-dark' : 'bg-transparent'"
						>
							<!-- Header (always visible) -->
							<button
								class="w-full text-left px-6 lg:px-10 transition-all duration-300 group"
								:class="activeId === pillar.id ? 'pt-8 lg:pt-10 pb-4' : 'py-8 lg:py-10'"
								@click="toggle(pillar.id)"
							>
								<div class="flex items-start justify-between gap-4">
									<div class="flex flex-col gap-2">
										<span
											class="text-xs font-medium transition-colors duration-300"
											:class="activeId === pillar.id ? 'text-white/40' : 'text-text-gray-light'"
										>
											{{ String(index + 1).padStart(2, '0') }}
										</span>
										<h3
											class="font-accent italic text-[28px] md:text-[32px] lg:text-[40px] leading-[1.15] transition-colors duration-300"
											:class="activeId === pillar.id ? 'text-primary-200' : 'text-primary'"
										>
											{{ pillar.title }}
										</h3>
										<span
											class="text-xs font-medium transition-colors duration-300"
											:class="activeId === pillar.id ? 'text-white/50' : 'text-text-gray-dark'"
										>
											{{ pillar.subtitle }}
										</span>
									</div>

									<!-- Toggle icon -->
									<div
										class="w-10 h-10 rounded-full border flex items-center justify-center shrink-0 mt-2 transition-colors duration-300"
										:class="activeId === pillar.id ? 'border-white/20' : 'border-border-cream-light'"
									>
										<svg
											v-if="activeId !== pillar.id"
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											class="text-text-gray-dark"
										>
											<line
												x1="8"
												y1="3"
												x2="8"
												y2="13"
											/>
											<line
												x1="3"
												y1="8"
												x2="13"
												y2="8"
											/>
										</svg>
										<svg
											v-else
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
										>
											<line
												x1="4"
												y1="4"
												x2="12"
												y2="12"
											/>
											<line
												x1="12"
												y1="4"
												x2="4"
												y2="12"
											/>
										</svg>
									</div>
								</div>
							</button>

							<!-- Expandable content -->
							<div
								class="grid transition-all duration-300 ease-in-out"
								:class="activeId === pillar.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
							>
								<div class="overflow-hidden">
									<div class="px-6 lg:px-10 pb-8 lg:pb-10">
										<p class="text-sm md:text-base leading-[22px] md:leading-[26px] text-white/70">
											{{ pillar.description }}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
const scrollWrapper = ref<HTMLElement | null>(null);
const activeId = ref("growth");
const isDesktop = ref(false);
const scrollHeight = ref(0);

const pillars = [
	{
		id: "growth",
		title: "Growth Engine",
		subtitle: "Limitless Scale",
		description: "Scaling across borders is an operational and financial challenge. True global scale requires a frictionless ecosystem. We deliver the complete financial architecture, enterprise-grade resilience, and AI-backed precision necessary to sustain massive operations. By silently orchestrating cross-border complexities, automated compliance, and capital routing in the background, we ensure your global strategy executes flawlessly. Backed by years of mastery, this is the definitive engine that powers your borderless growth.",
	},
	{
		id: "intelligence",
		title: "Intelligence",
		subtitle: "Stable Foresight",
		description: "Rockads is a global growth partner that comprehensively understands the requirements of the entire ecosystem and shapes its services accordingly. Our commercial foresight is built on years of hands-on experience, the deep learnings of a massive global business model, and the unique insights gained from our elite partnerships. We see the big picture and anticipate where the global market is heading. This high-level strategic awareness allows us to build an environment that keeps your business continuously ahead of tomorrow's shifts.",
	},
	{
		id: "partnership",
		title: "Partnership",
		subtitle: "Enduring Alignment",
		description: "Elite platform connections meet absolute client alignment. Our strength lies in official partnerships with platforms like Meta, Google, TikTok, X, and Snapchat, combined with a fierce commitment to our users. You get dedicated account management, strategic growth support, and a team that understands your business as deeply as you do. We succeed when you succeed — this fundamental alignment shapes every decision we make and every global strategy we execute.",
	},
];

function toggle(id: string) {
	activeId.value = activeId.value === id ? "" : id;
}

const SCROLL_PER_ITEM = 600;

function checkDesktop() {
	isDesktop.value = window.innerWidth >= 1024;
}

function calcScrollHeight() {
	if (!scrollWrapper.value || !isDesktop.value) return;
	const sectionEl = scrollWrapper.value.querySelector("section");
	if (!sectionEl) return;
	const sectionH = sectionEl.offsetHeight;
	scrollHeight.value = sectionH + SCROLL_PER_ITEM * pillars.length;
}

function onScroll() {
	if (!scrollWrapper.value || !isDesktop.value) return;

	const rect = scrollWrapper.value.getBoundingClientRect();
	const scrolled = -rect.top;

	if (scrolled < 0) {
		activeId.value = pillars[0].id;
		return;
	}

	const idx = Math.min(
		Math.floor(scrolled / SCROLL_PER_ITEM),
		pillars.length - 1,
	);
	activeId.value = pillars[idx].id;
}

onMounted(() => {
	checkDesktop();
	calcScrollHeight();
	window.addEventListener("scroll", onScroll, { passive: true });
	window.addEventListener("resize", () => {
		checkDesktop();
		calcScrollHeight();
	});
});

onUnmounted(() => {
	window.removeEventListener("scroll", onScroll);
	window.removeEventListener("resize", checkDesktop);
	window.removeEventListener("resize", calcScrollHeight);
});
</script>
