<script lang="ts">
	import { Quotes, About, Media, Contact } from '$lib'
	import type { LayoutData } from './$types'

	export let data: LayoutData
</script>

<div class="min-h-screen flex flex-col">
	<header
		class="relative flex items-center justify-between px-[3vw] py-6 md:px-[5vw]md:py-8 shortScreens:py-4 text-white"
	>
		<div class="flex items-center">
			<img
				class="p-3 h-12 border-2 w-auto md:h-16 md:border-4 border-white"
				src="/images/logo.svg"
				alt="Logo"
				width="465"
				height="148"
			/>
			<span class="ml-3 md:text-3xl md:ml-8 font-semibold">Adomas Morkūnas-Budrys</span>
		</div>
		<!-- <a class="ml-4" href="https://instagram.com/adomasmb" target="_blank">
			<img src="/images/instagram.svg" alt="Instagram Logo" width="20" height="20" />
		</a> -->
	</header>

	<div class="absolute left-0 top-0 w-full h-screen -z-10">
		<div class="absolute h-full w-full bg-landing-image bg-cover sm:bg-right-top bg-[82%_top] bg-no-repeat" />
	</div>

	<!-- <Quotes /> -->
</div>

<div
	class="w-11/12 max-w-5xl px-6 sm:px-16 py-10 mx-auto bg-primary relative top-[-12vh] min-[552px]:max-md:top-0 shortScreens:top-0"
>
	<About />
</div>

<div class="w-11/12 max-w-5xl py-10 mx-auto">
	<Media />
</div>

<div class="w-11/12 max-w-5xl py-16 mx-auto">
	<Contact contactedAt={data.contactedAt} />
</div>

<footer class="py-2 text-white flex flex-col items-center justify-center text-sm sm:flex-row gap-x-2">
	<span>© {new Date().getFullYear()} Adomas Morkūnas-Budrys</span>
	<span class="hidden sm:block">|</span>
	<span>Design by <a href="https://corny.me" target="_blank">ck</a></span>
</footer>
