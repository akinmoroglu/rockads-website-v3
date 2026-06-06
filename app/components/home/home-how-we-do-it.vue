<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Motion } from "motion-v";

const pillars = [
	{
		id: "partnership",
		title: "Partnership",
		heading: "Direct access. Priority support. A seat at the table.",
		text: "Our partnerships with Meta, TikTok, Google, Snapchat, and X go back years. Built through volume, consistency, and operating at a scale that only comes with years of operating at this level."
	},
	{
		id: "know-how",
		title: "Know-How",
		heading: "Firsthand experience.",
		text: "We've been through every platform update, every market shift, every industry change. That experience drives how we build, how we advise, and how we make sure our partners are never caught off guard."
	},
	{
		id: "technology",
		title: "Technology",
		heading: "Faster decisions, cleaner execution, full visibility.",
		text: "Everything runs through one place. A fully centralized, AI-supported system designed from the ground up around how multi-platform advertising actually works at scale. All in one place."
	},
	{
		id: "finance",
		title: "Finance",
		heading: "A global financial network.",
		text: "We've run large budgets across global markets long enough to know where payments break down. Multiple payment options and the infrastructure to keep campaigns live without interruption."
	}
];

const activeIndex = ref(0);
let cycleTimer: ReturnType<typeof setInterval> | null = null;
const isHovering = ref(false);

function startCycle() {
	if (cycleTimer) clearInterval(cycleTimer);
	cycleTimer = setInterval(() => {
		if (!isHovering.value) {
			activeIndex.value = (activeIndex.value + 1) % pillars.length;
		}
	}, 5500);
}

function setActive(index: number) {
	activeIndex.value = index;
}

onMounted(() => {
	startCycle();
});

onUnmounted(() => {
	if (cycleTimer) clearInterval(cycleTimer);
});
</script>

<template>
	<section class="flex flex-col justify-center bg-surface-cream py-24 lg:min-h-[85vh] lg:py-32">
		<div class="mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-12 xl:px-[160px]">

			<!-- Header -->
			<div class="mb-12 lg:mb-20">
				<Motion
					as="div"
					class="max-w-[720px]"
					:initial="{ opacity: 0, y: 14 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:in-view-options="{ once: true, amount: 0.4 }"
					:transition="{ duration: 0.5, ease: 'easeOut' }"
				>
					<h2 class="text-[32px] font-medium leading-[1.15] tracking-tight text-foreground md:text-[40px] lg:text-[48px]">
						Everything that runs in the background, runs for you.
					</h2>
				</Motion>
			</div>

			<!-- Interactive Editorial Grid -->
			<div 
				class="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24"
				@mouseenter="isHovering = true"
				@mouseleave="isHovering = false"
			>
				
				<!-- Left: The Naked Index -->
				<div class="flex flex-row overflow-x-auto whitespace-nowrap pb-4 scrollbar-hide lg:flex-col lg:justify-center lg:space-y-10 lg:overflow-visible lg:whitespace-normal lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
					<button
						v-for="(pillar, index) in pillars"
						:key="pillar.id"
						class="group mr-8 flex shrink-0 items-center text-left focus:outline-none lg:mr-0 lg:w-full lg:shrink"
						@mouseenter="setActive(index)"
						@click="setActive(index)"
					>
						<!-- Minimal indicator dot (Desktop Only) -->
						<div 
							class="mr-4 hidden size-2 shrink-0 rounded-full bg-foreground transition-all duration-500 ease-out lg:block lg:mr-6"
							:class="activeIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-0'"
						></div>
						
						<h3 
							class="text-[24px] font-medium tracking-tight transition-all duration-500 ease-out md:text-[32px] lg:text-[40px]"
							:class="activeIndex === index ? 'text-foreground lg:translate-x-0' : 'text-foreground/20 group-hover:text-foreground/40 lg:-translate-x-8'"
						>
							{{ pillar.title }}
						</h3>
					</button>
				</div>

				<!-- Right: The Naked Reveal -->
				<div class="relative flex min-h-[220px] flex-col justify-center lg:min-h-[260px]">
					<Transition name="fade-slide" mode="out-in">
						<div :key="activeIndex" class="relative w-full">
							<div class="relative z-10">
								<h4 class="text-[24px] font-medium leading-[1.2] tracking-tight text-foreground md:text-[28px] lg:text-[36px]">
									{{ pillars[activeIndex].heading }}
								</h4>
								<div class="mt-4 lg:mt-6">
									<p class="max-w-[480px] text-[16px] leading-[1.8] text-foreground/60 lg:text-[18px]">
										{{ pillars[activeIndex].text }}
									</p>
								</div>
							</div>
						</div>
					</Transition>
				</div>

			</div>
		</div>
	</section>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
	transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter-from {
	opacity: 0;
	transform: translateY(15px);
}

.fade-slide-leave-to {
	opacity: 0;
	transform: translateY(-15px);
}
</style>
