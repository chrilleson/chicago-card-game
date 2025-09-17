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
	<h4 class="font-medium {colorClass.title} mb-2 text-sm tracking-wide uppercase">{title}</h4>
	<div class="space-y-1">
		{#each hands as hand (hand.name)}
			<div
				class="flex flex-col gap-1 rounded px-2 py-2 hover:bg-gray-50 xl:flex-row xl:items-start xl:justify-between xl:gap-4"
			>
				<div class="flex flex-1 items-center gap-2 xl:flex-col xl:items-start xl:gap-1">
					<span class="text-sm font-medium xl:text-base">{hand.name}</span>
					<span class="text-xs text-gray-500 xl:text-sm">{hand.symbol}</span>
				</div>
				<span
					class="self-start rounded px-2 py-1 text-xs font-medium whitespace-nowrap xl:text-sm {hand.points ===
					52
						? 'bg-yellow-100 text-yellow-800'
						: colorClass.badge}"
				>
					{hand.points} point{hand.points !== 1 ? 's' : ''}
				</span>
			</div>
		{/each}
	</div>
</div>
