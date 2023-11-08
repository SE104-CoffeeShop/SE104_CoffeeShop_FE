/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            serif: ['Noto Serif', 'serif'],
        },
        extend: {
            backgroundImage: {
                'background-image': "url('assets/images/background.jpg')",
            },
        },
    },
    plugins: [],
});
