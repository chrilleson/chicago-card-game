<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let isGameStarted = false;

	let playerName = '';
	const dispatch = createEventDispatcher<{
		addPlayer: string;
	}>();

	function handleSubmit(event: Event) {
		event.preventDefault();
		if (playerName.trim()) {
			dispatch('addPlayer', playerName.trim());
			playerName = '';
		}
	}
</script>

<form on:submit={handleSubmit}>
	<div class="flex gap-3">
		<input
			type="text"
			bind:value={playerName}
			placeholder="Enter player name"
			class="flex-1 rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
			required
			disabled={isGameStarted}
		/>
		<button
			type="submit"
			class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
			disabled={isGameStarted}
		>
			Add Player
		</button>
	</div>
	{#if isGameStarted}
		<p class="mt-3 text-center text-sm text-gray-600">
			Cannot add players while game is in progress
		</p>
	{/if}
</form>
