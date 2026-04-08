<script setup lang="ts">
import metaIconSrc from "@/assets/icons/brands/meta.svg?url";
import googleIconSrc from "@/assets/icons/brands/google.svg?url";
import shopifyIconSrc from "@/assets/icons/brands/shopify.svg?url";
import { AUTH_API_PATHS } from "@/lib/auth-api-paths";

const authApi = useAuthApi();

const providers = [
	{
		id: "meta",
		label: "Continue with Meta",
		iconSrc: metaIconSrc,
		iconAlt: "Meta",
		path: AUTH_API_PATHS.socialMeta,
		class: "bg-[#1877F2] hover:bg-[#166FE5] text-white border-transparent",
	},
	{
		id: "google",
		label: "Continue with Google",
		iconSrc: googleIconSrc,
		iconAlt: "Google",
		path: AUTH_API_PATHS.socialGoogle,
		class: "bg-[#131314] hover:bg-[#1f1f21] text-white border-transparent",
	},
	{
		id: "shopify",
		label: "Continue with Shopify",
		iconSrc: shopifyIconSrc,
		iconAlt: "Shopify",
		path: AUTH_API_PATHS.socialShopify,
		class: "bg-muted hover:bg-muted/80 text-foreground border-border",
	},
] as const;

const handleSocialLogin = (path: string) => {
	if (!import.meta.client) return;

	const url = authApi.socialRedirectUrl(path);

	window.location.href = url;
};
</script>

<template>
	<div class="space-y-3">
		<button
			v-for="provider in providers"
			:key="provider.id"
			:test-id="`social-login-${provider.id}-btn`"
			type="button"
			:class="[
				'flex w-full items-center justify-center gap-3 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
				provider.class,
			]"
			@click="handleSocialLogin(provider.path)"
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
