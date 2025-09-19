<script lang="ts">
	import type { Player } from '../../../types/player';

	interface Props {
		player: Player;
		onSubtract: (points: number) => void;
	}

	let { player, onSubtract }: Props = $props();
</script>

<div class="mt-3 flex gap-2">
	<button
		onclick={() => onSubtract(1)}
		class="rounded bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-600"
		disabled={player.score === 0}
	>
		-1
	</button>
	<button
		onclick={() => onSubtract(5)}
		class="rounded bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-600"
		disabled={player.score < 5}
	>
		-5
	</button>
	<button
		onclick={() => onSubtract(15)}
		class="rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
		disabled={player.score < 15}
	>
		-15
	</button>
</div>
