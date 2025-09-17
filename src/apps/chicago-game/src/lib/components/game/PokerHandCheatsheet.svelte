<script lang="ts">
	import { getPokerHandsByCategory } from '../../../types/poker';
	import PokerHandCategory from './PokerHandCategory.svelte';

	let showCheatsheet = false;

	$: basicHands = getPokerHandsByCategory('basic');
	$: advancedHands = getPokerHandsByCategory('advanced');
	$: rareHands = getPokerHandsByCategory('rare');
</script>

<div class="mb-6">
	<button
		on:click={() => (showCheatsheet = !showCheatsheet)}
		class="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
	>
		<span class="font-medium">📋 Poker Hand Reference</span>
		<span class="text-xl">{showCheatsheet ? '▼' : '▶'}</span>
	</button>

	{#if showCheatsheet}
		<div class="mt-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm xl:p-4">
			<h3 class="mb-3 text-base font-semibold xl:mb-4 xl:text-lg">Poker Hand Rankings & Points</h3>

			<PokerHandCategory title="Basic Hands" hands={basicHands} categoryColor="green" />
			<PokerHandCategory title="Advanced Hands" hands={advancedHands} categoryColor="blue" />
			<PokerHandCategory title="Rare Hands" hands={rareHands} categoryColor="purple" />

			<div class="border-t border-gray-200 pt-3">
				<h4 class="mb-2 text-sm font-medium text-gray-700 xl:text-base">Other Scoring:</h4>
				<div class="flex flex-col gap-2 text-xs xl:flex-row xl:flex-wrap xl:text-sm">
					<span class="rounded bg-emerald-100 px-2 py-1 text-center text-emerald-800"
						>Last Trick: +5 points</span
					>
					<span class="rounded bg-indigo-100 px-2 py-1 text-center text-indigo-800"
						>Successful Chicago: +15 points</span
					>
					<span class="rounded bg-red-100 px-2 py-1 text-center text-red-800"
						>Failed Chicago: -15 points</span
					>
				</div>
			</div>
		</div>
	{/if}
</div>
