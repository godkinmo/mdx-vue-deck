# MDX Deck

## Getting Started

`npm i -D mdx-vue-deck`

Create an [MDX][mdx] file and separate each slide with `---`.

````mdx
# This is the title of my deck

---

# About Me
```

---

import HelloWold from './components/HelloWold'

## <HelloWold />

# The end
````

Add a run script to your package.json with the MDX Deck CLI pointing to the .mdx file to start the dev server:

```
"scripts": {
  "eject": "mdx-vue-deck eject",
  "start": "mdx-vue-deck dev deck.mdx -c theme.config.js",
  "build": "mdx-vue-deck build deck.mdx -c theme.config.js"
},
```

## Keyboard Shortcuts

| Key         | Description                                  |
| ----------- | -------------------------------------------- |
| Left Arrow, Page Up, Shift + Space | Go to previous slide  |
| Right Arrow, Page Down, Space | Go to next slide           |
| Option + P  | Toggle [Presenter Mode](#presenter-mode)     |
| Option + O  | Toggle [Overview Mode](#overview-mode)       |
| Option + G  | Toggle Grid Mode                             |


## References
[mdx-deck](https://github.com/jxnblk/mdx-deck)

## License
[MIT](https://choosealicense.com/licenses/mit/)

[mdx]: https://mdxjs.com/
