<script lang="ts">
	import type { Player } from '../../../types/player';
	import { createEventDispatcher } from 'svelte';
	import FourOfAKindModal from './FourOfAKindModal.svelte';

	interface Props {
		show: boolean;
		player: Player | null;
		onScoreUpdate: (playerId: string, change: number) => void;
		onResetOtherPlayers: (playerId: string) => void;
		onClose: () => void;
	}

	let { show, player, onScoreUpdate, onResetOtherPlayers, onClose }: Props = $props();

	let showFourOfAKindDialog = $state(false);

	const dispatch = createEventDispatcher();

	function handlePokerHandClick(points: number) {
		if (!player) return;
		
		if (points === 7) {
			showFourOfAKindDialog = true;
			return;
		}
		onScoreUpdate(player.id, points);
	}

	function handleLastTrick() {
		if (!player) return;
		onScoreUpdate(player.id, 5);
	}

	function handleChicagoSuccess() {
		if (!player) return;
		onScoreUpdate(player.id, 15);
	}

	function handleChicagoFail() {
		if (!player) return;
		onScoreUpdate(player.id, -15);
	}

	function handleSubtract(points: number) {
		if (!player) return;
		onScoreUpdate(player.id, -points);
	}

	function handleFourOfAKindChoice(choice: 'points' | 'reset') {
		if (!player) return;
		
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

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}
</script>

{#if show && player}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
		onclick={handleBackdropClick}
		onkeydown={() => {}}
		role="button"
		tabindex="0"
	>
		<div
			class="bg-white rounded-lg shadow-xl w-full max-w-sm max-h-[90vh] overflow-y-auto"
			onclick={(e) => e.stopPropagation()}
			onkeydown={() => {}}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<!-- Header -->
			<div class="flex items-center justify-between border-b p-4 bg-blue-600 text-white rounded-t-lg">
				<div>
					<h3 class="text-lg font-semibold">{player.name}</h3>
					<div class="text-blue-100">Score: {player.score}</div>
				</div>
				<button
					onclick={onClose}
					class="text-blue-100 hover:text-white transition-colors"
					aria-label="Close modal"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<!-- Content -->
			<div class="p-4 space-y-4">
				<!-- Poker Hands -->
				<div>
					<h4 class="text-sm font-medium text-gray-700 mb-3">Poker Hands</h4>
					<div class="grid grid-cols-2 gap-3">
						<button
							onclick={() => handlePokerHandClick(1)}
							class="flex flex-col items-center justify-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
						>
							<span class="text-lg font-bold">1</span>
							<span class="text-xs">One Pair</span>
						</button>
						<button
							onclick={() => handlePokerHandClick(2)}
							class="flex flex-col items-center justify-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
						>
							<span class="text-lg font-bold">2</span>
							<span class="text-xs">Two Pairs</span>
						</button>
						<button
							onclick={() => handlePokerHandClick(3)}
							class="flex flex-col items-center justify-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
						>
							<span class="text-lg font-bold">3</span>
							<span class="text-xs">Three Kind</span>
						</button>
						<button
							onclick={() => handlePokerHandClick(4)}
							class="flex flex-col items-center justify-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
						>
							<span class="text-lg font-bold">4</span>
							<span class="text-xs">Straight</span>
						</button>
						<button
							onclick={() => handlePokerHandClick(5)}
							class="flex flex-col items-center justify-center p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
						>
							<span class="text-lg font-bold">5</span>
							<span class="text-xs">Flush</span>
						</button>
						<button
							onclick={() => handlePokerHandClick(6)}
							class="flex flex-col items-center justify-center p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
						>
							<span class="text-lg font-bold">6</span>
							<span class="text-xs">Full House</span>
						</button>
						<button
							onclick={() => handlePokerHandClick(7)}
							class="flex flex-col items-center justify-center p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
						>
							<span class="text-lg font-bold">7</span>
							<span class="text-xs">Four Kind</span>
						</button>
						<button
							onclick={() => handlePokerHandClick(52)}
							class="flex flex-col items-center justify-center p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
						>
							<span class="text-lg font-bold">52</span>
							<span class="text-xs">Royal Flush</span>
						</button>
					</div>
				</div>

				<!-- Special Scoring -->
				<div>
					<h4 class="text-sm font-medium text-gray-700 mb-3">Special Scoring</h4>
					<div class="grid grid-cols-1 gap-2">
						<button
							onclick={handleLastTrick}
							class="flex items-center justify-center p-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
						>
							<span class="font-semibold">Last Trick (+5)</span>
						</button>
						<button
							onclick={handleChicagoSuccess}
							class="flex items-center justify-center p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
						>
							<span class="font-semibold">Chicago Success (+15)</span>
						</button>
						<button
							onclick={handleChicagoFail}
							class="flex items-center justify-center p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
						>
							<span class="font-semibold">Chicago Fail (-15)</span>
						</button>
					</div>
				</div>

				<!-- Subtract Points -->
				<div>
					<h4 class="text-sm font-medium text-gray-700 mb-3">Subtract Points</h4>
					<div class="grid grid-cols-3 gap-2">
						<button
							onclick={() => handleSubtract(1)}
							class="flex items-center justify-center p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
						>
							<span class="font-semibold">-1</span>
						</button>
						<button
							onclick={() => handleSubtract(5)}
							class="flex items-center justify-center p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
						>
							<span class="font-semibold">-5</span>
						</button>
						<button
							onclick={() => handleSubtract(10)}
							class="flex items-center justify-center p-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
						>
							<span class="font-semibold">-10</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<FourOfAKindModal
	bind:show={showFourOfAKindDialog}
	onChoice={handleFourOfAKindChoice}
	onClose={closeFourOfAKindDialog}
/>