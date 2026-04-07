<script setup lang="ts">
import { Bolt, Plus, X } from "lucide-vue-next";
import { Motion } from "motion-v";
import { nextTick, ref } from "vue";
import pillarsLineAsset from "@/assets/images/home/pillars/line.svg?url";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	ScrollSpy,
	ScrollSpyLink,
	ScrollSpySection,
	ScrollSpyViewport,
} from "@/components/ui/scroll-spy";

const activeSection = ref("growth-engine");

const STEPS = [
	{ value: "growth-engine", num: "01" },
	{ value: "intelligence", num: "02" },
	{ value: "partnership", num: "03" },
] as const;

function onAccordionUpdate(value: string | string[] | undefined) {
	const next
		= Array.isArray(value) ? (value[0] ?? "growth-engine") : (value ?? "growth-engine");
	if (next === activeSection.value) {
		return;
	}
	activeSection.value = next;
	void nextTick(() => {
		document.getElementById(next)?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	});
}
</script>

<template>
	<section class="pillars-section relative overflow-x-hidden bg-(--pillars-bg) py-20 lg:py-28">
		<img
			:src="pillarsLineAsset"
			alt=""
			aria-hidden="true"
			class="pointer-events-none absolute left-1/2 top-0 z-0 h-auto w-full max-w-(--pillars-line-max-width) -translate-x-1/2 opacity-(--pillars-line-opacity)"
		>

		<div
			class="relative z-10 mx-auto grid w-full min-w-0 max-w-[1240px] gap-12 px-5 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:items-start lg:gap-16 lg:px-12"
		>
			<ScrollSpy
				v-model:value="activeSection"
				class="contents"
				:offset="96"
				default-value="growth-engine"
				orientation="horizontal"
			>
				<Motion
					as="div"
					class="flex min-w-0 max-w-full flex-col gap-8 pt-4 lg:sticky lg:top-24 lg:col-start-1 lg:gap-10 lg:pt-7"
					:initial="{ opacity: 0, x: -20 }"
					:while-in-view="{ opacity: 1, x: 0 }"
					:in-view-options="{ once: false, amount: 0.35 }"
					:transition="{ duration: 0.65, ease: 'easeOut' }"
				>
					<div class="flex flex-col gap-7 lg:gap-8">
						<span
							class="inline-flex w-fit rounded-full border border-(--pillars-label-border) px-6 py-3 text-xs font-medium tracking-[0.16em] text-(--pillars-label-text)"
						>
							CORE PILLARS
						</span>
						<h2 class="text-4xl leading-[1.15] font-medium text-(--pillars-heading) sm:text-[48px] sm:leading-[56px]">
							The Three Pillars
							<span class="text-primary">of Rockads</span>
						</h2>
					</div>

					<nav
						aria-label="Pillar sections"
						class="flex flex-col gap-6"
					>
						<ScrollSpyLink
							v-for="step in STEPS"
							:key="step.value"
							:value="step.value"
							class="flex w-full max-w-none items-center gap-4 rounded-none px-0 py-0 text-left opacity-80 transition-opacity hover:bg-transparent hover:opacity-100 hover:text-inherit data-[state=active]:bg-transparent data-[state=active]:opacity-100 data-[state=active]:text-inherit"
						>
							<span
								class="w-8 shrink-0 font-medium tabular-nums text-(--pillars-step-num) hover:text-(--pillars-heading)"
								:class="activeSection === step.value ? 'text-primary' : ''"
							>
								{{ step.num }}
							</span>
							<span
								class="h-0.5 shrink-0 rounded-full transition-all duration-300"
								:class="
									activeSection === step.value
										? 'w-14 bg-primary'
										: 'w-6 bg-(--pillars-step-line-idle)'
								"
								aria-hidden="true"
							/>
						</ScrollSpyLink>
					</nav>
				</Motion>

				<ScrollSpyViewport class="min-w-0 max-w-full lg:col-start-2">
					<Motion
						as="div"
						class="flex min-w-0 max-w-full flex-col gap-4"
						:initial="{ opacity: 0, y: 22 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:in-view-options="{ once: false, amount: 0.25 }"
						:transition="{ duration: 0.7, delay: 0.06, ease: 'easeOut' }"
					>
						<Accordion
							:model-value="activeSection"
							type="single"
							class="flex min-w-0 max-w-full flex-col gap-4"
							@update:model-value="onAccordionUpdate"
						>
							<!-- 01 Growth Engine -->
							<ScrollSpySection
								value="growth-engine"
								class="scroll-mt-28 min-w-0 max-w-full"
							>
								<AccordionItem
									value="growth-engine"
									class="group w-full max-w-full overflow-hidden rounded-2xl border border-(--pillars-card-border) border-b-0! bg-(--pillars-card-bg) shadow-sm transition-colors last:border-b-0! data-[state=open]:border-(--pillars-expanded-bg) data-[state=open]:bg-(--pillars-expanded-bg) data-[state=open]:shadow-lg"
								>
									<AccordionTrigger
										class="items-center px-6 py-6 hover:no-underline focus-visible:ring-offset-(--pillars-bg) [&>svg]:hidden"
									>
										<template #icon>
											<span class="sr-only">Toggle Growth Engine</span>
										</template>
										<div class="flex w-full min-w-0 items-start justify-between gap-4">
											<div class="flex flex-1 flex-col gap-3 text-left sm:flex-row sm:items-start sm:gap-8">
												<span
													class="text-xs font-medium tracking-widest text-(--pillars-subtext) group-data-[state=open]:text-white/50"
												>
													01
												</span>
												<div class="min-w-0 space-y-2">
													<h3
														class="font-serif text-3xl italic text-primary group-data-[state=open]:text-(--pillars-expanded-title)"
													>
														Growth Engine
													</h3>
													<p
														class="text-xs font-medium tracking-[0.12em] text-(--pillars-subtext) uppercase group-data-[state=open]:text-white/60"
													>
														Limitless Scale
													</p>
												</div>
											</div>
											<span
												class="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary transition-colors group-data-[state=open]:border-white/40 group-data-[state=open]:text-white"
												aria-hidden="true"
											>
												<Plus class="size-5 group-data-[state=open]:hidden" />
												<X class="hidden size-5 group-data-[state=open]:block" />
											</span>
										</div>
									</AccordionTrigger>
									<AccordionContent class="px-6 pb-6 pt-0!">
										<div class="space-y-6 wrap-break-word border-t border-white/10 pt-6 text-base leading-relaxed text-white/90">
											<p>
												Scaling across borders is an operational and financial challenge. True global scale requires a frictionless
												ecosystem. We deliver the complete financial architecture, enterprise-grade resilience, and AI-backed precision
												necessary to sustain massive operations.
											</p>
											<div class="relative rounded-xl bg-black/25 px-5 py-6 pl-6">
												<div class="absolute inset-y-3 left-0 w-1 rounded-full bg-primary" />
												<div class="space-y-4 pl-2">
													<Bolt class="size-7 stroke-[1.8] text-white" />
													<p class="max-w-xl text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
														This means you can instantly expand into any market you want, without operational barriers.
													</p>
												</div>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							</ScrollSpySection>

							<!-- 02 Intelligence -->
							<ScrollSpySection
								value="intelligence"
								class="scroll-mt-28 min-w-0 max-w-full"
							>
								<AccordionItem
									value="intelligence"
									class="group w-full max-w-full overflow-hidden rounded-2xl border border-(--pillars-card-border) border-b-0! bg-(--pillars-card-bg) shadow-sm transition-colors last:border-b-0! data-[state=open]:border-(--pillars-expanded-bg) data-[state=open]:bg-(--pillars-expanded-bg) data-[state=open]:shadow-lg"
								>
									<AccordionTrigger
										class="items-center px-6 py-6 hover:no-underline focus-visible:ring-offset-(--pillars-bg) [&>svg]:hidden"
									>
										<template #icon>
											<span class="sr-only">Toggle Intelligence</span>
										</template>
										<div class="flex w-full min-w-0 items-start justify-between gap-4">
											<div class="flex flex-1 flex-col gap-3 text-left sm:flex-row sm:items-start sm:gap-8">
												<span
													class="text-xs font-medium tracking-widest text-(--pillars-subtext) group-data-[state=open]:text-white/50"
												>
													02
												</span>
												<div class="min-w-0 space-y-2">
													<h3
														class="font-serif text-3xl italic text-primary group-data-[state=open]:text-(--pillars-expanded-title)"
													>
														Intelligence
													</h3>
													<p
														class="text-xs font-medium tracking-[0.12em] text-(--pillars-subtext) uppercase group-data-[state=open]:text-white/60"
													>
														Stable Foresight
													</p>
												</div>
											</div>
											<span
												class="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary transition-colors group-data-[state=open]:border-white/40 group-data-[state=open]:text-white"
												aria-hidden="true"
											>
												<Plus class="size-5 group-data-[state=open]:hidden" />
												<X class="hidden size-5 group-data-[state=open]:block" />
											</span>
										</div>
									</AccordionTrigger>
									<AccordionContent class="px-6 pb-6 pt-0!">
										<div class="space-y-4 wrap-break-word border-t border-white/10 pt-6 text-base leading-relaxed text-white/90">
											<p>
												Signals from every channel converge into one operational picture. Predictive models and live benchmarks
												surface risk and opportunity before they hit your margins—so decisions stay ahead of the market, not behind it.
											</p>
										</div>
									</AccordionContent>
								</AccordionItem>
							</ScrollSpySection>

							<!-- 03 Partnership -->
							<ScrollSpySection
								value="partnership"
								class="scroll-mt-28 min-w-0 max-w-full"
							>
								<AccordionItem
									value="partnership"
									class="group w-full max-w-full overflow-hidden rounded-2xl border border-(--pillars-card-border) border-b-0! bg-(--pillars-card-bg) shadow-sm transition-colors last:border-b-0! data-[state=open]:border-(--pillars-expanded-bg) data-[state=open]:bg-(--pillars-expanded-bg) data-[state=open]:shadow-lg"
								>
									<AccordionTrigger
										class="items-center px-6 py-6 hover:no-underline focus-visible:ring-offset-(--pillars-bg) [&>svg]:hidden"
									>
										<template #icon>
											<span class="sr-only">Toggle Partnership</span>
										</template>
										<div class="flex w-full min-w-0 items-start justify-between gap-4">
											<div class="flex flex-1 flex-col gap-3 text-left sm:flex-row sm:items-start sm:gap-8">
												<span
													class="text-xs font-medium tracking-widest text-(--pillars-subtext) group-data-[state=open]:text-white/50"
												>
													03
												</span>
												<div class="min-w-0 space-y-2">
													<h3
														class="font-serif text-3xl italic text-primary group-data-[state=open]:text-(--pillars-expanded-title)"
													>
														Partnership
													</h3>
													<p
														class="text-xs font-medium tracking-[0.12em] text-(--pillars-subtext) uppercase group-data-[state=open]:text-white/60"
													>
														Enduring Alignment
													</p>
												</div>
											</div>
											<span
												class="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary transition-colors group-data-[state=open]:border-white/40 group-data-[state=open]:text-white"
												aria-hidden="true"
											>
												<Plus class="size-5 group-data-[state=open]:hidden" />
												<X class="hidden size-5 group-data-[state=open]:block" />
											</span>
										</div>
									</AccordionTrigger>
									<AccordionContent class="px-6 pb-6 pt-0!">
										<div class="space-y-4 wrap-break-word border-t border-white/10 pt-6 text-base leading-relaxed text-white/90">
											<p>
												Elite platform connections meet absolute client alignment. Our strength lies in official partnerships with
												platforms like <span class="font-semibold text-white">Meta, Google, TikTok, X, and Snapchat</span>, combined with a fierce
												commitment to our users. You get dedicated account management, strategic growth support, and a team that
												understands your business as deeply as you do.
											</p>
										</div>
									</AccordionContent>
								</AccordionItem>
							</ScrollSpySection>
						</Accordion>
					</Motion>
				</ScrollSpyViewport>
			</ScrollSpy>
		</div>
	</section>
</template>

<style scoped>
.pillars-section {
	--pillars-bg: #fef8f1;
	--pillars-line-max-width: 1440px;
	--pillars-line-opacity: 0.8;
	--pillars-label-border: #f6e3c0;
	--pillars-label-text: #705e00;
	--pillars-card-border: #f9e9cc;
	--pillars-card-bg: #ffffff;
	--pillars-heading: #151b26;
	--pillars-subtext: #747a8e;
	--pillars-body: #151b26;
	--pillars-expanded-bg: #0e1627;
	--pillars-expanded-title: #9ec9ff;
	--pillars-step-num: #9ca3af;
	--pillars-step-line-idle: #d4c4a8;
}
</style>
