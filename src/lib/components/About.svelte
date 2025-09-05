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
		Adomas Morkūnas-Budrys is a Lithuanian conductor and private pilot. A recent graduate of the Sibelius Academy under Prof. Sakari Oramo, he is now continuing his journey by pursuing a professional pilot career at the airBaltic Pilot Academy. He previously studied conducting at the Zürich University of the Arts with Prof. Johannes Schlaefli and at the Norwegian Academy of Music with Prof. Ole Kristian Ruud.
	</p>
	{#if !mobile || showMore}
		<div class="max-[600px]:hidden" class:!block={ready} transition:slide={{ duration: slideDuration }}>
			<br />
			<p>
				Adomas's recent highlights include performances with the Lahti Symphony, Lithuanian Chamber, Jyväskylä Symphony, and the Lithuanian National Opera and Ballet Theatre orchestras, as well as serving as assistant conductor and répétiteur at the Salzburg Festival and Teatro Real in Madrid. Adomas also conducted such ensembles like Kremerata Baltica, Oulu Sinfonia, the Swiss Youth Symphony, and the Lithuanian National Symphony orchestras, in addition to working at the <i>Schleswig-Holsteinisches Landestheater</i> on Carl Millöcker’s operetta <i>Der arme Jonathan</i>.
			</p>
			<br />
			<p>
				Adomas also had a chance to collaborate with orchestras like the Finnish Radio Symphony, Helsinki Philharmonic, Manchester Camerata, and Thessaloniki State Symphony. His operatic experience includes being part of the creative team for Georg Friedrich Haas’s opera Bluthaus, working with prominent opera houses like <i>Bayerische Staatsoper</i> and <i>Opéra de Lyon</i>.
			</p>
			<br />
			<p>
				Beyond conducting, Adomas is a pianist, arranger, and organizer of musical events. Since 2018, he has been the driving force behind the Future Symphony Competition, held three times, as well as Conductor of the Future Symphony Orchestra.
			</p>
			<br />
			<p>
			
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
