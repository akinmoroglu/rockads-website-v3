<script setup lang="ts">
import { Button } from "@/components/ui/button";
import techAutomationPath from "@/assets/images/services/tech/ad-automation.svg?url";
import techMetaPath from "@/assets/images/services/tech/meta.svg?url";
import techGooglePath from "@/assets/images/services/tech/google.svg?url";
import techTikTokPath from "@/assets/images/services/tech/tiktok.svg?url";
import techXPath from "@/assets/images/services/tech/x-twitter.svg?url";
import techSnapchatPath from "@/assets/images/services/tech/snapchat.svg?url";
import ComplianceAiAnimated from "@/components/icons/animated/compliance-ai-animated.vue";
import aiCreativeStudioPath from "@/assets/images/services/tech/ai-creative-studio.svg?url";

useHead({
	title: "Tech Services - Rockads",
});

const gtmEvent = useGtmEvent();

onMounted(() => {
	gtmEvent.pageViewEvent("Tech Services - Rockads");
});

const PRODUCTS = [
	{ 
		id: "creative-studio", 
		action: "Generate",
		name: "AI Creative Studio", 
		h: "Creatives that perform. At any <em>scale.</em>",
		lead: "Generate, iterate and optimize ad creatives with AI powered by live performance — from product feed to multi-format output.",
		chips: ["Feed-to-creative", "Automated localization", "Brand consistency"] 
	},
	{ 
		id: "compliance-ai", 
		action: "Verify",
		name: "Compliance AI", 
		h: "Stay compliant. Stay <em>live.</em>",
		lead: "Continuously monitor campaigns, creatives and account health. Catch policy risk before it ever takes you offline.",
		chips: ["Pre-publish scanning", "Real-time risk monitoring", "Cross-border intelligence"] 
	},
	{ 
		id: "ad-launcher", 
		action: "Deploy",
		name: "Ad Launcher", 
		h: "One launch. Every <em>platform.</em>",
		lead: "Build once, customize per market, deploy across Meta, Google, TikTok, Snapchat & X — simultaneously.",
		chips: ["Unified builder", "Per-market variants", "Instant multi-platform deploy"],
		platforms: true 
	},
	{ 
		id: "automation", 
		action: "Optimize",
		name: "Automation", 
		h: "Your operations, on <em>autopilot.</em>",
		lead: "Eliminate manual bottlenecks across campaign management, budget allocation and optimization — running on every platform.",
		chips: ["Rule-based actions", "Smart budget shifts", "Scheduled operations"] 
	},
];

const PLAT = [
	{ name: "meta", src: techMetaPath },
	{ name: "google", src: techGooglePath },
	{ name: "tiktok", src: techTikTokPath },
	{ name: "snapchat", src: techSnapchatPath },
	{ name: "x-twitter", src: techXPath },
];

const LOOP = [
	{ action: "Generate", h: "AI Creative Studio", p: "Builds creatives from your feed & brand assets." },
	{ action: "Verify", h: "Compliance AI", p: "Scans every creative & config before launch." },
	{ action: "Deploy", h: "Ad Launcher", p: "Ships compliant campaigns across all platforms." },
	{ action: "Optimize", h: "Automation", p: "Reallocates budget; data feeds back into Studio." },
];

const RD_ICONS: Record<string, string> = {
	"check": '<path d="M20 6 9 17l-5-5"/>',
	"chevron-right": '<path d="m9 18 6-6-6-6"/>',
	"arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
};
</script>

<template>
	<div class="font-display page-wrapper">
		<TheHeader />

		<!-- Hero -->
		<section class="te-hero">
			<div class="te-hero__grid" />
			<div class="rd-wrap te-hero__inner">
				<span class="rd-kicker rd-kicker--light">Tech Services</span>
				<h1>The operating system for ad-ops at <em>scale.</em></h1>
				<p class="te-hero__sub">Campaign deployment, automated optimization, real-time policy monitoring and creative generation — unified into a single intelligence layer.</p>
				<div class="te-hero__cta">
					<Button as-child>
						<NuxtLink to="/register" class="px-6 py-3 bg-primary hover:bg-primary-600 text-white font-medium rounded-control transition-all duration-200 inline-flex items-center gap-2">
							Get Started in Minutes
							<svg class="lucide" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" v-html="RD_ICONS['arrow-right']"></svg>
						</NuxtLink>
					</Button>
					<Button as-child variant="outline" class="rd-btn--ghost-light">
						<NuxtLink to="/contact-us" class="px-6 py-3 border border-white/30 text-white hover:bg-white/10 font-medium rounded-control transition-all duration-200 inline-flex items-center gap-2">
							Book a Demo
						</NuxtLink>
					</Button>
				</div>
			</div>
		</section>

		<!-- Showcase Bands -->
		<div 
			v-for="(p, i) in PRODUCTS" 
			:id="p.id"
			:key="p.id"
		>
			<section class="te-show">
				<div class="te-show__glow" />
				<div class="rd-wrap te-band" :class="{ 'te-band--rev': i % 2 === 1 }">
					<div v-reveal="{ amount: 0.14 }" class="reveal">
						<div class="te-idx">
							<span class="te-idx__n">{{ String(i + 1).padStart(2, '0') }} / 04 · {{ p.action }}</span>
						</div>
						<h2 v-html="p.h" />
						<p class="te-band__lead">{{ p.lead }}</p>
						<div class="te-chips">
							<span 
								v-for="c in p.chips" 
								:key="c" 
								class="te-chip"
							>
								<svg class="lucide" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" v-html="RD_ICONS['check']"></svg>
								{{ c }}
							</span>
						</div>
						<div v-if="p.platforms" class="te-platrow">
							<div
								v-for="plat in PLAT"
								:key="plat.name"
								class="transition-all duration-300 filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
							>
								<img :src="plat.src" :alt="plat.name" class="w-[26px] h-[26px] inline-block" />
							</div>
						</div>
					</div>
					<div v-reveal="{ amount: 0.14 }" class="te-band__media reveal">
						<!-- Custom .te-frame browser mockup chrome for Ad Launcher & Compliance AI -->
						<div v-if="p.id === 'ad-launcher' || p.id === 'compliance-ai'" class="te-frame">
							<div class="te-frame__bar">
								<span class="te-frame__dot" style="background:#ff5f57" />
								<span class="te-frame__dot" style="background:#febc2e" />
								<span class="te-frame__dot" style="background:#28c840" />
								<span class="te-frame__tag">{{ p.name }} — live console</span>
							</div>
							
							<div v-if="p.id === 'ad-launcher'" class="w-full aspect-[16/10] bg-[#0c1424] flex flex-col justify-center items-center p-6 text-center text-white/50 relative overflow-hidden">
								<div class="relative z-10 flex flex-col items-center gap-4">
									<div class="size-16 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/40 animate-pulse">
										<svg class="lucide" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" v-html="RD_ICONS['rocket']"></svg>
									</div>
									<div class="flex flex-col gap-1">
										<div class="text-sm font-semibold text-white/80">Launching campaigns...</div>
										<div class="text-xs text-white/40">Multi-platform dispatch active</div>
									</div>
									<div class="flex gap-2 items-center mt-2">
										<span v-for="plat in PLAT" :key="plat.name" class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
											<img :src="plat.src" :alt="plat.name" class="w-4 h-4 filter brightness-100 opacity-80" />
										</span>
									</div>
								</div>
								<!-- Background subtle grid -->
								<div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
							</div>

							<div v-else-if="p.id === 'compliance-ai'" class="w-full aspect-[16/10] bg-[#0c1424] flex items-center justify-center p-8">
								<ComplianceAiAnimated />
							</div>
						</div>

						<!-- Automation and AI Creative Studio feature embedded browser frames, render them directly -->
						<div v-else-if="p.id === 'automation'" class="w-full">
							<img :src="techAutomationPath" alt="Automation Console" class="w-full h-auto rounded-2xl border border-white/10 shadow-2xl" />
						</div>

						<div v-else-if="p.id === 'creative-studio'" class="w-full">
							<img :src="aiCreativeStudioPath" alt="AI Creative Studio" class="w-full h-auto rounded-2xl border border-white/10 shadow-2xl" />
						</div>
					</div>
				</div>
			</section>
		</div>

		<!-- Loop -->
		<section class="rd-sec te-loop">
			<div class="rd-wrap">
				<div v-reveal="{ amount: 0.14 }" class="rd-sec__head reveal" style="max-width:720px">
					<span class="rd-kicker rd-kicker--light">How it works together</span>
					<h2 class="rd-h2" style="color:#fff">Four products. One closed <em>loop.</em></h2>
				</div>
				<div class="te-loop__grid">
					<div 
						v-for="(s, index) in LOOP" 
						:key="s.h"
						v-reveal="{ amount: 0.14 }" 
						class="te-loop__step reveal"
						:style="{ transitionDelay: `${index * 0.07}s` }"
					>
						<span class="te-loop__ic font-black text-[15px] italic">
							0{{ index + 1 }}
						</span>
						<h4>{{ s.action }}</h4>
						<p class="text-white/80 font-medium text-[14px] mt-1 mb-2">{{ s.h }}</p>
						<p>{{ s.p }}</p>
						<span v-if="index < 3" class="te-loop__arrow">
							<svg class="lucide" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" v-html="RD_ICONS['chevron-right']"></svg>
						</span>
					</div>
				</div>
			</div>
		</section>

		<!-- Closing -->
		<section class="te-closing">
			<div class="te-closing__ellipse" />
			<div v-reveal="{ amount: 0.14 }" class="te-closing__in reveal">
				<p class="te-closing__kicker">The only partner you'll ever need.</p>
				<div class="te-closing__words">
					<p>Connected,</p>
					<p><em>stable,</em></p>
					<p>limitless.</p>
				</div>
				<p class="te-closing__desc">When others come and go, we'll still be here. Join the infrastructure built to last.</p>
				<div class="te-closing__cta">
					<Button as-child>
						<NuxtLink to="/register" class="px-6 py-3 bg-primary hover:bg-primary-600 text-white font-medium rounded-control transition-all duration-200 inline-flex items-center gap-2">
							Start on Rockads
							<svg class="lucide" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" v-html="RD_ICONS['arrow-right']"></svg>
						</NuxtLink>
					</Button>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
/* Scoped brand colors & variables copied from design system */
.page-wrapper {
	--rk-primary:        #007ce1;
	--rk-primary-600:    #006fca;
	--rk-primary-050:    #e6f2fc;
	--rk-secondary:      #00c088;
	--rk-secondary-600:  #00a676;
	--rk-hero-accent:    #99cbf3;
	--rk-fg-1:           #151b26;
	--rk-fg-2:           #41485a;
	--rk-fg-3:           #6b7280;
	--rk-fg-4:           #9aa1b1;
	--rk-border:         #e7e9ef;
	--rk-border-strong:  #d4d8e2;
	--rk-bg:             #f7f8fb;
	--rk-card:           #ffffff;
	--rk-muted:          #f0f2f6;
	--rk-surface-cream:  #f7efe2;
	--rk-dark:           #151b26;
	--rk-dark-900:       #060a14;
	--rk-dark-800:       #070f1d;
	--rk-dark-700:       #02123e;
	--rk-header:         #010101;
	--rk-footer:         #080b0f;
	--rk-dark-border:    #23293a;
	--rk-on-dark-1:      #ffffff;
	--rk-on-dark-2:      rgba(255,255,255,0.60);
	--rk-on-dark-3:      rgba(255,255,255,0.40);
	--rk-ease-out:       cubic-bezier(0.16, 1, 0.3, 1);
	--rk-radius-xl:      16px;
	
	--rd-maxw:           1240px;
	--rd-gut:            clamp(20px, 5vw, 88px);
	--rd-ink:            #0b1018;

	background:          var(--rk-dark-900);
	min-height:          100vh;
	color:               #fff;
}

/* Redesign Scaffolding */
.rd-wrap { 
	width: 100%; 
	max-width: var(--rd-maxw); 
	margin: 0 auto; 
	padding-inline: var(--rd-gut); 
}

.rd-kicker { 
	font-size: 12px; 
	font-weight: 600; 
	letter-spacing: .22em; 
	text-transform: uppercase; 
}
.rd-kicker--light { 
	color: rgba(255,255,255,.45); 
}

.rd-sec { 
	padding-block: clamp(64px, 9vw, 120px); 
}
.rd-sec__head { 
	max-width: 680px; 
}
.rd-h2 { 
	font-size: clamp(30px, 4.2vw, 48px); 
	line-height: 1.1; 
	font-weight: 500; 
	letter-spacing: -.02em; 
	margin: 14px 0 0; 
}
.rd-h2 em { 
	font-style: italic; 
	font-weight: 700; 
}

.rd-btn--ghost-light {
	background: transparent;
	color: #fff;
	border-color: rgba(255,255,255,.28);
}
.rd-btn--ghost-light:hover {
	background: rgba(255,255,255,.08);
	border-color: rgba(255,255,255,.5);
}

/* Scroll reveal overrides matching Nuxt directive */
.reveal { 
	opacity: 0; 
	transform: translateY(22px); 
	transition: opacity .7s var(--rk-ease-out), transform .7s var(--rk-ease-out); 
}
.reveal.in-view { 
	opacity: 1; 
	transform: none; 
}
@media (prefers-reduced-motion: reduce) { 
	.reveal { 
		opacity: 1; 
		transform: none; 
		transition: none; 
	} 
}

/* ===== HERO ===== */
.te-hero { 
	position: relative; 
	overflow: hidden; 
	padding: 150px 0 100px; 
	text-align: center; 
	color: #fff;
	background: radial-gradient(120% 80% at 50% -8%, #0a1733 0%, #060a14 58%); 
}
.te-hero__grid { 
	position: absolute; 
	inset: 0; 
	opacity: .5; 
	pointer-events: none;
	background-image: radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px); 
	background-size: 30px 30px;
	mask-image: radial-gradient(70% 60% at 50% 30%, #000 0%, transparent 80%); 
	-webkit-mask-image: radial-gradient(70% 60% at 50% 30%, #000 0%, transparent 80%); 
}
.te-hero__inner { 
	position: relative; 
	z-index: 2; 
}
.te-hero h1 { 
	margin: 20px auto 0; 
	max-width: 16ch; 
	font-size: clamp(42px, 6.6vw, 80px); 
	line-height: 1.03; 
	font-weight: 800; 
	letter-spacing: -.035em; 
}
.te-hero h1 em { 
	font-style: italic; 
	color: var(--rk-hero-accent); 
}
.te-hero__sub { 
	margin: 22px auto 0; 
	max-width: 58ch; 
	font-size: clamp(16px, 1.6vw, 19px); 
	line-height: 1.6; 
	color: rgba(255,255,255,.66); 
}
.te-hero__cta { 
	margin-top: 32px; 
	display: flex; 
	gap: 14px; 
	justify-content: center; 
	flex-wrap: wrap; 
}

/* ===== PRODUCT SHOWCASE BANDS ===== */
.te-show { 
	position: relative; 
	padding: clamp(64px, 9vw, 112px) 0; 
	border-top: 1px solid rgba(255,255,255,.06); 
}
.te-show__glow { 
	position: absolute; 
	pointer-events: none; 
	width: 520px; 
	height: 420px; 
	top: 0;
	background: radial-gradient(ellipse 55% 55% at 50% 30%, rgba(0,124,225,.16), transparent 70%); 
}
.te-show:nth-child(even) .te-show__glow { 
	right: -80px; 
}
.te-show:nth-child(odd) .te-show__glow { 
	left: -80px; 
}
.te-band { 
	position: relative; 
	z-index: 2; 
	display: grid; 
	grid-template-columns: 0.85fr 1.15fr; 
	gap: clamp(36px, 5vw, 80px); 
	align-items: center; 
}
.te-band--rev .te-band__media { 
	order: -1; 
}
.te-idx { 
	display: flex; 
	align-items: center; 
	gap: 12px; 
}
.te-idx__n { 
	font-size: 13px; 
	font-weight: 700; 
	font-variant-numeric: tabular-nums; 
	color: var(--rk-hero-accent); 
	letter-spacing: .1em; 
}
.te-idx__ic { 
	width: 40px; 
	height: 40px; 
	border-radius: 12px; 
	background: rgba(0,124,225,.16); 
	color: var(--rk-hero-accent); 
	display: flex; 
	align-items: center; 
	justify-content: center; 
}
.te-idx__ic .lucide { 
	width: 21px; 
	height: 21px; 
}
.te-band h2 { 
	margin: 22px 0 0; 
	font-size: clamp(28px, 3.8vw, 46px); 
	line-height: 1.08; 
	font-weight: 600; 
	letter-spacing: -.02em; 
	color: #fff; 
}
.te-band h2 :deep(em) { 
	font-style: italic; 
	font-weight: 700; 
	color: var(--rk-hero-accent); 
}
.te-band__lead { 
	margin: 16px 0 0; 
	font-size: 16px; 
	line-height: 1.65; 
	color: rgba(255,255,255,.64); 
	max-width: 46ch; 
}
.te-chips { 
	margin: 24px 0 0; 
	display: flex; 
	flex-wrap: wrap; 
	gap: 9px; 
}
.te-chip { 
	display: inline-flex; 
	align-items: center; 
	gap: 7px; 
	height: 32px; 
	padding: 0 13px; 
	border-radius: 9px;
	background: rgba(255,255,255,.05); 
	border: 1px solid rgba(255,255,255,.09); 
	font-size: 13px; 
	color: rgba(255,255,255,.78); 
}
.te-chip .lucide { 
	width: 14px; 
	height: 14px; 
	color: var(--rk-secondary); 
}
.te-platrow { 
	margin: 24px 0 0; 
	display: flex; 
	align-items: center; 
	gap: 18px; 
}
.te-platrow img { 
	width: 26px; 
	height: 26px; 
	opacity: .7; 
	transition: opacity .2s; 
}
.te-platrow img:hover { 
	opacity: 1; 
}

/* media frame */
.te-frame { 
	border-radius: 16px; 
	overflow: hidden; 
	border: 1px solid rgba(255,255,255,.1);
	box-shadow: 0 40px 100px rgba(0,30,90,.4), 0 8px 24px rgba(0,0,0,.35); 
	background: #0c1424; 
}
.te-frame__bar { 
	height: 38px; 
	display: flex; 
	align-items: center; 
	gap: 7px; 
	padding: 0 14px; 
	background: #131d30; 
	border-bottom: 1px solid rgba(255,255,255,.06); 
}
.te-frame__dot { 
	width: 10px; 
	height: 10px; 
	border-radius: 50%; 
}
.te-frame__tag { 
	margin-left: 12px; 
	font-size: 11.5px; 
	color: rgba(255,255,255,.4); 
}
@media (max-width: 900px) { 
	.te-band { 
		grid-template-columns: 1fr; 
		gap: 28px; 
	} 
	.te-band--rev .te-band__media { 
		order: 0; 
	} 
}

/* ===== HOW IT WORKS TOGETHER ===== */
.te-loop { 
	background: #070f1d; 
	border-top: 1px solid rgba(255,255,255,.06); 
}
.te-loop__grid { 
	margin-top: 44px; 
	display: grid; 
	grid-template-columns: repeat(4, 1fr); 
	gap: 14px; 
}
.te-loop__step { 
	position: relative; 
	padding: 24px 20px; 
	border-radius: var(--rk-radius-lg); 
	border: 1px solid rgba(255,255,255,.09); 
	background: rgba(255,255,255,.025); 
}
.te-loop__step h4 { 
	margin: 14px 0 0; 
	font-size: 16px; 
	font-weight: 600; 
	color: #fff; 
}
.te-loop__step p { 
	margin: 7px 0 0; 
	font-size: 13.5px; 
	line-height: 1.55; 
	color: rgba(255,255,255,.55); 
}
.te-loop__ic { 
	width: 36px; 
	height: 36px; 
	border-radius: 10px; 
	background: rgba(0,124,225,.16); 
	color: var(--rk-hero-accent); 
	display: flex; 
	align-items: center; 
	justify-content: center; 
}
.te-loop__ic .lucide { 
	width: 19px; 
	height: 19px; 
}
.te-loop__arrow { 
	position: absolute; 
	right: -11px; 
	top: 50%; 
	transform: translateY(-50%); 
	z-index: 3; 
	color: rgba(255,255,255,.3); 
}
@media (max-width: 900px) { 
	.te-loop__grid { 
		grid-template-columns: 1fr 1fr; 
	} 
	.te-loop__arrow { 
		display: none; 
	} 
}

/* ===== CLOSING (kept iconic) ===== */
.te-closing { 
	position: relative; 
	overflow: hidden; 
	background: #080b0f; 
	text-align: center; 
	padding: clamp(90px, 13vw, 150px) 20px; 
}
.te-closing__ellipse { 
	position: absolute; 
	top: 50%; 
	left: 50%; 
	width: 536px; 
	height: 458px; 
	max-width: 90%; 
	transform: translate(-50%, -50%);
	border-radius: 50%; 
	background: radial-gradient(ellipse 75% 72% at 50% 50%, rgba(38,56,94,.52), rgba(38,56,94,.16) 45%, rgba(8,11,15,0) 72%); 
	filter: blur(40px); 
}
.te-closing__in { 
	position: relative; 
	z-index: 2; 
	max-width: 540px; 
	margin: 0 auto; 
}
.te-closing__kicker { 
	font-size: 15px; 
	color: #898fa5; 
}
.te-closing__words { 
	margin: 30px 0; 
}
.te-closing__words p { 
	margin: 0; 
	font-size: clamp(40px, 8vw, 68px); 
	line-height: 1.06; 
	font-weight: 400; 
	color: #fff; 
}
.te-closing__words em { 
	font-style: italic; 
	font-weight: 700; 
	color: #f6ca9a; 
}
.te-closing__desc { 
	max-width: 38ch; 
	margin: 0 auto; 
	font-size: 14.5px; 
	line-height: 1.55; 
	color: #9fa6bb; 
}
.te-closing__cta { 
	margin-top: 40px; 
}

.lucide { 
	width: 18px; 
	height: 18px; 
	display: inline-block; 
	vertical-align: middle; 
}
</style>
