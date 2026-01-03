/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'sans-serif'],
  			display: ['Inter', 'system-ui', 'sans-serif'],
  			mono: ['JetBrains Mono', 'monospace']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
        'xl': '1rem',
        '2xl': '1.5rem'
  		},
  		colors: {
        minecraft: {
          grass: '#558B2F',
          dirt: '#795548',
          stone: '#616161',
          sky: '#29B6F6',
          lava: '#F4511E',
        },
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		boxShadow: {
  			'hard': '4px 4px 0px 0px rgba(0,0,0,1)',
        'hard-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'hard-sm': '2px 2px 0px 0px rgba(0,0,0,1)'
  		},
  		keyframes: {
        'bounce-slight': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' }
        }
  		},
  		animation: {
        'bounce-slight': 'bounce-slight 2s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 4s ease-in-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}