<script lang="ts">
	import { dev } from '$app/environment'
	import { onMount } from 'svelte'

    let ready: boolean = false
	let loading: boolean = false
    let contactSuccess: boolean = false
    let contactFailure: boolean = false
    let form: HTMLFormElement
	let spamcheck1Input: HTMLInputElement
	let spamcheck2Input: HTMLInputElement

	async function submit(): Promise<void> {
		loading = true
        const formData = new FormData(form)
        const response = await fetch('/contact.php', {
            method: 'POST',
            body: formData
        })
        if (response.ok) {
            form.reset()
            contactSuccess = true
            localStorage.setItem('contactedAt', `${+new Date()}`)
        } else {
            contactFailure = true
        }
        loading = false
	}

	onMount(() => {
        const contactedAt = localStorage.getItem('contactedAt')
        if (contactedAt) {
            contactSuccess = new Date(+contactedAt + 86400000) >= new Date() 
        }
		setTimeout(() => (spamcheck1Input && (spamcheck1Input.value = 'amb_spam_check_1_passed')), 10000)
        ready = true
	})
</script>

<h1 id="contact" class="text-4xl font-semibold text-white">Contact</h1>

{#if contactSuccess}
    <div class="text-white">
        Thank you for contacting me, I will get back to you as soon as possible!
    </div>
{:else if ready}
    <form class="flex flex-col gap-2" class:loading on:submit|preventDefault={submit} bind:this={form}>
        <input name="name" type="text" placeholder="Your Name" required={!dev} />
        <input name="email" type="email" placeholder="Your E-Mail Address" required={!dev} />
        <textarea
            name="message"
            cols="30"
            rows="8"
            placeholder="Your Message"
            minlength="10"
            required={!dev}
            on:focus={() => (spamcheck2Input.value = 'amb_spam_check_2_passed')}
        />
        <input name="spamcheck1" type="hidden" bind:this={spamcheck1Input} />
        <input name="spamcheck2" type="hidden" bind:this={spamcheck2Input} />
        <div class="flex justify-end items-center gap-3">
            {#if contactFailure}
                <div class="text-red-400">Something went wrong... Please try again later!</div>
            {/if}
            <button
                class="btn btn-primary flex items-center justify-center"
                disabled={loading}
            >
                {#if loading}
                    <svg
                        class="inline w-4 h-4 mr-2 text-secondary animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 101"
                    >
                        <path fill="#E5E7EB" d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" />
                        <path fill="currentColor" d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" />
                    </svg>
                {/if}
                Submit
            </button>
        </div>
    </form>
{/if}

<style lang="postcss">
	.loading {
		input,
		textarea {
			@apply bg-white/60;
		}
	}

	input,
	textarea {
		@apply min-h-[40px] px-3 py-2 bg-white/80;

		&::placeholder {
			@apply text-[#636973];
		}

		&:focus {
			@apply bg-white outline-none shadow-input;
		}
	}
</style>
