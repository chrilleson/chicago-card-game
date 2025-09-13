<script lang="ts">
	interface Props {
		show: boolean;
		onChoice: (choice: 'points' | 'reset') => void;
		onClose: () => void;
	}

	let { show = $bindable(false), onChoice, onClose }: Props = $props();
</script>

{#if show}
	<div 
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		style="background-color: rgba(0, 0, 0, 0.5);"
		onclick={onClose}
		onkeydown={() => {}}
		role="button"
		tabindex="0"
	>
		<div 
			class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto transform transition-all"
			onclick={(e) => e.stopPropagation()}
			onkeydown={() => {}}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			tabindex="-1"
		>
			<div class="px-6 py-4 border-b border-gray-200">
				<div class="flex items-center justify-between">
					<h3 id="modal-title" class="text-xl font-semibold text-gray-900 flex items-center gap-2">
						<span class="text-2xl">🂠</span>
						Four of a Kind
					</h3>
					<button 
						onclick={onClose}
						class="text-gray-400 hover:text-gray-600 transition-colors"
						aria-label="Close modal"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>
			
			<div class="px-6 py-4">
				<p class="text-gray-600 mb-6 leading-relaxed">
					You have a <strong>Four of a Kind</strong>! Choose how to use this powerful hand:
				</p>
				
				<div class="space-y-3">
					<button 
						onclick={() => onChoice('points')}
						class="w-full px-4 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-between group"
					>
						<div class="flex items-center gap-3">
							<div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
								<span class="text-lg">📈</span>
							</div>
							<div class="text-left">
								<div class="font-medium">Score Points</div>
								<div class="text-sm text-blue-100">Standard scoring</div>
							</div>
						</div>
						<div class="bg-white bg-opacity-90 text-blue-600 px-3 py-1 rounded text-sm font-bold">
							+7
						</div>
					</button>
					
					<button 
						onclick={() => onChoice('reset')}
						class="w-full px-4 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-between group"
					>
						<div class="flex items-center gap-3">
							<div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
								<span class="text-lg">💥</span>
							</div>
							<div class="text-left">
								<div class="font-medium">Reset Others</div>
								<div class="text-sm text-red-100">All other players → 0 points</div>
							</div>
						</div>
						<div class="bg-white bg-opacity-90 text-red-600 px-3 py-1 rounded text-sm font-bold">
							Reset
						</div>
					</button>
				</div>
			</div>
			
			<div class="px-6 py-4 bg-gray-50 rounded-b-xl">
				<button 
					onclick={onClose}
					class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
{/if}