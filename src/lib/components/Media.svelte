<script lang="ts">
	import { initLightbox } from '$lib/helpers'
	import { images, videos } from '$lib/stores'
	import 'photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css'
	import 'photoswipe/style.css'
	import { onMount } from 'svelte'
	import { slide } from 'svelte/transition'

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

<div id="gallery" bind:this={section}>
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4">
		{#each images.slice(0, 4) as image}
			<a
				href="/images/gallery/{image.large}"
				data-pswp-width={image.width}
				data-pswp-height={image.height}
				target="_blank"
			>
				<img
					src="/images/gallery/{image.thumb}"
					alt="Adomas Morkūnas-Budrys"
					width="1280"
					height="720"
					loading="lazy"
				/>
				<span class="pswp-caption-content hidden">{image.caption ?? ''}</span>
			</a>
		{/each}

		{#each videos as video}
			<a
				class="col-span-2 relative after:content-[''] after:absolute after:inset-0 after:bg-black/50
					   after:transition-all after:duration-300 hover:after:bg-black/20 group"
				href="https://www.youtube.com/watch?v={video.id}"
				data-pswp-type="youtube"
				data-youtube-url="https://www.youtube-nocookie.com/embed/{video.id}?autoplay=1&hd=1&rel=0"
				target="_blank"
			>
				<img src="/images/gallery/{video.thumb}" alt="Video Thumbnail" loading="lazy" />
				<span class="pswp-caption-content hidden">{@html video.caption}</span>
				<svg
					class="absolute-center z-10 transition-all duration-300 group-hover:scale-125"
					xmlns="http://www.w3.org/2000/svg"
					height="48"
					width="48"
				>
					<path fill="white" d="M16 37.85v-28l22 14Zm3-14Zm0 8.55 13.45-8.55L19 15.3Z" />
				</svg>
			</a>
		{/each}
	</div>

	{#if showMore}
		<div class="grid grid-cols-2 sm:grid-cols-4 gap-4" transition:slide={{ duration: 1500 }}>
			{#each images.slice(4) as image}
				<a
					class={image.class}
					href="/images/gallery/{image.large}"
					data-pswp-width={image.width}
					data-pswp-height={image.height}
					target="_blank"
				>
					<img
						src="/images/gallery/{image.thumb}"
						alt="Adomas Morkūnas-Budrys"
						width={(image.width / image.height) < 1 ? 300 : 600}
						height={(image.width / image.height) < 1 ? 450 : 400}
						loading="lazy"
					/>
					<span class="pswp-caption-content hidden">{image.caption ?? ''}</span>
				</a>
			{/each}
		</div>
	{/if}
</div>

<div class="flex justify-center mt-6">
	<button
		class="btn btn-outline"
		on:click={() => showMore = !showMore}
	>
		<div class="flex items-center justify-center gap-1">
			{!showMore ? 'Show More' : 'Show Less'}
			<svg
				class="rotate-90 transition-all duration-500"
				class:!-rotate-90={showMore}
				xmlns="http://www.w3.org/2000/svg"
				height="20"
				viewBox="0 -960 960 960"
				width="20"
			>
				<path fill="#fff" d="m561-242-43-42 168-168H160v-60h526L517-681l43-42 241 241-240 240Z" />
			</svg>
		</div>
	</button>
</div>

<style lang="postcss">
	:global(.pswp__youtube-container) {
		@apply relative w-full h-full pointer-events-none;

		:global(iframe) {
			@apply pointer-events-auto;
		}
	}

	:global(.pswp__dynamic-caption--on-hor-edge) {
		@apply !top-auto bottom-4;
	}
</style>
