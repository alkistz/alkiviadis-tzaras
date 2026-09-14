<script lang="ts">
	import BottomBar from '$lib/components/BottomBar.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import LinkRow from '$lib/components/LinkRow.svelte';
	import Prompt from '$lib/components/Prompt.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
	import { site } from '$lib/site';
	import { resolve } from '$app/paths';

	let { data } = $props();

	const projectLinks = $derived([
		...data.projects,
		{ label: '[more]/', href: resolve('/work'), muted: true }
	]);
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.description} />
	<link rel="canonical" href={site.url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={site.name} />
	<meta property="og:description" content={site.description} />
	<meta property="og:url" content={site.url} />
	<meta property="og:site_name" content={site.name} />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<div class="page">
	<TopBar />

	<main class="session">
		<Prompt command="whoami" delay={0.1}>
			<h1 class="name">{site.name}</h1>
		</Prompt>

		<Prompt command="cat role" delay={0.6}>
			<p>{site.role.primary} <span class="muted">{site.role.secondary}</span></p>
		</Prompt>

		<Prompt command="ls projects" delay={1.1}>
			<LinkRow links={projectLinks} label="Projects" />
		</Prompt>

		<Prompt delay={1.6}>
			<Cursor />
		</Prompt>
	</main>

	<BottomBar />
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: var(--space-5);
		min-height: 100dvh;
		padding: var(--page-padding-y) var(--page-padding-x);
	}

	.session {
		display: flex;
		flex-direction: column;
		gap: var(--block-gap);
		max-width: var(--measure);
	}

	.name {
		font-size: var(--text-display);
		font-weight: 500;
		line-height: var(--leading-tight);
		letter-spacing: var(--tracking-display);
		color: var(--fg-strong);
	}

	.muted {
		color: var(--fg-muted);
	}
</style>
