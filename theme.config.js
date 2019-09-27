module.exports = {
  extend: {
    colors: {
      theme: {
        text: '#fff',
        background: '#011627',
        dot: '#828A92',
      },
      code: {
        green: '#b5f4a5',
        yellow: '#ffe484',
        purple: '#d9a9ff',
        red: '#ff8383',
        blue: '#93ddfd',
        white: '#fff',
      },
    },
  },
  // https://github.com/benface/tailwindcss-typography
  textStyles: theme => ({
    heading: {
      output: false,
      color: '#6AD798',
      fontWeight: theme('fontWeight.bold'),
      lineHeight: theme('lineHeight.tight'),
    },
    h1: { extends: 'heading', fontSize: theme('fontSize.6xl') },
    h2: { extends: 'heading', fontSize: theme('fontSize.5xl') },
    h3: { extends: 'heading', fontSize: theme('fontSize.4xl') },
    link: {
      fontWeight: theme('fontWeight.bold'),
      color: theme('colors.blue.600'),
      '&:hover': {
        color: theme('colors.blue.500'),
        textDecoration: 'underline',
      },
    },
    markdown: {
      backgroundColor: theme('colors.theme.background'),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      fontWeight: theme('fontWeight.normal'),
      fontSize: '32px',
      color: theme('colors.theme.text'),
      lineHeight: theme('lineHeight.relaxed'),
      '> * + *': {
        marginTop: '1.5rem',
      },
      '> h1': { extends: 'h1' },
      '> h2': { extends: 'h2' },
      '> h3': { extends: 'h3' },
      'ul': {
        paddingLeft: '1.5rem',
        listStyleType: 'disc',
      },
      'ol': {
        paddingLeft: '1.5rem',
        listStyleType: 'decimal',
      },
      'a': {
        extends: 'link',
      },
      'b, strong': {
        fontWeight: theme('fontWeight.bold'),
      },
      'i, em': {
        fontStyle: 'italic',
      },
      'pre[class*=language-]': {
        padding: '1rem',
        fontSize: theme('fontSize.base'),
        fontFamily: theme('fontFamily.mono'),
        fontWeight: theme('fontWeight.normal'),
        lineHeight: theme('lineHeight.normal'),
        backgroundColor: theme('colors.gray.800'),
        color: theme('colors.gray.200'),
        whitespace: 'nowrap',
        scrollbarWidth: 'none',
      },
      'pre[class*=language-]::-webkit-scrollbar': {
        display: 'none',
      },
      'table': {
        width: '50%',
        textAlign: 'left',
        borderCollapse: 'collapse',
        overflow: 'scroll-x',
      },
      'table th, table td': {
        minWidth: '200px',
      },
      'table th': {
        fontSize: theme('fontSize.lg'),
        fontWeight: theme('fontWeight.semibold'),
        padding: '.5rem',
        color: theme('colors.gray.900'),
        backgroundColor: theme('colors.gray.300'),
      },
      'table td': {
        fontSize: theme('fontSize.lg'),
        padding: '.5rem',
        borderWidth: '1px',
        borderColor: theme('colors.gray.400'),
      }
    },
  }),
}
