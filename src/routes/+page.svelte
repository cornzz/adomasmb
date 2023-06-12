<script lang="ts">
	import { Quotes, About, Contact } from '$lib'
	import { onMount } from 'svelte'

	let scrollY: number = 0
	let innerHeight: number = 0
	let year: number

	onMount(() => (year = new Date().getFullYear()))
</script>

<svelte:window bind:scrollY bind:innerHeight />
<svelte:head>
	<title>Home – Adomas Morkūnas-Budrys</title>
	<meta name="description" content="Adomas Morkūnas-Budrys is one of the most promising Lithuanian conductors of his generation. Known for his wide range of musical tastes, Adomas is particularly passionate about large-scale symphonic works, Nordic and contemporary music. He is also always keen to explore the compositions of less-known artists and introduce them to orchestras and the public.">
</svelte:head>

<div class="min-h-screen">
	<header class="relative flex items-center justify-between px-[3vw] py-6 md:px-[5vw] md:py-8 text-white bg-primary/50">
		<div class="flex items-center">
			<img
				class="p-3 h-12 border-2 w-auto md:h-16 md:border-4 border-white bg-primary/50"
				src="/images/logo.svg"
				alt="Logo"
				width="465"
				height="148"
			/>
			<span class="ml-3 md:text-3xl md:ml-8 font-semibold">Adomas Morkūnas-Budrys</span>
		</div>
		<a class="ml-3" href="https://instagram.com/adomasmb" target="_blank">
			<img src="/images/instagram.svg" alt="Instagram Logo" width="20" height="20" />
		</a>
	</header>

	<div class="absolute left-0 top-0 w-screen h-screen -z-10">
		<div class="absolute h-full w-full bg-landing-image bg-cover bg-center bg-no-repeat" />
	</div>

	<Quotes />
</div>

<div class="h-0 -z-10 hidden gradient:block">
	<img class="-translate-y-full" src="/images/gradient.webp" alt="Gradient" loading="lazy" />
</div>

<div class="w-11/12 max-w-5xl px-6 sm:px-16 py-10 mx-auto bg-primary relative top-[-50px] min-[552px]:max-md:top-0">
	<About />
</div>

<div class="w-11/12 max-w-5xl py-10 mx-auto">
	<Contact />
</div>

<footer class="py-2 bg-dark text-white flex flex-col items-center justify-center sm:flex-row gap-x-2">
	<span>© {year ?? '20XX'} Adomas Morkūnas-Budrys</span>
	<span class="hidden sm:block">|</span>
	<span>Design by <a href="https://corny.me" target="_blank">corny</a></span>
</footer>
