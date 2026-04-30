import { z } from "zod";

export const signInFormSchema = z.object({
	email: z.string().email("Enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

export const signUpFormSchema = z
	.object({
		name: z
			.string()
			.min(3, "Name must be at least 3 characters")
			.max(128, "Name is too long"),
		email: z.string().email("Enter a valid email address"),
		password: z
			.string()
			.min(8, "Use at least 8 characters")
			.max(128, "Password is too long")
			.regex(
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
				"Password must contain at least one uppercase letter, one lowercase letter, and one number",
			),
		password_confirmation: z.string().min(1, "Confirm your password"),
		accept_terms: z.boolean().refine(val => val === true, {
			message:
				"You must accept the service agreement, privacy policy, and cookie policy.",
		}),
	})
	.refine(data => data.password === data.password_confirmation, {
		message: "Passwords do not match",
		path: ["password_confirmation"],
	});

export const forgotPasswordFormSchema = z.object({
	email: z.string().email("Enter a valid email address"),
});

export const resetPasswordFormSchema = z
	.object({
		password: z.string().min(8, "Use at least 8 characters"),
		password_confirmation: z.string().min(1, "Confirm your password"),
	})
	.refine(data => data.password === data.password_confirmation, {
		message: "Passwords do not match",
		path: ["password_confirmation"],
	});

export const facebookVerifyFormSchema = z.object({
	facebookProfile: z
		.string()
		.min(1, "Facebook profile URL is required")
		.regex(
			/^(https?:\/\/)?(www\.)?facebook\.com\/(profile\.php\?id=\d+|[a-zA-Z0-9.]{3,})$/,
			"Enter a valid Facebook profile URL (e.g. facebook.com/yourname)",
		),
});

export const acceptInvitationFormSchema = z
	.object({
		name: z.string().max(120, "Name is too long"),
		password: z.string().min(8, "Use at least 8 characters"),
		password_confirmation: z.string().min(1, "Confirm your password"),
	})
	.refine(data => data.password === data.password_confirmation, {
		message: "Passwords do not match",
		path: ["password_confirmation"],
	});
