// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	modules: ["shadcn-nuxt", "@nuxtjs/turnstile", "@nuxt/image"],
	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},
	css: ["~/assets/css/tailwind.css"],

	runtimeConfig: {
		public: {
			/** Full origin + API prefix for auth routes, e.g. https://api.example.com/v1 */
			authApiBase: "",
			/**
													* Send cookies on auth API calls (e.g. httpOnly refresh cookie next to JWT).
													* Env: `NUXT_PUBLIC_AUTH_WITH_CREDENTIALS` (`true` / `1`).
													*/
			authWithCredentials: false,
			/**
													* When set, this token is sent as the captcha value on all auth forms
													* instead of a real Turnstile token. The Turnstile widget is also hidden.
													* Use only on staging/test environments where the backend accepts a fixed
													* dummy token (e.g. `XXXX.DUMMY.TOKEN.XXXX`).
													* Env: `NUXT_PUBLIC_CAPTCHA_DUMMY_TOKEN`
													*/
			captchaDummyToken: process.env.NUXT_PUBLIC_CAPTCHA_DUMMY_TOKEN || "",
			goApiURL: process.env.GO_API_URL || "https://api-stage.rockads.com/",
			appURL: process.env.APP_URL || "https://stage.rockads.com/",
			panelAutoLoginUrl: process.env.PANEL_AUTO_LOGIN_URL || "https://stage-panel.rockads.com/login",
			gtm: {
				id: process.env.GTM_KEY || "GTM-XXXXXX",
			},
		},
	},
	alias: {
		"@": new URL("./app", import.meta.url).pathname,
	},
	compatibilityDate: "2025-07-15",

	vite: {
		plugins: [tailwindcss()],
	},
	shadcn: {
		/**
								* Prefix for all the imported component.
								* @default "Ui"
								*/
		prefix: "",
		/**
								* Directory that the component lives in.
								* Will respect the Nuxt aliases.
								* @link https://nuxt.com/docs/api/nuxt-config#alias
								* @default "@/components/ui"
								*/
		componentDir: "@/components/ui",
	},
	turnstile: {
		siteKey: process.env.TURNSTILE_SITE_KEY || "1x00000000000000000000AA",
	},
});
