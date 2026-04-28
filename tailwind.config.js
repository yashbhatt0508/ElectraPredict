/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pageBg: '#f1f5f9',
        cardBg: '#ffffff',
        sidebarBg: '#ffffff',
        textPrimary: '#1e293b',
        textSecondary: '#64748b',
        textMuted: '#94a3b8',
        border: '#e2e8f0',
        success: '#16a34a',
        successBg: '#f0fdf4',
        warning: '#d97706',
        warningBg: '#fffbeb',
        danger: '#dc2626',
        dangerBg: '#fef2f2',
        chart1: '#6366f1',
        chart2: '#14b8a6',
        chart3: '#f59e0b',
        chart4Muted: '#94a3b8',
        chart4Morning: '#f59e0b',
        chart4Afternoon: '#6366f1',
        chart4Evening: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '14px': '14px',
        '8px': '8px',
        '10px': '10px',
        'pills': '999px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      }
    },
  },
  plugins: [],
}
