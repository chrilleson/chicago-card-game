<script lang="ts">
	import type { Player } from '../../../types/player';
	import PlayerHeader from './PlayerHeader.svelte';
	import PokerHandButtons from './PokerHandButtons.svelte';
	import SpecialScoringButtons from './SpecialScoringButtons.svelte';
	import QuickSubtractButtons from './QuickSubtractButtons.svelte';
	import FourOfAKindModal from './FourOfAKindModal.svelte';

	interface Props {
		player: Player;
		isGameActive: boolean;
		onScoreUpdate: (playerId: string, change: number) => void;
		onResetOtherPlayers: (playerId: string) => void;
	}

	let { player, isGameActive, onScoreUpdate, onResetOtherPlayers }: Props = $props();

	let showFourOfAKindDialog = $state(false);

	function handlePokerHandClick(points: number) {
		if (points === 7) {
			showFourOfAKindDialog = true;
			return;
		}
		onScoreUpdate(player.id, points);
	}

	function handleLastTrick() {
		onScoreUpdate(player.id, 5);
	}

	function handleChicagoSuccess() {
		onScoreUpdate(player.id, 15);
	}

	function handleChicagoFail() {
		onScoreUpdate(player.id, -15);
	}

	function handleSubtract(points: number) {
		onScoreUpdate(player.id, -points);
	}

	function handleFourOfAKindChoice(choice: 'points' | 'reset') {
		showFourOfAKindDialog = false;
		if (choice === 'points') {
			onScoreUpdate(player.id, 7);
		} else {
			onResetOtherPlayers(player.id);
		}
	}

	function closeFourOfAKindDialog() {
		showFourOfAKindDialog = false;
	}
</script>

<div class="bg-gray-50 p-4 rounded-lg {player.score >= 52 ? 'ring-2 ring-green-500 bg-green-50' : ''}">
	<PlayerHeader {player} />
	
	{#if isGameActive}
		<PokerHandButtons onPokerHandClick={handlePokerHandClick} />
		<SpecialScoringButtons 
			{player} 
			onLastTrick={handleLastTrick}
			onChicagoSuccess={handleChicagoSuccess}
			onChicagoFail={handleChicagoFail}
		/>
		<QuickSubtractButtons {player} onSubtract={handleSubtract} />
	{/if}
</div>

<FourOfAKindModal 
	bind:show={showFourOfAKindDialog}
	onChoice={handleFourOfAKindChoice}
	onClose={closeFourOfAKindDialog}
/>