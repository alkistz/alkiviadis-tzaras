import { projects } from '$lib/content';

export function load() {
	return { projects: projects.map(({ slug, meta }) => ({ slug, meta })) };
}
