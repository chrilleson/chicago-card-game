<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Player } from '../types/player';
	import type { Game } from '../types/game';
	import PlayerForm from '../lib/components/player/PlayerForm.svelte';
	import PlayerList from '../lib/components/player/PlayerList.svelte';
	import GameControls from '../lib/components/ui/GameControls.svelte';

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
				players: gamePlayers,
				currentRound: 1,
				isActive: true,
				startedAt: new Date()
			};

			if (typeof window !== 'undefined') {
				sessionStorage.setItem(`game-${gameId}`, JSON.stringify(currentGame));
			}

			goto(`/game/${gameId}`);
		}
	}
</script>

<div class="text-center mt-8">
	<h1 class="text-4xl font-bold mb-8">Chicago card game</h1>
</div>

<PlayerForm 
	{isGameStarted} 
	on:addPlayer={handleAddPlayer} 
/>

<div class="max-w-md mx-auto">
	<PlayerList 
		{players} 
		{isGameStarted} 
		on:removePlayer={handleRemovePlayer}
		on:updatePlayer={handleUpdatePlayer}
	/>
	
	<GameControls 
		{players} 
		{isGameStarted} 
		{currentGame}
		on:startGame={handleStartGame}
	/>
</div>
