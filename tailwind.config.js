/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'primary': '#5c7d80'
			},
			backgroundImage: {
				'landing-image': 'url("/images/adomas-mb-2.webp")'
			}
		}
	},
	plugins: []
}
