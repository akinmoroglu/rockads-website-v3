export type EmailProviderInfo = {
	url: string;
	isFallback: boolean;
};

const PROVIDER_URLS: Record<string, string> = {
	"gmail.com": "https://mail.google.com",
	"googlemail.com": "https://mail.google.com",
	"outlook.com": "https://outlook.live.com",
	"hotmail.com": "https://outlook.live.com",
	"live.com": "https://outlook.live.com",
	"yahoo.com": "https://mail.yahoo.com",
	"icloud.com": "https://www.icloud.com/mail",
	"me.com": "https://www.icloud.com/mail",
};

export function getEmailProviderInfo(email: string): EmailProviderInfo {
	const domain = email.split("@")[1]?.toLowerCase().trim() ?? "";
	const url = PROVIDER_URLS[domain];

	if (url) {
		return { url, isFallback: false };
	}

	return {
		url: email ? `mailto:${email}` : "mailto:",
		isFallback: true,
	};
}
