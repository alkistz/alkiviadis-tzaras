<script lang="ts">
	import { page } from '$app/state';
	import { nav, site } from '$lib/site';
	import LinkRow from './LinkRow.svelte';

	// `~/alkis` on the homepage, `~/alkis/writing` and so on elsewhere.
	const cwd = $derived(`~/${site.handle}${page.url.pathname.replace(/\/$/, '')}`);
	const links = nav.map((link) => ({ ...link, muted: true }));
</script>

<header class="bar">
	<span class="cwd" aria-hidden="true">{cwd}</span>
	<LinkRow {links} gap="nav" label="Site" />
</header>

<style>
	.bar {
		display: flex;
		justify-content: space-between;
		gap: var(--space-2);
		font-size: var(--text-xs);
	}

	.cwd {
		color: var(--fg-faint);
	}
</style>
