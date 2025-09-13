<script lang="ts">
	export let gameId: string;
</script>

<div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
	<p class="font-semibold">Game not found!</p>
	<p>The game with ID "{gameId}" could not be found. It may have expired or never existed.</p>
</div>
<div class="text-center">
	<a href="/" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
		← Start New Game
	</a>
</div>