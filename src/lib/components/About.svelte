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
		Lithuanian conductor Adomas Morkūnas-Budrys recently made his debut at the renowned Salzburg Festival, serving as Assistant Conductor 
		and Repetiteur for M. Weinberg’s [i]The Idiot[/i], as well as assisting in the production of [i]The Passenger[/i] at Teatro Real in Madrid. His celebrated debut 
		at the Lithuanian National Opera, conducting the ballet [i]Le Parc[/i], further demonstrated his versatility and command 
		on the podium. Throughout the 2023/24 season, Adomas continued to make his mark, leading ensembles such as Kremerata Baltica,
		Oulu Sinfonia, Swiss Youth Symphony, and the Lithuanian National Symphony Orchestra.
	</p>
	{#if !mobile || showMore}
		<div class="max-[600px]:hidden" class:!block={ready} transition:slide={{ duration: slideDuration }}>
			<br />
			<p>
				In recent years, Adomas has stood in front of distinguished orchestras, including the Finnish Radio Symphony, Helsinki Philharmonic,
				Manchester Camerata, Lithuanian Chamber Orchestra, and Thessaloniki State Symphony, among others. As a part of the musical team, 
				he has collaborated with major opera houses such as Bayerische Staatsoper and Opéra de Lyon. He has also had the privilege of receiving 
				mentorship from renowned conductors like Paavo Järvi, Bernard Haitink, Jorma Panula, Nicolas Pasquet, and Larry Rachleff.
			</p>
			<br />
			<p>
				Adomas is also an avid language learner, a passionate basketball and poker player, and an enthusiastic explorer of XX-XXI Eastern 
				European music, focusing on discovering and promoting little-known masterpieces. Beyond conducting, Adomas is an accomplished pianist, 
				arranger, and organizer of musical events. Since 2018, he has been the driving force behind the Future Symphony Competition, which has 
				been held three times. As Conductor of the Future Symphony Orchestra, Adomas has premiered 19 new orchestral compositions, demonstrating 
				his commitment to fostering contemporary music.
			</p>
			<br />
			<p>
				His musical journey has been shaped by his studies under Prof. Johannes Schlaefli at the Zürich University of the Arts and further 
				expanded through an exchange program at the Norwegian Academy of Music. Currently, he is advancing his studies at the prestigious 
				Sibelius Academy under the guidance of Prof. Sakari Oramo
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
