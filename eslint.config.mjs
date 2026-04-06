import { createConfigForNuxt } from "@nuxt/eslint-config";
import oxlint from "eslint-plugin-oxlint";

export default createConfigForNuxt({
	features: {
		stylistic: {
			indent: "tab",
			quotes: "double",
			semi: true,
		},
	},
}).append(
	...oxlint.configs["flat/recommended"],
	{
		rules: {
			"@stylistic/no-tabs": "off",
			"@stylistic/indent": ["error", "tab"],
			"@stylistic/quotes": ["error", "double"],
			"@stylistic/semi": ["error", "always"],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"vue/require-default-prop": "off",
		},
	},
);
