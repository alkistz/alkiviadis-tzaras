import { error } from '@sveltejs/kit';
import { getPost, posts } from '$lib/content';

export const entries = () => posts.map(({ slug }) => ({ slug }));

export function load({ params }) {
	const post = getPost(params.slug);
	if (!post) error(404, 'Not found');

	return { meta: post.meta, content: post.content };
}
