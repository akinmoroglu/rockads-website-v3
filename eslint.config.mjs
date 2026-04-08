import path from "node:path";
import { fileURLToPath } from "node:url";
import { createConfigForNuxt } from "@nuxt/eslint-config";
import oxlint from "eslint-plugin-oxlint";
import tailwind from "eslint-plugin-tailwindcss";

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

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
	...tailwind.configs["flat/recommended"],
	{
		settings: {
			tailwindcss: {
				callees: ["classnames", "clsx", "ctl", "cva", "tv", "cn"],
				cssFiles: ["app/**/*.css"],
				// Tailwind v4: absolute path so dirname(config) is project root (worker can resolve tailwindcss)
				config: path.join(repoRoot, "tailwind-eslint.css"),
			},
		},
		rules: {
			"@stylistic/no-tabs": "off",
			"@stylistic/indent": ["error", "tab"],
			"@stylistic/quotes": ["error", "double"],
			"@stylistic/semi": ["error", "always"],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"vue/require-default-prop": "off",
			// ESLint-only class sorting (Prettier plugin alternative); allow design tokens / shadcn patterns
			"tailwindcss/no-custom-classname": "off",
			"padding-line-between-statements": [
				"error",
				{ blankLine: "always", prev: "*", next: "return" },
				{ blankLine: "always", prev: ["const", "let", "var"], next: "*" },
				{ blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
			],
		},
	},
);
