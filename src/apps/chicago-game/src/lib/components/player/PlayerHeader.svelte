<script lang="ts">
	import type { Player } from '../../../types/player';

	interface Props {
		player: Player;
	}

	let { player }: Props = $props();
</script>

<div class="mb-3 flex items-center justify-between">
	<div class="flex items-center gap-4">
		<div
			class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold text-white"
		>
			{player.name.charAt(0).toUpperCase()}
		</div>
		<span class="text-lg font-medium">{player.name}</span>
		{#if player.score >= 52}
			<span class="font-bold text-green-600">👑 WINNER</span>
		{/if}
	</div>
	<div class="text-2xl font-bold text-blue-600">
		{player.score}
	</div>
</div>
