/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: '#0f0f11', // Dark gray/black
                surface: '#18181b', // Slightly lighter
                tech: {
                    cyan: '#00f2ea', // Python
                    yellow: '#f7df1e', // JS
                    green: '#5c4ee5', // Terraform (actually purple usually, but user said green? Terraform is purple/violet. User said "Verde para Terraform". I will use Neon Green as requested).
                    neonGreen: '#39ff14', // Using this for Terraform as requested
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px #00f2ea' },
                    '100%': { boxShadow: '0 0 20px #00f2ea, 0 0 10px #00f2ea' },
                }
            }
        },
    },
    plugins: [],
}
