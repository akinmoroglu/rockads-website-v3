import { AUTH_ACCESS_TOKEN_STORAGE_KEY } from "@/lib/auth-session-storage";

/**
 * Holds the JWT for `Authorization: Bearer` and mirrors it to localStorage on the client.
 * On full page load, `app/plugins/auth-session.client.ts` hydrates state from localStorage.
 */
export function useAuthSession() {
	const accessToken = useState<string | null>("auth.accessToken", () => null);

	function setAccessToken(token: string | null) {
		const next = token?.trim() || null;
		accessToken.value = next;
		if (import.meta.client) {
			if (next) {
				localStorage.setItem(AUTH_ACCESS_TOKEN_STORAGE_KEY, next);
			}
			else {
				localStorage.removeItem(AUTH_ACCESS_TOKEN_STORAGE_KEY);
			}
		}
	}

	function clearAccessToken() {
		setAccessToken(null);
	}

	const isAuthenticated = computed(() => Boolean(accessToken.value));

	return {
		accessToken: readonly(accessToken),
		isAuthenticated,
		setAccessToken,
		clearAccessToken,
	};
}
