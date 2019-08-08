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

## Constructor

### `_$(arg)`

## Properties

### `arg`
### `bool`
### `slash`
### `element`

## Methods

### `vw(ref)`
**description**

If ref is not supplied, calculates the pixel equivalent of the viewport width. If `ref` is supplied, treats `ref` as the viewport. Useful for using viewport units in js code. Returns a `Number`.

**example**
```js
// for window viewport
someImage.style.width = _$(50).vw()
// for container element as viewport
someImage.style.width = _$(50).vw(_$("container").id())
```  

**arguments**
- ref \
type: HTMLElement


### `vh(ref)`
**description**\
Same as vw for viewport height.


### `vmax(ref)`
**description**\
Same as vw and vh, but determines which is greater and uses the greater option.

### `vmin(ref)`
**description**\
Same as vw and vh, but determines which is smaller and uses the smaller option.


### `addListener(els, evt, cb, iterate, options, useCapture)`
**description**

Provides granular control over event listeners. Tests browser for support of an options object and passive support, and uses them by default.

Accepts an array, or array-like object (e.g. - `NodeList`) or a single element as the first argument and applies the listener(s) to each.

Accepts an array of strings or a single string as the second argument (e.g. - `["scroll", "resize", "load"]`), and executes the callback on each event.

**arguments**
- **els**\
_required_ \
<u>type</u>: `string`, `array` or `_$.arrayLike`\
<u>description</u>: target element or elements.

- **evt**\
_required_ \
<u>type</u>: `string` or `array`\
<u>description</u>: `event.type`

- **cb**\
_required_ \
<u>type</u>: `function`\
<u>description</u>: The object which receives a notification (an object that implements the `Event` interface) when an event of the specified type occurs.

- **options**\
<u>type</u>: `boolean`\
<u>default</u>: { passive: true, capture: true, once: true } \
<u>description</u>: An `object` with the following options:
 - _capture_: A `Boolean` indicating that events of this type will be dispatched to the registered `listener` before being dispatched to any `EventTarget` beneath it in the DOM tree.

 - _once_: A `Boolean` indicating that the `listener` should be invoked at most once after being added. If `true`, the `listener` would be automatically removed when invoked.

 - _passive_: A `Boolean` which, if `true`, indicates that the function specified by `listener` will never call `preventDefault()`.

read more [on mdn](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters)

- **useCapture**\
<u>type</u>: `boolean`\
<u>default</u>: true \
<u>description</u>: A `Boolean` indicating whether events of this type will be dispatched to the registered `listener` before being dispatched to any `EventTarget` beneath it in the DOM tree.


### `OBJ(nestedObj, pathArr, defaultValue, noUndefined)`
**description**

A more elegant solution to returning calues from nested objects with possible properties. `nestedObj` may be supplied as `this.arg`, as in `_$(nestedObj).OBJ(pathArr, def)`. supply an array of the optional properties down the chain, and optionally a default value.

i.e. - instead of doing this:
```js
var mediumImage =  img
                  && img._embedded
                  && img._embedded["wp:featuredmedia"]
                  && img._embedded["wp:featuredmedia"][0]
                  && img._embedded["wp:featuredmedia"][0].media_details
                  && img._embedded["wp:featuredmedia"][0].media_details.sizes
                  && img._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large
                  && img._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url
```
do this:
```js
var mediumImage = _$(img).OBJ([
  "img",
  "_embedded",
  "wp:featuredmedia",
  0,
  "media_details",
  "sizes",
  "medium_large",
  "source_url"
], placeHolderImg)
```

**arguments**

- **nestedObj**\
<u>type</u>: `object`\
<u>description</u>: the parent `object`

- **pathArr**\
<u>type</u>: `array`\
<u>description</u>: array of string representing the properties down the chain.

- **defaultValue**\
<u>type</u>: any\
<u>default</U>: `undefined`\
<u>description</u>: Default value when `nestedObj` property/sub-property has not been declared. \
 **note**: if the property has been declared as undefined, this method will return the undefined value rather than `defaultValue`. To disable this behavior and use the `defaultValue` instead, set `noUndefined` to true.

- **noUndefined**\
<u>type</u>: `boolean`\
<u>default</U>: `undefined`\
<u>description</u>: When true, property values declared as `undefined` will be disregarded in favor of `defaultValue`.

**example**
```js
var obj = {
    lvl1: { isFalse: false, isUndefined: void 0 }
}
console.log(
  _$(obj).OBJ(["lvl1", "isFalse"], 1),
  _$(obj).OBJ(["lvl1", "isUndefined"], 1),
  _$(obj).OBJ(["lvl1", "isUndefined"], 1, true),
  _$(obj).OBJ(["lvl1", "notDeclared"], 1)
)
// output: false undefined 1 1
```


### `glideTo(latitude, speed)`
**description**

Scrolls to a specified document `latitude` (`scrollY`) at the specified `speed`.

**arguments**
- **latitude**\
<u>type</u>: `number`\
<u>default</u>: 0

- **scrollDuration**\
<u>type</u>: `number`\
<u>default</u>: 0.5


### `arrayLike(obj)`
**description**

Determines if `obj` is similar to an array (like  `NodeList`). Returns a `Boolean`.

**arguments**
- **obj**: The `Object` to test.

### `id(selector, parent)`
**description**

Shorthand for `<parent>.getElementById(selector)`. `selector` may be supplied as `this.arg`, as in `_$(selector).id(parent)`. `parent` defaults to `document` if not supplied.

**arguments**
- **selector**: the element `id`.
- **parent**: A parent element. defaults to `document`

### `cl(selector, parent)`
**description**

Shorthand for `<parent>.getElementsByClassName(selector)`. `selector` may be supplied as `this.arg`, as in `_$(selector).cl(parent)`. `parent` defaults to `document` if not supplied.

**arguments**
- **selector**: the element `className`.
- **parent**: A parent element. defaults to `document`

### `tags(selector, parent)`
**description**

Shorthand for `<parent>.getElementsByTagName(selector)`. `selector` may be supplied as `this.arg`, as in `_$(selector).tags(parent)`. `parent` defaults to `document` if not supplied.

**arguments**
- **selector**: the element `tagName`.
- **parent**: A parent element. defaults to `document`

### `qs(selector, parent)`
**description**

Shorthand for `<parent>.querySelector(selector)`. `selector` may be supplied as `this.arg`, as in `_$(selector).qs(parent)`. `parent` defaults to `document` if not supplied.

**arguments**
- **selector**: the element selector.
- **parent**: A parent element. defaults to `document`

### `qsa(selector, parent)`
**description**

Shorthand for `<parent>.querySelectorAll(selector)`. `selector` may be supplied as `this.arg`, as in `_$(selector).qsa(parent)`. `parent` defaults to `document` if not supplied.

**arguments**
- **selector**: the element selector.
- **parent**: A parent element. defaults to `document`

### `el(tagname)`
**description**

Creates a new element. Shorthand for `document.createElement(tagname)`. Alternative syntax would be to use the `element` property, as in `_$(tagname).element`.

**arguments**
- **tagname**: Element `tagName`, e.g. - `(new _$()).el("span")` or `_$().el("span")`.


### `toggleActive(el)`
**description**

toggles `"active"` on an elements `className`. Does not remove existing classnames.

**arguments**
- **el**: Target element.


### `frag(els, _parent)`
**description**

Creates a `DocumentFragment`, and accepts as the first argument an `array` of objects that describe elements to append to the fragment. Properties for these objects are as follows:
- _type_ (this is **required** and represents the `HTMLElement` `tagName`. e.g. - "span")
- _className_
- _id_
- _style_ (rather than a string, this is an object with javaScript properties for `HTMLElement` attributes - e.g. `{ width: "100%", zIndex: 999 }`)
- _href_
- _onclick_ (function supplied here will use `_$().addlistener` to attach it to the target element)
- _text_
- _children_ (this is an `array` objects to append to the current element. The same rules apply to this `array` as with the top-level array supplied as the first argument.)

The array and it's children up the `Virtual DOM` tree will append themselves to their parent elements until they have reached the top level `DocumentFragment`, at which point the `DocumentFragment` is complete and may be attached to the actual `DOM` structure.

**arguments**
- **els**: `array` containing objects describing elements in `Virtual DOM`
- **_parent**: interal. Used within the `frag` function to recursively append children to parent elements in the `Virtual DOM`


### `remove(el)`
**description**

Shorthand to remove an element from `DOM`.

**arguments**
- **el**: element to remove


### `before(el, newEl)`
**description**

insert `newEl` before `el` on the `DOM`.

**arguments**
- **el**: existing element.
- **newEl** new element to insert


### `kids(el, findParentBy)`
**description**

Find all of a specified element's children.

**arguments**
- **el**: `selector` to be supplied as argument for `_$().<method>(selector)` (one of: `id`, `cl`, `tags`, `qs`, `qsa`) specified in `findParentBy`.
- **findParentBy**: Method by which to find the parent of the children targeted. if this method returns a `NodeList`, only the first element in the list will be used as the `parentElement`.


### `vpu(num, type)`
**description**

**arguments**
num, type


### `changeOnScroll(breakpoint, target, cbTrue, cbFalse, windowObj)`
**description**

**arguments**
breakpoint, target, cbTrue, cbFalse, windowObj


### `popUp(children, confirmText, btnClick, boxStyle, closeBtnStyle)`
**description**

**arguments**
children, confirmText, btnClick, boxStyle, closeBtnStyle


### `count(arr, value)`
**description**

**arguments**
arr, value


### `relativeUrl(url)`
**description**

**arguments**
url


### `extractBase(url)`
**description**

**arguments**
url


### `absoluteUrl(url, file)`
**description**

**arguments**
url, file


### `rewriteDotPath(url)`
**description**

**arguments**
url


### `leadAndTrailSlash(path)`
**description**

**arguments**
path


### `initFrame(path)`
**description**

**arguments**
path


### `frameLink(path, name, def)`
**description**

**arguments**
path, name, def


### `getXML(url, cb)`
**description**

**arguments**
url, cb


### `parseXML(text, cb)`
**description**

**arguments**
text, cb
