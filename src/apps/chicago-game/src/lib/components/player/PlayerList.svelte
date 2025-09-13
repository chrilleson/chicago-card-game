<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let players: string[] = [];
	export let isGameStarted = false;

	let editingIndex = -1;
	let editName = '';

	const dispatch = createEventDispatcher<{
		removePlayer: number;
		updatePlayer: { index: number; name: string };
	}>();

	function startEdit(index: number) {
		editingIndex = index;
		editName = players[index];
	}

	function saveEdit() {
		if (editName.trim()) {
			dispatch('updatePlayer', { index: editingIndex, name: editName.trim() });
			cancelEdit();
		}
	}

	function cancelEdit() {
		editingIndex = -1;
		editName = '';
	}

	function removePlayer(index: number) {
		dispatch('removePlayer', index);
		if (editingIndex === index) {
			cancelEdit();
		}
	}

	function handleEditSubmit(event: Event) {
		event.preventDefault();
		saveEdit();
	}
</script>

{#if players.length > 0}
	<div class="bg-gray-50 rounded-lg p-4">
		<h3 class="text-lg font-medium mb-3">Players ({players.length})</h3>
		<ul class="space-y-2">
			{#each players as player, index}
				<li class="flex items-center justify-between bg-white px-3 py-2 rounded border">
					{#if editingIndex === index}
						<form on:submit={handleEditSubmit} class="flex-1 flex gap-2">
							<input
								type="text"
								bind:value={editName}
								class="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
								required
							/>
							<button
								type="submit"
								class="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
							>
								Save
							</button>
							<button
								type="button"
								on:click={cancelEdit}
								class="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
							>
								Cancel
							</button>
						</form>
					{:else}
						<span class="font-medium flex-1">{player}</span>
						{#if !isGameStarted}
							<div class="flex gap-2">
								<button
									on:click={() => startEdit(index)}
									class="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
								>
									Edit
								</button>
								<button
									on:click={() => removePlayer(index)}
									class="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
								>
									Remove
								</button>
							</div>
						{/if}
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/if}
