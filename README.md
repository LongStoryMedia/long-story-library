# Long Story Library

Raw javaScript utility library. Useful tools for javaScript developers. This is currently in pre-release. Better documentation will come soon.

## Installation

#### yarn
```sh
$ yarn add long-story-library
```

#### npm
```sh
$ npm install long-story-library
```

The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/long-story-library/umd/long-story-library.min.js"></script>
```

If you use the UMD build you can find the library on `window._$`.

## Methods

- ### addListener

- ### OBJ

- ### glideTo

- ### arrayLike

- ### sumAttr

- ### id

- ### cl

- ### tags

- ### qs

- ### qsa

- ### el

- ### toggleActive

- ### frag

- ### remove

- ### before

- ### kids

- ### vpu

- ### changeOnScroll

- ### popUp

- ### count

- ### relativeUrl

- ### extractBase

- ### absoluteUrl

- ### rewriteDotPath

- ### leadAndTrailSlash

- ### frame

- ### initFrame

- ### frameLink

- ### getXML

- ### parseXML

- ### xmlNode

- ### _defineStatic

- ### _defineVPU

## tips
create an alias by adding something like the following to your html or module:
```html
<script type="text/javascript">window.$$ = _$</script>
```
```js
const someAlias = require("long-story-library")
```
