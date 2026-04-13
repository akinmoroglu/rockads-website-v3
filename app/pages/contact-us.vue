<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import HomeCta from "@/components/home/home-cta.vue";
import { Motion } from "motion-v";
import { IconFileDescriptionFilled, IconHeadset, IconMail, IconMessageChatbot } from "@tabler/icons-vue";

definePageMeta({
	layout: "marketing",
});

useHead({
	title: "Contact Us - Rockads",
	meta: [
		{
			name: "description",
			content:
				"Get in touch with the Rockads team. We're here to help you grow without limits.",
		},
	],
	link: [
		{
			rel: "alternate",
			type: "link",
			href: "https://www.rockads.com/en/contact-us",
			hreflang: "en",
		},
	],
});

const form = reactive({
	name: "",
	email: "",
	company: "",
	inquiryType: "",
	message: "",
});

const isSubmitting = ref(false);
const isSubmitted = ref(false);

const mounted = ref(false);

const inquiryTypes = [
	{ value: "general", label: "General Inquiry" },
	{ value: "sales", label: "Sales & Partnerships" },
	{ value: "support", label: "Technical Support" },
	{ value: "billing", label: "Billing & Payments" },
	{ value: "press", label: "Press & Media" },
	{ value: "other", label: "Other" },
];

async function handleSubmit() {
	if (isSubmitting.value) return;
	isSubmitting.value = true;
	await new Promise(resolve => setTimeout(resolve, 1200));
	isSubmitting.value = false;
	isSubmitted.value = true;
}

const contactCards = [
	{
		icon: IconMail,
		title: "Email Us",
		description: "Our team typically responds within 24 hours.",
		value: "support@rockads.com",
		href: "mailto:support@rockads.com",
		external: false,
	},
	{
		icon: IconHeadset,
		title: "24/7 Support",
		description: "Round-the-clock support for all partners.",
		value: "Visit Help Center",
		href: "https://rockads.faq.desk360.com/",
		external: true,
	},
	{
		icon: IconFileDescriptionFilled,
		title: "Documentation",
		description: "Explore our guides and API references.",
		value: "docs.rockads.com",
		href: "https://docs.rockads.com/",
		external: true,
	},
];

const offices = [
	{ city: "Istanbul", region: "EMEA Headquarters" },
	{ city: "Dubai", region: "Middle East & Africa" },
	{ city: "London", region: "Europe Operations" },
];

const socialLinks = [
	{ label: "LinkedIn", href: "https://www.linkedin.com/company/rockads/" },
	{ label: "Twitter / X", href: "https://twitter.com/rockadscom" },
	{ label: "Instagram", href: "https://www.instagram.com/rockadscom/" },
	{ label: "Facebook", href: "https://www.facebook.com/rockadscom/" },
	{ label: "TikTok", href: "https://www.tiktok.com/@rockadscom" },
];

const faqItems = [
	{
		id: "faq-1",
		question: "How quickly will I receive a response?",
		answer:
			"Our support team usually replies within 24 hours on business days.",
	},
	{
		id: "faq-2",
		question: "Can I request a demo before onboarding?",
		answer:
			"Yes. Share your goals through the contact form and our team will schedule a guided demo.",
	},
	{
		id: "faq-3",
		question: "Do you provide technical integration support?",
		answer:
			"Absolutely. We support integrations through documentation, direct support, and onboarding sessions.",
	},
	{
		id: "faq-4",
		question: "Where can I find platform documentation?",
		answer:
			"You can access all setup and API guides at docs.rockads.com.",
	},
	{
		id: "faq-5",
		question: "How can I reach live support?",
		answer:
			"Use the Live Support button below to open Desk360 chat when available.",
	},
];

const officeAddresses = [
	{
		id: "office-us",
		label: "US - Rockads Corp. Address:",
		value: "2513 SHALLOWFORD RD BLDG 200 STE 400, MARIETTA, GA, 30066, USA",
	},
];

declare global {
	interface Window {
		desk360Chat?: {
			open?: () => void;
			show: () => void;
		};
	}
}

const openChat = () => {
	if (!import.meta.client) return;

	const chat = window.desk360Chat;

	if (!chat) return;

	if (chat.open) {
		chat.open();

		return;
	}

	chat.show();
};

onMounted(() => {
	mounted.value = true;
});

onUnmounted(() => {
	mounted.value = false;
});
</script>

<template>
	<main>
		<!-- Hero -->
		<section class="relative overflow-hidden bg-white">
			<TechServicesDotGridCanvas />
			<div class="relative mx-auto max-w-[1066px] px-5 pt-[140px] pb-12 text-center lg:px-0 lg:pt-[164px] lg:pb-16">
				<Motion
					as="div"
					class="inline-block"
					:initial="{ opacity: 0, y: 16 }"
					:animate="{ opacity: 1, y: 0 }"
					:transition="{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }"
				>
					<Badge
						variant="secondary"
						class="mb-6 px-3 py-1.5 text-xs font-semibold tracking-widest uppercase"
					>
						Get In Touch
					</Badge>
				</Motion>

				<Motion
					as="h1"
					class="text-[40px] leading-[1.14] font-medium md:text-[48px] lg:text-[56px]"
					:initial="{ opacity: 0, y: 20 }"
					:animate="{ opacity: 1, y: 0 }"
					:transition="{ duration: 0.55, delay: 0.07, ease: [0.16, 1, 0.3, 1] }"
				>
					<span class="text-primary">Talk to</span>
					<span class="text-foreground"> Our Team</span>
				</Motion>

				<Motion
					as="p"
					class="mt-4 text-base font-medium text-foreground lg:mt-5 lg:text-lg"
					:initial="{ opacity: 0, y: 20 }"
					:animate="{ opacity: 1, y: 0 }"
					:transition="{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }"
				>
					We're here to help you grow without limits.
				</Motion>

				<Motion
					as="p"
					class="mx-auto mt-6 max-w-[680px] text-sm leading-relaxed text-muted-foreground lg:mt-8 lg:text-base"
					:initial="{ opacity: 0, y: 20 }"
					:animate="{ opacity: 1, y: 0 }"
					:transition="{ duration: 0.55, delay: 0.17, ease: [0.16, 1, 0.3, 1] }"
				>
					Whether you have a question about our platform, need help getting started, or want to explore a partnership — our team is ready to connect.
				</Motion>
			</div>
		</section>

		<!-- Contact Grid -->
		<section class="mx-auto w-full max-w-[1440px] px-5 py-16 lg:px-12 lg:py-24 xl:px-[150px]">
			<div class="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
				<!-- Contact Form -->
				<Motion
					as="div"
					class="lg:col-span-3"
					:initial="{ opacity: 0, y: 24 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:in-view-options="{ once: true, amount: 0.08 }"
					:transition="{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }"
				>
					<!-- Success State -->
					<div
						v-if="isSubmitted"
						class="flex min-h-[520px] flex-col items-center justify-center gap-6 rounded-2xl border border-border bg-card p-10 text-center shadow-sm"
					>
						<div class="flex size-16 items-center justify-center rounded-full bg-primary/10">
							<svg
								class="size-8 text-primary"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<circle
									cx="12"
									cy="12"
									r="10"
								/>
								<path d="m9 12 2 2 4-4" />
							</svg>
						</div>
						<div class="flex flex-col gap-2">
							<h2 class="text-2xl font-semibold text-foreground">
								Message Sent!
							</h2>
							<p class="max-w-sm text-sm leading-relaxed text-muted-foreground">
								Thanks for reaching out. Our team will get back to you within 24 hours.
							</p>
						</div>
						<Button
							variant="outline"
							@click="isSubmitted = false"
						>
							Send Another Message
						</Button>
					</div>

					<!-- Form -->
					<form
						v-else
						class="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-10"
						@submit.prevent="handleSubmit"
					>
						<div class="flex flex-col gap-1.5">
							<h2 class="text-xl font-semibold text-foreground">
								Send us a message
							</h2>
							<p class="text-sm text-muted-foreground">
								Fill out the form and we'll be in touch shortly.
							</p>
						</div>

						<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
							<!-- Full Name -->
							<div class="flex flex-col gap-1.5">
								<Label for="contact-name">
									Full Name <span class="text-destructive">*</span>
								</Label>
								<Input
									id="contact-name"
									v-model="form.name"
									placeholder="Jane Smith"
									required
								/>
							</div>

							<!-- Email -->
							<div class="flex flex-col gap-1.5">
								<Label for="contact-email">
									Email Address <span class="text-destructive">*</span>
								</Label>
								<Input
									id="contact-email"
									v-model="form.email"
									type="email"
									placeholder="jane@company.com"
									required
								/>
							</div>

							<!-- Company -->
							<div class="flex flex-col gap-1.5">
								<Label for="contact-company">
									Company Name
								</Label>
								<Input
									id="contact-company"
									v-model="form.company"
									placeholder="Your company"
								/>
							</div>

							<!-- Inquiry Type -->
							<div class="flex flex-col gap-1.5">
								<Label for="contact-inquiry">
									Inquiry Type <span class="text-destructive">*</span>
								</Label>
								<Select
									v-model="form.inquiryType"
									required
								>
									<SelectTrigger
										id="contact-inquiry"
										class="w-full"
									>
										<SelectValue placeholder="Select an inquiry type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem
											v-for="type in inquiryTypes"
											:key="type.value"
											:value="type.value"
										>
											{{ type.label }}
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<!-- Message -->
						<div class="flex flex-col gap-1.5">
							<Label for="contact-message">
								Message <span class="text-destructive">*</span>
							</Label>
							<Textarea
								id="contact-message"
								v-model="form.message"
								placeholder="Tell us how we can help you..."
								required
								class="min-h-[160px] resize-none"
							/>
						</div>

						<div class="flex items-center justify-between gap-4">
							<p class="text-xs text-muted-foreground">
								Fields marked with <span class="text-destructive">*</span> are required.
							</p>
							<Button
								type="submit"
								size="lg"
								class="shrink-0"
								:disabled="isSubmitting"
							>
								<template v-if="isSubmitting">
									<svg
										class="mr-2 size-4 animate-spin"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
									>
										<path d="M21 12a9 9 0 1 1-6.219-8.56" />
									</svg>
									Sending…
								</template>
								<template v-else>
									Send Message
									<svg
										class="ml-2 size-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="m22 2-7 20-4-9-9-4Z" />
										<path d="M22 2 11 13" />
									</svg>
								</template>
							</Button>
						</div>
					</form>
				</Motion>

				<!-- Sidebar -->
				<div
					v-if="mounted"
					class="flex flex-col gap-5 lg:col-span-2"
				>
					<!-- Contact Cards -->
					<Motion
						v-for="(card, index) in contactCards"
						:key="card.title"
						as="a"
						:href="card.href"
						:target="card.external ? '_blank' : undefined"
						:rel="card.external ? 'noopener noreferrer' : undefined"
						class="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs transition-[border-color,box-shadow] duration-200 hover:border-primary/40 hover:shadow-md"
						:initial="{ opacity: 0, y: 20 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:in-view-options="{ once: true, amount: 0.15 }"
						:transition="{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }"
					>
						<div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
							<component :is="card.icon" />
						</div>
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-semibold text-foreground">{{ card.title }}</span>
							<span class="text-xs leading-5 text-muted-foreground">{{ card.description }}</span>
							<span class="mt-1 text-sm font-medium text-primary group-hover:underline group-hover:underline-offset-2">
								{{ card.value }}
							</span>
						</div>
					</Motion>

					<!-- Global Presence -->
					<Motion
						as="div"
						class="rounded-2xl border border-border bg-muted/40 p-5"
						:initial="{ opacity: 0, y: 20 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:in-view-options="{ once: true, amount: 0.15 }"
						:transition="{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }"
					>
						<h3 class="mb-4 text-sm font-semibold text-foreground">
							Global Presence
						</h3>
						<ul class="flex flex-col gap-3">
							<li
								v-for="office in offices"
								:key="office.city"
								class="flex items-center gap-3"
							>
								<svg
									class="size-4 shrink-0 text-primary"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.75"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
									<circle
										cx="12"
										cy="10"
										r="3"
									/>
								</svg>
								<div>
									<span class="text-sm font-medium text-foreground">{{ office.city }}</span>
									<span class="ml-1.5 text-xs text-muted-foreground">— {{ office.region }}</span>
								</div>
							</li>
						</ul>
					</Motion>

					<!-- Social Links -->
					<Motion
						as="div"
						class="rounded-2xl border border-border bg-card p-5"
						:initial="{ opacity: 0, y: 20 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:in-view-options="{ once: true, amount: 0.15 }"
						:transition="{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }"
					>
						<h3 class="mb-3 text-sm font-semibold text-foreground">
							Follow Us
						</h3>
						<div class="flex flex-wrap gap-2">
							<Button
								v-for="social in socialLinks"
								:key="social.label"
								variant="outline"
								size="sm"
								as-child
								class="rounded-full text-xs text-muted-foreground hover:border-primary/40 hover:text-primary"
							>
								<a
									:href="social.href"
									target="_blank"
									rel="noopener noreferrer"
								>
									{{ social.label }}
								</a>
							</Button>
						</div>
					</Motion>
				</div>
			</div>
		</section>

		<section class="mx-auto w-full max-w-[1066px] px-5 pb-16 lg:pb-24">
			<Motion
				as="div"
				class="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-10"
				:initial="{ opacity: 0, y: 24 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.1 }"
				:transition="{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }"
			>
				<div class="mb-5">
					<h2 class="text-2xl font-semibold text-foreground">
						Frequently Asked Questions
					</h2>
					<p class="mt-1 text-sm text-muted-foreground">
						Quick answers to common contact and onboarding questions.
					</p>
				</div>
				<Accordion
					type="single"
					collapsible
					class="w-full"
				>
					<AccordionItem
						v-for="faq in faqItems"
						:key="faq.id"
						:value="faq.id"
					>
						<AccordionTrigger>{{ faq.question }}</AccordionTrigger>
						<AccordionContent>{{ faq.answer }}</AccordionContent>
					</AccordionItem>
				</Accordion>
			</Motion>
		</section>

		<section class="mx-auto w-full max-w-[1066px] px-5 pb-16 lg:pb-24">
			<Motion
				as="div"
				class="rounded-2xl border border-border bg-muted/30 p-6 text-center lg:p-10"
				:initial="{ opacity: 0, y: 24 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.1 }"
				:transition="{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }"
			>
				<div class="flex flex-col gap-2 text-sm text-foreground">
					<p
						v-for="officeAddress in officeAddresses"
						:key="officeAddress.id"
						class="leading-relaxed"
					>
						<span class="font-semibold">{{ officeAddress.label }}</span>
						{{ officeAddress.value }}
					</p>
					<p class="leading-relaxed">
						<span class="font-semibold">E-mail:</span>
						support@rockads.com
					</p>
				</div>
			</Motion>
		</section>

		<section class="mx-auto w-full max-w-[1066px] px-5 pb-16 lg:pb-24">
			<Motion
				as="div"
				class="flex flex-col items-center justify-between gap-6 rounded-2xl bg-primary/8 p-6 lg:flex-row lg:p-8"
				:initial="{ opacity: 0, y: 24 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.1 }"
				:transition="{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }"
			>
				<div class="flex items-center gap-4">
					<IconMessageChatbot class="size-8 text-primary" />
					<div>
						<p class="text-xl font-semibold text-foreground">
							Need immediate help?
						</p>
						<p class="text-sm text-muted-foreground">
							Our live support team is ready to assist you.
						</p>
					</div>
				</div>
				<Button
					type="button"
					class="w-full lg:w-auto"
					@click="openChat"
				>
					Open Live Support
				</Button>
			</Motion>
		</section>

		<section class="mx-auto w-full max-w-[1066px] px-5 pb-16 text-center lg:pb-24">
			<Motion
				as="div"
				class="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 lg:p-10"
				:initial="{ opacity: 0, y: 24 }"
				:while-in-view="{ opacity: 1, y: 0 }"
				:in-view-options="{ once: true, amount: 0.1 }"
				:transition="{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }"
			>
				<p class="text-2xl font-semibold text-foreground lg:text-4xl">
					Ready to start growing with Rockads?
				</p>
				<Button
					as-child
					size="lg"
				>
					<NuxtLink to="/register">
						Start Now
					</NuxtLink>
				</Button>
			</Motion>
		</section>

		<!-- CTA -->
		<HomeCta />
	</main>
</template>
