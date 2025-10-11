<script lang="ts">
	import type { Player } from '../../../types/player';
	import { POKER_HANDS } from '../../../types/poker';
	import FourOfAKindModal from './FourOfAKindModal.svelte';

	interface Props {
		show: boolean;
		player: Player | null;
		onScoreUpdate: (playerId: string, change: number) => void;
		onResetOtherPlayers: (playerId: string) => void;
		onToggleChicago: (playerId: string) => void;
		onClose: () => void;
	}

	let { show, player, onScoreUpdate, onResetOtherPlayers, onToggleChicago, onClose }: Props = $props();

	let showFourOfAKindDialog = $state(false);

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
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
		onclick={handleBackdropClick}
		onkeydown={() => {}}
		role="button"
		tabindex="0"
	>
		<div
			class="max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-lg bg-white shadow-xl"
			onclick={(e) => e.stopPropagation()}
			onkeydown={() => {}}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<!-- Header -->
			<div
				class="flex items-center justify-between rounded-t-lg border-b bg-blue-600 p-4 text-white"
			>
				<div>
					<h3 class="text-lg font-semibold">
						{player.name}
						{#if player.declaredChicago}
							<span class="ml-1 text-lg" title="Declared Chicago">©️</span>
						{/if}
					</h3>
					<div class="text-blue-100">Score: {player.score}</div>
				</div>
				<button
					onclick={onClose}
					class="text-blue-100 transition-colors hover:text-white"
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
			<div class="space-y-4 p-4">
				<!-- Poker Hands -->
				<div>
					<h4 class="mb-3 text-sm font-medium text-gray-700">Poker Hands</h4>
					<div class="space-y-2">
						<!-- Basic Hands -->
						<div class="grid grid-cols-3 gap-2">
							{#each POKER_HANDS.slice(0, 3) as hand (hand.id)}
								<button
									onclick={() => handlePokerHandClick(hand.points)}
									class="flex flex-col items-center justify-center p-3 {getColorClasses(
										hand.category.color
									)} rounded-lg text-white transition-colors"
								>
									<span class="text-lg font-bold">{hand.points}</span>
									<span class="text-xs">{hand.name}</span>
								</button>
							{/each}
						</div>
						<!-- Advanced Hands -->
						<div class="grid grid-cols-3 gap-2">
							{#each POKER_HANDS.slice(3, 6) as hand (hand.id)}
								<button
									onclick={() => handlePokerHandClick(hand.points)}
									class="flex flex-col items-center justify-center p-3 {getColorClasses(
										hand.category.color
									)} rounded-lg text-white transition-colors"
								>
									<span class="text-lg font-bold">{hand.points}</span>
									<span class="text-xs">{hand.name}</span>
								</button>
							{/each}
						</div>
						<!-- Rare Hands -->
						<div class="grid grid-cols-3 gap-2">
							{#each POKER_HANDS.slice(6, 9) as hand (hand.id)}
								<button
									onclick={() => handlePokerHandClick(hand.points)}
									class="flex flex-col items-center justify-center p-3 {getColorClasses(
										hand.category.color
									)} rounded-lg text-white transition-colors"
								>
									<span class="text-lg font-bold">{hand.points}</span>
									<span class="text-xs">{hand.name}</span>
								</button>
							{/each}
						</div>
					</div>
				</div>

				<!-- Special Scoring -->
				<div>
					<h4 class="mb-3 text-sm font-medium text-gray-700">Special Scoring</h4>
					<div class="grid grid-cols-1 gap-2">
						<button
							onclick={handleLastTrick}
							class="flex items-center justify-center rounded-lg bg-emerald-500 p-3 text-white transition-colors hover:bg-emerald-600"
						>
							<span class="font-semibold">Last Trick (+5)</span>
						</button>
						<button
							onclick={() => player && onToggleChicago(player.id)}
							disabled={!player.declaredChicago && player.score < 15}
							class="flex items-center justify-center rounded-lg {player.declaredChicago
								? 'bg-orange-500 hover:bg-orange-600'
								: 'bg-gray-500 hover:bg-gray-600'} p-3 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
							title={!player.declaredChicago && player.score < 15
								? 'Need 15+ points to declare Chicago'
								: ''}
						>
							<span class="font-semibold"
								>{player.declaredChicago
									? '©️ Chicago Declared'
									: player.score < 15
										? 'Need 15+ pts for Chicago'
										: 'Declare Chicago ©️'}</span
							>
						</button>
						<button
							onclick={handleChicagoSuccess}
							class="flex items-center justify-center rounded-lg bg-indigo-500 p-3 text-white transition-colors hover:bg-indigo-600"
						>
							<span class="font-semibold">Chicago Success (+15)</span>
						</button>
						<button
							onclick={handleChicagoFail}
							class="flex items-center justify-center rounded-lg bg-red-500 p-3 text-white transition-colors hover:bg-red-600"
						>
							<span class="font-semibold">Chicago Fail (-15)</span>
						</button>
					</div>
				</div>

				<!-- Subtract Points -->
				<div>
					<h4 class="mb-3 text-sm font-medium text-gray-700">Subtract Points</h4>
					<div class="grid grid-cols-3 gap-2">
						<button
							onclick={() => handleSubtract(1)}
							class="flex items-center justify-center rounded-lg bg-red-500 p-3 text-white transition-colors hover:bg-red-600"
						>
							<span class="font-semibold">-1</span>
						</button>
						<button
							onclick={() => handleSubtract(5)}
							class="flex items-center justify-center rounded-lg bg-red-600 p-3 text-white transition-colors hover:bg-red-700"
						>
							<span class="font-semibold">-5</span>
						</button>
						<button
							onclick={() => handleSubtract(10)}
							class="flex items-center justify-center rounded-lg bg-red-700 p-3 text-white transition-colors hover:bg-red-800"
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
