<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Game } from '../../../types/game';

	export let gameId: string;
	export let currentGame: Game | null = null;

	function goHome() {
		goto('/');
	}
</script>

<div class="mb-8 flex items-center justify-between">
	<button
		onclick={goHome}
		class="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800"
		aria-label="Return to home"
	>
		<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
		<span class="hidden sm:inline">Back to Games</span>
	</button>

	<div class="flex-1 text-center">
		<h1 class="mb-2 text-4xl font-bold">Chicago: Race to 52 Points</h1>
		<p class="text-sm text-gray-600">Game ID: {gameId}</p>
		{#if currentGame}
			<p class="text-lg font-semibold">Round {currentGame.currentRound}</p>
		{/if}
	</div>

	<div class="w-24"></div>
	<!-- Spacer for balance -->
</div>
