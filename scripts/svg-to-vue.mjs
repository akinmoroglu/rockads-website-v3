#!/usr/bin/env node

/**
 * SVG to Vue Component Converter
 *
 * Usage:
 *   node scripts/svg-to-vue.mjs [options]
 *
 * Options:
 *   --input,  -i  <path>   Source directory or single SVG file (default: app/assets/icons)
 *   --output, -o  <path>   Output directory for Vue components (default: app/components/icons)
 *   --prefix, -p  <name>   Component name prefix (default: Icon)
 *   --ts,     -t           Generate TypeScript components (default: true)
 *   --props               Inject size/color/class props (default: true)
 *   --brands             Convert only `app/assets/icons/brands` into `app/components/icons/brands`
 *   --include-brands     Include `brands` when converting all icons (default: excluded)
 *   --preserve-colors     Keep hardcoded SVG fill/stroke colors (mode default depends on --brands)
 *   --no-preserve-colors  Normalize SVG colors to `currentColor` even under brands
 *   --force-index        Write/update index file even when output is a subdirectory
 *   --dry-run             Preview without writing files
 *   --no-eslint           Skip ESLint --fix on generated files (default: run fix)
 *
 * Examples:
 *   node scripts/svg-to-vue.mjs
 *   node scripts/svg-to-vue.mjs -i app/assets/icons -o app/components/icons -p Icon
 *   node scripts/svg-to-vue.mjs -i app/assets/icons/arrow.svg -o app/components/icons
 *   node scripts/svg-to-vue.mjs --dry-run
 */

import { execFileSync } from "node:child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ─── Argument Parsing ────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function getArg(flags, defaultValue) {
	for (const flag of flags) {
		const idx = args.indexOf(flag);
		if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith("-")) {
			return args[idx + 1];
		}
		if (idx !== -1 && typeof defaultValue === "boolean") {
			return true;
		}
	}
	return defaultValue;
}

const PREFIX = getArg(["--prefix", "-p"], "Icon");
const USE_TS = !args.includes("--no-ts");
const CONVERT_BRANDS = args.includes("--brands");
const INCLUDE_BRANDS = args.includes("--include-brands");
const INJECT_PROPS = !args.includes("--no-props");
const FORCE_PRESERVE_COLORS = args.includes("--preserve-colors");
const FORCE_NORMALIZE_COLORS = args.includes("--no-preserve-colors");
const FORCE_INDEX = args.includes("--force-index");
const DRY_RUN = args.includes("--dry-run");
const SKIP_ESLINT_FIX = args.includes("--no-eslint");

const PROPS_MODE = INJECT_PROPS ? (CONVERT_BRANDS ? "size" : "full") : "none";

// When `--brands` is provided, script must only convert brand SVGs.
const USER_INPUT = path.resolve(ROOT, getArg(["--input", "-i"], "app/assets/icons"));
const USER_OUTPUT = path.resolve(ROOT, getArg(["--output", "-o"], "app/components/icons"));

const BRANDS_INPUT_DIR = path.resolve(ROOT, "app/assets/icons/brands");
const BRANDS_OUTPUT_DIR = path.resolve(ROOT, "app/components/icons/brands");

const INPUT = CONVERT_BRANDS
	? getArg(["--input", "-i"], path.resolve(ROOT, "app/assets/icons/brands"))
	: USER_INPUT;
const OUTPUT = CONVERT_BRANDS
	? getArg(["--output", "-o"], path.resolve(ROOT, "app/components/icons/brands"))
	: USER_OUTPUT;

if (CONVERT_BRANDS) {
	const inputPath = path.resolve(ROOT, INPUT);
	const outputPath = path.resolve(ROOT, OUTPUT);

	if (!inputPath.startsWith(BRANDS_INPUT_DIR)) {
		log("red", "✖", `--brands mode requires input under: ${path.relative(ROOT, BRANDS_INPUT_DIR)}`);
		process.exit(1);
	}

	if (!outputPath.startsWith(BRANDS_OUTPUT_DIR)) {
		log("red", "✖", `--brands mode requires output under: ${path.relative(ROOT, BRANDS_OUTPUT_DIR)}`);
		process.exit(1);
	}
}

// ─── Utilities ───────────────────────────────────────────────────────────────

const COLORS = {
	reset: "\x1b[0m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	cyan: "\x1b[36m",
	red: "\x1b[31m",
	gray: "\x1b[90m",
	bold: "\x1b[1m",
};

function log(color, symbol, message) {
	console.log(`${COLORS[color]}${symbol}${COLORS.reset} ${message}`);
}

/**
 * Formats generated .vue files to match project ESLint (semicolons, macro order, vue/html-indent, etc.).
 */
function eslintFixGeneratedFiles(filePaths) {
	if (filePaths.length === 0) {
		return;
	}
	try {
		execFileSync("pnpm", ["exec", "eslint", "--fix", ...filePaths], {
			cwd: ROOT,
			stdio: "inherit",
		});
		log("gray", " ", "ESLint --fix applied to generated files.");
	}
	catch {
		log(
			"yellow",
			"⚠",
			"ESLint --fix failed. Run `pnpm lint:fix -- <output-dir>` on the generated icons.",
		);
	}
}

/**
 * Converts kebab-case or snake_case filename to PascalCase component name.
 * Example: "arrow-right.svg" → "ArrowRight"
 */
function toPascalCase(str) {
	return str
		.replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase())
		.replace(/^(.)/, (_, c) => c.toUpperCase());
}

/**
 * Builds stable component-name segments from path parts and removes adjacent
 * duplicates to avoid names like `IconServeServeGlobe`.
 */
function buildComponentSegments(parts) {
	const tokens = parts
		.flatMap(part => part.split(/[-_\s]+/).filter(Boolean))
		.map(token => toPascalCase(token));

	/** @type {string[]} */
	const deduped = [];
	for (const token of tokens) {
		if (deduped.at(-1) === token) {
			continue;
		}
		deduped.push(token);
	}

	return deduped;
}

// Matches any hardcoded color value: hex (#abc, #aabbcc), rgb(), rgba(), hsl(), named colors
// but NOT "none", "transparent", "inherit", "currentColor", "url(...)"
const HARDCODED_COLOR_RE
	= /#[0-9a-fA-F]{3,8}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)/;

/**
 * Replaces hardcoded color values in stroke/fill attributes with currentColor.
 * Leaves "none", "transparent", "inherit", "url(...)" untouched.
 */
function normalizeColors(svg) {
	// stroke="<hardcoded>" and fill="<hardcoded>"
	return svg.replace(/\b(stroke|fill)=["']([^"']+)["']/g, (match, attr, value) => {
		if (
			["none", "transparent", "inherit", "currentcolor", "currentColor"].includes(
				value.trim().toLowerCase(),
			)
		) {
			return match;
		}
		if (value.trim().startsWith("url(")) {
			return match;
		}
		if (HARDCODED_COLOR_RE.test(value)) {
			return `${attr}="currentColor"`;
		}
		return match;
	});
}

// Stroke presentation attributes that are hoistable to <svg> for inheritance.
// Child elements with these attributes will have them removed so the <svg>-level
// dynamic bindings take over via CSS/SVG inheritance.
const HOISTABLE_STROKE_ATTRS = [
	"stroke-width",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-dasharray",
	"stroke-dashoffset",
	"stroke-miterlimit",
];

/**
 * Extracts the first value of each hoistable stroke attribute found anywhere in
 * the SVG, then strips all occurrences from child elements (not from <svg> root).
 * Returns the extracted defaults alongside the cleaned SVG string.
 */
function hoistStrokeAttrs(svg) {
	const defaults = {};

	for (const attr of HOISTABLE_STROKE_ATTRS) {
		const re = new RegExp(`\\b${attr}=["']([^"']+)["']`, "g");
		const first = re.exec(svg);
		if (first) {
			defaults[attr] = first[1];
		}
	}

	// Strip these attrs from every element (we'll re-add them dynamically on <svg>)
	let cleaned = svg;
	for (const attr of HOISTABLE_STROKE_ATTRS) {
		const re = new RegExp(`\\s+${attr}=["'][^"']*["']`, "g");
		cleaned = cleaned.replace(re, "");
	}

	return { svg: cleaned, strokeDefaults: defaults };
}

/**
 * Pulls `id` and `name` from the root `<svg>` so they can be emitted before Vue
 * bindings. Matches vue/attributes-order (GLOBAL before bound attrs like :stroke-width).
 */
function extractRootSvgGlobalAttrs(svg) {
	const openRe = /^<svg(\s[^>]*)>/i;
	const m = svg.match(openRe);
	if (!m) {
		return { svg, prefix: "" };
	}

	let attrs = m[1];
	const segments = [];
	const idRe = /\s+id\s*=\s*(["'][^"']*["'])/i;
	const nameRe = /\s+name\s*=\s*(["'][^"']*["'])/i;
	const idMatch = attrs.match(idRe);
	const nameMatch = attrs.match(nameRe);

	if (idMatch) {
		segments.push(idMatch[0].trim());
		attrs = attrs.replace(idMatch[0], " ");
	}
	if (nameMatch) {
		segments.push(nameMatch[0].trim());
		attrs = attrs.replace(nameMatch[0], " ");
	}

	attrs = attrs.replace(/\s+/g, " ").trim();
	const newOpen = attrs.length > 0 ? `<svg ${attrs}>` : "<svg>";
	const newSvg = svg.replace(openRe, newOpen);

	return { svg: newSvg, prefix: segments.join(" ") };
}

/**
 * Strips XML declaration, comments, and normalizes SVG attributes.
 * - Removes width/height fixed values when props are injected
 * - Replaces hardcoded stroke/fill colors with currentColor
 * - Hoists stroke-width/linecap/linejoin from child elements to <svg>
 * - Ensures viewBox is present
 */
function processSvg(raw, propsMode, preserveColors) {
	let svg = raw
		.replace(/<\?xml[^>]*\?>/g, "")
		.replace(/<!--[\s\S]*?-->/g, "")
		.replace(/\s+/g, " ")
		.trim();

	// Replace hardcoded colors with currentColor so `color` prop works end-to-end
	// (enabled when not preserving brand colors)
	if (!preserveColors) {
		svg = normalizeColors(svg);
	}

	// Hoist stroke presentation attrs from child elements up to <svg>
	const { svg: hoisted, strokeDefaults } = hoistStrokeAttrs(svg);
	svg = hoisted;

	// Extract existing viewBox
	const viewBoxMatch = svg.match(/viewBox=["']([^"']+)["']/);
	const viewBox = viewBoxMatch ? viewBoxMatch[1] : null;

	if (propsMode !== "none") {
		// Remove hardcoded width/height so our props control sizing
		svg = svg.replace(/\s+width=["'][^"']*["']/g, "");
		svg = svg.replace(/\s+height=["'][^"']*["']/g, "");

		const dynamicAttrs = [
			":width=\"size\"",
			":height=\"size\"",
			":class=\"cn('inline-block', $attrs.class as string)\"",
			// Helps when SVG uses currentColor (optional for brand icons).
			"v-bind=\"{ style: color ? `color: ${color}` : undefined }\"",
		];

		if (propsMode === "full") {
			// Build dynamic stroke bindings with extracted defaults as fallbacks
			const strokeWidth = strokeDefaults["stroke-width"] ?? "2";
			const strokeLinecap = strokeDefaults["stroke-linecap"] ?? "round";
			const strokeLinejoin = strokeDefaults["stroke-linejoin"] ?? "round";

			dynamicAttrs.push(
				":stroke-width=\"strokeWidth\"",
				":stroke-linecap=\"strokeLinecap\"",
				":stroke-linejoin=\"strokeLinejoin\"",
			);
		}

		const dynamicAttrsStr = dynamicAttrs.join(" ");

		const { svg: withoutGlobal, prefix: globalAttrPrefix } = extractRootSvgGlobalAttrs(svg);
		svg = withoutGlobal;
		const prefix = globalAttrPrefix ? `${globalAttrPrefix} ` : "";
		svg = svg.replace("<svg", `<svg ${prefix}${dynamicAttrsStr}`);
	}

	return { svg, viewBox, strokeDefaults };
}

/**
 * Generates the Vue SFC content for a given SVG.
 */
function generateVueComponent(
	svgContent,
	componentName,
	viewBox,
	useTs,
	strokeDefaults = {},
	propsMode,
) {
	const scriptLang = useTs ? " lang=\"ts\"" : "";

	const defaultStrokeWidth = strokeDefaults["stroke-width"] ?? "2";
	const defaultLinecap = strokeDefaults["stroke-linecap"] ?? "round";
	const defaultLinejoin = strokeDefaults["stroke-linejoin"] ?? "round";

	const propsBlock
		= propsMode === "full"
			? `
const props = withDefaults(defineProps<{
  size?: number | string
  color?: string
  strokeWidth?: number | string
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit'
  strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit'
}>(), {
  size: 24,
  color: undefined,
  strokeWidth: ${defaultStrokeWidth},
  strokeLinecap: '${defaultLinecap}',
  strokeLinejoin: '${defaultLinejoin}',
})

const { size, color, strokeWidth, strokeLinecap, strokeLinejoin } = toRefs(props)
`
			: propsMode === "size"
				? `
const props = withDefaults(defineProps<{
  size?: number | string
  color?: string
}>(), {
  size: 24,
  color: undefined,
})

const { size, color } = toRefs(props)
`
				: "";

	const imports
		= propsMode !== "none"
			? `import { toRefs } from 'vue'
import { cn } from '@/lib/utils'
`
			: "";

	const template = svgContent.replace(/^<svg/, "<svg").replace(/></g, ">\n  <");

	return `<script setup${scriptLang}>
${imports}${imports ? "\n" : ""}defineOptions({ inheritAttrs: false })
${propsBlock}</script>

<template>
  ${template}
</template>
`;
}

// ─── Index File Generator ─────────────────────────────────────────────────────
const DEFAULT_OUTPUT = path.resolve(ROOT, "app/components/icons");

function parseIndexExports(indexContent) {
	const exportRe = /export\s+\{\s+default\s+as\s+([\w$]+)\s*\}\s+from\s+['"]([^'"]+)['"]\s*;?/g;
	const map = new Map();

	for (const match of indexContent.matchAll(exportRe)) {
		const [, name, from] = match;
		map.set(name, from);
	}

	return map;
}

function generateMergedIndexFile(componentExports, indexFilePath, options) {
	const { filterBrandExports = false } = options ?? {};

	const existingMap = fs.existsSync(indexFilePath)
		? parseIndexExports(fs.readFileSync(indexFilePath, "utf-8"))
		: new Map();

	const merged = new Map(existingMap);

	for (const entry of componentExports) {
		merged.set(entry.name, entry.from);
	}

	const entries = [...merged.entries()]
		.map(([name, from]) => ({ name, from }))
		.filter(e => (filterBrandExports ? !/brands[\\/]/.test(e.from) : true));

	entries.sort((a, b) => {
		const aIsBrand = /brands[\\/]/.test(a.from);
		const bIsBrand = /brands[\\/]/.test(b.from);

		if (aIsBrand !== bIsBrand) {
			return aIsBrand ? -1 : 1;
		}

		return a.name.localeCompare(b.name);
	});

	return (
		entries.map(e => `export { default as ${e.name} } from '${e.from}';`).join("\n")
		+ "\n"
	);
}

// ─── Core Logic ──────────────────────────────────────────────────────────────

function collectSvgFiles(inputPath) {
	const stat = fs.statSync(inputPath);

	if (stat.isFile()) {
		if (!inputPath.endsWith(".svg")) {
			log("red", "✖", `Not an SVG file: ${inputPath}`);
			process.exit(1);
		}
		return [inputPath];
	}

	if (stat.isDirectory()) {
		/** @type {string[]} */
		const results = [];

		/** @param {string} dir */
		const walk = (dir) => {
			for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
				const fullPath = path.join(dir, entry.name);
				if (entry.isDirectory()) {
					walk(fullPath);
				}
				else if (entry.isFile() && entry.name.endsWith(".svg")) {
					results.push(fullPath);
				}
			}
		};

		walk(inputPath);
		return results;
	}

	log("red", "✖", `Input path does not exist: ${inputPath}`);
	process.exit(1);
}

function convert() {
	// Validate input
	if (!fs.existsSync(INPUT)) {
		log("red", "✖", `Input path not found: ${INPUT}`);
		log("gray", " ", "Create the directory and place your SVG files there, then re-run.");
		process.exit(1);
	}

	const svgFiles = collectSvgFiles(INPUT);

	if (svgFiles.length === 0) {
		log("yellow", "⚠", `No SVG files found in: ${INPUT}`);
		process.exit(0);
	}

	// Prepare output directory
	if (!DRY_RUN && !fs.existsSync(OUTPUT)) {
		fs.mkdirSync(OUTPUT, { recursive: true });
	}

	log("cyan", "●", `${COLORS.bold}SVG → Vue Component Converter${COLORS.reset}`);
	log("gray", " ", `Input:  ${INPUT}`);
	log("gray", " ", `Output: ${OUTPUT}`);
	log("gray", " ", `Prefix: ${PREFIX}`);
	log("gray", " ", `Props:  ${INJECT_PROPS ? "enabled" : "disabled"}`);
	log(
		"gray",
		" ",
		`Colors: ${
			FORCE_NORMALIZE_COLORS
				? "currentColor (forced)"
				: FORCE_PRESERVE_COLORS
					? "preserved (forced)"
					: CONVERT_BRANDS
						? "preserved (brands mode default)"
						: "currentColor (icons mode default)"
		}`,
	);
	log("gray", " ", `Dry run: ${DRY_RUN ? "yes" : "no"}`);
	log("gray", " ", `ESLint fix: ${SKIP_ESLINT_FIX || DRY_RUN ? "skipped" : "yes"}`);
	console.log();

	const generatedNames = [];
	/** @type {{ name: string, from: string }[]} */
	const generatedExports = [];
	const writtenFilesForLint = [];
	let skipped = 0;

	const inputStat = fs.statSync(INPUT);
	const inputIsDir = inputStat.isDirectory();

	for (const svgFile of svgFiles) {
		const basename = path.basename(svgFile, ".svg");
		const relFromInput = inputIsDir ? path.relative(INPUT, svgFile) : path.basename(svgFile);
		const relDirFromInput = inputIsDir ? path.dirname(relFromInput) : ".";
		const relDirParts = relDirFromInput === "." ? [] : relDirFromInput.split(path.sep).filter(Boolean);

		// Build a collision-resistant and readable name from folder segments + file name.
		const componentName = PREFIX + buildComponentSegments([...relDirParts, basename]).join("");

		const outputSubdir = path.join(OUTPUT, ...relDirParts);
		const outputFile = path.join(outputSubdir, `${componentName}.vue`);

		const isInBrandsDir = path.resolve(svgFile).startsWith(`${BRANDS_INPUT_DIR}${path.sep}`);
		// Mode rule: `--brands` converts only brands. Otherwise convert only icons.
		if (CONVERT_BRANDS ? !isInBrandsDir : (!INCLUDE_BRANDS && isInBrandsDir)) {
			continue;
		}

		const raw = fs.readFileSync(svgFile, "utf-8");
		const preserveColors = FORCE_NORMALIZE_COLORS
			? false
			: FORCE_PRESERVE_COLORS || CONVERT_BRANDS || (INCLUDE_BRANDS && isInBrandsDir);
		const { svg, viewBox, strokeDefaults } = processSvg(raw, PROPS_MODE, preserveColors);
		const vueContent = generateVueComponent(svg, componentName, viewBox, USE_TS, strokeDefaults, PROPS_MODE);

		if (DRY_RUN) {
			log("cyan", "○", `[dry-run] ${path.relative(ROOT, svgFile)} → ${path.relative(ROOT, outputFile)}`);
		}
		else {
			if (!fs.existsSync(outputSubdir)) {
				fs.mkdirSync(outputSubdir, { recursive: true });
			}
			fs.writeFileSync(outputFile, vueContent, "utf-8");
			writtenFilesForLint.push(outputFile);
			log("green", "✔", `${path.relative(ROOT, svgFile)} → ${path.relative(ROOT, outputFile)}`);
		}

		generatedNames.push(componentName);
		const from = `./${path.relative(OUTPUT, outputFile).replaceAll(path.sep, "/")}`;
		generatedExports.push({ name: componentName, from });
	}

	// Write barrel index file
	const indexFile = path.join(OUTPUT, `index.${USE_TS ? "ts" : "js"}`);

	const indexExistsAlready = fs.existsSync(indexFile);
	const outputIsDefaultIconsDir = OUTPUT === DEFAULT_OUTPUT;

	const shouldWriteIndex
		= FORCE_INDEX || CONVERT_BRANDS || (outputIsDefaultIconsDir && !indexExistsAlready);

	if (DRY_RUN) {
		if (shouldWriteIndex) {
			log("cyan", "○", `[dry-run] Index file → ${path.relative(ROOT, indexFile)}`);
		}
		else {
			log("cyan", "○", `[dry-run] Skipping index creation for: ${path.relative(ROOT, indexFile)}`);
		}
	}
	else if (shouldWriteIndex) {
		const filterBrandExports = OUTPUT === DEFAULT_OUTPUT && !CONVERT_BRANDS;
		const indexContent = generateMergedIndexFile(generatedExports, indexFile, {
			filterBrandExports,
		});
		fs.writeFileSync(indexFile, indexContent, "utf-8");
		writtenFilesForLint.push(indexFile);
		log("green", "✔", `Index file → ${path.relative(ROOT, indexFile)}`);
	}
	else {
		log("gray", " ", "Skipping index creation for subdirectory output.");
	}

	if (!DRY_RUN && !SKIP_ESLINT_FIX) {
		eslintFixGeneratedFiles(writtenFilesForLint);
	}

	console.log();
	log(
		"green",
		"✓",
		`Done! ${generatedNames.length} component(s) generated${DRY_RUN ? " (dry run)" : ""}.${skipped > 0 ? ` ${skipped} skipped.` : ""}`,
	);

	if (!DRY_RUN) {
		console.log();
		log("gray", " ", "Import example:");
		log(
			"gray",
			" ",
			`  import { ${generatedNames.slice(0, 3).join(", ")}${generatedNames.length > 3 ? ", ..." : ""} } from '@/components/icons'`,
		);
	}
}

convert();
