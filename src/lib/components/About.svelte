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
		Adomas Morkūnas-Budrys is one of the most promising Lithuanian conductors of his generation.
		He studied with Prof. Johannes Schlaefli at the Zürich University of the Arts and, as an exchange
		student, at the Norwegian Academy of Music. Adomas is continuing his studies at the Sibelius Academy.

	</p>
	{#if !mobile || showMore}
		<div class="max-[600px]:hidden" class:!block={ready} transition:slide={{ duration: slideDuration }}>
			<br />
			<p>
				In the 2023/24 season, Adomas will perform with Kremerata Baltica, Oulu Sinfonia, and Lithuanian National
				Symphony orchestras. He will also assist Mirga Gražinytė-Tyla with two M. Weinberg operas: "The Passenger"
				at the Teatro Real in Madrid and "The Idiot” at the Salzburgfestival 2024. Moreover, in collaboration with
				Modestas Pitrėnas, Adomas will appear in one of the concerts in 2024 April with the Swiss Youth Symphony Orchestra.
			</p>
			<br />
			<p>
				On different occasions, Adomas has worked with such orchestras as the Finnish Radio Symphony, Manchester
				Camerata, Helsinki Philharmonic, Thessaloniki State Symphony, Lithuanian Chamber, Olten Philharmonic of Izmir, and
				in such opera houses as Bavarian State Opera and the Lyon Opera House. In masterclasses, he has worked with Paavo Järvi,
				Bernard Haitink, Jorma Panula, Nicolas Pasquet, Larry Rachleff, Nicholas Collon, Pavel Baleff, Eva Ollikainen, and others.
			</p>
			<br />
			<p>
				Alongside conducting, Adomas is also a composer, arranger, pianist, and organizer of various musical
				events. Since 2018, Adomas has been the main organizer of the Future Symphony Competition, which has
				happened three times. Being a chief conductor of the Future Symphony Orchestra, he has already premiered
				19 orchestral compositions.
			</p>
			<br />
			<p>Updated in July 2023.</p>
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
