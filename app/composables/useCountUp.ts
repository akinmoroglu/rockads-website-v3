import { ref, onMounted, onUnmounted } from "vue";

interface CountUpOptions {
	from?: number;
	to: number;
	duration?: number;
	delay?: number;
	direction?: "up" | "down";
	separator?: string;
	suffix?: string;
}

export function useCountUp(options: CountUpOptions) {
	const {
		from = 0,
		to,
		duration = 2,
		delay = 0,
		direction = "up",
		separator = "",
		suffix = "",
	} = options;

	const damping = 20 + 40 * (1 / duration);
	const stiffness = 100 * (1 / duration);

	function getDecimalPlaces(num: number): number {
		const str = num.toString();
		if (str.includes(".")) {
			const decimals = str.split(".")[1];
			if (decimals && parseInt(decimals) !== 0)
				return decimals.length;
		}
		return 0;
	}

	const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

	function formatNumber(value: number): string {
		const opts: Intl.NumberFormatOptions = {
			useGrouping: !!separator,
			minimumFractionDigits: maxDecimals > 0 ? maxDecimals : 0,
			maximumFractionDigits: maxDecimals > 0 ? maxDecimals : 0,
		};
		const formatted = Intl.NumberFormat("en-US", opts).format(value);
		const result = separator ? formatted.replace(/,/g, separator) : formatted;
		return result + suffix;
	}

	const initialValue = direction === "down" ? to : from;
	const displayValue = ref(formatNumber(initialValue));
	const elementRef = ref<HTMLElement | null>(null);
	const hasAnimated = ref(false);

	let observer: IntersectionObserver | null = null;
	let animationCleanup: (() => void) | null = null;

	function animateSpring() {
		const startValue = direction === "down" ? to : from;
		const endValue = direction === "down" ? from : to;

		let currentValue = startValue;
		let velocity = 0;
		let animationFrame: number | null = null;
		let lastTime: number | null = null;

		function step(timestamp: number) {
			if (lastTime === null) {
				lastTime = timestamp;
				animationFrame = requestAnimationFrame(step);
				return;
			}

			const dt = Math.min((timestamp - lastTime) / 1000, 0.064);
			lastTime = timestamp;

			const displacement = currentValue - endValue;
			const springForce = -stiffness * displacement;
			const dampingForce = -damping * velocity;

			velocity += (springForce + dampingForce) * dt;
			currentValue += velocity * dt;

			displayValue.value = formatNumber(currentValue);

			if (Math.abs(velocity) < 0.01 && Math.abs(currentValue - endValue) < 0.5) {
				displayValue.value = formatNumber(endValue);
				return;
			}

			animationFrame = requestAnimationFrame(step);
		}

		animationFrame = requestAnimationFrame(step);

		return () => {
			if (animationFrame) cancelAnimationFrame(animationFrame);
		};
	}

	onMounted(() => {
		if (!elementRef.value || typeof IntersectionObserver === "undefined") return;

		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && !hasAnimated.value) {
					hasAnimated.value = true;
					if (delay > 0) {
						setTimeout(() => {
							animationCleanup = animateSpring();
						}, delay * 1000);
					}
					else {
						animationCleanup = animateSpring();
					}
				}
			},
			{ threshold: 0.1 },
		);

		observer.observe(elementRef.value);
	});

	onUnmounted(() => {
		observer?.disconnect();
		animationCleanup?.();
	});

	return { displayValue, elementRef };
}
