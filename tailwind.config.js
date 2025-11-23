/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    darkMode: ['class', '.my-app-dark'],
    theme: {
        extend: {
            colors: {
                brand: {
                    50:  '#fde5e7',
                    100: '#fbb8bd',
                    200: '#f88a92',
                    300: '#f55c67',
                    400: '#f22f3c',
                    500: '#c80a1d',
                    600: '#a00818',
                    700: '#780613',
                    800: '#50040e',
                    900: '#280207',
                },
            }
        },
    },
    plugins: [],
}
