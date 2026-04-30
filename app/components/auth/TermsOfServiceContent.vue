<script setup lang="ts">
import { computed } from "vue";
import termsMarkdown from "@/assets/terms-of-service.md?raw";

/**
 * Tiny line-based renderer — handles only the subset of Markdown produced by
 * our Terms of Service source: headings (`#`/`##`/`###`), horizontal rules
 * (`---`), unordered lists (`-`/`*`), ordered lists (`1.`), and `**bold**`
 * inline emphasis. Anything else is rendered as a paragraph.
 *
 * We deliberately avoid `v-html` on user-facing input — the source file is
 * trusted, but we still escape special chars to keep the renderer hermetic.
 */
type Block
	= | { type: "h1" | "h2" | "h3"; text: string }
		| { type: "p"; text: string }
		| { type: "ul"; items: string[] }
		| { type: "ol"; items: string[] }
		| { type: "hr" };

function escapeHtml(input: string): string {
	return input
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

function renderInline(text: string): string {
	return escapeHtml(text).replace(
		/\*\*([^*]+)\*\*/g,
		"<strong>$1</strong>",
	);
}

function parseMarkdown(source: string): Block[] {
	const lines = source.split("\n");
	const blocks: Block[] = [];
	let buffer: string[] = [];
	let listItems: string[] = [];
	let listType: "ul" | "ol" | null = null;

	function flushParagraph() {
		if (buffer.length === 0) return;
		const text = buffer.join(" ").trim();

		if (text) blocks.push({ type: "p", text });
		buffer = [];
	}

	function flushList() {
		if (!listType || listItems.length === 0) {
			listType = null;
			listItems = [];

			return;
		}
		blocks.push({ type: listType, items: listItems });
		listType = null;
		listItems = [];
	}

	for (const rawLine of lines) {
		const line = rawLine.trimEnd();

		if (!line.trim()) {
			flushParagraph();
			flushList();
			continue;
		}

		if (line.trim() === "---") {
			flushParagraph();
			flushList();
			blocks.push({ type: "hr" });
			continue;
		}

		const heading = /^(#{1,3})\s+(.*)$/.exec(line);

		if (heading) {
			flushParagraph();
			flushList();
			const level = heading[1]!.length as 1 | 2 | 3;
			const type = (`h${level}`) as "h1" | "h2" | "h3";

			blocks.push({ type, text: heading[2]!.trim() });
			continue;
		}

		const ulMatch = /^[-*]\s+(.*)$/.exec(line.trim());

		if (ulMatch) {
			flushParagraph();
			if (listType !== "ul") flushList();
			listType = "ul";
			listItems.push(ulMatch[1]!);
			continue;
		}

		const olMatch = /^\d+\.\s+(.*)$/.exec(line.trim());

		if (olMatch) {
			flushParagraph();
			if (listType !== "ol") flushList();
			listType = "ol";
			listItems.push(olMatch[1]!);
			continue;
		}

		flushList();
		buffer.push(line.trim());
	}
	flushParagraph();
	flushList();

	return blocks;
}

const blocks = computed(() => parseMarkdown(termsMarkdown));
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
	<div class="space-y-3 text-sm leading-relaxed text-foreground">
		<template
			v-for="(block, index) in blocks"
			:key="index"
		>
			<h1
				v-if="block.type === 'h1'"
				class="mt-4 text-xl font-semibold tracking-tight"
				v-html="renderInline(block.text)"
			/>
			<h2
				v-else-if="block.type === 'h2'"
				class="mt-6 text-lg font-semibold tracking-tight"
				v-html="renderInline(block.text)"
			/>
			<h3
				v-else-if="block.type === 'h3'"
				class="mt-4 text-base font-semibold"
				v-html="renderInline(block.text)"
			/>
			<hr
				v-else-if="block.type === 'hr'"
				class="my-4 border-border"
			>
			<ul
				v-else-if="block.type === 'ul'"
				class="ml-5 list-disc space-y-1"
			>
				<li
					v-for="(item, i) in block.items"
					:key="i"
					v-html="renderInline(item)"
				/>
			</ul>
			<ol
				v-else-if="block.type === 'ol'"
				class="ml-5 list-decimal space-y-1"
			>
				<li
					v-for="(item, i) in block.items"
					:key="i"
					v-html="renderInline(item)"
				/>
			</ol>
			<p
				v-else
				class="text-muted-foreground"
				v-html="renderInline(block.text)"
			/>
		</template>
	</div>
</template>
