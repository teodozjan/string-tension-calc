import react from '@vitejs/plugin-react';
import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig(_cfg => ({
	plugins: [react()],
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
		chunkSizeWarningLimit: 1000,
	},
}));
