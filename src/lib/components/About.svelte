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
		Adomas Morkūnas-Budrys is a Lithuanian conductor, currently studying at the Sibelius Academy under Prof. Sakari Oramo. He previously studied at the Zürich University of the Arts under Prof. Johannes Schlaefli and the Norwegian Academy of Music under Prof. Ole Kristian Ruud.
	</p>
	{#if !mobile || showMore}
		<div class="max-[600px]:hidden" class:!block={ready} transition:slide={{ duration: slideDuration }}>
			<br />
			<p>
				Adomas's recent highlights include performances with the Lahti Symphony, Lithuanian Chamber, Jyväskylä Symphony, and the Lithuanian National Opera and Ballet Theatre orchestras, as well as serving as assistant conductor and répétiteur at the Salzburg Festival and Teatro Real in Madrid. In the 2023/24 season, Adomas conducted such ensembles like Kremerata Baltica, Oulu Sinfonia, the Swiss Youth Symphony, and the Lithuanian National Symphony orchestras, in addition to working at the <i>Schleswig-Holsteinisches Landestheater</i> on Carl Millöcker’s operetta <i>Der arme Jonathan</i>.
			</p>
			<br />
			<p>
				Adomas also had a chance to collaborate with orchestras like the Finnish Radio Symphony, Helsinki Philharmonic, Manchester Camerata, and Thessaloniki State Symphony. His operatic experience includes being part of the creative team for Georg Friedrich Haas’s opera Bluthaus, working with prominent opera houses like <i>Bayerische Staatsoper</i> and <i>Opéra de Lyon</i>.
			</p>
			<br />
			<p>
				Adomas is an enthusiastic explorer of XX-XXI Eastern European music, focusing on discovering and promoting little-known masterpieces. Beyond conducting, Adomas is a pianist, arranger, and organizer of musical events. Since 2018, he has been the driving force behind the Future Symphony Competition, held three times. As Conductor of the Future Symphony Orchestra, Adomas has premiered 19 new orchestral compositions, demonstrating his commitment to fostering contemporary music.
			</p>
			<br />
			<p>
				Apart from music, Adomas is also an avid language learner, a passionate basketball fan, a poker enthusiast, and a soon-to-be pilot.
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
