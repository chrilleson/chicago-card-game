<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Game } from '../../types/game';

	export let players: string[] = [];
	export let isGameStarted = false;
	export let currentGame: Game | null = null;

	const dispatch = createEventDispatcher<{
		startGame: void;
	}>();

	function handleStartGame() {
		dispatch('startGame');
	}
</script>

{#if players.length > 0}
	{#if !isGameStarted}
		<div class="mt-4 text-center">
			<button
				on:click={handleStartGame}
				disabled={players.length < 2}
				class="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
			>
				Start Game
			</button>
			{#if players.length < 2}
				<p class="text-sm text-gray-600 mt-2">You need at least 2 players to start a game</p>
			{/if}
		</div>
	{:else}
		<div class="mt-4 text-center">
			<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
				<strong>Game Started!</strong> Round {currentGame?.currentRound}
			</div>
		</div>
	{/if}
{/if}
