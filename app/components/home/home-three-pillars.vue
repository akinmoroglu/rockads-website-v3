<script setup lang="ts">
import pillarsDecorativeFrameAsset from "@/assets/images/home/pillars/line.svg?url";

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
		const first = pillars[0];

		if (first) activeId.value = first.id;

		return;
	}

	const idx = Math.min(
		Math.floor(scrolled / SCROLL_PER_ITEM),
		pillars.length - 1,
	);
	const current = pillars[idx];

	if (current) activeId.value = current.id;
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

<template>
	<!-- Outer scroll-space wrapper (desktop only) -->
	<div
		ref="scrollWrapper"
		class="relative"
		:style="{ height: isDesktop ? scrollHeight + 'px' : 'auto' }"
	>
		<section
			class="relative overflow-hidden bg-surface-cream"
			:class="isDesktop ? 'sticky top-0 min-h-screen' : ''"
		>
			<!-- Decorative lines background -->
			<div class="absolute inset-0 overflow-hidden rounded-3xl border border-border">
				<img
					:src="pillarsDecorativeFrameAsset"
					class="h-full w-full object-cover"
				>
			</div>

			<div class="relative mx-auto max-w-[1440px] px-5 py-16 md:px-10 lg:px-[160px] lg:py-[117px]">
				<div class="flex flex-col gap-8 lg:flex-row lg:gap-[42px]">
					<!-- Left column -->
					<div class="flex shrink-0 flex-col gap-6 lg:w-[447px] lg:gap-8">
						<span class="inline-flex items-center self-start rounded-full border border-border px-4 py-2 text-xs font-medium tracking-[2.24px] text-primary lg:px-6 lg:py-3 lg:text-sm">
							CORE PILLARS
						</span>
						<h2 class="text-[32px] leading-[40px] font-medium text-foreground lg:text-[48px] lg:leading-[56px]">
							The Three Pillars <span class="text-primary">of Rockads</span>
						</h2>

						<!-- Scroll progress indicator (desktop) -->
						<div
							v-if="isDesktop"
							class="mt-4 hidden flex-col gap-2 lg:flex"
						>
							<div
								v-for="(pillar, i) in pillars"
								:key="pillar.id"
								class="flex items-center gap-3"
							>
								<div
									class="h-[3px] rounded-full transition-all duration-500"
									:class="activeId === pillar.id ? 'w-8 bg-primary' : 'w-4 bg-muted-foreground/25'"
								/>
								<span
									class="text-xs font-medium transition-colors duration-300"
									:class="activeId === pillar.id ? 'text-primary' : 'text-muted-foreground'"
								>
									{{ String(i + 1).padStart(2, '0') }}
								</span>
							</div>
						</div>
					</div>

					<!-- Right column - accordion -->
					<div class="flex flex-1 flex-col">
						<div
							v-for="(pillar, index) in pillars"
							:key="pillar.id"
							class="rounded-2xl transition-colors duration-300"
							:class="activeId === pillar.id ? 'bg-foreground' : 'bg-transparent'"
						>
							<!-- Header (always visible) -->
							<button
								class="group w-full px-6 text-left transition-all duration-300 lg:px-10"
								:class="activeId === pillar.id ? 'pt-8 lg:pt-10 pb-4' : 'py-8 lg:py-10'"
								@click="toggle(pillar.id)"
							>
								<div class="flex items-start justify-between gap-4">
									<div class="flex flex-col gap-2">
										<span
											class="text-xs font-medium transition-colors duration-300"
											:class="activeId === pillar.id ? 'text-background/40' : 'text-muted-foreground'"
										>
											{{ String(index + 1).padStart(2, '0') }}
										</span>
										<h3 class="font-accent text-[28px] leading-[1.15] text-primary italic transition-colors duration-300 md:text-[32px] lg:text-[40px]">
											{{ pillar.title }}
										</h3>
										<span
											class="text-xs font-medium transition-colors duration-300"
											:class="activeId === pillar.id ? 'text-background/50' : 'text-muted-foreground'"
										>
											{{ pillar.subtitle }}
										</span>
									</div>

									<!-- Toggle icon -->
									<div
										class="mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300"
										:class="activeId === pillar.id ? 'border-background/20' : 'border-border'"
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
											class="text-foreground"
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
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											class="text-background"
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
									<div class="px-6 pb-8 lg:px-10 lg:pb-10">
										<p class="text-sm leading-[22px] text-background/70 md:text-base md:leading-[26px]">
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
