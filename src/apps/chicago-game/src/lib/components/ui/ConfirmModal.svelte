<script lang="ts">
	interface Props {
		show: boolean;
		title: string;
		message: string;
		confirmText?: string;
		cancelText?: string;
		onConfirm: () => void;
		onCancel: () => void;
	}

	let { 
		show = false, 
		title, 
		message, 
		confirmText = 'Confirm', 
		cancelText = 'Cancel',
		onConfirm,
		onCancel 
	}: Props = $props();

	function handleBackdropClick() {
		onCancel();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onCancel();
		}
	}
</script>

{#if show}
	<div 
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		style="background-color: rgba(0, 0, 0, 0.5);"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
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
					<h2 id="modal-title" class="text-lg font-semibold text-gray-900">
						{title}
					</h2>
					<button
						onclick={onCancel}
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
				<p class="text-gray-700 leading-relaxed">
					{message}
				</p>
			</div>
			
			<div class="px-6 py-4 bg-gray-50 rounded-b-xl flex gap-3 justify-end">
				<button
					onclick={onCancel}
					class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
				>
					{cancelText}
				</button>
				<button
					onclick={onConfirm}
					class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
				>
					{confirmText}
				</button>
			</div>
		</div>
	</div>
{/if}