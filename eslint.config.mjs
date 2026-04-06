import { createConfigForNuxt } from "@nuxt/eslint-config";
import oxlint from "eslint-plugin-oxlint";

export default createConfigForNuxt().append(
	...oxlint.configs["flat/recommended"],
	{
		rules: {
			"indent": ["error", "tab"],
			"quotes": ["error", "double"],
			"semi": ["error", "always"],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"vue/require-default-prop": "off",
		},
	},
);
