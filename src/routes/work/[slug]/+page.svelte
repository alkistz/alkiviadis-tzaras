<script lang="ts">
	import Page from '$lib/components/Page.svelte';

	let { data } = $props();
	const Content = $derived(data.content);
</script>

<Page title={data.meta.title} description={data.meta.summary}>
	{#snippet meta()}
		<time datetime={data.meta.date}>{data.meta.date.slice(0, 7)}</time>
		· {data.meta.status}
		· {data.meta.stack.join(', ')}
		{#if data.meta.url}
			· <a href={data.meta.url}>live ↗</a>
		{/if}
		{#if data.meta.repo}
			· <a href={data.meta.repo}>source ↗</a>
		{/if}
	{/snippet}

	<Content />
</Page>
