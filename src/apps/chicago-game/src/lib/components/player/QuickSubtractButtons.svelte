<script lang="ts">
	import type { Player } from '../../../types/player';

	interface Props {
		player: Player;
		onSubtract: (points: number) => void;
	}

	let { player, onSubtract }: Props = $props();
</script>

<div class="flex gap-2 mt-3">
	<button 
		onclick={() => onSubtract(1)}
		class="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
		disabled={player.score === 0}
	>
		-1
	</button>
	<button 
		onclick={() => onSubtract(5)}
		class="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
		disabled={player.score < 5}
	>
		-5
	</button>
	<button 
		onclick={() => onSubtract(15)}
		class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
		disabled={player.score < 15}
	>
		-15
	</button>
</div>