<script lang="ts">
	import { onMount } from 'svelte'
	import { slide } from 'svelte/transition'
	import { initLightbox } from '$lib/helpers'
	import 'photoswipe/style.css'

	const images = [
		{
			large: 'adomas-mb-0.webp',
			width: 2000,
			height: 3000,
			thumb: 'adomas-mb-0-small.webp'
		},
		{
			large: 'adomas-mb-1.webp',
			width: 2000,
			height: 3000,
			thumb: 'adomas-mb-1-small.webp'
		},
		{
			large: 'adomas-mb-2.webp',
			width: 2000,
			height: 3000,
			thumb: 'adomas-mb-2-small.webp'
		},
		{
			large: 'adomas-mb-3.webp',
			width: 2000,
			height: 3000,
			thumb: 'adomas-mb-3-small.webp'
		},
		{
			large: 'adomas-mb-4.webp',
			width: 2000,
			height: 3000,
			thumb: 'adomas-mb-4-small.webp'
		}
	]
	const videos = [
		{
			id: '8BFuODOHbmA',
			thumb: 'thumb-video-1.webp',
			caption: "Excerpt from J. Kaipainen's Piano Concerto<br>Helsinki Philharmonic Orchestra, soloist Joonas Ahonen"
		},
		{
			id: 'wDqR5Z0MMRw',
			thumb: 'thumb-video-2.webp',
			caption: "Excerpt from L. Bernstein's Symphonic Dances from West Side Story<br>Lithuanian National Symphony Orchestra"
		}
	]

	let innerWidth: number
	let showMore: boolean = false
	let section: HTMLElement

	function getIframeDimensions(): [string, string] {
		const iframeWidth = innerWidth <= 560 ? innerWidth * (11 / 12) : innerWidth * 0.7
		const iframeHeight = iframeWidth * (9 / 16)
		return [`${iframeWidth}`, `${iframeHeight}`]
	}

	onMount(() => {
		initLightbox(getIframeDimensions)
	})
</script>

<svelte:window bind:innerWidth />

<div id="gallery" class="grid grid-cols-2 sm:grid-cols-4 gap-4" bind:this={section}>
	{#each images.slice(0, 4) as image}
		<a
			href="/images/gallery/{image.large}"
			data-pswp-width={image.width}
			data-pswp-height={image.height}
			target="_blank"
		>
			<img src="/images/gallery/{image.thumb}" alt="Adomas Morkūnas-Budrys" loading="lazy" />
		</a>
	{/each}

	{#each videos as video}
		<div class="col-span-2 flex flex-col items-center text-white text-center">
			<a
				class="relative after:content-[''] after:absolute after:inset-0 after:bg-black/50
					   after:transition-all after:duration-300 hover:after:bg-black/20 group"
				href="https://www.youtube.com/watch?v={video.id}"
				data-pswp-type="youtube"
				data-youtube-url="https://www.youtube-nocookie.com/embed/{video.id}?autoplay=1&hd=1&rel=0"
				target="_blank"
			>
				<img src="/images/gallery/{video.thumb}" alt="Video Thumbnail" loading="lazy" />
				<svg
					class="absolute-center z-10 transition-all duration-300 group-hover:scale-125"
					xmlns="http://www.w3.org/2000/svg"
					height="48"
					width="48"
				>
					<path fill="white" d="M16 37.85v-28l22 14Zm3-14Zm0 8.55 13.45-8.55L19 15.3Z" />
				</svg>
			</a>
		</div>
	{/each}

	{#if showMore}
		<div transition:slide={{ duration: 500 }}>
			{#each images.slice(4) as image}
				<a
					href="/images/gallery/{image.large}"
					data-pswp-width={image.width}
					data-pswp-height={image.height}
					target="_blank"
				>
					<img src="/images/gallery/{image.thumb}" alt="Adomas Morkūnas-Budrys" loading="lazy" />
				</a>
			{/each}
		</div>
	{/if}
</div>

<div class="flex justify-center mt-10">
	<button
		class="btn btn-outline"
		on:click={() => {
			showMore = !showMore
			if (!showMore) section.scrollIntoView()
		}}
	>
		{!showMore ? 'Show More' : 'Show Less'}
	</button>
</div>

<style lang="postcss">
	:global(.pswp__youtube-container) {
		@apply relative w-full h-full pointer-events-none;

		:global(iframe) {
			@apply pointer-events-auto;
		}
	}
</style>
