<script lang="ts">
	import type { Player } from '../../../types/player';

	interface Props {
		player: Player;
		isActive: boolean;
		onScoreUpdate: (playerId: string, points: number) => void;
	}

	let { player, isActive, onScoreUpdate }: Props = $props();
</script>

<div class="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4">
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

	{#if isActive}
		<div class="space-y-2">
			<div class="grid grid-cols-4 gap-1">
				<button
					onclick={() => onScoreUpdate(player.id, 1)}
					class="rounded bg-blue-500 px-1 py-1 text-xs text-white transition-colors hover:bg-blue-600"
					title="One Pair"
				>
					1p
				</button>
				<button
					onclick={() => onScoreUpdate(player.id, 2)}
					class="rounded bg-blue-500 px-1 py-1 text-xs text-white transition-colors hover:bg-blue-600"
					title="Two Pairs"
				>
					2p
				</button>
				<button
					onclick={() => onScoreUpdate(player.id, 3)}
					class="rounded bg-blue-500 px-1 py-1 text-xs text-white transition-colors hover:bg-blue-600"
					title="Three of a Kind"
				>
					3K
				</button>
				<button
					onclick={() => onScoreUpdate(player.id, 4)}
					class="rounded bg-blue-500 px-1 py-1 text-xs text-white transition-colors hover:bg-blue-600"
					title="Straight"
				>
					Str
				</button>
			</div>
			<div class="grid grid-cols-4 gap-1">
				<button
					onclick={() => onScoreUpdate(player.id, 5)}
					class="rounded bg-green-500 px-1 py-1 text-xs text-white transition-colors hover:bg-green-600"
					title="Flush"
				>
					Fl
				</button>
				<button
					onclick={() => onScoreUpdate(player.id, 6)}
					class="rounded bg-green-500 px-1 py-1 text-xs text-white transition-colors hover:bg-green-600"
					title="Full House"
				>
					FH
				</button>
				<button
					onclick={() => onScoreUpdate(player.id, 7)}
					class="rounded bg-purple-500 px-1 py-1 text-xs text-white transition-colors hover:bg-purple-600"
					title="Four of a Kind"
				>
					4K
				</button>
				<button
					onclick={() => onScoreUpdate(player.id, 52)}
					class="rounded bg-yellow-500 px-1 py-1 text-xs text-white transition-colors hover:bg-yellow-600"
					title="Royal Straight Flush"
				>
					RF
				</button>
			</div>
			<div class="mt-2 grid grid-cols-3 gap-1">
				<button
					onclick={() => onScoreUpdate(player.id, 5)}
					class="rounded bg-emerald-500 px-1 py-1 text-xs text-white transition-colors hover:bg-emerald-600"
					title="Last Trick"
				>
					+5
				</button>
				<button
					onclick={() => onScoreUpdate(player.id, -1)}
					class="rounded bg-red-500 px-1 py-1 text-xs text-white transition-colors hover:bg-red-600"
					title="Subtract 1"
				>
					-1
				</button>
				<button
					onclick={() => onScoreUpdate(player.id, -5)}
					class="rounded bg-red-600 px-1 py-1 text-xs text-white transition-colors hover:bg-red-700"
					title="Subtract 5"
				>
					-5
				</button>
			</div>
		</div>
	{/if}
</div>
