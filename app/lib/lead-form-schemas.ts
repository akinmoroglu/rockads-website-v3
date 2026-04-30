import { z } from "zod";

const countryOptionSchema = z.object({
	value: z.string().min(1, "Required"),
	label: z.string().optional(),
});

const phoneCountryCodeSchema = z.object({
	value: z.string().optional(),
	label: z.string().min(1, "Required"),
});

export const businessInfoFormSchema = z.object({
	businessName: z
		.string()
		.trim()
		.min(1, "Required")
		.max(160, "Business name is too long"),
	website: z
		.string()
		.trim()
		.min(1, "Required")
		.refine(value => /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(value), "Enter a valid URL"),
	country: countryOptionSchema,
	phoneCountryCode: phoneCountryCodeSchema,
	phoneNumber: z
		.string()
		.trim()
		.min(7, "Phone number is too short")
		.max(15, "Phone number is too long"),
});

export type BusinessInfoFormValues = z.infer<typeof businessInfoFormSchema>;

export type CountryOptionValue = z.infer<typeof countryOptionSchema>;
export type PhoneCountryCodeValue = z.infer<typeof phoneCountryCodeSchema>;
