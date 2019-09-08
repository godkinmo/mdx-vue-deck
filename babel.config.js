module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins: [
    ['prismjs', {
        'languages': ['javascript', 'css', 'clike', 'bash', 'css-extras', 'diff', 'php'],
        // 'plugins': ['line-numbers'],
        // 'theme': 'okaidia',
        'css': true
    }]
  ]
};
