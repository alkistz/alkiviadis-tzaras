import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import type { PreprocessorGroup } from 'svelte/compiler';
import { defineConfig } from 'vite';

/** mdsvex 0.12 still emits `<script context="module">`, which Svelte 5 deprecates. */
const mdsvexModuleScript: PreprocessorGroup = {
	name: 'mdsvex-module-script',
	markup: ({ content, filename }) =>
		filename?.endsWith('.md')
			? { code: content.replace('<script context="module">', '<script module>') }
			: undefined
};

export default defineConfig({
	plugins: [
		sveltekit({
			extensions: ['.svelte', '.md'],
			preprocess: [mdsvex({ extensions: ['.md'] }), mdsvexModuleScript],
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// Fully static site: every route is prerendered (see src/routes/+layout.ts)
			// and the output in build/ can be served by any static host.
			adapter: adapter()
		})
	]
});
