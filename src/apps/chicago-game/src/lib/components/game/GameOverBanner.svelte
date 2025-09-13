<script lang="ts">
	import type { Player } from '../../../types/player';

	export let winner: Player | undefined = undefined;
</script>

<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
	<p class="font-semibold text-lg">🎉 Game Over!</p>
	{#if winner}
		<p><strong>{winner.name}</strong> wins with {winner.score} points!</p>
	{:else}
		<p>Game has ended.</p>
	{/if}
</div>