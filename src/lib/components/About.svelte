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
		Adomas Morkūnas-Budrys is a talented Lithuanian conductor currently pursuing his studies at the prestigious Sibelius Academy. He previously earned his Bachelor's degree from the Zürich University of the Arts under the mentorship of Prof. Johannes Schlaefli, with an enriching Erasmus experience at the Norwegian Academy of Music under Prof. Ole Kristian Ruud.
	</p>
	{#if !mobile || showMore}
		<div class="max-[600px]:hidden" class:!block={ready} transition:slide={{ duration: slideDuration }}>
			<br />
			<p>
				In recent years, Adomas has built a portfolio of engagements with leading orchestras and institutions. His recent highlights include performances with the Lahti Symphony, Jyväskylä Symphony, and the Lithuanian National Opera and Ballet Theatre orchestras, as well as serving as assistant conductor and répétiteur at major venues such as the Salzburg Festival and Teatro Real in Madrid. The 2023/24 season marked further milestones as Adomas conducted ensembles like Kremerata Baltica, Oulu Sinfonia, the Swiss Youth Symphony, and the Lithuanian National Symphony orchestras, in addition to working with the <i>Schleswig-Holsteinisches Landestheater</i> on Carl Millöcker’s operetta <i>Der arme Jonathan</i>.
			</p>
			<br />
			<p>
				Adomas’s collaborations extend to many esteemed orchestras, including the Finnish Radio Symphony Orchestra, Helsinki Philharmonic, Manchester Camerata, Lithuanian Chamber Orchestra, and Thessaloniki State Symphony Orchestra. His operatic experience includes being part of the creative team for Georg Friedrich Haas’s opera Bluthaus, working with prominent opera houses like the Bayerische Staatsoper and Opéra de Lyon.
			</p>
			<br />
			<p>
				Adomas is an enthusiastic explorer of XX-XXI Eastern European music, focusing on discovering and promoting little-known masterpieces. Beyond conducting, Adomas is an accomplished pianist, arranger, and organizer of musical events. Since 2018, he has been the driving force behind the Future Symphony Competition, held three times. As Conductor of the Future Symphony Orchestra, Adomas has premiered 19 new orchestral compositions, demonstrating his commitment to fostering contemporary music.
			</p>
			<br />
			<p>
				Apart from music, Adomas is also an avid language learner, a passionate basketball player, a poker enthusiast, and a soon-to-be pilot.
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
