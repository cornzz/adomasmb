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
		He studied with Prof. Johannes Schlaefli at the Zürich University of the Arts and, as an exchange student,
		at the Norwegian Academy of Music. Adomas is continuing his studies at the Sibelius Academy.

	</p>
	{#if !mobile || showMore}
		<div class="max-[600px]:hidden" class:!block={ready} transition:slide={{ duration: slideDuration }}>
			<br />
			<p>
				In the 2023/24 season, Adomas was reinvited to conduct the Lithuanian National Symphony Orchestra and will debut
				with such orchestras as Kremerata Baltica, Oulu Sinfonia, and Swiss Youth Symphony. As a Head of Music (Studienleiter),
				Repetiteur, and Assistant conductor, Adomas will work at the Salzburg Festival in the summer of 2024 on M. Weinberg's opera
				production "The Idiot". He will also assist Mirga Gražinytė-Tyla with another M. Weinberg's opera, "The Passenger", at Teatro Real in Madrid.
				As Repetiteur and Assistant Conductor, he will work at the Schleswig-Holsteinisches Landestheater for the production of C. Millöcker's
				operetta "Der arme Jonathan".
			</p>
			<br />
			<p>
				In the last few years, Adomas appeared with orchestras such as the Finnish Radio Symphony, Helsinki Philharmonic, Manchester Camerata,
				Lithuanian National Symphony, Lithuanian Chamber, Thessaloniki State Symphony, and Südwestdeutsche Philharmonie Konstanz.
				As Assistant conductor, he has also worked in opera houses such as Bayerische Staatsoper and Opera de Lyon. Adomas has received valuable
				advice from such maestros as Paavo Järvi, Bernard Haitink, Jorma Panula, Nicolas Pasquet, Larry Rachleff, and others.
			</p>
			<br />
			<p>
				Alongside conducting, Adomas is also a composer, arranger, pianist, and organizer of various musical
				events. Since 2018, Adomas has been the main organizer of the Future Symphony Competition, which has
				happened three times. Being a chief conductor of the Future Symphony Orchestra, he has already premiered
				19 orchestral compositions.
			</p>
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
