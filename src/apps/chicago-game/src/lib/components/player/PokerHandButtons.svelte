<script lang="ts">
	import { POKER_HANDS } from '../../../types/poker';

	interface Props {
		onPokerHandClick: (points: number) => void;
	}

	let { onPokerHandClick }: Props = $props();
</script>

<div class="space-y-2">
	<div class="mb-2 text-sm font-medium text-gray-700">Poker Hands:</div>
	<div class="grid grid-cols-1 gap-2">
		{#each POKER_HANDS as hand (hand.id)}
			<button
				onclick={() => onPokerHandClick(hand.points)}
				class="flex items-center justify-between rounded bg-blue-500 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-600"
				class:bg-yellow-500={hand.points === 52}
				class:hover:bg-yellow-600={hand.points === 52}
				title={hand.description}
			>
				<div class="flex items-center gap-3">
					<span class="font-mono text-sm">{hand.symbol}</span>
					<span class="text-sm font-medium">{hand.name}</span>
				</div>
				<span
					class="rounded px-2 py-1 text-xs font-bold"
					class:bg-white={hand.points !== 52}
					class:bg-opacity-90={hand.points !== 52}
					class:text-blue-600={hand.points !== 52}
					class:bg-yellow-800={hand.points === 52}
					class:text-yellow-100={hand.points === 52}
				>
					+{hand.points}
				</span>
			</button>
		{/each}
	</div>
</div>
