import { posts, projects } from '$lib/content';
import { site } from '$lib/site';

export const prerender = true;

export function GET() {
	const paths = [
		'/',
		'/work',
		...projects.map((p) => `/work/${p.slug}`),
		'/writing',
		...posts.map((p) => `/writing/${p.slug}`),
		'/about'
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `\t<url><loc>${new URL(path, site.url).href}</loc></url>`).join('\n')}
</urlset>
`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'max-age=0, s-maxage=3600' }
	});
}
