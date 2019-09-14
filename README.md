# MDX Wall

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

Modify an [MDX][mdx] file in `src/mdx/wall.mdx` and separate each slide with `---`.

````mdx
# This is the title of my wall

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
