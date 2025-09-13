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

<div class="max-w-md mx-auto">
	<h2 class="text-2xl font-semibold mb-4 text-center">Add Players</h2>
	
	<form on:submit={handleSubmit} class="mb-6">
		<div class="flex gap-2">
			<input
				type="text"
				bind:value={playerName}
				placeholder="Enter player name"
				class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				required
				disabled={isGameStarted}
			/>
			<button
				type="submit"
				class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
				disabled={isGameStarted}
			>
				Add
			</button>
		</div>
		{#if isGameStarted}
			<p class="text-sm text-gray-600 mt-2">Cannot add players while game is in progress</p>
		{/if}
	</form>
</div>
