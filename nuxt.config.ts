// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	modules: ["shadcn-nuxt"],
	devtools: { enabled: true },
	css: ["~/assets/css/tailwind.css"],

	runtimeConfig: {
		public: {
			/** Full origin + API prefix for auth routes, e.g. https://api.example.com/v1 */
			authApiBase: "",
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
