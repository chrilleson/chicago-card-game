<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Game } from '../../../types/game';

	export let gameId: string;
	export let currentGame: Game | null = null;

	function goHome() {
		goto('/');
	}
</script>

<div class="flex items-center justify-between mb-8">
	<button
		onclick={goHome}
		class="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
		aria-label="Return to home"
	>
		<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
		<span class="hidden sm:inline">Back to Games</span>
	</button>

	<div class="text-center flex-1">
		<h1 class="text-4xl font-bold mb-2">Chicago Card Game</h1>
		<p class="text-gray-600 text-sm">Game ID: {gameId}</p>
		{#if currentGame}
			<p class="text-lg font-semibold">Round {currentGame.currentRound}</p>
		{/if}
	</div>

	<div class="w-24"></div> <!-- Spacer for balance -->
</div>