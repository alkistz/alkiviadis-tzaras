<script lang="ts">
	import Page from '$lib/components/Page.svelte';

	let { data } = $props();
	const Content = $derived(data.content);
</script>

<Page title={data.meta.title} description={data.meta.summary}>
	{#snippet meta()}
		<time datetime={data.meta.date}>{data.meta.date}</time>
	{/snippet}

	<Content />
</Page>
