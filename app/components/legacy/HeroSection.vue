<template>
	<section
		ref="heroRef"
		class="relative min-h-screen overflow-hidden bg-gradient-to-b from-black to-[#02123e]"
		@mousemove="onMouseMove"
	>
		<!-- Left decorative glass element -->
		<div
			class="absolute top-[1%] left-[-38.5%] hidden h-[111%] w-[63vw] items-center justify-center will-change-transform lg:flex"
			:style="glassLeftStyle"
		>
			<div class="rotate-[38.62deg]">
				<img
					:src="heroGlassSrc"
					alt=""
					class="pointer-events-none aspect-[622/667] w-[43vw] object-cover"
				>
			</div>
		</div>

		<!-- Right decorative glass element -->
		<div
			class="absolute top-[11%] right-[-22%] hidden h-[73%] w-[44vw] items-center justify-center will-change-transform lg:flex"
			:style="glassRightStyle"
		>
			<div class="shrink-0 -scale-y-100 rotate-[98.45deg]">
				<img
					:src="heroGlassSrc"
					alt=""
					class="pointer-events-none aspect-[521/558] w-[36vw] object-cover"
				>
			</div>
		</div>

		<!-- Hero content -->
		<div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-28 lg:px-0 lg:pt-[100px] lg:pb-[133px]">
			<div class="flex max-w-[761px] flex-col items-center gap-8 text-center lg:gap-10">
				<div class="flex flex-col items-center gap-6">
					<!-- Badge -->
					<div
						class="hero-fade rounded-rounded bg-[rgba(0,124,225,0.24)] px-3 py-2"
						style="--d:0ms"
					>
						<span class="text-sm text-white">
							Stable. <em class="italic">Enduring</em>. Limitless.
						</span>
					</div>

					<!-- Main heading -->
					<div class="flex flex-col items-center gap-4">
						<h1
							class="hero-fade text-primary-200 text-[40px] leading-[1.14] font-extrabold md:text-[56px] lg:text-[80px]"
							style="--d:120ms"
						>
							Grow without limits.
						</h1>
						<div class="max-w-[709px]">
							<p
								class="hero-fade text-base leading-[26px] font-medium text-white lg:text-xl lg:leading-[28px]"
								style="--d:240ms"
							>
								Rockads is a cross-border business accelerator; the stable, intelligent, scalable
								ground upon which the world's fastest-growing brands and entrepreneurs
								build their global operations.
							</p>
							<p
								class="hero-fade text-text-gray-dark mt-4 text-base leading-[26px] font-medium lg:text-xl lg:leading-[28px]"
								style="--d:360ms"
							>
								A global growth partner and a next-generation full-stack platform.
							</p>
						</div>
					</div>
				</div>

				<!-- CTA Button -->
				<button
					class="hero-fade hover:bg-primary-600 flex h-[56px] w-[200px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-4 text-base font-medium text-white transition-colors"
					style="--d:480ms"
				>
					<img
						:src="calendarIcon"
						alt=""
						class="h-5 w-5"
					>
					Book a Call
				</button>
			</div>
		</div>

		<!-- Platform partners -->
		<div class="absolute right-0 bottom-0 left-0 py-8">
			<div class="flex flex-col items-center gap-[21px]">
				<span
					class="hero-fade text-xs font-medium tracking-[2.24px] text-white"
					style="--d:600ms"
				>OFFICIAL PLATFORM PARTNERS</span>
				<div class="flex items-center gap-6">
					<img
						v-for="(partner, i) in partners"
						:key="partner.name"
						:src="partner.src"
						:alt="partner.name"
						class="hero-fade h-8 w-8"
						:style="{ '--d': (700 + i * 80) + 'ms' }"
					>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const heroGlassSrc = "/images/hero-glass.png";
const calendarIcon = "/images/icons/calendar.svg";

const partners = [
	{ name: "X", src: "/images/partners/x-twitter.svg" },
	{ name: "Snapchat", src: "/images/partners/snapchat.svg" },
	{ name: "TikTok", src: "/images/partners/tiktok.svg" },
	{ name: "Google", src: "/images/partners/google.svg" },
	{ name: "Meta", src: "/images/partners/meta.svg" },
];

const heroRef = ref<HTMLElement | null>(null);
const parallaxX = ref(0);
const parallaxY = ref(0);
let rafPending = false;

function onMouseMove(e: MouseEvent) {
	if (!heroRef.value || rafPending) return;
	rafPending = true;
	requestAnimationFrame(() => {
		const rect = heroRef.value!.getBoundingClientRect();
		const cx = (e.clientX - rect.left) / rect.width - 0.5;
		const cy = (e.clientY - rect.top) / rect.height - 0.5;
		parallaxX.value = cx;
		parallaxY.value = cy;
		rafPending = false;
	});
}

const DRIFT = 12;

const glassLeftStyle = computed(() => ({
	transform: `translate(${parallaxX.value * -DRIFT}px, ${parallaxY.value * -DRIFT}px)`,
	transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
}));

const glassRightStyle = computed(() => ({
	transform: `translate(${parallaxX.value * DRIFT}px, ${parallaxY.value * DRIFT}px)`,
	transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
}));
</script>

<style scoped>
.hero-fade {
  animation: heroIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--d, 0ms);
}

@keyframes heroIn {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
