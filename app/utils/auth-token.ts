/**
 * Reads a JWT string from common API response shapes.
 * Supports: `access_token`, `accessToken`, `token`, and the same keys under `data`.
 */
export function extractAccessToken(payload: unknown): string | null {
	if (payload === null || payload === undefined) {
		return null;
	}
	if (typeof payload === "string") {
		const trimmed = payload.trim();

		return trimmed.length > 0 ? trimmed : null;
	}
	if (typeof payload !== "object") {
		return null;
	}

	const root = payload as Record<string, unknown>;
	const direct = root.access_token ?? root.accessToken ?? root.token;

	if (typeof direct === "string") {
		const t = direct.trim();

		if (t.length > 0) return t;
	}

	const nested = root.data;

	if (nested && typeof nested === "object") {
		const data = nested as Record<string, unknown>;
		const inner = data.access_token ?? data.accessToken ?? data.token;

		if (typeof inner === "string") {
			const t = inner.trim();

			if (t.length > 0) return t;
		}
	}

	return null;
}
