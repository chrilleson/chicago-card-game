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
	
	let currentGame: Game | null = $state(null);
	let showCheatsheet = $state(false);
	let gameNotFound = $state(false);

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
				// Add name property if it doesn't exist (backward compatibility)
				if (!parsedGame.name && parsedGame.players) {
					parsedGame.name = `Game with ${parsedGame.players.map((p: any) => p.name).join(', ')}`;
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

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
	<!-- Floating Cheatsheet Button (Mobile/Tablet Only) -->
	<button
		onclick={() => showCheatsheet = true}
		class="fixed top-4 right-4 z-10 xl:hidden bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
		title="View Poker Hand Guide"
		aria-label="View Poker Hand Guide"
	>
		<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
		</svg>
	</button>

	<div class="max-w-7xl mx-auto p-4">
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
			<!-- Game Over Banner -->
			{#if !currentGame.isActive}
				{@const winner = currentGame.players.find(p => p.score >= 52)}
				<div class="mb-6">
					<GameOverBanner {winner} />
				</div>
			{/if}

			<!-- Main Game Layout -->
			<div class="grid grid-cols-1 xl:grid-cols-5 gap-6">
				<!-- Players Section -->
				<div class="xl:col-span-4">
					<div class="bg-white rounded-xl shadow-lg p-6">
						<h2 class="text-2xl font-semibold mb-6 text-center">Players & Scores</h2>
						
						<!-- Compact Player Table Layout -->
						<div class="overflow-x-auto">
							<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-w-fit">
								{#each currentGame.players as player}
									<div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
										<!-- Player Header -->
										<div class="text-center mb-3">
											<h3 class="font-bold text-lg text-gray-900 truncate" title={player.name}>
												{player.name}
											</h3>
											<div class="text-3xl font-bold text-blue-600 mb-2">
												{player.score}
											</div>
											<div class="text-sm text-gray-600">
												{52 - player.score} to win
											</div>
										</div>

										<!-- Quick Score Buttons -->
										{#if currentGame.isActive}
											<div class="space-y-2">
												<!-- Poker Hand Buttons (Compact) -->
												<div class="grid grid-cols-4 gap-1">
													<button
														onclick={() => handleScoreUpdate(player.id, 1)}
														class="text-xs py-1 px-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
														title="One Pair"
													>
														1p
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, 2)}
														class="text-xs py-1 px-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
														title="Two Pairs"
													>
														2p
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, 3)}
														class="text-xs py-1 px-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
														title="Three of a Kind"
													>
														3K
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, 4)}
														class="text-xs py-1 px-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
														title="Straight"
													>
														Str
													</button>
												</div>
												<div class="grid grid-cols-4 gap-1">
													<button
														onclick={() => handleScoreUpdate(player.id, 5)}
														class="text-xs py-1 px-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
														title="Flush"
													>
														Fl
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, 6)}
														class="text-xs py-1 px-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
														title="Full House"
													>
														FH
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, 7)}
														class="text-xs py-1 px-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
														title="Four of a Kind"
													>
														4K
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, 52)}
														class="text-xs py-1 px-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
														title="Royal Straight Flush"
													>
														RF
													</button>
												</div>

												<!-- Special Actions -->
												<div class="grid grid-cols-3 gap-1 mt-2">
													<button
														onclick={() => handleScoreUpdate(player.id, 5)}
														class="text-xs py-1 px-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
														title="Last Trick"
													>
														+5
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, -1)}
														class="text-xs py-1 px-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
														title="Subtract 1"
													>
														-1
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, -5)}
														class="text-xs py-1 px-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
														title="Subtract 5"
													>
														-5
													</button>
												</div>
											</div>
										{/if}
									</div>
								{/each}
							</div>
						</div>

						<!-- Quick Actions -->
						<div class="mt-6 pt-4 border-t border-gray-200 text-center">
							<a href="/" class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
								</svg>
								Back to Home
							</a>
						</div>
					</div>
				</div>

				<!-- Sidebar: Poker Hand Reference -->
				<div class="xl:col-span-1">
					<div class="sticky top-4">
						<PokerHandCheatsheet />
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<!-- Cheatsheet Modal (Mobile/Tablet Only) -->
{#if showCheatsheet}
	<div 
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		style="background-color: rgba(0, 0, 0, 0.5);"
		onclick={() => showCheatsheet = false}
		onkeydown={() => {}}
		role="button"
		tabindex="0"
	>
		<div 
			class="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
			onclick={(e) => e.stopPropagation()}
			onkeydown={() => {}}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<div class="p-4 border-b flex justify-between items-center">
				<h3 class="text-lg font-semibold">Poker Hand Guide</h3>
				<button
					onclick={() => showCheatsheet = false}
					class="text-gray-400 hover:text-gray-600 transition-colors"
					aria-label="Close modal"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div class="p-4">
				<PokerHandCheatsheet />
			</div>
		</div>
	</div>
{/if}
