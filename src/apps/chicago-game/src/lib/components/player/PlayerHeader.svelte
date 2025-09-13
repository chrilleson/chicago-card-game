<script lang="ts">
	import type { Player } from '../../../types/player';

	interface Props {
		player: Player;
	}

	let { player }: Props = $props();
</script>

<div class="flex items-center justify-between mb-3">
	<div class="flex items-center gap-4">
		<div class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
			{player.name.charAt(0).toUpperCase()}
		</div>
		<span class="text-lg font-medium">{player.name}</span>
		{#if player.score >= 52}
			<span class="text-green-600 font-bold">👑 WINNER</span>
		{/if}
	</div>
	<div class="text-2xl font-bold text-blue-600">
		{player.score}
	</div>
</div>