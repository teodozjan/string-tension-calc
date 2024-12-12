import {defineConfig} from 'vite';
import {resolve} from 'path';
import react from '@vitejs/plugin-react';
import wyw from '@wyw-in-js/vite';

export default defineConfig(_cfg => ({
	plugins: [
		react(),
		wyw(),
	],
	resolve: {
		alias: [{
			find: '@',
			replacement: resolve(__dirname, 'src'),
		}],
	},
	base: '/string-tension-calc',
	server: {
		port: 8080,
	},
	build: {
		outDir: 'build',
	},
}));
