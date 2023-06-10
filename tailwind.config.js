/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundImage: {
				'landing-image': 'url("/images/adomas-mb-1.webp")'
			}
		}
	},
	plugins: []
}
