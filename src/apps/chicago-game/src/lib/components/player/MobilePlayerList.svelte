<script lang="ts">
	import type { Player } from '../../../types/player';
	import { createEventDispatcher } from 'svelte';

	interface Props {
		players: Player[];
		isGameActive: boolean;
	}

	let { players, isGameActive }: Props = $props();

	const dispatch = createEventDispatcher<{
		playerClick: string; // player ID
	}>();

	function handlePlayerClick(playerId: string) {
		if (isGameActive) {
			dispatch('playerClick', playerId);
		}
	}
</script>

<div class="bg-white rounded-lg shadow-lg overflow-hidden">
	<div class="bg-blue-600 text-white px-4 py-3">
		<h2 class="text-lg font-semibold text-center">Players & Scores</h2>
	</div>
	
	<div class="divide-y divide-gray-200">
		{#each players as player (player.id)}
			<button
				class="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors {isGameActive ? 'cursor-pointer' : 'cursor-default'} {player.score >= 52 ? 'bg-green-50 border-l-4 border-green-500' : ''}"
				onclick={() => handlePlayerClick(player.id)}
				disabled={!isGameActive}
			>
				<div class="flex items-center space-x-3">
					<div class="text-left">
						<div class="font-semibold text-gray-900 text-lg">{player.name}</div>
						{#if player.score >= 52}
							<div class="text-sm text-green-600 font-medium">Winner!</div>
						{:else}
							<div class="text-sm text-gray-500">{52 - player.score} to win</div>
						{/if}
					</div>
				</div>
				
				<div class="text-right">
					<div class="text-2xl font-bold {player.score >= 52 ? 'text-green-600' : 'text-blue-600'}">
						{player.score}
					</div>
				</div>
			</button>
		{/each}
	</div>
	
	{#if !isGameActive}
		<div class="px-4 py-3 bg-gray-50 text-center text-sm text-gray-600">
			Game Over - Scoring Disabled
		</div>
	{/if}
</div>