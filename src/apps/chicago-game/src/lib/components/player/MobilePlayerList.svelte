<script lang="ts">
	import type { Player } from '../../../types/player';

	interface Props {
		players: Player[];
		isGameActive: boolean;
		onPlayerClick: (playerId: string) => void;
	}

	let { players, isGameActive, onPlayerClick }: Props = $props();

	function handlePlayerClick(playerId: string) {
		if (isGameActive) {
			onPlayerClick(playerId);
		}
	}
</script>

<div class="overflow-hidden rounded-lg bg-white shadow-lg">
	<div class="bg-blue-600 px-4 py-3 text-white">
		<h2 class="text-center text-lg font-semibold">Players & Scores</h2>
	</div>

	<div class="divide-y divide-gray-200">
		{#each players as player (player.id)}
			<button
				class="flex w-full items-center justify-between px-4 py-4 transition-colors hover:bg-gray-50 {isGameActive
					? 'cursor-pointer'
					: 'cursor-default'} {player.score >= 52 ? 'border-l-4 border-green-500 bg-green-50' : ''}"
				onclick={() => handlePlayerClick(player.id)}
				disabled={!isGameActive}
			>
				<div class="flex items-center space-x-3">
					<div class="text-left">
						<div class="text-lg font-semibold text-gray-900">
							{player.name}
							{#if player.declaredChicago}
								<span
									class="ml-1 text-lg"
									role="img"
									aria-label="Declared Chicago"
									title="Declared Chicago">©️</span
								>
							{/if}
						</div>
						{#if player.score >= 52}
							<div class="text-sm font-medium text-green-600">Winner!</div>
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
		<div class="bg-gray-50 px-4 py-3 text-center text-sm text-gray-600">
			Game Over - Scoring Disabled
		</div>
	{/if}
</div>
