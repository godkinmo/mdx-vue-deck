const purgecss = require('@fullhuman/postcss-purgecss')({

  // Specify the paths to all of the template files in your project
  content: [
    './public/**/*.html',
    './src/**/*.vue',
    './src/**/*.js',
    './src/**/*.mdx',
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
})

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer'),
    require('postcss-nesting')(),
    ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
  ]
}
