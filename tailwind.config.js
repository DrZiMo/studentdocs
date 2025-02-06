/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
    theme: {
        extend: {
            boxShadow: {
                custom: '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
                box: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;',
            },
            fontFamily: {
                konit: ['Kanit', 'sans-serif'],
            },
            colors: {
                // Define colors here if needed or remove these lines if not.
                // blackA: ...,
                // mauve: ...,
                // violet: ...,
            },
            keyframes: {
                slideUpAndFade: {
                    from: { opacity: '0', transform: 'translateY(2px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                slideRightAndFade: {
                    from: { opacity: '0', transform: 'translateX(-2px)' },
                    to: { opacity: '1', transform: 'translateX(0)' },
                },
                slideDownAndFade: {
                    from: { opacity: '0', transform: 'translateY(-2px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                slideLeftAndFade: {
                    from: { opacity: '0', transform: 'translateX(2px)' },
                    to: { opacity: '1', transform: 'translateX(0)' },
                },
            },
            animation: {
                slideUpAndFade:
                    'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                slideRightAndFade:
                    'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                slideDownAndFade:
                    'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                slideLeftAndFade:
                    'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
    },
    plugins: [],
}
