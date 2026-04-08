import { AUTH_ACCESS_TOKEN_STORAGE_KEY } from "@/lib/auth-session-storage";

/**
 * Restores JWT from localStorage into shared state after a full page load.
 */
export default defineNuxtPlugin(() => {
	const accessToken = useState<string | null>("auth.accessToken", () => null);

	if (accessToken.value) return;

	const stored = localStorage.getItem(AUTH_ACCESS_TOKEN_STORAGE_KEY);

	if (stored) {
		const t = stored.trim();

		if (t.length > 0) accessToken.value = t;
	}
});
