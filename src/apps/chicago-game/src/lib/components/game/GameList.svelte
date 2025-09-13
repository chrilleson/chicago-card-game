<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { Game } from '../../../types/game';
	import ConfirmModal from '../ui/ConfirmModal.svelte';

	let games: Game[] = [];
	let showDeleteModal = false;
	let gameToDelete: Game | null = null;

	onMount(() => {
		if (browser) {
			loadGamesFromStorage();
		}
	});

	function loadGamesFromStorage() {
		games = [];
		
		// Get all session storage keys that start with "game-"
		for (let i = 0; i < sessionStorage.length; i++) {
			const key = sessionStorage.key(i);
			if (key && key.startsWith('game-')) {
				try {
					const gameData = sessionStorage.getItem(key);
					if (gameData) {
						const game: Game = JSON.parse(gameData);
						// Convert date strings back to Date objects
						game.startedAt = new Date(game.startedAt);
						if (game.finishedAt) {
							game.finishedAt = new Date(game.finishedAt);
						}
						games.push(game);
					}
				} catch (error) {
					console.error('Error parsing game data:', error);
				}
			}
		}
		
		// Sort games by most recent first
		games = games.sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
	}

	function handleGameClick(gameId: string) {
		goto(`/game/${gameId}`);
	}

	function handleDeleteGame(gameId: string, event: Event) {
		event.stopPropagation();
		
		// Find the game to delete and show the modal
		gameToDelete = games.find(game => game.id === gameId) || null;
		if (gameToDelete) {
			showDeleteModal = true;
		}
	}

	function confirmDelete() {
		if (gameToDelete) {
			sessionStorage.removeItem(`game-${gameToDelete.id}`);
			loadGamesFromStorage(); // Refresh the list
		}
		showDeleteModal = false;
		gameToDelete = null;
	}

	function cancelDelete() {
		showDeleteModal = false;
		gameToDelete = null;
	}

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}

	function getGameStatusText(game: Game): string {
		if (!game.isActive) {
			return 'Finished';
		}
		return `Round ${game.currentRound}`;
	}

	function getWinner(game: Game) {
		if (!game.isActive && game.players) {
			return game.players.find(player => player.score >= 52);
		}
		return null;
	}
</script>

{#if games.length > 0}
	<div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
		<div class="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
			<h3 class="text-xl font-bold text-white flex items-center gap-2">
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
				</svg>
				Your Games
			</h3>
			<p class="text-green-100 text-sm">{games.length} game{games.length === 1 ? '' : 's'} found</p>
		</div>
		
		<div class="divide-y divide-gray-200">
			{#each games as game (game.id)}
				<div 
					class="px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
					onclick={() => handleGameClick(game.id)}
					role="button"
					tabindex="0"
					onkeydown={(e) => e.key === 'Enter' && handleGameClick(game.id)}
				>
					<div class="flex items-center justify-between">
						<div class="flex-1 min-w-0">
							<div class="flex items-center gap-3 mb-2">
								<h4 class="font-medium text-gray-900 truncate">
									{game.players.map(p => p.name).join(', ')}
								</h4>
								<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
									{game.isActive ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}">
									{getGameStatusText(game)}
								</span>
							</div>
							
							<div class="flex items-center gap-4 text-sm text-gray-600">
								<span class="flex items-center gap-1">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									{formatDate(game.startedAt)}
								</span>
								
								<span class="flex items-center gap-1">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
									</svg>
									{game.players.length} players
								</span>

								{#if !game.isActive}
									{@const winner = getWinner(game)}
									{#if winner}
										<span class="flex items-center gap-1 text-green-600">
											<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											Winner: {winner.name}
										</span>
									{/if}
								{/if}
							</div>
						</div>
						
						<div class="flex items-center gap-2 ml-4">
							{#if !game.isActive}
								<button
									onclick={(e) => handleDeleteGame(game.id, e)}
									class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
									title="Delete finished game"
									aria-label="Delete finished game"
								>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
								</button>
							{/if}
							
							<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div class="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
		<div class="text-center text-gray-500">
			<div class="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
				<svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
				</svg>
			</div>
			<h3 class="text-lg font-semibold text-gray-900 mb-2">No games yet</h3>
			<p class="text-gray-600 mb-4">Start your first Chicago card game to see it listed here</p>
			<div class="bg-blue-50 rounded-lg p-4 text-left max-w-md mx-auto">
				<h4 class="font-medium text-blue-900 mb-2">Ready to play?</h4>
				<ul class="text-sm text-blue-700 space-y-1">
					<li>• Add 2-4 players</li>
					<li>• Click "Start Game"</li>
					<li>• Score poker hands to reach 52 points</li>
				</ul>
			</div>
		</div>
	</div>
{/if}

<!-- Delete Confirmation Modal -->
<ConfirmModal
	show={showDeleteModal}
	title="Delete Game"
	message={gameToDelete ? 
		`Are you sure you want to delete the ${gameToDelete.isActive ? 'active' : 'finished'} game with ${gameToDelete.players.map(p => p.name).join(', ')}?${!gameToDelete.isActive ? ` ${getWinner(gameToDelete)?.name || 'No winner'} won this game.` : ''} This action cannot be undone.` : 
		'Are you sure you want to delete this game?'
	}
	confirmText="Delete Game"
	cancelText="Cancel"
	onConfirm={confirmDelete}
	onCancel={cancelDelete}
/>