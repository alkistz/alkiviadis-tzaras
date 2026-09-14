<!-- The blinking block cursor. Decorative, so hidden from assistive tech. -->
<span class="cursor" aria-hidden="true"></span>

<style>
	.cursor {
		display: inline-block;
		width: 9px;
		height: 18px;
		background: var(--accent);
		vertical-align: -3px;
	}

	@media (prefers-reduced-motion: no-preference) {
		.cursor {
			animation: blink var(--blink);
		}
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
</style>
