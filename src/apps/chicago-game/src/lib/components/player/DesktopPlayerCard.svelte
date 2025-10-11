<script lang="ts">
	import type { Player } from '../../../types/player';
	import { POKER_HANDS } from '../../../types/poker';
	import {
		CHICAGO_MIN_SCORE_REQUIREMENT,
		CHICAGO_SUCCESS_POINTS,
		CHICAGO_FAIL_POINTS
	} from '../../constants';
	import FourOfAKindModal from './FourOfAKindModal.svelte';

	interface Props {
		player: Player;
		isActive: boolean;
		onScoreUpdate: (playerId: string, points: number) => void;
		onResetOtherPlayers?: (playerId: string) => void;
		onToggleChicago: (playerId: string) => void;
	}

	let { player, isActive, onScoreUpdate, onResetOtherPlayers, onToggleChicago }: Props = $props();
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
			{#if player.declaredChicago}
				<span class="ml-1 text-lg" title="Declared Chicago" role="img" aria-label="Declared Chicago"
					>©️</span
				>
			{/if}
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
			<div class="mt-1">
				<button
					onclick={() => onToggleChicago(player.id)}
					disabled={!player.declaredChicago && player.score < CHICAGO_MIN_SCORE_REQUIREMENT}
					class="w-full rounded {player.declaredChicago
						? 'bg-orange-500 hover:bg-orange-600'
						: 'bg-gray-500 hover:bg-gray-600'} px-1 py-1 text-xs text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
					title={!player.declaredChicago && player.score < CHICAGO_MIN_SCORE_REQUIREMENT
						? 'Need 15+ points to declare Chicago'
						: player.declaredChicago
							? 'Remove Chicago Declaration'
							: 'Declare Chicago'}
				>
					{player.declaredChicago ? '©️ Chicago' : 'Declare ©️'}
				</button>
			</div>
			<div class="mt-1 grid grid-cols-2 gap-1">
				<button
					onclick={() => onScoreUpdate(player.id, CHICAGO_SUCCESS_POINTS)}
					class="rounded bg-indigo-500 px-1 py-1 text-xs text-white transition-colors hover:bg-indigo-600"
					title="Chicago Success"
				>
					+{CHICAGO_SUCCESS_POINTS}
				</button>
				<button
					onclick={() => onScoreUpdate(player.id, CHICAGO_FAIL_POINTS)}
					class="rounded bg-red-700 px-1 py-1 text-xs text-white transition-colors hover:bg-red-800"
					title="Chicago Fail"
				>
					{CHICAGO_FAIL_POINTS}
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
