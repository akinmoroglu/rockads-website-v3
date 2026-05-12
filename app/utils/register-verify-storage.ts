const STORAGE_KEY = "register.verify-state";

export type RegisterVerifyState = {
	email: string;
	resendStartedAt: number;
};

export const REGISTER_VERIFY_QUERY = {
	key: "status",
	value: "verify-email",
} as const;

function isValidState(value: unknown): value is RegisterVerifyState {
	if (!value || typeof value !== "object") return false;
	const candidate = value as Record<string, unknown>;

	return typeof candidate.email === "string"
		&& candidate.email.length > 0
		&& typeof candidate.resendStartedAt === "number"
		&& Number.isFinite(candidate.resendStartedAt);
}

export function readRegisterVerifyState(): RegisterVerifyState | null {
	if (!import.meta.client) return null;
	try {
		const raw = window.sessionStorage.getItem(STORAGE_KEY);

		if (!raw) return null;
		const parsed = JSON.parse(raw);

		return isValidState(parsed) ? parsed : null;
	}
	catch {
		return null;
	}
}

export function writeRegisterVerifyState(state: RegisterVerifyState): void {
	if (!import.meta.client) return;
	try {
		window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	}
	catch {
		// Storage may be unavailable (private mode, quota); proceed without persistence.
	}
}

export function clearRegisterVerifyState(): void {
	if (!import.meta.client) return;
	try {
		window.sessionStorage.removeItem(STORAGE_KEY);
	}
	catch {
		//
	}
}
