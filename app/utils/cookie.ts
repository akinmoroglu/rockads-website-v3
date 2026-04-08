const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const UTM_CODES_KEY = "utm_codes";
const REFERRAL_CODE_KEY = "referral_code";
const REFERRER_KEY = "referrer";

/**
 * Read a value from localStorage (client-side only).
 * Returns `null` on server or when the key is absent.
 */
export function getCookie(key: string): string | null {
	if (!import.meta.client) return null;

	return localStorage.getItem(key);
}

/**
 * Save UTM parameters from URL query to localStorage, and store the
 * referral code and initial referrer for later attribution.
 */
export function setCookie(query: Record<string, string | string[] | undefined>): void {
	if (!import.meta.client) return;

	const utmValues: string[] = [];

	for (const key of UTM_KEYS) {
		const value = query[key];

		if (value && typeof value === "string") {
			utmValues.push(`${key}=${value}`);
		}
	}

	if (utmValues.length > 0) {
		localStorage.setItem(UTM_CODES_KEY, utmValues.join("&"));
	}

	const referralCode = query[REFERRAL_CODE_KEY];

	if (referralCode && typeof referralCode === "string") {
		localStorage.setItem(REFERRAL_CODE_KEY, referralCode);
	}

	if (!localStorage.getItem(REFERRER_KEY) && document.referrer) {
		localStorage.setItem(REFERRER_KEY, document.referrer);
	}
}

export function getReferralCode(): string | undefined {
	if (!import.meta.client) return undefined;

	return localStorage.getItem(REFERRAL_CODE_KEY) ?? undefined;
}

export function clearReferrer(): void {
	if (!import.meta.client) return;

	localStorage.removeItem(REFERRER_KEY);
}
