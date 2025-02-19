<script>
	import { inject } from '@vercel/analytics'
	import '../app.css'

	inject()
</script>

<svelte:head>
	<title>Adomas Morkūnas-Budrys</title>
	<meta
		name="description"
		content="Adomas Morkūnas-Budrys is one of the most promising Lithuanian conductors of his generation. Known for his wide range of musical tastes, Adomas is particularly passionate about large-scale symphonic works, Nordic and contemporary music. He is also always keen to explore the compositions of less-known artists and introduce them to orchestras and the public."
	/>
</svelte:head>

<slot />

<div class="hidden">Prerendered at: {new Date()}</div>