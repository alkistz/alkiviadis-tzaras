import type { Component } from 'svelte';

export type ProjectStatus = 'live' | 'wip' | 'archived';

export interface ProjectMeta {
	title: string;
	summary: string;
	url?: `https://${string}`;
	repo?: `https://${string}`;
	stack: string[];
	status: ProjectStatus;
	/** ISO date (YYYY-MM-DD). Lists are sorted by it, newest first. */
	date: string;
}

export interface PostMeta {
	title: string;
	/** ISO date (YYYY-MM-DD). Lists are sorted by it, newest first. */
	date: string;
	summary: string;
	/** Drafts are excluded from lists, the sitemap and the build. */
	draft?: boolean;
}

export interface Entry<M> {
	slug: string;
	meta: M;
	/** The compiled markdown body. */
	content: Component;
}

interface Markdown<M> {
	default: Component;
	metadata: M;
}

// The site is prerendered, so everything can be imported eagerly at build time.
const projectModules = import.meta.glob<Markdown<ProjectMeta>>('./projects/*.md', { eager: true });
const postModules = import.meta.glob<Markdown<PostMeta>>('./posts/*.md', { eager: true });

function slugOf(path: string): string {
	return path.slice(path.lastIndexOf('/') + 1).replace(/\.md$/, '');
}

function collect<M extends { date: string }>(modules: Record<string, Markdown<M>>): Entry<M>[] {
	return Object.entries(modules)
		.map(([path, mod]) => ({
			slug: slugOf(path),
			// YAML parses unquoted dates as Date objects; keep only the YYYY-MM-DD part either way.
			meta: { ...mod.metadata, date: String(mod.metadata.date).slice(0, 10) },
			content: mod.default
		}))
		.sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export const projects: Entry<ProjectMeta>[] = collect(projectModules);

export const posts: Entry<PostMeta>[] = collect(postModules).filter((post) => !post.meta.draft);

export function getProject(slug: string): Entry<ProjectMeta> | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getPost(slug: string): Entry<PostMeta> | undefined {
	return posts.find((p) => p.slug === slug);
}
