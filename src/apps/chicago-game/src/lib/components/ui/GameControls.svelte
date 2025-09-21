<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Game } from '../../../types/game';

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
				class="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
			>
				Start Game
			</button>
			{#if players.length < 2}
				<p class="mt-2 text-sm text-gray-600">You need at least 2 players to start a game</p>
			{/if}
		</div>
	{:else}
		<div class="mt-4 text-center">
			<div class="rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
				<strong>Game Started!</strong> Round {currentGame?.currentRound}
			</div>
		</div>
	{/if}
{/if}
