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
			class="mx-auto w-full max-w-md transform rounded-xl bg-white shadow-2xl transition-all"
			onclick={(e) => e.stopPropagation()}
			onkeydown={() => {}}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			tabindex="-1"
		>
			<div class="border-b border-gray-200 px-6 py-4">
				<div class="flex items-center justify-between">
					<h3 id="modal-title" class="flex items-center gap-2 text-xl font-semibold text-gray-900">
						<span class="text-2xl">🂠</span>
						Four of a Kind
					</h3>
					<button
						onclick={onClose}
						class="text-gray-400 transition-colors hover:text-gray-600"
						aria-label="Close modal"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div class="px-6 py-4">
				<p class="mb-6 leading-relaxed text-gray-600">
					You have a <strong>Four of a Kind</strong>! Choose how to use this powerful hand:
				</p>

				<div class="space-y-3">
					<button
						onclick={() => onChoice('points')}
						class="group flex w-full items-center justify-between rounded-lg bg-blue-500 px-4 py-4 text-white transition-colors hover:bg-blue-600"
					>
						<div class="flex items-center gap-3">
							<div
								class="bg-opacity-20 flex h-8 w-8 items-center justify-center rounded-full bg-white"
							>
								<span class="text-lg">📈</span>
							</div>
							<div class="text-left">
								<div class="font-medium">Score Points</div>
								<div class="text-sm text-blue-100">Standard scoring</div>
							</div>
						</div>
						<div class="bg-opacity-90 rounded bg-white px-3 py-1 text-sm font-bold text-blue-600">
							+7
						</div>
					</button>

					<button
						onclick={() => onChoice('reset')}
						class="group flex w-full items-center justify-between rounded-lg bg-red-500 px-4 py-4 text-white transition-colors hover:bg-red-600"
					>
						<div class="flex items-center gap-3">
							<div
								class="bg-opacity-20 flex h-8 w-8 items-center justify-center rounded-full bg-white"
							>
								<span class="text-lg">💥</span>
							</div>
							<div class="text-left">
								<div class="font-medium">Reset Others</div>
								<div class="text-sm text-red-100">All other players → 0 points</div>
							</div>
						</div>
						<div class="bg-opacity-90 rounded bg-white px-3 py-1 text-sm font-bold text-red-600">
							Reset
						</div>
					</button>
				</div>
			</div>

			<div class="rounded-b-xl bg-gray-50 px-6 py-4">
				<button
					onclick={onClose}
					class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
{/if}
