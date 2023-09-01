/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'media',
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.{js,jsx,ts,tsx}",
        "./resources/**/*.vue",
        "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('flowbite/plugin')
    ],
}
