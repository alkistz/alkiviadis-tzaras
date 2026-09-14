<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** The command after the `$ ` sigil. Omit it to render `children` inline on the prompt line. */
		command?: string;
		/** Reveal delay in seconds, for the stagger on the homepage. */
		delay?: number;
		/** The command's output. */
		children?: Snippet;
	}

	let { command, delay = 0, children }: Props = $props();
</script>

<div class="block" style:--delay="{delay}s">
	<p class="line">
		{#if command}{command}{:else if children}{@render children()}{/if}
	</p>
	{#if command && children}
		<div class="output">{@render children()}</div>
	{/if}
</div>

<style>
	.line {
		color: var(--fg-muted);
	}

	/* The `$ ` sigil. Generated content, so it stays out of the text and the accessibility tree. */
	.line::before {
		content: '$';
		margin-right: 1ch;
		color: var(--fg-faint);
	}

	@media (prefers-reduced-motion: no-preference) {
		.block {
			animation: reveal var(--reveal-duration) both;
			animation-delay: var(--delay);
		}
	}

	@keyframes reveal {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
