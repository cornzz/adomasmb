<script lang="ts">
	import { onMount } from 'svelte'
    import { tweened, type Tweened } from 'svelte/motion'

	const quotes = [
		{
			quote: 'Adomas possesses great energy, wide-ranging musical instincts and interests, and an infectious way of transmitting his ideas to performers.',
			author: 'Sakari Oramo, Chief Conductor of the BBC Symphony Orchestra'
		},
		{
			quote: 'Adomas is an excellent musician gifted with an exceptional analytical brain allied to a natural musicality and a superb ear.',
			author: 'James Lowe, Music Director of the Spokane Symphony'
		}
	]
	const carouselTimeout = 7500
    const carouselSpeed = 500

	let transform: number = 0
    let timeoutBar: Tweened<number> = tweened(0, { delay: carouselSpeed, duration: carouselTimeout })
	let timeout: number

	function changeQuote(direction: -1 | 1): void {
        const max = -(quotes.length - 1) * 100
		const limit = direction === 1 ? max : 0
		transform -= (transform === limit ? max : 100) * direction
		clearTimeout(timeout)
		timeout = setTimeout(() => changeQuote(1), carouselTimeout + carouselSpeed)
        timeoutBar.set(0, { duration: 0 })
        timeoutBar.set(100)
	}

	onMount(() => {
		timeout = setTimeout(() => changeQuote(1), carouselTimeout + carouselSpeed)
        timeoutBar.set(100)
	})
</script>

<div class="relative w-10/12 max-w-6xl mx-auto mt-[55vh] mb-[calc(5vw+80px)] text-white bg-primary/50 z-10">
	<svg class="absolute h-8 -top-8 left-8 px-2 pt-2 bg-primary/50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.915 341.269">
		<path fill="currentColor" d="M91.401 80.621a194.247 194.247 0 0117.094-79.403C43.936 44.53 2.969 106.278 1.28 175.056L0 176.462v164.807h212.677V127.964H97.371a190.082 190.082 0 01-5.97-47.343zM395.699 127.964a190.921 190.921 0 01-6.281-48.561A194.983 194.983 0 01406.543 0c-65.401 43.874-106.588 106.652-107.274 176.462h-.031v164.807h212.677V127.964z"></path>
	</svg>
	<button
		class="absolute z-10 hidden left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all sm:hover:-left-2"
		aria-label="Previous Quote"
		on:click={() => changeQuote(-1)}
	>
		<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
			<path fill="#fff" d="M400-240 160-480l241-241 43 42-169 169h526v60H275l168 168-43 42Z" />
		</svg>
	</button>
	<div class="flex overflow-hidden">
		{#each quotes as item}
			<blockquote
				class="px-10 py-4 grow-0 shrink-0 basis-full transition-transform"
				style="transform: translateX({transform}%); transition-duration: {carouselSpeed}ms"
			>
				<p class="text-2xl font-bold">{item.quote}</p>
				<cite class="block before:content-['–'] before:mr-2">{item.author}</cite>
			</blockquote>
		{/each}
	</div>
	<button
		class="absolute z-10 hidden right-0 top-1/2 -translate-y-1/2 translate-x-1/2 transition-all sm:hover:-right-2"
		aria-label="Next Quote"
		on:click={() => changeQuote(1)}
	>
		<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
			<path fill="#fff" d="m561-242-43-42 168-168H160v-60h526L517-681l43-42 241 241-240 240Z" />
		</svg>
	</button>

	<div class="absolute bottom-0 h-[1px] bg-white" style="width: {$timeoutBar}%"></div>
</div>
