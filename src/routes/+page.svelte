<script>
	import { Quotes, About, Repertoire, Media, Contact } from '$lib'
</script>

<header class="relative flex items-center justify-between py-8 px-[5vw]">
	<div class="flex items-center">
		<img class="p-3 h-24 w-auto border-4 border-black" src="/images/logo.svg" alt="Logo" width="465" height="148" />
		<span class="text-3xl ml-7">Adomas Morkūnas-Budrys</span>
	</div>
	<div>
		Menu
	</div>

	<div class="bg-landing-image bg-cover bg-center bg-no-repeat absolute left-0 top-0 w-screen h-screen -z-10"></div>
</header>

<Quotes />

<div class="bg-[#3b5c62]">
	<div class="w-11/12 max-w-3xl mx-auto">
		<About />
	
		<Repertoire />
	
		<Media />
	
		<Contact />
	</div>
</div>