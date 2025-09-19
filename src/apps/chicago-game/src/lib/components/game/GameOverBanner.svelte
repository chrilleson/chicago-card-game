<script lang="ts">
	import type { Player } from '../../../types/player';

	export let winner: Player | undefined = undefined;
</script>

<div class="mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
	<p class="text-lg font-semibold">🎉 Game Over!</p>
	{#if winner}
		<p><strong>{winner.name}</strong> wins with {winner.score} points!</p>
	{:else}
		<p>Game has ended.</p>
	{/if}
</div>
