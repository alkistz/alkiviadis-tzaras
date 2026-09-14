import { error } from '@sveltejs/kit';
import { getProject, projects } from '$lib/content';

export const entries = () => projects.map(({ slug }) => ({ slug }));

export function load({ params }) {
	const project = getProject(params.slug);
	if (!project) error(404, 'Not found');

	return { meta: project.meta, content: project.content };
}
