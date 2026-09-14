<script lang="ts">
	import { site, social } from '$lib/site';
	import LinkRow from './LinkRow.svelte';

	const links = social.map((link) => ({ ...link, muted: true }));
</script>

<footer class="bar">
	<span class="location">{site.location}</span>
	<LinkRow {links} label="Elsewhere" />
</footer>

<style>
	.bar {
		display: flex;
		justify-content: space-between;
		gap: var(--space-2);
		font-size: var(--text-xs);
	}

	.location {
		color: var(--fg-faint);
	}
</style>
