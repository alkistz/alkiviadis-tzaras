<script lang="ts">
	import { resolve } from '$app/paths';
	import Page from '$lib/components/Page.svelte';

	let { data } = $props();
</script>

<Page title="Writing" description="Notes and longer posts.">
	{#if data.posts.length === 0}
		<p class="muted">Nothing here yet.</p>
	{:else}
		<ul class="rows">
			{#each data.posts as { slug, meta } (slug)}
				<li class="row">
					<time class="muted" datetime={meta.date}>{meta.date}</time>
					<a href={resolve('/writing/[slug]', { slug })}>{meta.title}</a>
				</li>
			{/each}
		</ul>
	{/if}
</Page>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		padding: var(--space-2) 0;
		border-top: 1px solid var(--rule);
	}

	.rows > :last-child {
		border-bottom: 1px solid var(--rule);
	}

	.muted {
		color: var(--fg-muted);
	}
</style>
