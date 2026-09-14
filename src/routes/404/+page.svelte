<script lang="ts">
	import { resolve } from '$app/paths';
	import Page from '$lib/components/Page.svelte';
</script>

<Page title="Not found" description="No such file or directory.">
	<p>No such file or directory.</p>
	<p><a href={resolve('/')}>cd ~</a></p>
</Page>
