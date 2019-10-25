module.exports = {
  presets: [
    '@babel/preset-env',
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    ['prismjs', {
      languages: ['javascript', 'css', 'clike', 'bash', 'css-extras', 'php', 'jsx', 'diff', 'json'],
      // plugins: ['line-numbers'],
      // theme: 'okaidia',
      css: false
    }]
  ]
};
