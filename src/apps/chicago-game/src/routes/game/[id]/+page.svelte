<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { Game } from '../../../types/game';
	import PlayerScoreCard from '../../../lib/components/player/PlayerScoreCard.svelte';
	import PokerHandCheatsheet from '../../../lib/components/game/PokerHandCheatsheet.svelte';
	import GameHeader from '../../../lib/components/game/GameHeader.svelte';
	import GameOverBanner from '../../../lib/components/game/GameOverBanner.svelte';
	import GameNotFound from '../../../lib/components/ui/GameNotFound.svelte';
	import LoadingState from '../../../lib/components/ui/LoadingState.svelte';

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
				
				if (newScore >= 52) {
					currentGame.isActive = false;
					currentGame.finishedAt = new Date();
				}
				
				currentGame = { ...currentGame };
				saveGameToStorage();
			}
		}
	}

	function handleScoreUpdate(playerId: string, change: number) {
		updatePlayerScore(playerId, change);
	}

	function handleResetOtherPlayers(playerId: string) {
		if (currentGame) {
			currentGame.players.forEach(player => {
				if (player.id !== playerId) {
					player.score = 0;
				}
			});
			
			const fourOfAKindPlayer = currentGame.players.find(p => p.id === playerId);
			if (fourOfAKindPlayer) {
				fourOfAKindPlayer.score += 7;
			}
			
			currentGame = { ...currentGame };
			saveGameToStorage();
		}
	}
</script>

<div class="max-w-4xl mx-auto p-6">
	<GameHeader {gameId} {currentGame} />

	{#if gameNotFound}
		<GameNotFound {gameId} />
	{:else if !currentGame}
		<LoadingState />
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
		<PokerHandCheatsheet />
		
		<div class="bg-white rounded-lg shadow-lg p-6">
			<h2 class="text-2xl font-semibold mb-4">Players & Scores</h2>
			
			{#if !currentGame.isActive}
				{@const winner = currentGame.players.find(p => p.score >= 52)}
				<GameOverBanner {winner} />
			{/if}
			
			<div class="grid gap-4">
				{#each currentGame.players as player}
					<PlayerScoreCard 
						{player} 
						isGameActive={currentGame.isActive}
						onScoreUpdate={handleScoreUpdate}
						onResetOtherPlayers={handleResetOtherPlayers}
					/>
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
