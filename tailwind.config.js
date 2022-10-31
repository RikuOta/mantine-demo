// Mantine のデフォルトカラーを Tailwind 用に変換
const { DEFAULT_THEME } = require('@mantine/styles')
const mantineColors = {}
for (const [name, colors] of Object.entries(DEFAULT_THEME.colors)) {
  mantineColors[name] = colors.reduce((acc, cur, i) => {
    return { ...acc, [i]: cur }
  }, {})
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: mantineColors
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
