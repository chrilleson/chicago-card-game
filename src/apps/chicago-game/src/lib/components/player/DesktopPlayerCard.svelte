<script lang="ts">
	import type { Player } from '../../../types/player';
	import { POKER_HANDS } from '../../../types/poker';
	import FourOfAKindModal from './FourOfAKindModal.svelte';

	interface Props {
		player: Player;
		isActive: boolean;
		onScoreUpdate: (playerId: string, points: number) => void;
		onResetOtherPlayers?: (playerId: string) => void;
	}

	let { player, isActive, onScoreUpdate, onResetOtherPlayers }: Props = $props();
	let showFourOfAKindModal = $state(false);

	const colorMap = {
		green: { bg: 'bg-green-500', hover: 'hover:bg-green-600' },
		blue: { bg: 'bg-blue-500', hover: 'hover:bg-blue-600' },
		purple: { bg: 'bg-purple-500', hover: 'hover:bg-purple-600' },
		yellow: { bg: 'bg-yellow-500', hover: 'hover:bg-yellow-600' }
	};

	function getColorClasses(color: 'green' | 'blue' | 'purple' | 'yellow') {
		return `${colorMap[color].bg} ${colorMap[color].hover}`;
	}

	function handlePokerHandClick(points: number) {
		if (points === 7) {
			showFourOfAKindModal = true;
		} else {
			onScoreUpdate(player.id, points);
		}
	}

	function handleFourOfAKindChoice(choice: 'points' | 'reset') {
		if (choice === 'points') {
			onScoreUpdate(player.id, 7);
		} else if (choice === 'reset' && onResetOtherPlayers) {
			onResetOtherPlayers(player.id);
		}
		showFourOfAKindModal = false;
	}

	function closeFourOfAKindModal() {
		showFourOfAKindModal = false;
	}
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
		<div class="space-y-1">
			<!-- Basic Hands -->
			<div class="grid grid-cols-3 gap-1">
				{#each POKER_HANDS.slice(0, 3) as hand (hand.id)}
					<button
						onclick={() => handlePokerHandClick(hand.points)}
						class="rounded {getColorClasses(
							hand.category.color
						)} px-1 py-1 text-xs text-white transition-colors"
						title={hand.name}
					>
						{hand.shortName}
					</button>
				{/each}
			</div>
			<!-- Advanced Hands -->
			<div class="grid grid-cols-3 gap-1">
				{#each POKER_HANDS.slice(3, 6) as hand (hand.id)}
					<button
						onclick={() => handlePokerHandClick(hand.points)}
						class="rounded {getColorClasses(
							hand.category.color
						)} px-1 py-1 text-xs text-white transition-colors"
						title={hand.name}
					>
						{hand.shortName}
					</button>
				{/each}
			</div>
			<!-- Rare Hands -->
			<div class="grid grid-cols-3 gap-1">
				{#each POKER_HANDS.slice(6, 9) as hand (hand.id)}
					<button
						onclick={() => handlePokerHandClick(hand.points)}
						class="rounded {getColorClasses(
							hand.category.color
						)} px-1 py-1 text-xs text-white transition-colors"
						title={hand.name}
					>
						{hand.shortName}
					</button>
				{/each}
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

<FourOfAKindModal
	show={showFourOfAKindModal}
	onChoice={handleFourOfAKindChoice}
	onClose={closeFourOfAKindModal}
/>
