<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Page from '$lib/components/Page.svelte';

	const title = $derived(page.status === 404 ? 'Not found' : `Error ${page.status}`);
</script>

<Page {title} description="Something went wrong.">
	<p>
		{#if page.status === 404}
			No such file or directory.
		{:else}
			{page.error?.message ?? 'Something went wrong.'}
		{/if}
	</p>
	<p><a href={resolve('/')}>cd ~</a></p>
</Page>
