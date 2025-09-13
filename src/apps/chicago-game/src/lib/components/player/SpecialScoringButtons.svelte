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

<div class="mt-4 pt-3 border-t border-gray-200">
	<div class="text-sm font-medium text-gray-700 mb-2">Special Scoring:</div>
	<button 
		onclick={onLastTrick}
		class="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors flex items-center justify-between w-full"
		title="Award 5 points for winning the last trick"
	>
		<div class="flex items-center gap-2">
			<span class="text-lg">🏆</span>
			<span class="font-medium">Last Trick</span>
		</div>
		<span class="bg-white bg-opacity-90 text-green-600 px-2 py-1 rounded text-xs font-bold">
			+5
		</span>
	</button>
	
	<div class="grid grid-cols-2 gap-2 mt-3">
		<button 
			onclick={onChicagoSuccess}
			class="px-3 py-2 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition-colors flex items-center justify-between"
			title="Successful Chicago - took all 5 tricks"
		>
			<div class="flex items-center gap-2">
				<span class="text-lg">🎯</span>
				<span class="font-medium text-xs">Chicago ✓</span>
			</div>
			<span class="bg-white bg-opacity-90 text-purple-600 px-2 py-1 rounded text-xs font-bold">
				+15
			</span>
		</button>
		<button 
			onclick={onChicagoFail}
			class="px-3 py-2 bg-purple-700 text-white text-sm rounded hover:bg-purple-800 transition-colors flex items-center justify-between"
			title="Failed Chicago - declared but didn't take all tricks"
			disabled={player.score < 15}
		>
			<div class="flex items-center gap-2">
				<span class="text-lg">❌</span>
				<span class="font-medium text-xs">Chicago ✗</span>
			</div>
			<span class="bg-white bg-opacity-90 text-purple-700 px-2 py-1 rounded text-xs font-bold">
				-15
			</span>
		</button>
	</div>
</div>