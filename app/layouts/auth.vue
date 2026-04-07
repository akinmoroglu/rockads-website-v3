<template>
	<div class="flex min-h-screen flex-col bg-background text-foreground">
		<AuthHeader />
		<main
			class="flex flex-1 flex-col justify-center px-5 py-10"
		>
			<div class="mx-auto w-full max-w-md">
				<slot />
			</div>
		</main>
		<AuthFooter />
	</div>
</template>
