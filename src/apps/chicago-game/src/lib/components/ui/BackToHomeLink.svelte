<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="mt-6 text-center">
	<a
		href={base ? base + '/' : '/'}
		class="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800"
	>
		<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M15 19l-7-7 7-7"
			/>
		</svg>
		Back to Home
	</a>
</div>
