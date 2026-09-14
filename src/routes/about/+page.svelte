<script lang="ts">
	import { asset } from '$app/paths';
	import Page from '$lib/components/Page.svelte';
	import { site } from '$lib/site';
</script>

<Page title="About" description={site.description}>
	<!-- TODO: replace with the real bio (two or three sentences; the bartending line goes here). -->
	<p>
		I build backend systems and AI products, and I trained as an economist before I wrote software
		for a living. I live in {site.location}.
	</p>

	<p>
		{#if site.cv}
			<a href={asset(site.cv)}>cv.pdf</a> ·
		{/if}
		<a href="mailto:{site.email}">{site.email}</a>
	</p>
</Page>
