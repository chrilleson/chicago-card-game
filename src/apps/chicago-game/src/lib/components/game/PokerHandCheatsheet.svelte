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
		on:click={() => showCheatsheet = !showCheatsheet}
		class="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-between"
	>
		<span class="font-medium">📋 Poker Hand Reference</span>
		<span class="text-xl">{showCheatsheet ? '▼' : '▶'}</span>
	</button>
	
	{#if showCheatsheet}
		<div class="mt-3 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
			<h3 class="font-semibold text-lg mb-4">Poker Hand Rankings & Points</h3>
			
			<PokerHandCategory title="Basic Hands" hands={basicHands} categoryColor="green" />
			<PokerHandCategory title="Advanced Hands" hands={advancedHands} categoryColor="blue" />
			<PokerHandCategory title="Rare Hands" hands={rareHands} categoryColor="purple" />

			<div class="pt-3 border-t border-gray-200">
				<h4 class="font-medium text-gray-700 mb-2">Other Scoring:</h4>
				<div class="flex flex-wrap gap-2 text-sm">
					<span class="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">Last Trick: +5 points</span>
					<span class="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">Successful Chicago: +15 points</span>
					<span class="bg-red-100 text-red-800 px-2 py-1 rounded">Failed Chicago: -15 points</span>
				</div>
			</div>
		</div>
	{/if}
</div>