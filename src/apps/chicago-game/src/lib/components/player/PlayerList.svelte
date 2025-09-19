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
	<div class="rounded-lg bg-gray-50 p-4">
		<h3 class="mb-3 text-lg font-medium">Players ({players.length})</h3>
		<ul class="space-y-2">
			{#each players as player, index (index)}
				<li class="flex items-center justify-between rounded border bg-white px-3 py-2">
					{#if editingIndex === index}
						<form on:submit={handleEditSubmit} class="flex flex-1 gap-2">
							<input
								type="text"
								bind:value={editName}
								class="flex-1 rounded border border-gray-300 px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none"
								required
							/>
							<button
								type="submit"
								class="rounded bg-green-500 px-3 py-1 text-sm text-white transition-colors hover:bg-green-600"
							>
								Save
							</button>
							<button
								type="button"
								on:click={cancelEdit}
								class="rounded bg-gray-500 px-3 py-1 text-sm text-white transition-colors hover:bg-gray-600"
							>
								Cancel
							</button>
						</form>
					{:else}
						<span class="flex-1 font-medium">{player}</span>
						{#if !isGameStarted}
							<div class="flex gap-2">
								<button
									on:click={() => startEdit(index)}
									class="rounded bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600"
								>
									Edit
								</button>
								<button
									on:click={() => removePlayer(index)}
									class="rounded bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-600"
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
