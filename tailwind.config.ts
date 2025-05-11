import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;
