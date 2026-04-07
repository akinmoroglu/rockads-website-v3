import type { ComputedRef, InjectionKey, Ref } from "vue";

export type ScrollSpyDirection = "ltr" | "rtl";
export type ScrollSpyOrientation = "horizontal" | "vertical";

export interface ScrollSpyContextValue {
	offset: number;
	scrollBehavior: ScrollBehavior;
	dir: ComputedRef<ScrollSpyDirection>;
	orientation: ScrollSpyOrientation;
	scrollContainer: HTMLElement | null;
	isScrollingRef: Ref<boolean>;
	activeId: Ref<string>;
	onSectionRegister: (id: string, element: Element) => void;
	onSectionUnregister: (id: string) => void;
	onScrollToSection: (sectionId: string) => void;
}

export const SCROLL_SPY_CONTEXT_KEY: InjectionKey<ScrollSpyContextValue> = Symbol("ScrollSpyContext");
