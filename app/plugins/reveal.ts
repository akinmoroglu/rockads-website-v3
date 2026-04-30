export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("reveal", {
		getSSRProps() {
			return {};
		},

		mounted(el: HTMLElement, binding) {
			const amount: number = binding.value?.amount ?? 0.15;

			// Respect reduced motion preference – skip animation, show immediately
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				el.classList.add("in-view");

				return;
			}

			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						el.classList.add("in-view");
						observer.unobserve(el);
					}
				},
				{ threshold: amount },
			);

			observer.observe(el)
			;(el as any).__revealObserver = observer;
		},

		unmounted(el: HTMLElement) {
			;(el as any).__revealObserver?.disconnect();
		},
	});
});
