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
			class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
			required
			disabled={isGameStarted}
		/>
		<button
			type="submit"
			class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
			disabled={isGameStarted}
		>
			Add Player
		</button>
	</div>
	{#if isGameStarted}
		<p class="text-sm text-gray-600 mt-3 text-center">Cannot add players while game is in progress</p>
	{/if}
</form>
