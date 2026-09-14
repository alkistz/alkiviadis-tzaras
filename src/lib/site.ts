import { resolve } from '$app/paths';

/**
 * The one place for personal strings. Nothing personal is hard-coded in components.
 */
export const site = {
	name: 'Alkis Tzaras',
	/** Shown as the working directory in the top bar: `~/alkis`. */
	handle: 'alkis',
	/** Canonical origin, used for absolute URLs in metadata and the sitemap. */
	url: 'https://tzaras.dev',
	description: 'Backend & AI engineer in Brussels. Economist underneath.',
	role: {
		primary: 'Backend & AI engineer.',
		secondary: 'Economist underneath.'
	},
	location: 'Brussels',
	email: 'atzaras@pm.me',
	github: 'https://github.com/alkistz',
	linkedin: 'https://www.linkedin.com/in/alkiviadis-tzaras',
	/** Path to the CV under static/. Set to '/cv.pdf' once the file is in place. */
	cv: undefined as string | undefined
} as const;

export const nav = [
	{ label: 'work', href: resolve('/work') },
	{ label: 'writing', href: resolve('/writing') },
	{ label: 'about', href: resolve('/about') }
] as const;

export const social = [
	{ label: 'github', href: site.github },
	{ label: 'linkedin', href: site.linkedin },
	{ label: 'email', href: `mailto:${site.email}` }
] as const;
