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

<div class="relative w-10/12 max-w-6xl mx-auto mt-[60vh] text-white bg-primary/50">
	<button
		class="absolute z-10 left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all hover:-left-2"
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
		class="absolute z-10 right-0 top-1/2 -translate-y-1/2 translate-x-1/2 transition-all hover:-right-2"
		on:click={() => changeQuote(1)}
	>
		<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
			<path fill="#fff" d="m561-242-43-42 168-168H160v-60h526L517-681l43-42 241 241-240 240Z" />
		</svg>
	</button>

	<div class="absolute bottom-0 h-[1px] bg-white" style="width: {$timeoutBar}%"></div>
</div>
