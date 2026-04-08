import {
	computed,
	defineComponent,
	h,
	inject,
	onBeforeUnmount,
	onMounted,
	provide,
	ref,
	watch,
	type InjectionKey,
	type PropType,
	type Ref,
} from "vue";
import { cn } from "@/lib/utils";

type Direction = "ltr" | "rtl";
type Orientation = "horizontal" | "vertical";

function getDefaultScrollBehavior(): ScrollBehavior {
	if (!import.meta.client) {
		return "smooth";
	}

	return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

type ScrollSpyContextValue = {
	value: Ref<string>;
	offset: Ref<number>;
	scrollBehavior: Ref<ScrollBehavior>;
	dir: Ref<Direction>;
	orientation: Ref<Orientation>;
	scrollContainer: Ref<HTMLElement | null>;
	registerSection: (id: string, element: HTMLElement) => void;
	unregisterSection: (id: string) => void;
	scrollToSection: (sectionId: string) => void;
};

const SCROLL_SPY_CONTEXT = Symbol("SCROLL_SPY_CONTEXT") as InjectionKey<ScrollSpyContextValue>;

function useScrollSpyContext(name: string) {
	const context = inject(SCROLL_SPY_CONTEXT, null);

	if (!context) {
		throw new Error(`\`${name}\` must be used within \`ScrollSpy\``);
	}

	return context;
}

export const ScrollSpy = defineComponent({
	name: "ScrollSpy",
	inheritAttrs: false,
	props: {
		value: {
			type: String,
			default: undefined,
		},
		defaultValue: {
			type: String,
			default: "",
		},
		rootMargin: {
			type: String,
			default: undefined,
		},
		threshold: {
			type: [Number, Array] as PropType<number | number[]>,
			default: 0.1,
		},
		offset: {
			type: Number,
			default: 0,
		},
		scrollBehavior: {
			type: String as PropType<ScrollBehavior>,
			default: undefined,
		},
		scrollContainer: {
			type: Object as PropType<HTMLElement | null>,
			default: null,
		},
		dir: {
			type: String as PropType<Direction>,
			default: "ltr",
		},
		orientation: {
			type: String as PropType<Orientation>,
			default: "horizontal",
		},
	},
	emits: ["update:value", "valueChange"],
	setup(props, { attrs, emit, slots }) {
		const currentValue = ref(props.value ?? props.defaultValue ?? "");
		const sections = ref(new Map<string, HTMLElement>());
		const isProgrammaticScroll = ref(false);
		let rafId: number | null = null;
		let clearProgrammaticScrollId: ReturnType<typeof setTimeout> | null = null;
		let observer: IntersectionObserver | null = null;

		const scrollBehavior = computed<ScrollBehavior>(() => props.scrollBehavior ?? getDefaultScrollBehavior());
		const offset = computed(() => props.offset);
		const orientation = computed(() => props.orientation);
		const dir = computed(() => props.dir);
		const scrollContainer = computed<HTMLElement | null>(() => {
			return props.scrollContainer instanceof HTMLElement ? props.scrollContainer : null;
		});

		const setValue = (nextValue: string) => {
			if (currentValue.value === nextValue) {
				return;
			}

			currentValue.value = nextValue;
			emit("update:value", nextValue);
			emit("valueChange", nextValue);
		};

		const registerSection = (id: string, element: HTMLElement) => {
			const next = new Map(sections.value);

			next.set(id, element);
			sections.value = next;
		};

		const unregisterSection = (id: string) => {
			const next = new Map(sections.value);

			next.delete(id);
			sections.value = next;
		};

		const scrollToSection = (sectionId: string) => {
			if (!import.meta.client) {
				setValue(sectionId);

				return;
			}

			const section = scrollContainer.value
				? scrollContainer.value.querySelector<HTMLElement>(`#${sectionId}`)
				: document.getElementById(sectionId);

			if (!section) {
				setValue(sectionId);

				return;
			}

			isProgrammaticScroll.value = true;
			setValue(sectionId);

			if (scrollContainer.value) {
				const containerRect = scrollContainer.value.getBoundingClientRect();
				const sectionRect = section.getBoundingClientRect();
				const scrollTop = scrollContainer.value.scrollTop;
				const top = sectionRect.top - containerRect.top + scrollTop - offset.value;

				scrollContainer.value.scrollTo({
					top,
					behavior: scrollBehavior.value,
				});
			}
			else {
				const top = section.getBoundingClientRect().top + window.scrollY - offset.value;

				window.scrollTo({
					top,
					behavior: scrollBehavior.value,
				});
			}

			if (clearProgrammaticScrollId) {
				clearTimeout(clearProgrammaticScrollId);
			}

			clearProgrammaticScrollId = setTimeout(() => {
				isProgrammaticScroll.value = false;
			}, 500);
		};

		const setupObserver = () => {
			observer?.disconnect();
			if (!import.meta.client || sections.value.size === 0) {
				return;
			}

			const rootMargin = props.rootMargin ?? `${-offset.value}px 0px -70% 0px`;
			const observerRoot = scrollContainer.value instanceof HTMLElement ? scrollContainer.value : null;

			observer = new IntersectionObserver(
				(entries) => {
					if (isProgrammaticScroll.value) {
						return;
					}

					if (rafId !== null) {
						cancelAnimationFrame(rafId);
					}

					rafId = requestAnimationFrame(() => {
						const intersecting = entries.filter(entry => entry.isIntersecting);

						if (intersecting.length === 0) {
							return;
						}

						const topmost = intersecting.reduce((previous, current) => {
							return current.boundingClientRect.top < previous.boundingClientRect.top ? current : previous;
						});
						const id = (topmost.target as HTMLElement).id;

						if (id && sections.value.has(id)) {
							setValue(id);
						}
					});
				},
				{
					root: observerRoot,
					rootMargin,
					threshold: props.threshold,
				},
			);

			for (const element of sections.value.values()) {
				observer.observe(element);
			}
		};

		watch(
			() => props.value,
			(nextValue) => {
				if (nextValue === undefined || nextValue === currentValue.value) {
					return;
				}
				scrollToSection(nextValue);
			},
		);

		watch(
			[sections, () => props.rootMargin, () => props.threshold, () => props.offset, () => props.scrollContainer],
			() => {
				setupObserver();
			},
			{ deep: false },
		);

		onMounted(() => {
			setupObserver();
		});

		onBeforeUnmount(() => {
			observer?.disconnect();
			if (rafId !== null) {
				cancelAnimationFrame(rafId);
			}
			if (clearProgrammaticScrollId) {
				clearTimeout(clearProgrammaticScrollId);
			}
		});

		provide(SCROLL_SPY_CONTEXT, {
			value: currentValue,
			offset,
			scrollBehavior,
			dir,
			orientation,
			scrollContainer,
			registerSection,
			unregisterSection,
			scrollToSection,
		});

		return () =>
			h(
				"div",
				{
					...attrs,
					"data-orientation": orientation.value,
					"data-slot": "scroll-spy",
					"dir": dir.value,
					"class": cn("flex", orientation.value === "horizontal" ? "flex-row" : "flex-col", attrs.class as string),
				},
				slots.default?.(),
			);
	},
});

export const ScrollSpyNav = defineComponent({
	name: "ScrollSpyNav",
	inheritAttrs: false,
	setup(_, { attrs, slots }) {
		const context = useScrollSpyContext("ScrollSpyNav");

		return () =>
			h(
				"nav",
				{
					...attrs,
					"data-orientation": context.orientation.value,
					"data-slot": "scroll-spy-nav",
					"dir": context.dir.value,
					"class": cn(
						"flex gap-2",
						context.orientation.value === "horizontal" ? "flex-col" : "flex-row",
						attrs.class as string,
					),
				},
				slots.default?.(),
			);
	},
});

export const ScrollSpyLink = defineComponent({
	name: "ScrollSpyLink",
	inheritAttrs: false,
	props: {
		value: {
			type: String,
			required: true,
		},
	},
	setup(props, { attrs, slots }) {
		const context = useScrollSpyContext("ScrollSpyLink");
		const isActive = computed(() => context.value.value === props.value);

		const onClick = (event: MouseEvent) => {
			event.preventDefault();
			context.scrollToSection(props.value);
		};

		return () =>
			h(
				"a",
				{
					...attrs,
					"data-orientation": context.orientation.value,
					"data-slot": "scroll-spy-link",
					"data-state": isActive.value ? "active" : "inactive",
					"href": `#${props.value}`,
					"class": cn(
						"rounded px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-accent data-[state=active]:text-foreground",
						attrs.class as string,
					),
					"onClick": onClick,
				},
				slots.default?.(),
			);
	},
});

export const ScrollSpyViewport = defineComponent({
	name: "ScrollSpyViewport",
	inheritAttrs: false,
	setup(_, { attrs, slots }) {
		const context = useScrollSpyContext("ScrollSpyViewport");

		return () =>
			h(
				"div",
				{
					...attrs,
					"data-orientation": context.orientation.value,
					"data-slot": "scroll-spy-viewport",
					"dir": context.dir.value,
					"class": cn("flex flex-1 flex-col gap-8", attrs.class as string),
				},
				slots.default?.(),
			);
	},
});

export const ScrollSpySection = defineComponent({
	name: "ScrollSpySection",
	inheritAttrs: false,
	props: {
		value: {
			type: String,
			required: true,
		},
	},
	setup(props, { attrs, slots }) {
		const context = useScrollSpyContext("ScrollSpySection");
		const sectionRef = ref<HTMLElement | null>(null);

		onMounted(() => {
			if (sectionRef.value) {
				context.registerSection(props.value, sectionRef.value);
			}
		});

		onBeforeUnmount(() => {
			context.unregisterSection(props.value);
		});

		return () =>
			h(
				"div",
				{
					...attrs,
					"ref": sectionRef,
					"id": props.value,
					"data-orientation": context.orientation.value,
					"data-slot": "scroll-spy-section",
				},
				slots.default?.(),
			);
	},
});

export type ScrollSpyProps = InstanceType<typeof ScrollSpy>["$props"];
