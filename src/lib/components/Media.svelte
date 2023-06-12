<script lang="ts">
	import { onMount } from 'svelte'
	import PhotoSwipeLightbox from 'photoswipe/lightbox'
	import 'photoswipe/style.css'

	const images = [
		{
			large: '/images/gallery/adomas-mb-0.webp',
			width: 2000,
			height: 3000,
			thumb: '/images/gallery/adomas-mb-0-small.webp'
		},
		{
			large: '/images/gallery/adomas-mb-1.webp',
			width: 2000,
			height: 3000,
			thumb: '/images/gallery/adomas-mb-1-small.webp'
		},
		{
			large: '/images/gallery/adomas-mb-2.webp',
			width: 2000,
			height: 3000,
			thumb: '/images/gallery/adomas-mb-2-small.webp'
		},
		{
			large: '/images/gallery/adomas-mb-3.webp',
			width: 2000,
			height: 3000,
			thumb: '/images/gallery/adomas-mb-3-small.webp'
		}
	]

    let outerWidth: number
    let iframe: HTMLIFrameElement

    $: if (outerWidth) {
        const maxIframeWidth = outerWidth * 11/12
        const actualWidth = Math.min(maxIframeWidth, 560)
        iframe.width = `${actualWidth}`
        iframe.height = `${actualWidth * 9/16}`
    }

	onMount(() => {
		const lightbox = new PhotoSwipeLightbox({
			gallery: '#mediaContainer',
			children: 'a',
			pswpModule: () => import('photoswipe')
		})
		lightbox.init()
	})
</script>

<svelte:window bind:outerWidth />

<div id="mediaContainer" class="grid grid-cols-2 sm:grid-cols-4 gap-4">
	{#each images as image}
		<a href={image.large} data-pswp-width={image.width} data-pswp-height={image.height} target="_blank">
			<img src={image.thumb} alt="Adomas Morkūnas-Budrys" loading="lazy" />
		</a>
	{/each}
</div>

<div class="flex flex-col items-center">
    <div class="mt-14 mb-5 text-white text-center">
        Excerpt from J. Kaipainen's Piano Concerto<br>
        Helsinki Philharmonic Orchestra, soloist Joonas Ahonen
    </div>
	<iframe
        class="outline outline-primary outline-2"
		width="560"
		height="315"
		src="https://www.youtube-nocookie.com/embed/qWZEmtmpGdY"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen
        bind:this={iframe}
	/>
</div>
