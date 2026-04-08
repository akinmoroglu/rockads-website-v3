/**
 * Normalizes backend error payloads from $fetch / ofetch failures.
 * Expects JSON bodies like `{ message: string }` or `{ error: string }`
 * or Laravel-style `{ message, errors: { field: string[] } }`.
 */
export function extractAuthErrorMessage(error: unknown): string {
	if (error && typeof error === "object") {
		const maybe = error as {
			data?: unknown;
			message?: unknown;
		};

		const data = maybe.data;

		if (data && typeof data === "object") {
			const body = data as {
				message?: unknown;
				error?: unknown;
				errors?: Record<string, string[] | string>;
			};

			if (typeof body.message === "string" && body.message.length > 0) {
				return body.message;
			}
			if (typeof body.error === "string" && body.error.length > 0) {
				return body.error;
			}
			if (body.errors && typeof body.errors === "object") {
				const firstKey = Object.keys(body.errors)[0];
				const val = firstKey ? body.errors[firstKey] : undefined;

				if (Array.isArray(val) && val[0]) return String(val[0]);
				if (typeof val === "string") return val;
			}
		}

		if (typeof maybe.message === "string" && maybe.message.length > 0) {
			return maybe.message;
		}
	}

	return "Something went wrong. Please try again.";
}
