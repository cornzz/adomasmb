<script lang="ts">
	import { onMount, tick } from 'svelte'
	import { slide } from 'svelte/transition'

	let innerWidth: number
	let mobile: boolean = false
	let showMore: boolean = false
	let slideDuration: number = 0
	let ready: boolean = false
	let section: HTMLElement

	async function prepare(): Promise<void> {
		mobile = innerWidth <= 600
		await tick()
		slideDuration = 1000
	}

	$: if (ready && innerWidth) prepare()

	onMount(async () => {
		prepare()
		ready = true
	})
</script>

<svelte:window bind:innerWidth />

<div class="text-white">
	<h1 id="about" bind:this={section}>About</h1>
	<p>
		Adomas Morkūnas-Budrys is one of the most promising Lithuanian conductors of his generation. Known for his wide
		range of musical tastes, Adomas is particularly passionate about large-scale symphonic works, Nordic and
		contemporary music. He is also always keen to explore the compositions of less-known artists and introduce them
		to orchestras and the public.
	</p>
	{#if !mobile || showMore}
		<div class="max-[600px]:hidden" class:!block={ready} transition:slide={{ duration: slideDuration }}>
			<br />
			<p>
				On different occasions, Adomas has worked with such orchestras as the Finnish Radio Symphony, Manchester
				Camerata, Helsinki Philharmonic, Lithuanian National Symphony, Thessaloniki State Symphony, Lithuanian
				Chamber, Olten Philharmonic of Izmir, and others. He has worked in such opera houses as Bavarian State Opera and the
				Lyon Opera House and collaborated with and assisted such conductors as Mirga Gražinytė-Tyla, Titus
				Engel, Miguel Pérez Iñesta, and Modestas Pitrėnas. In masterclasses, he has worked with Paavo Järvi,
				Bernard Haitink, Jorma Panula, Nicolas Pasquet, Larry Rachleff, Nicholas Collon, Pavel Baleff, Eva
				Ollikainen, and others.
			</p>
			<br />
			<p>
				Alongside conducting, Adomas is also a composer, arranger, pianist, and organizer of various musical
				events. Since 2018, Adomas has been the main organizer of the Future Symphony Competition, which has
				happened three times. Being a chief conductor of the Future Symphony Orchestra, he has already premiered
				19 orchestral compositions.
			</p>
			<br />
			<p>
				Adomas studied with Prof. Johannes Schlaefli at the Zürich University of the Arts and, as an exchange
				student, at the Norwegian Academy of Music. Adomas is continuing his Master's degree studies at the
				Sibelius Academy.
			</p>
			<br />
			<p>Updated in June 2023.</p>
		</div>
	{/if}
	{#if mobile}
		<br />
		<button
			class="btn btn-outline"
			on:click={() => {
				showMore = !showMore
				if (!showMore) section.scrollIntoView()
			}}
		>
			{!showMore ? 'Show More' : 'Show Less'}
		</button>
	{/if}
</div>
