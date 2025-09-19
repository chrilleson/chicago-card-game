<script lang="ts">
	import { base } from '$app/paths';
	export let gameId: string;
</script>

<div class="mb-6 rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
	<p class="font-semibold">Game not found!</p>
	<p>The game with ID "{gameId}" could not be found. It may have expired or never existed.</p>
</div>
<div class="text-center">
	<a
		href="{base ? base + '/' : '/'}/"
		class="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
	>
		← Start New Game
	</a>
</div>
