/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        liftBlue: '#15395a',
        liftGreen: '#10b981',
        liftAmber: '#f59e0b',
        liftRed: '#ef4444'
      }
    }
  },
  plugins: []
}
