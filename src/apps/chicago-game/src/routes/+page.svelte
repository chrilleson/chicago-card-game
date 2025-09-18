<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Player } from '../types/player';
	import type { Game } from '../types/game';
	import PlayerForm from '../lib/components/player/PlayerForm.svelte';
	import PlayerList from '../lib/components/player/PlayerList.svelte';
	import GameControls from '../lib/components/ui/GameControls.svelte';
	import GameList from '../lib/components/game/GameList.svelte';

	let players: string[] = [];
	let currentGame: Game | null = null;
	let isGameStarted = false;

	function handleAddPlayer(event: CustomEvent<string>) {
		const playerName = event.detail;
		if (playerName && !players.includes(playerName)) {
			players = [...players, playerName];
		}
	}

	function handleRemovePlayer(event: CustomEvent<number>) {
		const index = event.detail;
		players = players.filter((_, i) => i !== index);
	}

	function handleUpdatePlayer(event: CustomEvent<{ index: number; name: string }>) {
		const { index, name } = event.detail;
		if (name && !players.includes(name)) {
			players[index] = name;
			players = [...players];
		}
	}

	function handleStartGame() {
		if (players.length >= 2) {
			const gameId = crypto.randomUUID();
			const gamePlayers: Player[] = players.map((name) => ({
				id: crypto.randomUUID(),
				name,
				score: 0
			}));

			currentGame = {
				id: gameId,
				name: `Game with ${players.join(', ')}`,
				players: gamePlayers,
				currentRound: 1,
				isActive: true,
				startedAt: new Date()
			};

			if (typeof window !== 'undefined') {
				localStorage.setItem(`game-${gameId}`, JSON.stringify(currentGame));
			}

			goto(`/game/${gameId}`);
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
	<!-- Hero Section -->
	<div class="text-center pt-12 pb-8">
		<div class="max-w-4xl mx-auto px-4">
			<h1 class="text-5xl font-bold mb-4 text-gray-900">Chicago: Race to 52 Points</h1>
			<p class="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
				A Swedish card game for 2-4 players. Score points with poker hands and be the first to reach 52 points to win!
			</p>
			<div class="flex justify-center gap-8 text-sm text-gray-500">
				<div class="flex items-center gap-2">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
					2-4 Players
				</div>
				<div class="flex items-center gap-2">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					30-60 minutes
				</div>
				<div class="flex items-center gap-2">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					First to 52 points
				</div>
			</div>
		</div>
	</div>

	<div class="max-w-6xl mx-auto px-4 pb-12">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Previous Games Section -->
			<div class="lg:col-span-2">
				<GameList />
			</div>

			<!-- New Game Section -->
			<div class="lg:col-span-1">
				<div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
					<div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
						<h2 class="text-2xl font-bold text-white flex items-center gap-2">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
							Start New Game
						</h2>
						<p class="text-blue-100 text-sm mt-1">Add players to begin a new Chicago game</p>
					</div>

					<div class="p-6">
						<PlayerForm 
							{isGameStarted} 
							on:addPlayer={handleAddPlayer} 
						/>

						<div class="mt-6">
							<PlayerList 
								{players} 
								{isGameStarted} 
								on:removePlayer={handleRemovePlayer}
								on:updatePlayer={handleUpdatePlayer}
							/>
						</div>
						
						<div class="mt-6">
							<GameControls 
								{players} 
								{isGameStarted} 
								{currentGame}
								on:startGame={handleStartGame}
							/>
						</div>

						{#if players.length === 0}
							<div class="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
								<div class="text-center">
									<svg class="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
									<p class="text-sm text-gray-600 font-medium">No players added yet</p>
									<p class="text-xs text-gray-500 mt-1">Add 2-4 players to start playing</p>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<!-- Quick Stats Card -->
				<div class="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">Game Rules Quick Reference</h3>
					<div class="space-y-3 text-sm">
						<div class="flex justify-between">
							<span class="text-gray-600">One pair</span>
							<span class="font-medium">1 point</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-600">Two pairs</span>
							<span class="font-medium">2 points</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-600">Three of a kind</span>
							<span class="font-medium">3 points</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-600">Straight</span>
							<span class="font-medium">4 points</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-600">Flush</span>
							<span class="font-medium">5 points</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-600">Full house</span>
							<span class="font-medium">6 points</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-600">Four of a kind</span>
							<span class="font-medium">7 points</span>
						</div>
						<div class="flex justify-between border-t pt-2">
							<span class="text-gray-600">Royal straight flush</span>
							<span class="font-bold text-blue-600">52 points!</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
