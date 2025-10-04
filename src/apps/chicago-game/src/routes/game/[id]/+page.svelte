<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { Game } from '../../../types/game';
	import type { Player } from '../../../types/player';
	import PokerHandCheatsheet from '../../../lib/components/game/PokerHandCheatsheet.svelte';
	import GameOverBanner from '../../../lib/components/game/GameOverBanner.svelte';
	import GameNotFound from '../../../lib/components/ui/GameNotFound.svelte';
	import LoadingState from '../../../lib/components/ui/LoadingState.svelte';
	import BackToHomeLink from '../../../lib/components/ui/BackToHomeLink.svelte';
	import EmptyGameState from '../../../lib/components/ui/EmptyGameState.svelte';
	import MobilePlayerList from '../../../lib/components/player/MobilePlayerList.svelte';
	import ScoreUpdateModal from '../../../lib/components/player/ScoreUpdateModal.svelte';
	import DesktopPlayerCard from '../../../lib/components/player/DesktopPlayerCard.svelte';

	const gameId = $page.params.id || '';

	let currentGame: Game | null = $state(null);
	let gameNotFound = $state(false);
	let showScoreModal = $state(false);
	let selectedPlayer: Player | null = $state(null);

	onMount(() => {
		if (browser) {
			loadGameFromStorage();
		}
	});

	function loadGameFromStorage() {
		try {
			const savedGame = localStorage.getItem(`game-${gameId}`);
			if (savedGame) {
				const parsedGame = JSON.parse(savedGame);
				parsedGame.startedAt = new Date(parsedGame.startedAt);
				if (parsedGame.finishedAt) {
					parsedGame.finishedAt = new Date(parsedGame.finishedAt);
				}
				if (!parsedGame.name && parsedGame.players) {
					parsedGame.name = `Game with ${parsedGame.players.map((p: { name: string }) => p.name).join(', ')}`;
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
			localStorage.setItem(`game-${gameId}`, JSON.stringify(currentGame));
		}
	}

	function updatePlayerScore(playerId: string, change: number) {
		if (currentGame) {
			const playerIndex = currentGame.players.findIndex((p) => p.id === playerId);
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

	function handlePlayerClick(event: CustomEvent<string>) {
		const playerId = event.detail;
		if (currentGame) {
			selectedPlayer = currentGame.players.find((p) => p.id === playerId) || null;
			showScoreModal = true;
		}
	}

	function handleScoreUpdate(playerId: string, change: number) {
		updatePlayerScore(playerId, change);
		if (selectedPlayer && selectedPlayer.id === playerId && currentGame) {
			selectedPlayer = currentGame.players.find((p) => p.id === playerId) || null;
		}
	}

	function handleResetOtherPlayers(playerId: string) {
		if (currentGame) {
			currentGame.players = currentGame.players.map((player) => {
				if (player.id !== playerId) {
					return { ...player, score: 0 };
				}
				return player;
			});
			currentGame = { ...currentGame };
			saveGameToStorage();
			if (selectedPlayer) {
				selectedPlayer = currentGame.players.find((p) => p.id === playerId) || null;
			}
		}
	}

	function closeScoreModal() {
		showScoreModal = false;
		selectedPlayer = null;
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
	<div class="mx-auto max-w-7xl p-4">
		{#if gameNotFound}
			<GameNotFound {gameId} />
		{:else if !currentGame}
			<LoadingState />
		{:else if currentGame.players.length === 0}
			<EmptyGameState />
		{:else}
			{#if !currentGame.isActive}
				{@const winner = currentGame.players.find((p) => p.score >= 52)}
				<div class="mb-6">
					<GameOverBanner {winner} />
				</div>
			{/if}

			<!-- Mobile Layout (hidden on xl screens) -->
			<div class="mt-8 xl:hidden">
				<MobilePlayerList
					players={currentGame.players}
					isGameActive={currentGame.isActive}
					on:playerClick={handlePlayerClick}
				/>

				<div class="mt-6">
					<PokerHandCheatsheet />
				</div>

				<BackToHomeLink />
			</div>

			<!-- Desktop Layout (hidden on smaller screens) -->
			<div class="hidden xl:block">
				<div class="grid grid-cols-1 gap-6 xl:grid-cols-5">
					<div class="xl:col-span-4">
						<div class="mt-8 rounded-xl bg-white p-6 shadow-lg">
							<h2 class="mb-6 text-center text-2xl font-semibold">Players & Scores</h2>

							<div class="overflow-x-auto">
								<div
									class="grid min-w-fit gap-4"
									style="grid-template-columns: repeat({Math.min(
										currentGame.players.length,
										4
									)}, minmax(0, 1fr));"
								>
									{#each currentGame.players as player (player.id)}
										<DesktopPlayerCard
											{player}
											isActive={currentGame.isActive}
											onScoreUpdate={handleScoreUpdate}
											onResetOtherPlayers={handleResetOtherPlayers}
										/>
									{/each}
								</div>
							</div>

							<div class="pt-4">
								<BackToHomeLink />
							</div>
						</div>
					</div>

					<div class="xl:col-span-1">
						<div class="sticky top-4 mt-8">
							<PokerHandCheatsheet />
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<ScoreUpdateModal
	show={showScoreModal}
	player={selectedPlayer}
	onScoreUpdate={handleScoreUpdate}
	onResetOtherPlayers={handleResetOtherPlayers}
	onClose={closeScoreModal}
/>
