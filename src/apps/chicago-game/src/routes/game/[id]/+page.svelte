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
			const savedGame = localStorage.getItem(`game-${gameId}`);
			if (savedGame) {
				const parsedGame = JSON.parse(savedGame);
				parsedGame.startedAt = new Date(parsedGame.startedAt);
				if (parsedGame.finishedAt) {
					parsedGame.finishedAt = new Date(parsedGame.finishedAt);
				}
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

	function handleScoreUpdate(playerId: string, change: number) {
		updatePlayerScore(playerId, change);
	}

	function handleResetOtherPlayers(playerId: string) {
		if (currentGame) {
			currentGame.players.forEach((player) => {
				if (player.id !== playerId) {
					player.score = 0;
				}
			});

			const fourOfAKindPlayer = currentGame.players.find((p) => p.id === playerId);
			if (fourOfAKindPlayer) {
				fourOfAKindPlayer.score += 7;
			}

			currentGame = { ...currentGame };
			saveGameToStorage();
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
	<button
		onclick={() => (showCheatsheet = true)}
		class="fixed top-4 right-4 z-10 rounded-full bg-blue-600 p-3 text-white shadow-lg transition-colors hover:bg-blue-700 xl:hidden"
		title="View Poker Hand Guide"
		aria-label="View Poker Hand Guide"
	>
		<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
			/>
		</svg>
	</button>

	<div class="mx-auto max-w-7xl p-4">
		<GameHeader {gameId} {currentGame} />

		{#if gameNotFound}
			<GameNotFound {gameId} />
		{:else if !currentGame}
			<LoadingState />
		{:else if currentGame.players.length === 0}
			<div class="mb-6 rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
				<p class="font-semibold">No players found!</p>
				<p>This game has no players. Please start a new game.</p>
			</div>
			<div class="text-center">
				<a
					href="/"
					class="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
				>
					← Go to Home
				</a>
			</div>
		{:else}
			{#if !currentGame.isActive}
				{@const winner = currentGame.players.find((p) => p.score >= 52)}
				<div class="mb-6">
					<GameOverBanner {winner} />
				</div>
			{/if}

			<div class="grid grid-cols-1 gap-6 xl:grid-cols-5">
				<div class="xl:col-span-4">
					<div class="rounded-xl bg-white p-6 shadow-lg">
						<h2 class="mb-6 text-center text-2xl font-semibold">Players & Scores</h2>

						<div class="overflow-x-auto">
							<div
								class="grid min-w-fit gap-4"
								style="grid-template-columns: repeat({Math.min(
									currentGame.players.length,
									4
								)}, minmax(0, 1fr));"
							>
								{#each currentGame.players as player}
									<div
										class="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4"
									>
										<div class="mb-3 text-center">
											<h3 class="truncate text-lg font-bold text-gray-900" title={player.name}>
												{player.name}
											</h3>
											<div class="mb-2 text-3xl font-bold text-blue-600">
												{player.score}
											</div>
											<div class="text-sm text-gray-600">
												{52 - player.score} to win
											</div>
										</div>

										{#if currentGame.isActive}
											<div class="space-y-2">
												<div class="grid grid-cols-4 gap-1">
													<button
														onclick={() => handleScoreUpdate(player.id, 1)}
														class="rounded bg-blue-500 px-1 py-1 text-xs text-white transition-colors hover:bg-blue-600"
														title="One Pair"
													>
														1p
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, 2)}
														class="rounded bg-blue-500 px-1 py-1 text-xs text-white transition-colors hover:bg-blue-600"
														title="Two Pairs"
													>
														2p
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, 3)}
														class="rounded bg-blue-500 px-1 py-1 text-xs text-white transition-colors hover:bg-blue-600"
														title="Three of a Kind"
													>
														3K
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, 4)}
														class="rounded bg-blue-500 px-1 py-1 text-xs text-white transition-colors hover:bg-blue-600"
														title="Straight"
													>
														Str
													</button>
												</div>
												<div class="grid grid-cols-4 gap-1">
													<button
														onclick={() => handleScoreUpdate(player.id, 5)}
														class="rounded bg-green-500 px-1 py-1 text-xs text-white transition-colors hover:bg-green-600"
														title="Flush"
													>
														Fl
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, 6)}
														class="rounded bg-green-500 px-1 py-1 text-xs text-white transition-colors hover:bg-green-600"
														title="Full House"
													>
														FH
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, 7)}
														class="rounded bg-purple-500 px-1 py-1 text-xs text-white transition-colors hover:bg-purple-600"
														title="Four of a Kind"
													>
														4K
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, 52)}
														class="rounded bg-yellow-500 px-1 py-1 text-xs text-white transition-colors hover:bg-yellow-600"
														title="Royal Straight Flush"
													>
														RF
													</button>
												</div>

												<div class="mt-2 grid grid-cols-3 gap-1">
													<button
														onclick={() => handleScoreUpdate(player.id, 5)}
														class="rounded bg-emerald-500 px-1 py-1 text-xs text-white transition-colors hover:bg-emerald-600"
														title="Last Trick"
													>
														+5
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, -1)}
														class="rounded bg-red-500 px-1 py-1 text-xs text-white transition-colors hover:bg-red-600"
														title="Subtract 1"
													>
														-1
													</button>
													<button
														onclick={() => handleScoreUpdate(player.id, -5)}
														class="rounded bg-red-600 px-1 py-1 text-xs text-white transition-colors hover:bg-red-700"
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

						<div class="mt-6 border-t border-gray-200 pt-4 text-center">
							<a
								href="/"
								class="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800"
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 19l-7-7 7-7"
									/>
								</svg>
								Back to Home
							</a>
						</div>
					</div>
				</div>

				<div class="xl:col-span-1">
					<div class="sticky top-4">
						<PokerHandCheatsheet />
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

{#if showCheatsheet}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		style="background-color: rgba(0, 0, 0, 0.5);"
		onclick={() => (showCheatsheet = false)}
		onkeydown={() => {}}
		role="button"
		tabindex="0"
	>
		<div
			class="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white"
			onclick={(e) => e.stopPropagation()}
			onkeydown={() => {}}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<div class="flex items-center justify-between border-b p-4">
				<h3 class="text-lg font-semibold">Poker Hand Guide</h3>
				<button
					onclick={() => (showCheatsheet = false)}
					class="text-gray-400 transition-colors hover:text-gray-600"
					aria-label="Close modal"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<div class="p-4">
				<PokerHandCheatsheet />
			</div>
		</div>
	</div>
{/if}
