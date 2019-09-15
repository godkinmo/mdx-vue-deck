module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins: [
    ['prismjs', {
      'languages': ['javascript', 'css', 'clike', 'bash', 'css-extras', 'diff', 'php', 'jsx'],
      'plugins': ['line-numbers'],
      'theme': 'default', // deafult, okaidia
      'css': true
    }]
  ]
};
