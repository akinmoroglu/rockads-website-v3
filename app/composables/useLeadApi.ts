import { createLead } from "~/services/leadService";
import type { CreateLeadParams } from "~/models/lead";

export function useLeadApi() {
	const config = useRuntimeConfig();
	const session = useAuthSession();

	const baseURL = (config.public.goApiURL as string).replace(/\/$/, "");

	return {
		createLead(params: CreateLeadParams) {
			const token = session.accessToken.value ?? undefined;

			return createLead(baseURL, params, token);
		},
	};
}
