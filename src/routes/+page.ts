import { resolve } from '$app/paths';
import { projects } from '$lib/content';

export function load() {
	return {
		projects: projects
			.slice(0, 3)
			.map((p) => ({ label: `${p.slug}/`, href: resolve('/work/[slug]', { slug: p.slug }) }))
	};
}
