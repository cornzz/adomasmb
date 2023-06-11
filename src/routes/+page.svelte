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
</svelte:head>

<div class="min-h-screen">
	<header class="relative flex items-center justify-between py-8 px-[5vw] text-white bg-primary/50">
		<div class="flex items-center">
			<img
				class="p-3 h-16 w-auto border-4 border-white bg-primary/50"
				src="/images/logo.svg"
				alt="Logo"
				width="465"
				height="148"
			/>
			<span class="text-3xl ml-8 font-semibold">Adomas Morkūnas-Budrys</span>
		</div>
		<a href="https://instagram.com/adomasmb" target="_blank">
			<img src="/images/instagram.svg" alt="Instagram Logo" width="20" height="20" />
		</a>
	</header>

	<div class="absolute left-0 top-0 w-screen h-screen -z-10">
		<div class="absolute h-full w-full bg-landing-image bg-cover bg-center bg-no-repeat" />
	</div>

	<Quotes />
</div>

<div class="bg-secondary">
	<div class="w-11/12 max-w-5xl px-16 py-10 mx-auto bg-primary relative top-[-50px]">
		<About />
	</div>
</div>

<div class="bg-secondary">
	<div class="w-11/12 max-w-5xl py-10 mx-auto">
		<Contact />
	</div>
</div>

<footer class="py-2 bg-secondary text-white flex flex-col items-center justify-center sm:flex-row gap-x-2">
	<span>© {year ?? '20XX'} Adomas Morkūnas-Budrys</span>
	<span class="hidden sm:block">|</span>
	<span>Design by <a href="https://corny.me" target="_blank">corny</a></span>
</footer>
