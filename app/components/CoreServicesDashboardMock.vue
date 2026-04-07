<script setup lang="ts">
/**
 * Simplified static preview of the Rockads dashboard for the Core Services page.
 * Matches the Figma section intent without embedding a full product UI.
 */
</script>

<template>
	<div
		class="core-dash-root text-foreground shadow-lg"
		aria-hidden="true"
	>
		<div class="core-dash-chrome rounded-t-xl border border-border bg-muted/60 px-3 py-2">
			<div class="flex items-center gap-2">
				<span class="size-2.5 rounded-full bg-red-400/90" />
				<span class="size-2.5 rounded-full bg-amber-400/90" />
				<span class="size-2.5 rounded-full bg-emerald-400/90" />
				<div class="ml-2 flex min-h-8 flex-1 items-center rounded-md border border-border bg-background px-3 text-[11px] text-muted-foreground">
					console.rockads.com/
				</div>
			</div>
		</div>
		<div class="flex min-h-[280px] rounded-b-xl border border-t-0 border-border bg-card md:min-h-[320px]">
			<aside class="flex w-12 shrink-0 flex-col items-center gap-3 border-r border-border py-4">
				<span class="size-7 rounded-md bg-primary/15" />
				<span class="size-7 rounded-md bg-primary" />
				<span class="size-7 rounded-md bg-muted" />
				<span class="size-7 rounded-md bg-muted" />
				<span class="size-7 rounded-md bg-muted" />
			</aside>
			<div class="min-w-0 flex-1 p-3 md:p-4">
				<div class="flex items-center justify-between gap-2 border-b border-border pb-3">
					<span class="text-sm font-semibold">Dashboard</span>
					<div class="flex gap-1.5">
						<span class="size-6 rounded bg-muted" />
						<span class="size-6 rounded bg-muted" />
						<span class="size-6 rounded bg-muted" />
						<span class="size-6 rounded-full bg-primary/20" />
					</div>
				</div>
				<div class="mt-3 flex flex-wrap gap-2">
					<span class="h-7 min-w-[72px] rounded-md border border-border bg-muted/40" />
					<span class="h-7 min-w-[88px] rounded-md border border-border bg-muted/40" />
					<span class="h-7 min-w-[64px] rounded-md border border-border bg-muted/40" />
				</div>
				<div class="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
					<div
						v-for="i in 4"
						:key="i"
						class="rounded-lg border border-border bg-background p-2 shadow-sm"
					>
						<div class="h-2 w-16 rounded bg-muted" />
						<div class="mt-2 h-5 w-20 rounded bg-foreground/10" />
						<div class="mt-2 h-2 w-10 rounded bg-emerald-500/40" />
					</div>
				</div>
				<div class="mt-3 grid gap-3 lg:grid-cols-[1fr_minmax(0,120px)]">
					<div class="rounded-lg border border-border bg-background p-3">
						<div class="h-2 w-24 rounded bg-muted" />
						<div class="mt-3 h-[100px] rounded-md bg-linear-to-t from-primary/15 to-transparent" />
					</div>
					<div class="flex flex-col gap-2">
						<div class="h-10 rounded-lg border border-border bg-background p-2">
							<div class="h-2 w-full rounded bg-muted" />
						</div>
						<div class="h-10 rounded-lg border border-border bg-background p-2">
							<div class="h-2 w-full rounded bg-muted" />
						</div>
						<div class="h-2 w-full rounded-full bg-primary/25" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.core-dash-root {
	font-size: 12px;
	line-height: 1.3;
}
</style>
