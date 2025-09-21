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
					<h2 id="modal-title" class="text-lg font-semibold text-gray-900">
						{title}
					</h2>
					<button
						onclick={onCancel}
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
				<p class="leading-relaxed text-gray-700">
					{message}
				</p>
			</div>

			<div class="flex justify-end gap-3 rounded-b-xl bg-gray-50 px-6 py-4">
				<button
					onclick={onCancel}
					class="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
				>
					{cancelText}
				</button>
				<button
					onclick={onConfirm}
					class="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
				>
					{confirmText}
				</button>
			</div>
		</div>
	</div>
{/if}
