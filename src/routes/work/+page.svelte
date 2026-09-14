<script lang="ts">
	import { resolve } from '$app/paths';
	import Page from '$lib/components/Page.svelte';

	let { data } = $props();
</script>

<Page title="Work" description="Projects, one line each.">
	<ul class="rows">
		{#each data.projects as { slug, meta } (slug)}
			<li class="row">
				<a class="name" href={resolve('/work/[slug]', { slug })}>{meta.title}</a>
				<span class="summary">{meta.summary}</span>
				{#if meta.url}
					<a class="status" href={meta.url}>{meta.status} ↗</a>
				{:else}
					<span class="status muted">{meta.status}</span>
				{/if}
			</li>
		{/each}
	</ul>
</Page>

<style>
	.row {
		display: grid;
		grid-template-columns: 14ch 1fr auto;
		gap: var(--space-2);
		padding: var(--space-2) 0;
		border-top: 1px solid var(--rule);
	}

	.rows > :last-child {
		border-bottom: 1px solid var(--rule);
	}

	.status {
		text-align: right;
	}

	.muted {
		color: var(--fg-muted);
	}

	@media (max-width: 719px) {
		.row {
			grid-template-columns: 1fr auto;
		}

		.summary {
			grid-column: 1 / -1;
			color: var(--fg-muted);
		}
	}
</style>
