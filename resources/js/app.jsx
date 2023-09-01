import {createInertiaApp} from '@inertiajs/react';
import 'flowbite';
import {createRoot} from "react-dom/client";
import './bootstrap';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
}).then(() => {
    console.log('Inertia app created.');
});