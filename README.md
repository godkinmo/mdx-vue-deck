# VUE MDX Deck

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```


## Getting Started

![](./demo.gif)

Modify an [MDX][] file in `src/mdx/deck.mdx` and separate each slide with `---`.

````mdx
# This is the title of my deck

---

# About Me

---

```jsx
<CodeSnippet />
```

---

import HelloWold from './components/HelloWold'

## <HelloWold />

# The end
````


## Keyboard Shortcuts

| Key         | Description                                  |
| ----------- | -------------------------------------------- |
| Left Arrow, Page Up, Shift + Space | Go to previous slide                         |
| Right Arrow, Page Down, Space | Go to next slide                             |
| Option + O  | Toggle [Overview Mode](#overview-mode)       |
| Option + G  | Toggle Grid Mode                             |

[mdx]: https://mdxjs.com/
