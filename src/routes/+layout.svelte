<script>
	import '../app.css'
</script>

<slot />

<style global lang="postcss">
	:root {
		font-family: 'Montserrat', sans-serif;
		@apply bg-secondary scroll-smooth scroll-pt-16 bg-gradient-to-b from-secondary via-secondary to-dark via-[100vh];
	}
</style>