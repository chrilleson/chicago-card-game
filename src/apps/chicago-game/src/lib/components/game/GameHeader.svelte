<script lang="ts">
	import type { Game } from '../../../types/game';

	export let gameId: string;
	export let currentGame: Game | null = null;
</script>

<div class="text-center mb-8">
	<h1 class="text-4xl font-bold mb-2">Chicago Card Game</h1>
	<p class="text-gray-600">Game ID: {gameId}</p>
	{#if currentGame}
		<p class="text-lg font-semibold">Round {currentGame.currentRound}</p>
	{/if}
</div>