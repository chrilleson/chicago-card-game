<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { Game } from '../../../types/game';

	// Get the game ID from the URL
	const gameId = $page.params.id || '';
	
	let currentGame: Game | null = null;
	let gameNotFound = false;

	onMount(() => {
		if (browser) {
			loadGameFromStorage();
		}
	});

	function loadGameFromStorage() {
		try {
			const savedGame = sessionStorage.getItem(`game-${gameId}`);
			if (savedGame) {
				const parsedGame = JSON.parse(savedGame);
				// Convert startedAt back to Date object
				parsedGame.startedAt = new Date(parsedGame.startedAt);
				if (parsedGame.finishedAt) {
					parsedGame.finishedAt = new Date(parsedGame.finishedAt);
				}
				currentGame = parsedGame;
			} else {
				gameNotFound = true;
			}
		} catch (error) {
			console.error('Error loading game from storage:', error);
			gameNotFound = true;
		}
	}

	function saveGameToStorage() {
		if (browser && currentGame) {
			sessionStorage.setItem(`game-${gameId}`, JSON.stringify(currentGame));
		}
	}

	function updatePlayerScore(playerId: string, change: number) {
		if (currentGame) {
			const playerIndex = currentGame.players.findIndex(p => p.id === playerId);
			if (playerIndex !== -1) {
				const newScore = Math.max(0, currentGame.players[playerIndex].score + change);
				currentGame.players[playerIndex].score = newScore;
				
				// Check if game should end (player reaches 52 points)
				if (newScore >= 52) {
					currentGame.isActive = false;
					currentGame.finishedAt = new Date();
				}
				
				currentGame = { ...currentGame }; // Trigger reactivity
				saveGameToStorage();
			}
		}
	}

	function addPoint(playerId: string) {
		updatePlayerScore(playerId, 1);
	}

	function subtractPoint(playerId: string) {
		updatePlayerScore(playerId, -1);
	}
</script>

<div class="max-w-4xl mx-auto p-6">
	<div class="text-center mb-8">
		<h1 class="text-4xl font-bold mb-2">Chicago Card Game</h1>
		<p class="text-gray-600">Game ID: {gameId}</p>
		{#if currentGame}
			<p class="text-lg font-semibold">Round {currentGame.currentRound}</p>
		{/if}
	</div>

	{#if gameNotFound}
		<div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
			<p class="font-semibold">Game not found!</p>
			<p>The game with ID "{gameId}" could not be found. It may have expired or never existed.</p>
		</div>
		<div class="text-center">
			<a href="/" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
				← Start New Game
			</a>
		</div>
	{:else if !currentGame}
		<div class="text-center">
			<p class="text-gray-600">Loading game...</p>
		</div>
	{:else if currentGame.players.length === 0}
		<div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
			<p class="font-semibold">No players found!</p>
			<p>This game has no players. Please start a new game.</p>
		</div>
		<div class="text-center">
			<a href="/" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
				← Go to Home
			</a>
		</div>
	{:else}
		<div class="bg-white rounded-lg shadow-lg p-6">
			<h2 class="text-2xl font-semibold mb-4">Players & Scores</h2>
			
			{#if !currentGame.isActive}
				{@const winner = currentGame.players.find(p => p.score >= 52)}
				<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
					<p class="font-semibold text-lg">🎉 Game Over!</p>
					{#if winner}
						<p><strong>{winner.name}</strong> wins with {winner.score} points!</p>
					{:else}
						<p>Game has ended.</p>
					{/if}
				</div>
			{/if}
			
			<div class="grid gap-4">
				{#each currentGame.players as player}
					<div class="flex items-center justify-between bg-gray-50 p-4 rounded-lg {player.score >= 52 ? 'ring-2 ring-green-500 bg-green-50' : ''}">
						<div class="flex items-center gap-4">
							<div class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
								{player.name.charAt(0).toUpperCase()}
							</div>
							<span class="text-lg font-medium">{player.name}</span>
							{#if player.score >= 52}
								<span class="text-green-600 font-bold">👑 WINNER</span>
							{/if}
						</div>
						<div class="flex items-center gap-3">
							{#if currentGame.isActive}
								<button 
									on:click={() => subtractPoint(player.id)}
									class="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center font-bold"
									disabled={player.score === 0}
								>
									-
								</button>
							{/if}
							<div class="text-2xl font-bold text-blue-600 min-w-[3rem] text-center">
								{player.score}
							</div>
							{#if currentGame.isActive}
								<button 
									on:click={() => addPoint(player.id)}
									class="w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors flex items-center justify-center font-bold"
								>
									+
								</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="mt-4 text-center">
			<a href="/" class="text-blue-500 hover:text-blue-700 underline">
				← Back to Home
			</a>
		</div>
	{/if}
</div>
