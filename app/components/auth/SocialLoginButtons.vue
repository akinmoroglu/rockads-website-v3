<script setup lang="ts">
import metaIconSrc from "@/assets/icons/brands/meta.svg?url";
import googleIconSrc from "@/assets/icons/brands/google.svg?url";
import shopifyIconSrc from "@/assets/icons/brands/shopify.svg?url";
import { oauthSignIn } from "@/services/signUpService";
import { type OAuthProvider } from "@/models/signup";
import { getCookie } from "@/utils/cookie";

const props = defineProps<{
	/**
	 * When true, agreement must be confirmed before redirecting.
	 * Used on the sign-up page where terms must be accepted first.
	 */
	requiresAgreement?: boolean;
	/** Current agreement state — passed from the parent when requiresAgreement is true. */
	agreement?: boolean | null;
}>();

const emit = defineEmits<{
	/** Emitted when a social provider is clicked but agreement is not yet accepted. */
	requireAgreement: [];
}>();

const config = useRuntimeConfig();
const baseURL = (config.public.goApiURL as string).replace(/\/$/, "");

const pendingProvider = ref<OAuthProvider | null>(null);
const isRedirecting = ref(false);

watch(
	() => props.agreement,
	(agreed) => {
		if (agreed && pendingProvider.value) {
			void doRedirect(pendingProvider.value);
		}
	},
);

const providers: { id: OAuthProvider; label: string; iconSrc: string; iconAlt: string; class: string }[] = [
	{
		id: "facebook",
		label: "Continue with Facebook",
		iconSrc: metaIconSrc,
		iconAlt: "Facebook",
		class: "bg-[#1877F2] hover:bg-[#166FE5] text-white border-transparent",
	},
	{
		id: "google",
		label: "Continue with Google",
		iconSrc: googleIconSrc,
		iconAlt: "Google",
		class: "bg-[#131314] hover:bg-[#1f1f21] text-white border-transparent",
	},
	{
		id: "shopify",
		label: "Continue with Shopify",
		iconSrc: shopifyIconSrc,
		iconAlt: "Shopify",
		class: "bg-muted hover:bg-muted/80 text-foreground border-border",
	},
];

async function handleProviderClick(provider: OAuthProvider) {
	if (props.requiresAgreement && !props.agreement) {
		pendingProvider.value = provider;
		emit("requireAgreement");
		return;
	}

	await doRedirect(provider);
}

async function doRedirect(provider: OAuthProvider) {
	if (!import.meta.client) return;

	isRedirecting.value = true;
	pendingProvider.value = null;

	try {
		const utmCodes = getCookie("utm_codes") ?? undefined;
		const payload = utmCodes ? { provider, utm_codes: utmCodes } : { provider };
		const { redirect_url } = await oauthSignIn(baseURL, payload);

		window.location.href = redirect_url;
	}
	catch (error) {
		console.error("OAuth sign-in error:", error);
		isRedirecting.value = false;
	}
}
</script>

<template>
	<div class="flex flex-col gap-3">
		<button
			v-for="provider in providers"
			:key="provider.id"
			:test-id="`social-login-${provider.id}-btn`"
			type="button"
			:disabled="isRedirecting"
			:class="[
				'flex w-full items-center justify-center gap-3 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed',
				provider.class,
			]"
			@click="handleProviderClick(provider.id)"
		>
			<img
				:src="provider.iconSrc"
				:alt="provider.iconAlt"
				class="size-5 shrink-0"
				aria-hidden="true"
			>
			{{ provider.label }}
		</button>
	</div>
</template>
