import type { DirectiveBinding } from "vue";

const STATE = Symbol("numericOnly");

type State = { maxLength: number };
type ElWithState = HTMLInputElement & { [STATE]?: State };

function getMaxLength(binding: DirectiveBinding): number {
	return typeof binding.value === "number" && binding.value > 0
		? binding.value
		: Number.POSITIVE_INFINITY;
}

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("numeric-only", {
		mounted(el: ElWithState, binding) {
			if (el.tagName !== "INPUT") return;

			const state: State = { maxLength: getMaxLength(binding) };

			el[STATE] = state;

			const onInput = () => {
				const cursor = el.selectionStart ?? el.value.length;
				const digitsBeforeCursor = el.value
					.slice(0, cursor)
					.replace(/\D/g, "").length;
				const cleaned = el.value
					.replace(/\D/g, "")
					.slice(0, state.maxLength);

				if (el.value === cleaned) return;

				el.value = cleaned;
				const next = Math.min(digitsBeforeCursor, cleaned.length);

				el.setSelectionRange(next, next);
			};

			el.addEventListener("input", onInput, { capture: true });
		},
		updated(el: ElWithState, binding) {
			const state = el[STATE];

			if (state) state.maxLength = getMaxLength(binding);
		},
	});
});
