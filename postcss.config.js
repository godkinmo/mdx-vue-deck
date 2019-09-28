module.exports = {
  plugins: [
    require('postcss-import'),
    // Watching theme file for changes
    function (css, opts) {
      const resolvedPath = process.env.__TAILWIND_THEME_CONFIG_PATH__

      delete require.cache[require.resolve(resolvedPath)]
      opts.messages.push({
        type: 'dependency',
        file: resolvedPath,
        parent: css.source.input.file,
      })
    },
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer'),
    require('postcss-nesting')()
  ]
}
