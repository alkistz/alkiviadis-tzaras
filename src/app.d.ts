// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Markdown files are compiled by mdsvex into Svelte components.
// Frontmatter is exposed as the named `metadata` export.
declare module '*.md' {
	import type { Component } from 'svelte';

	const component: Component;
	export default component;
	export const metadata: Record<string, unknown>;
}

export {};
