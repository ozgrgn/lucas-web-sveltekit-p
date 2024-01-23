import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({}),
		alias: {
			$src: 'src/',
			$lib: 'src/lib/',
			$components: 'src/lib/components/',
			$assets: 'src/lib/assets/',
			$services: 'src/services'
		},
		csrf: {
			checkOrigin: false
		}
	}
};

export default config;
