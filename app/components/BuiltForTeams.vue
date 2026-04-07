<template>
	<section class="relative bg-[#f7f9fb] overflow-hidden py-12 lg:py-20">
		<!-- Layer_7 topographic background -->
		<div class="absolute left-0 right-0 top-[285px] h-[589px] hidden md:flex items-center justify-center pointer-events-none">
			<div class="shrink-0 rotate-90">
				<img
					:src="topoLayer"
					alt=""
					class="w-[589px] h-[1440px] max-w-none"
				>
			</div>
		</div>

		<div class="relative max-w-[1440px] mx-auto px-5 md:px-10 lg:px-[160px]">
			<!-- Header -->
			<div class="flex flex-col items-center gap-4 lg:gap-6 mb-10 lg:mb-16">
				<span class="inline-flex items-center px-4 lg:px-6 py-2 lg:py-3 border border-primary-light rounded-rounded text-text-gray-light text-xs lg:text-sm font-medium tracking-[2.24px]">
					WHO WE SERVE
				</span>
				<h2 class="text-[32px] lg:text-[48px] font-medium leading-[40px] lg:leading-[56px] text-text-base text-center">
					Built for Ambitious <span class="text-primary">Teams</span>
				</h2>
			</div>

			<!-- Cards -->
			<div
				ref="cardsRef"
				class="flex flex-col md:flex-row gap-5 lg:gap-8 items-stretch md:items-end"
			>
				<div
					v-for="(card, i) in cards"
					:key="card.title"
					class="team-card group flex-1 rounded-2xl p-6 lg:p-12 md:h-[308px] flex flex-col gap-4 lg:gap-6 cursor-default bg-white border border-primary-light"
					:class="cardsVisible ? 'card-visible' : 'card-hidden'"
					:style="{ '--delay': (i * 150) + 'ms', '--line-color': card.lineColor }"
				>
					<!-- Color line -->
					<div class="team-card-line h-[5px] rounded-full shrink-0 w-[35px]" />

					<h3 class="team-card-title text-xl lg:text-2xl font-medium leading-7 lg:leading-8 text-text-base">
						{{ card.title }}
					</h3>

					<p class="text-base lg:text-lg font-normal leading-[24px] lg:leading-[26px] text-text-gray-light">
						{{ card.description }}
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const topoLayer = "/images/layer7-topo.svg";
const cardsRef = ref<HTMLElement | null>(null);
const cardsVisible = ref(false);

const cards = [
	{
		title: "E-Commerce Brands",
		description: "Scale without a ceiling. For founders and growth leads ready to move fast across global markets.",
		lineColor: "#1F71EA",
	},
	{
		title: "Digital Agencies",
		description: "One dashboard. Unlimited clients. Automate the operational layer so your team can focus entirely on strategy.",
		lineColor: "#F3CD02",
	},
	{
		title: "Enterprise & Performance Teams",
		description: "Infrastructure that never sleeps. Stability and compliance for mission-critical advertising operations.",
		lineColor: "#F9665A",
	},
];

let observer: IntersectionObserver | null = null;

onMounted(() => {
	if (!cardsRef.value) return;
	observer = new IntersectionObserver(
		(entries) => {
			if (entries[0]?.isIntersecting) {
				cardsVisible.value = true;
			}
		},
		{ threshold: 0.2 },
	);
	observer.observe(cardsRef.value);
});

onUnmounted(() => {
	observer?.disconnect();
});
</script>

<style scoped>
.card-hidden {
  opacity: 0;
  transform: translateY(32px);
}

.card-visible {
  opacity: 1;
  transform: translateY(0);
  animation: cardIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--delay, 0ms);
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.team-card {
  transition:
    background-color 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.45s ease,
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.35s ease;
}

.team-card:hover {
  background-color: #10151e;
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.team-card-line {
  background-color: var(--line-color);
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.team-card:hover .team-card-line {
  width: 100%;
}

.team-card-title {
  transition: color 0.4s ease;
}

.team-card:hover .team-card-title {
  color: #ffffff;
}
</style>
