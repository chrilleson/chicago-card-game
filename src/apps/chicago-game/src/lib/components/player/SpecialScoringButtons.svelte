<script lang="ts">
	import type { Player } from '../../../types/player';

	interface Props {
		player: Player;
		onLastTrick: () => void;
		onChicagoSuccess: () => void;
		onChicagoFail: () => void;
	}

	let { player, onLastTrick, onChicagoSuccess, onChicagoFail }: Props = $props();
</script>

<div class="mt-4 border-t border-gray-200 pt-3">
	<div class="mb-2 text-sm font-medium text-gray-700">Special Scoring:</div>
	<button
		onclick={onLastTrick}
		class="flex w-full items-center justify-between rounded bg-green-500 px-4 py-2 text-sm text-white transition-colors hover:bg-green-600"
		title="Award 5 points for winning the last trick"
	>
		<div class="flex items-center gap-2">
			<span class="text-lg">🏆</span>
			<span class="font-medium">Last Trick</span>
		</div>
		<span class="bg-opacity-90 rounded bg-white px-2 py-1 text-xs font-bold text-green-600">
			+5
		</span>
	</button>

	<div class="mt-3 grid grid-cols-2 gap-2">
		<button
			onclick={onChicagoSuccess}
			class="flex items-center justify-between rounded bg-purple-500 px-3 py-2 text-sm text-white transition-colors hover:bg-purple-600"
			title="Successful Chicago - took all 5 tricks"
		>
			<div class="flex items-center gap-2">
				<span class="text-lg">🎯</span>
				<span class="text-xs font-medium">Chicago ✓</span>
			</div>
			<span class="bg-opacity-90 rounded bg-white px-2 py-1 text-xs font-bold text-purple-600">
				+15
			</span>
		</button>
		<button
			onclick={onChicagoFail}
			class="flex items-center justify-between rounded bg-purple-700 px-3 py-2 text-sm text-white transition-colors hover:bg-purple-800"
			title="Failed Chicago - declared but didn't take all tricks"
			disabled={player.score < 15}
		>
			<div class="flex items-center gap-2">
				<span class="text-lg">❌</span>
				<span class="text-xs font-medium">Chicago ✗</span>
			</div>
			<span class="bg-opacity-90 rounded bg-white px-2 py-1 text-xs font-bold text-purple-700">
				-15
			</span>
		</button>
	</div>
</div>
