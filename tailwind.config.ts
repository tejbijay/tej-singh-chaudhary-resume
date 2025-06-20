
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				cyber: {
					// Updated with royal purple theme
					'blue': '#0AEFFF',
					'neon': '#39FF14',
					'purple': '#7B2FCA',
					'purple-light': '#915CFF',
					'purple-dark': '#4A1D78',
					'pink': '#FF10F0',
					'yellow': '#FFDD00',
					'dark': '#120C1E',
					'light': '#E0E0E0',
					'metal': '#8E9196',
					'steel': '#43464B',
					'silver': '#C8C8C9',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(51, 195, 240, 0)' },
					'50%': { boxShadow: '0 0 20px 5px rgba(51, 195, 240, 0.5)' }
				},
				'text-reveal': {
					from: { maskPosition: '0 0' },
					to: { maskPosition: '100% 0' }
				},
				'scan-line': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100%)' }
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'zoom-in': {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s infinite',
				'text-reveal': 'text-reveal 2s linear',
				'scan-line': 'scan-line 2s linear infinite',
				'gradient-shift': 'gradient-shift 3s ease infinite',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'slide-in': 'slide-in 0.8s ease-out',
				'zoom-in': 'zoom-in 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
			},
			backgroundImage: {
				'cyber-grid': 'linear-gradient(rgba(145, 92, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(145, 92, 255, 0.1) 1px, transparent 1px)',
				'data-flow': 'linear-gradient(to right, rgba(145, 92, 255, 0.1), rgba(10, 239, 255, 0.1))',
				'neon-glow': 'linear-gradient(90deg, #915CFF 0%, #0AEFFF 100%)',
				'cyber-gradient': 'linear-gradient(135deg, #120C1E 0%, #2D1B4B 100%)',
				'metal-gradient': 'linear-gradient(135deg, #43464B 0%, #8E9196 100%)',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '100ch',
					},
				},
			},
			fontFamily: {
				'mono': ['JetBrains Mono', 'monospace'],
				'sans': ['Inter', 'sans-serif'],
				'orbitron': ['Orbitron', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
