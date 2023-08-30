import {createInertiaApp} from '@inertiajs/react';
import 'flowbite';
import {hydrateRoot} from "react-dom";
import './admin/notification.js';
import './bootstrap';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', {eager: true})
        return pages[`./Pages/${name}.jsx`]
    },
    setup({el, App, props}) {
        hydrateRoot(el, <App {...props} />)
    },
}).then(r => {
    console.log('Inertia app setup complete.');
})
