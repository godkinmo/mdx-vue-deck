module.exports = {
  important: false,
  theme: require(process.env.__TAILWIND_THEME_CONFIG_PATH__),
  plugins: [
    function({ addBase, config }) {
      addBase({
        'h1': { fontSize: config('theme.fontSize.6xl') },
        'h2': { fontSize: config('theme.fontSize.5xl') },
        'h3': { fontSize: config('theme.fontSize.4xl') },
        'h4': { fontSize: config('theme.fontSize.3xl') },
        'h5': { fontSize: config('theme.fontSize.2xl') },
        'h6': { fontSize: config('theme.fontSize.xl') },
      })
    },
    require('tailwindcss-typography')({
      componentPrefix: '',
    }),
  ],
}
