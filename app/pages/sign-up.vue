<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

definePageMeta({
	layout: "auth",
});

useHead({
	title: "Sign Up - Rockads",
});
</script>

<template>
	<Card class="w-full">
		<CardHeader class="space-y-1">
			<CardTitle class="text-2xl">
				Create your account
			</CardTitle>
			<CardDescription>
				Start with Rockads and scale with confidence.
			</CardDescription>
		</CardHeader>
		<CardContent>
			<form class="space-y-4">
				<div class="space-y-2">
					<Label for="full-name">Full name</Label>
					<Input
						id="full-name"
						type="text"
						placeholder="Jane Doe"
					/>
				</div>
				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="you@company.com"
					/>
				</div>
				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input
						id="password"
						type="password"
						placeholder="Create a secure password"
					/>
				</div>
				<Button class="w-full">
					Create Account
				</Button>
			</form>
		</CardContent>
		<CardFooter class="justify-center text-sm text-muted-foreground">
			Already have an account?
			<NuxtLink
				to="/sign-in"
				class="ml-1 font-medium text-primary hover:underline"
			>
				Sign in
			</NuxtLink>
		</CardFooter>
	</Card>
</template>
