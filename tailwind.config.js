module.exports = {
  important: true,
  theme: require(process.env.__TAILWIND_THEME_CONFIG_PATH__),
  plugins: [
    require('tailwindcss-typography')({
      componentPrefix: '',
    }),
  ],
}
