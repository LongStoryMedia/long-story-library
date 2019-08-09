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

Argument to initialize certain methods

### `bool`

coerce to `boolean` and return value. returns `true` _ONLY_ for `"true"`, `true`, and `"yes"`. `_$(this.arg).bool`

### `slash`

returns string with slash appended to the end. `_$(this.arg).slash`

### `element`

creates new element. `_$(this.arg).elememt`

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


### `OBJ(nestedObj, pathArr, defaultValue)`
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
<u>description</u>: Default value when `nestedObj` property/sub-property is `undefined`.


**example**
```js
var obj = {
    lvl1: { isFalse: false, isUndefined: void 0 }
}
console.log(
  _$(obj).OBJ(["lvl1", "isFalse"], 1),
  _$(obj).OBJ(["lvl1", "isUndefined"], 1),
  _$(obj).OBJ(["lvl1", "notDeclared"], 1)
)
// output: false 1 1
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

**example**
```js
(function(_$){
  var frag = _$.frag([
    {
      type: "div",
      id: "__popUp",
      style: {
        backgroundColor: "rgba(130, 130, 130, 0.5)",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 5555
      },
      children: [
        {
          type: "div",
          className: "popUp",
          style: boxStyle,
          children: [
            type: "span",
            className: "btn",
            text: confirmText,
            style: closeBtnStyle,
            onclick: function() {
              return _$.remove(_$.id("__popUp"));
            }
          ]
        }
      ]
    }
  ]);
  document.body.appendChild(frag);
})(new _$)
```

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

Emulates [viewport units](https://www.w3.org/TR/css3-values/#viewport-relative-lengths) in JavaScript. Returns a `Number` which represents the viewport unit value converted to pixels. `num` may be supplied as `this.arg`, as in `_$(num).vpu(type)`

**arguments**
- **num**: number of the `type` of viewport unit.
- **type**: the type of viewport unit (`"vw"`, `"vh"`, `"vmax"`, `"vmin"`). these are detailed in the individual methods [above](https://github.com/LongStoryMedia/long-story-library#vwref).


### `changeOnScroll(breakpoint, target, cbTrue, cbFalse, windowObj)`
**description**

Passively listens to the `"scroll"` event on the `windowObj`, and executes `cbTrue` on the `target` while `scrollY` is past the `breakpoint`, and executes `cbFalse` if `scrollY` crosses back below the `breakpoint`. Use case would be changing the `size`, `color`, `position`, etc. of the header on `"scroll"`.

**arguments**
- **breakpoint**\
<u>type</u>: `number`\
<u>description</u>: `number` that represents the `scrollY` at which the callbacks are executed.

- **target**\
<u>type</u>: `HTMLElement`\
<u>description</u>: The target on which to execute the callbacks.

- **cbTrue**\
<u>type</u>: `function`\
<u>description</u>: Callback for when `scrollY` passes the `breakpoint`.

- **cbFalse**\
<u>type</u>: `function`\
<u>description</u>: Callback for when `scrollY` passes back from beyond the `breakpoint` to below.

- **windowObj**\
<u>type</u>: `window`, `HTMLElement`, `array`, or array-like `object` (e.g. `NodeList`) of `HTMLElement`s.\
<u>description</u>: The primary scrolling container. This is almost always `Window`, but some frameworks use different container elements as their primary scrolling object, and still others use multiple, or different containers for different states.

**example**
```js
(function(_$) {
  _$.changeOnScroll(
    // breakpoint
    _$.vpu(50, "vmin"),
    // target
    _$.qs(".Header"),
    // cbTrue
    function(header) {
      return _$.toggleActive("solid");
    },
    // cbFalse
    function(header) {
      return _$.toggleActive("solid");
    },
    // windowObj
    [ window, _$.id("s4-workspace") ]
  )
})(new _$)
```

### `popUp(children, confirmText, btnClick, boxStyle, closeBtnStyle)`
**description**

Internally uses <code>\_$.[frag](https://github.com/LongStoryMedia/long-story-library#fragels-_parent)</code> to create a simple popup.

**arguments**
- **children**: This argument is passed to `_$.frag`. see [above](https://github.com/LongStoryMedia/long-story-library#fragels-_parent) for details.

- **confirmText**: text to appear on the button in the popup

- **btnClick**: callback to execute on the `"click"` event on the button

- **boxStyle**: style `object` for the `popUp` container, e.g. `{ width: "90%", zIndex: 999, color: "#fff" }`.

- **closeBtnStyle**: style `object` for the button to close the popUp.



### `_count(arr, value)`
**description**

Internal.

Count the number of times `value` occurs in `arr`.

**arguments**
- **arr**: `array` to iterate.

- **value**: the `value` to count.

### `_relativeUrl(url)`
**description**

Internal.

Given a URL, will return the path from the root as `String`
**arguments**
- **url**: url string to convert


### `_extractBase(url)`
**description**

Internal.

Given a URL, returns the `origin`. Useful when browsers don't support `window.location.origin`

**arguments**
- **url**


### `_absoluteUrl(url, file)`
**description**

Internal.

**arguments**
- **url**
- **file**


### `_rewriteDotPath(url)`
**description**

Internal.

**arguments**\
- **url**


### `_leadAndTrailSlash(path)`
**description**

Internal.

**arguments**
- **path**

### `frame(path, file, ext, rootnode)`

**description**

Used in conjunction with `frameLink` and `initFrame` below, initializes a small framework for rendering html/txt documents that are held in a common directory. These methods may expand and become a separate, more focused library, but will still be available from this library in that event.

There is an example below all three demonstrating how they all tie together

**arguments**
- **path**\
<u>type</u>: `string`\
<u>description</u>: Path to directory. Can accept a full URL if the `origin` differs

- **file**\
<u>type</u>: `string`\
<u>description</u>: Name of the file without the extension.

### `initFrame(path)`
**description**

Initializes [frame](https://github.com/LongStoryMedia/long-story-library#framepath-_file-_ext-_rootnode) with the default file (if supplied), and adds appropriate event listeners for state changes.

**arguments**
- **path**: Path to directory where text documents are stored. Supplied to `frame` method.

### `frameLink(path, name, def)`
**description**

Used to create a globally namespaced method that "links" from one document to another. This method could probably be used for that purpose itself, but it's semantically easier for the use (as you'll see below) to create something more intuitive (ex - `Link(name)`) that is available on the global (`window`) `object`.

**arguments**
- **path**: Path to directory where text documents are stored. Supplied to `frame` method.

- **name**: Name of the file to request (without the extension).

- **def**: The default file to fall back on in the event of a failed request.

## `frame` example

This is designed to be set into an existing webpage. So the assumption is that there will be html around `frame` that will not change from request to request. Part of that html is assumed to be a menu of sorts wherein each menu item has an `id` that corresponds to the name of the file that will be requested when it is clicked. The other important part of that html is the `rootnode`. This is the `Node` into which the `response` from the network request to the file will populate. As of now, it must be an element with the id "root" (e.g. - `_$("root").id()`). It should also be empty as anything inside `rootnode` before the network request will be permanently replaced upon initialization.

```js
// /samplingplan.js
(function(_$) {
  // set up arguments
  var path = "/lab/samplingplan/Documents/";
  var hash = _$.OBJ(location, ["hash"]);
  var file = hash ? hash.slice(1) : "Malt";

  // menu items that correspond to our text files
  var menuItems = [
    "Mill",
    "HeatEX",
    "ADD-Water",
    "Ferment",
    "ADD-O2-Yeast",
    "Whirl",
    "ADD-Hops",
    "REMOVE-Trub",
    "Bottle-CanorKeg",
    "Lauter",
    "Clarify",
    "REMOVE-Grain",
    "Condition",
    "Kettle",
    "Brite",
    "Mash",
    "ADD-CO2",
    "Malt"
  ];
  // globally available method for "linking" our files
  // this can be used within the files to link to other files
  // used as <div onclick="Link('Ferment')">Ferment</div>
  window.Link = function(name) {
    _$.frameLink(path, name, "Malt");
  };
  // this example comes from a particularly unique case
  // where there were multiples of some menuItems
  // something to do with wanting to have a layout that
  // reflects a specific process in which certain steps
  // are repeated. so I had to get a little creative with
  // adding the event listeners
  menuItems.forEach(function(btn) {

    if (_$.qsa("#" + btn).length > 1) {
      // if more than one, add to each
      // addListener method handles NodeList
      _$.addListener(
        _$.qsa("#" + btn),
        "click",
        function(e) {
          Link(e.target.id);
        },
        { once: false, passive: false }
      );
    }

    if (_$.qsa("#" + btn).length === 1) {
      // else just apply to the one and use id method
      _$.addListener(
        _$.id(btn),
        "click",
        function(e) {
          Link(e.target.id);
        },
        { once: false, passive: false }
      );
    }
  });

  // finally, attach frame initialization to DOMContentLoaded
  _$.addListener(document, "DOMContentLoaded", _$.initFrame(path));

})(new $$());

```
```html
<!-- index.html -->

<div class="menu" style="width: 200px; float: left">

  <div id="Mill">Mill</div>
  <div id="HeatEX">HeatEX</div>
  <div id="ADD-Water">ADD-Water</div>
  <div id="Ferment">Ferment</div>
  <div id="ADD-O2-Yeast">ADD-O2-Yeast</div>
  <div id="Whirl">Whirl</div>
  <div id="ADD-Hops">ADD-Hops</div>
  <div id="REMOVE-Trub">REMOVE-Trub</div>
  <div id="Bottle-CanorKeg">Bottle-CanorKeg</div>
  <div id="Lauter">Lauter</div>
  <div id="Clarify">Clarify</div>
  <div id="REMOVE-Grain">REMOVE-Grain</div>
  <div id="Condition">Condition</div>
  <div id="Kettle">Kettle</div>
  <div id="Brite">Brite</div>
  <div id="Mash">Mash</div>
  <div id="ADD-CO2">ADD-CO2</div>
  <div id="Malt">Malt</div>
</div>
<div id="root"></div>
<script type="text/javascript" src="/samplingplan.js"></script>
```

### `getXML(url, cb)`
**description**

Written alongside `parseXML`, but really isn't specific to XML. Pretty much just a wrapper around an XMLHttpRequest, but greatly simplified, and cuts out the boilerplate request code. only makes `GET` requests. provides a callback for the reponse. `url` may be supplied as `this.arg` as in `_$(url).getXML(cb)`

**arguments**
- **url**: request url.
- **cb**: function to execute on the response returned from the request.


### `parseXML(text, cb)`
**description**

Parses XML (and html) `string` into a `DOM`, providing native browser functions for traversing the `DOM` tree. provides a callback to be executed on the resulting `DOM`. `test` may be supplied as `this.arg` as in `_$(url).parseXML(cb)`

**arguments**
- **text**: string to parse.
- **cb**: callback to execute on `DOM`

### example for `XML` methods above
this incorporates [react-gallery-designer](https://github.com/LongStoryMedia/react-gallery-designer)'s somewhat unique umd build, which wraps a `React` component in a custom function making it quite portable
```js
(function(_$) {
  // get rss XML
  _$.getXML(
    "https://twitrss.me/twitter_user_to_rss/?user=plantdisease",
    function(rss) {
      // parse it
      _$.parseXML(rss, function(doc) {
        // construct our feed segments
        var images = Array.from($$.tags("item", doc), function(item, i) {
          return {
            caption: _$.qs("title", item).innerHTML.slice(0, 100) + " ...",
            link: _$.qs("link", item).innerHTML,
            style: {
              // gives every other item a grey background
              backgroundColor: Math.ceil(i % 2) ? "#dcdbdb" : "#fff"
            },
            target: true
          };
        });

        var settings = {
          inview: 2,
          auto: true,
          playpause: false,
          pauseonhover: false,
          direction: "left",
          animation: "slide",
          orientation: "vertical",
          speed: 5000,
          transitionspeed: 1,
          arrows: false,
          advance: 1,
          showcaptions: true,
          linkslides: true,
          thumbnails: false,
          contain: false,
          noImages: true
        };
        // return custom rotating feed
        return __RGD({
          images: images,
          settings: settings,
          captionStyle: { color: "#595956", fontWeight: "bold", lineHeight: 2, fontSize: "1.05rem" },
          imgStyle: { padding: "0 1rem" },
          style: { height: "9rem" },
          domId: "twitterFeed"
        });
      });
    }
  );
})(new _$;
```
