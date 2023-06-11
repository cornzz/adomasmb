/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'primary': '#5c7d80',
				'secondary': '#264d58'
			},
			backgroundImage: {
				'landing-image': 'url("/images/adomas-mb-2.webp")'
			},
			boxShadow: {
				'input': '0 0 0px 2px theme("colors.primary")'
			}
		}
	},
	plugins: []
}
