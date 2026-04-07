<template>
	<section
		ref="heroRef"
		class="relative min-h-screen bg-gradient-to-b from-black to-[#02123e] overflow-hidden"
		@mousemove="onMouseMove"
	>
		<!-- Left decorative glass element -->
		<div
			class="hidden lg:flex absolute left-[-38.5%] top-[1%] w-[63vw] h-[111%] items-center justify-center will-change-transform"
			:style="glassLeftStyle"
		>
			<div class="rotate-[38.62deg]">
				<img
					:src="heroGlassSrc"
					alt=""
					class="w-[43vw] aspect-[622/667] object-cover pointer-events-none"
				>
			</div>
		</div>

		<!-- Right decorative glass element -->
		<div
			class="hidden lg:flex absolute right-[-22%] top-[11%] w-[44vw] h-[73%] items-center justify-center will-change-transform"
			:style="glassRightStyle"
		>
			<div class="shrink-0 -scale-y-100 rotate-[98.45deg]">
				<img
					:src="heroGlassSrc"
					alt=""
					class="w-[36vw] aspect-[521/558] object-cover pointer-events-none"
				>
			</div>
		</div>

		<!-- Hero content -->
		<div class="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 lg:pt-[100px] pb-28 lg:pb-[133px] px-6 lg:px-0">
			<div class="flex flex-col items-center gap-8 lg:gap-10 max-w-[761px] text-center">
				<div class="flex flex-col items-center gap-6">
					<!-- Badge -->
					<div
						class="hero-fade bg-[rgba(0,124,225,0.24)] px-3 py-2 rounded-rounded"
						style="--d:0ms"
					>
						<span class="text-white text-sm">
							Stable. <em class="italic">Enduring</em>. Limitless.
						</span>
					</div>

					<!-- Main heading -->
					<div class="flex flex-col items-center gap-4">
						<h1
							class="hero-fade text-[40px] md:text-[56px] lg:text-[80px] font-extrabold leading-[1.14] text-primary-200"
							style="--d:120ms"
						>
							Grow without limits.
						</h1>
						<div class="max-w-[709px]">
							<p
								class="hero-fade text-white text-base lg:text-xl font-medium leading-[26px] lg:leading-[28px]"
								style="--d:240ms"
							>
								Rockads is a cross-border business accelerator; the stable, intelligent, scalable
								ground upon which the world's fastest-growing brands and entrepreneurs
								build their global operations.
							</p>
							<p
								class="hero-fade text-text-gray-dark text-base lg:text-xl font-medium leading-[26px] lg:leading-[28px] mt-4"
								style="--d:360ms"
							>
								A global growth partner and a next-generation full-stack platform.
							</p>
						</div>
					</div>
				</div>

				<!-- CTA Button -->
				<button
					class="hero-fade flex items-center justify-center gap-2 bg-primary text-white font-medium text-base px-4 py-4 rounded-lg w-[200px] h-[56px] hover:bg-primary-600 transition-colors"
					style="--d:480ms"
				>
					<img
						:src="calendarIcon"
						alt=""
						class="w-5 h-5"
					>
					Book a Call
				</button>
			</div>
		</div>

		<!-- Platform partners -->
		<div class="absolute bottom-0 left-0 right-0 py-8">
			<div class="flex flex-col items-center gap-[21px]">
				<span
					class="hero-fade text-white text-xs font-medium tracking-[2.24px]"
					style="--d:600ms"
				>OFFICIAL PLATFORM PARTNERS</span>
				<div class="flex items-center gap-6">
					<img
						v-for="(partner, i) in partners"
						:key="partner.name"
						:src="partner.src"
						:alt="partner.name"
						class="hero-fade w-8 h-8"
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
