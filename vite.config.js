import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import {defineConfig} from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            '@': '/resources/js/Pages',
        }
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx',],
            refresh: true,
        }),
        react(),
    ],
});
