<script lang="ts">
	import type { PokerHand } from '../../../types/poker';

	export let title: string;
	export let hands: PokerHand[];
	export let categoryColor: 'green' | 'blue' | 'purple' = 'blue';

	const colorClasses = {
		green: {
			title: 'text-green-700',
			badge: 'bg-green-100 text-green-800'
		},
		blue: {
			title: 'text-blue-700',
			badge: 'bg-blue-100 text-blue-800'
		},
		purple: {
			title: 'text-purple-700',
			badge: 'bg-purple-100 text-purple-800'
		}
	};

	$: colorClass = colorClasses[categoryColor];
</script>

<div class="mb-4">
	<h4 class="font-medium {colorClass.title} mb-2 text-sm uppercase tracking-wide">{title}</h4>
	<div class="space-y-1">
		{#each hands as hand}
			<div class="flex justify-between items-center py-2 px-2 rounded hover:bg-gray-50">
				<div class="flex items-center gap-3">
					<span class="font-medium min-w-0 flex-1">{hand.name}</span>
					<span class="text-gray-500 text-sm hidden sm:block">{hand.symbol}</span>
				</div>
				<span class="px-2 py-1 rounded text-sm font-medium whitespace-nowrap {hand.points === 52 ? 'bg-yellow-100 text-yellow-800' : colorClass.badge}">
					{hand.points} point{hand.points !== 1 ? 's' : ''}
				</span>
			</div>
		{/each}
	</div>
</div>