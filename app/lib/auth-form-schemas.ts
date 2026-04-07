import { z } from "zod";

export const signInFormSchema = z.object({
	email: z.string().email("Enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

export const signUpFormSchema = z
	.object({
		name: z.string().min(1, "Name is required").max(120),
		email: z.string().email("Enter a valid email address"),
		password: z.string().min(8, "Use at least 8 characters"),
		password_confirmation: z.string().min(1, "Confirm your password"),
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

export const verifyEmailTokenFormSchema = z.object({
	token: z.string().min(8, "Enter the verification token from your email"),
});

export const resendVerificationFormSchema = z.object({
	email: z.string().email("Enter a valid email address"),
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
