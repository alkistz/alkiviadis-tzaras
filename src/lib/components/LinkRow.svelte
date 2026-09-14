<script lang="ts">
	import { page } from '$app/state';
	import type { ResolvedPathname } from '$app/types';

	export type ExternalHref = `http://${string}` | `https://${string}` | `mailto:${string}`;

	export interface Link {
		label: string;
		/** Internal links are pre-resolved with `resolve()`; external ones are absolute URLs. */
		href: ResolvedPathname | ExternalHref;
		/** Render in --fg-muted instead of --accent. Used for nav, footer and placeholders. */
		muted?: boolean;
	}

	interface Props {
		links: readonly Link[];
		/** `nav` uses the wider top-bar gap; `row` is the default. */
		gap?: 'nav' | 'row';
		/** Accessible name for the navigation landmark. */
		label: string;
	}

	let { links, gap = 'row', label }: Props = $props();

	const isExternal = (href: Link['href']): href is ExternalHref => /^(https?:|mailto:)/.test(href);
	const isCurrent = (href: string) =>
		page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
</script>

<nav aria-label={label}>
	<ul class={['links', gap]}>
		{#each links as { label, href, muted } (href)}
			<li>
				{#if isExternal(href)}
					<a {href} class={{ muted }} rel="me external">{label}</a>
				{:else}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- `href` is typed ResolvedPathname; callers resolve() it -->
					<a {href} class={{ muted }} aria-current={isCurrent(href) ? 'page' : undefined}>{label}</a
					>
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<style>
	.links {
		display: flex;
		flex-wrap: wrap;
		column-gap: var(--space-3);
		row-gap: var(--space-1);
	}

	.nav {
		column-gap: var(--space-4);
	}

	@media (max-width: 719px) {
		.nav {
			column-gap: var(--space-2);
		}
	}

	.muted {
		color: var(--fg-muted);
	}

	.muted:hover,
	.muted:focus-visible {
		color: var(--fg-strong);
	}
</style>
