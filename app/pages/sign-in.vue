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
	title: "Sign In - Rockads",
});
</script>

<template>
	<Card class="w-full">
		<CardHeader class="space-y-1">
			<CardTitle class="text-2xl">
				Welcome back
			</CardTitle>
			<CardDescription>
				Sign in to continue managing your campaigns.
			</CardDescription>
		</CardHeader>
		<CardContent>
			<form class="space-y-4">
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
						placeholder="Enter your password"
					/>
				</div>
				<Button class="w-full">
					Sign In
				</Button>
			</form>
		</CardContent>
		<CardFooter class="justify-center text-sm text-muted-foreground">
			No account yet?
			<NuxtLink
				to="/sign-up"
				class="ml-1 font-medium text-primary hover:underline"
			>
				Create one
			</NuxtLink>
		</CardFooter>
	</Card>
</template>
