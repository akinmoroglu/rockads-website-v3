// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	modules: ["shadcn-nuxt"],
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
});
