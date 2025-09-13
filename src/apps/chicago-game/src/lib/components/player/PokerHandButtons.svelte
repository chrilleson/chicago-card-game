<script lang="ts">
	import { POKER_HANDS } from '../../../types/poker';

	interface Props {
		onPokerHandClick: (points: number) => void;
	}

	let { onPokerHandClick }: Props = $props();
</script>

<div class="space-y-2">
	<div class="text-sm font-medium text-gray-700 mb-2">Poker Hands:</div>
	<div class="grid grid-cols-1 gap-2">
		{#each POKER_HANDS as hand}
			<button 
				onclick={() => onPokerHandClick(hand.points)}
				class="px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors flex items-center justify-between"
				class:bg-yellow-500={hand.points === 52}
				class:hover:bg-yellow-600={hand.points === 52}
				title={hand.description}
			>
				<div class="flex items-center gap-3">
					<span class="text-sm font-mono">{hand.symbol}</span>
					<span class="text-sm font-medium">{hand.name}</span>
				</div>
				<span class="px-2 py-1 rounded text-xs font-bold"
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