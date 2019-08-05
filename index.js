"use strict";
function _$(arg) {
  if (!(this instanceof _$)) return new _$(arg);
  this.arg = arg;
  this._defineStatic("bool", ["string", "boolean", undefined], function(arg) {
    return "true" === arg || "yes" === arg || true === arg;
  });
  this._defineStatic("slash", ["string"], function(arg) {
    return arg + "/";
  });
  Object.defineProperties(this, {
    ref: {
      get: function() {
        return window;
      },
      set: function(ref) {
        this.ref = ref;
      },
      enumerable: true,
      configurable: true
    },
    vw: {
      get: function() {
        return function(ref) {
          if (arguments.length) {
            return this._getWidthWithRef(this.arg, ref);
          }
          return this._getWidthWithRef(this.arg);
        };
      },
      set: function(vw) {
        this._vw = vw;
      },
      enumerable: true,
      configurable: true
    },
    vh: {
      get: function() {
        return function(ref) {
          if (arguments.length) {
            return this._getHeightWithRef(this.arg, ref);
          }
          return this._getHeightWithRef(this.arg);
        };
      },
      set: function(vh) {
        this._vh = vh;
      },
      enumerable: true,
      configurable: true
    },
    vmax: {
      get: function() {
        return function(ref) {
          if (arguments.length) {
            this.vh = this._getHeightWithRef(this.arg, ref);
            this.vw = this._getWidthWithRef(this.arg, ref);
            return returnSmaller(this._vw, this._vh);
          }
          this.vh = this._getHeightWithRef(this.arg);
          this.vw = this._getWidthWithRef(this.arg);
          return returnBigger(this._vw, this._vh);
        };
        function returnBigger(vw, vh) {
          return vw > vh ? vw : vh;
        }
      },
      set: function(vmin) {
        this.vmin = vmin;
      },
      enumerable: true,
      configurable: true
    },
    vmin: {
      get: function() {
        return function(ref) {
          if (arguments.length) {
            this.vh = this._getHeightWithRef(this.arg, ref);
            this.vw = this._getWidthWithRef(this.arg, ref);
            return returnSmaller(this._vw, this._vh);
          }
          this.vh = this._getHeightWithRef(this.arg);
          this.vw = this._getWidthWithRef(this.arg);
          return returnSmaller(this._vw, this._vh);
        };
        function returnSmaller(vw, vh) {
          return vw < vh ? vw : vh;
        }
      },
      set: function(vmin) {
        this.vmin = vmin;
      },
      enumerable: true,
      configurable: true
    }
  });
  // console.log(this)
  // return this;
}
_$.prototype._getWidthWithRef = function(arg, ref) {
  return (
    //directly returning one or the other dependent on arguments length causes initialization at 0
    //it will then remain at 0 with a ref.
    //but 0, when coerced to boolean will evaluate to false, causing initialization with window
    (((ref && ref.clientWidth) || window.innerWidth) / 100) * arg
  );
};
_$.prototype._getHeightWithRef = function(arg, ref) {
  return (
    //directly returning one or the other dependent on arguments length causes initialization at 0
    //it will then remain at 0 with a ref.
    //but 0, when coerced to boolean will evaluate to false, causing initialization with window
    (((ref && ref.clientHeight) || window.innerHeight) / 100) * arg
  );
};
_$.prototype.addListener = function(
  els,
  evt,
  cb,
  iterate,
  options,
  useCapture
) {
  var _this = this;
  var passiveSupport = false;
  try {
    options = {
      get passive() {
        return (passiveSupport = true);
      }
    };
  } catch (e) {
    passiveSupport = false;
  }

  if (typeof this.arg !== "undefined" && typeof evt === "function")
    return output(els, _this.arg, _this);
  return output(evt, els, _this);

  function output(e, l, _this) {
    return Array.isArray(e)
      ? e.forEach(function(e) {
          listen(l, e);
        }, _this)
      : listen(l, e);
  }

  function listen(els, evt) {
    var __this = _this;

    if (((iterate = iterate || false), Array.isArray(els))) {
      var ___this = __this;
      els.map(function(el) {
        return ___this.arrayLike(el)
          ? addListenerToEach(el, ___this)
          : __L$_listener(el, evt);
      }, ___this);
    }

    return (
      __this.arrayLike(els) && iterate && addListenerToEach(els),
      __L$_listener(els, evt)
    );

    function addListenerToEach(el, _this) {
      return Array.from(el).forEach(function(l) {
        __L$_listener(l, evt);
      }, _this);
    }
  }

  function __L$_listener(el, evt) {
    if (el) {
      if (_this.OBJ(el, ["addEventListener"])) {
        return passiveSupport
          ? el.addEventListener(
              evt,
              cb,
              options || { passive: true, capture: true, once: true },
              void 0 !== useCapture && (useCapture || true)
            )
          : el.addEventListener(evt, cb, useCapture || true);
      }
      return _this.OBJ(el, ["attachEvent"])
        ? el.attachEvent("on" + evt, cb)
        : (el["on" + evt] = cb);
    }
  }
};
_$.prototype.OBJ = function(nestedObj, pathArr, def) {
  if ((!def && !this.arrayLike(pathArr)) || !pathArr) {
    def = pathArr;
    pathArr = nestedObj;
    nestedObj = this.arg;
  }
  var reducer = pathArr.reduce(function(obj, key) {
    return obj && "undefined" !== obj[key] ? obj[key] : void 0;
  }, nestedObj);
  return typeof reducer !== "undefined" ? reducer : def;
};
_$.prototype.glideTo = function(latitude, scrollDuration) {
  latitude = latitude || 0;
  scrollDuration = scrollDuration || 0.5;
  function step(newTimestamp) {
    scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
    scrollCount >= Math.PI && window.scrollTo(0, 0);
    0 !== window.scrollY &&
      window.scrollTo(
        0,
        Math.round(cosParameter + cosParameter * Math.cos(scrollCount))
      );
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }
  var cosParameter = window.scrollY / 2,
    scrollCount = 0,
    oldTimestamp = window.performance.now();
  window.requestAnimationFrame(step);
};
_$.prototype.arrayLike = function(obj) {
  return (
    Array.isArray(obj) ||
    (!!obj &&
      "object" == typeof obj &&
      "number" == typeof obj.length &&
      (0 === obj.length || (obj.length > 0 && obj.length - 1 in obj)))
  );
};
_$.prototype.sumAttr = function(coll, attr) {
  var total = 0;
  for (var i = 0; i < coll.length; i++) total += coll[i][attr];
  return total;
};
_$.prototype.id = function(name, parent) {
  parent = parent || window.document;
  return parent.getElementById(name);
};
_$.prototype.cl = function(name, parent) {
  parent = parent || window.document;
  return parent.getElementsByClassName(name);
};
_$.prototype.tags = function(name, parent) {
  parent = parent || window.document;
  return parent.getElementsByTagName(name);
};
_$.prototype.qs = function(name, parent) {
  parent = parent || window.document;
  return parent.querySelector(name);
};
_$.prototype.qsa = function(name, parent) {
  parent = parent || window.document;
  return parent.querySelectorAll(name);
};
_$.prototype.el = function(name) {
  return window.document.createElement(name);
};
_$.prototype.toggleActive = function(el) {
  return el && el.classList && el.classList.toggle("active");
};
_$.prototype.frag = function(els, parent) {
  var frag = window.document && window.document.createDocumentFragment();
  parent = parent || frag;
  var _this = this;
  return (
    els.forEach(function(el) {
      if ("object" != typeof el || this.arrayLike(el))
        throw new Error(
          "'frag' takes an array of objects with the required property 'type', as well as the optional properties 'className', 'id', 'style', 'href', 'onclick', 'text', and 'children'. The same rule applies to the children property"
        );
      var l = this.el(el.type || "div");
      for (var attr in el)
        "style" !== attr &&
          "children" !== attr &&
          "text" !== attr &&
          "onclick" !== attr &&
          "type" !== attr &&
          (l[attr] = el[attr]);
      if (el.style) for (var s in el.style) l.style[s] = el.style[s];
      el.text && (l.innerHTML = el.text);
      el.children && l.appendChild(this.frag(el.children, l));
      el.onclick &&
        this.addListener(
          l,
          "click",
          el.onclick,
          false,
          { passive: true, once: true, capture: true },
          true
        );
      parent.appendChild(l);
    }, _this),
    frag
  );
};
_$.prototype.remove = function(name) {
  return name.parentElement && name.parentElement.removeChild(name);
};
_$.prototype.before = function(name, newEl) {
  return name.parentElement && name.parentElement.insertBefore(newEl, name);
};
_$.prototype.kids = function(name, findParentBy) {
  if ("object" == typeof name && !findParentBy)
    return this.arrayLike(name) ? name[0].children : name.children;
  if (
    ((findParentBy = findParentBy || "id"),
    !Object.getOwnPropertyNames(this).includes(findParentBy))
  )
    throw new Error(
      "'kids' requires 'id', 'cl', or 'tags' as the second argument. This indicates how the browser should find the element - by id, className, or tagName respectively. Note that for 'cl' and 'tags', the browser will return only the first match"
    );
  return (
    this.OBJ(this[findParentBy](name), [0, "children"]) ||
    this.OBJ(this[findParentBy](name), ["children"])
  );
};
_$.prototype.vpu = function(num, type) {
  var clientHeight = window.innerHeight,
    clientWidth = window.innerWidth,
    vw = clientWidth / 100,
    vh = clientHeight / 100,
    vmax = vw > vh ? vw : vh,
    vmin = vw < vh ? vw : vh;
  switch (type) {
    case "vw":
      return vw * num;
    case "vh":
      return vh * num;
    case "vmax":
      return vmax * num;
    case "vmin":
      return vmin * num;
    default:
      return vw * num;
  }
};
_$.prototype.changeOnScroll = function(
  breakpoint,
  target,
  cbTrue,
  cbFalse,
  windowObj
) {
  if (
    windowObj &&
    ("object" !== typeof windowObj && !this.arrayLike(windowObj))
  ) {
    throw new TypeError(
      "'windowObj', when supplied must be a single Object (HTMLElement) or an Array or array-like Object of Objects (HTMLCollection)"
    );
  }
  var targets = [];
  if (windowObj) {
    if (this.arrayLike(windowObj)) {
      for (var node in windowObj)
        if (windowObj.hasOwnProperty(node)) targets.push(windowObj[node]); //eslint-disable-line
    } else targets.push(windowObj);
  }
  windowObj = targets.concat(window);
  return this.addListener(
    windowObj,
    ["scroll", "load"],
    function(e) {
      return e.target.scrollTop >= breakpoint || window.scrollY >= breakpoint
        ? cbTrue(target)
        : cbFalse(target);
    },
    true
  );
};
_$.prototype.popUp = function(
  children,
  confirmText,
  btnClick,
  boxStyle,
  closeBtnStyle
) {
  if ("function" == typeof confirmText) {
    closeBtnStyle = boxStyle;
    boxStyle = btnClick;
    btnClick = confirmText;
    confirmText = confirmText || "OK";
  }
  if ("object" == typeof confirmText) {
    closeBtnStyle = btnClick;
    boxStyle = confirmText;
    btnClick = function() {
      return _$().remove(_$().id("__popUp"));
    };
    confirmText = confirmText || "OK";
  }
  if ("object" == typeof btnClick) {
    closeBtnStyle = boxStyle;
    boxStyle = btnClick;
    btnClick = function() {
      return _$().remove(_$().id("__popUp"));
    };
    confirmText = confirmText || "OK";
  }
  var frag = this.frag([
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
          children: children.concat({
            type: "span",
            className: "btn",
            text: confirmText,
            style: closeBtnStyle,
            onclick: btnClick
          })
        }
      ]
    }
  ]);
  window.document.body.appendChild(frag);
};
_$.prototype.count = function(arr, value) {
  if (!value && this.arg) {
    value = arr;
    arr = this.arg;
  }
  return arr.reduce(function(n, val) {
    return n + Number(val === value);
  }, 0);
};
_$.prototype.relativeUrl = function(url) {
  function removeBase(url) {
    return url.slice(url.indexOf("/"));
  }
  return url
    ? /^https?:\/\//.test(url.toLowerCase())
      ? removeBase(url.split("://").pop())
      : /^(www\.)?.+?\.\w{2,4}\//.test(this(url).slash)
      ? removeBase(url)
      : /^\.\./.test(url)
      ? this.rewriteDotPath(url)
      : url
    : "";
};
_$.prototype.extractBase = function(url) {
  function extract(uri) {
    return uri
      .split("://")
      .pop()
      .split("/")[0];
  }
  return extract(
    url && extract(url) ? url : this.OBJ(window, ["location", "href"])
  );
};
_$.prototype.absoluteUrl = function(url, file) {
  return (
    (file = file || ""),
    "//" +
      this.extractBase(url) +
      this.leadAndTrailSlash(this.relativeUrl(url)) +
      file
  );
};
_$.prototype.rewriteDotPath = function(url) {
  var dotPathArr = url.split("/").filter(Boolean),
    relHref = this.relativeUrl(this.OBJ(window, ["location", "href"])),
    navUp = this.count(dotPathArr, "..");
  return (
    "/" +
    (function(num) {
      return relHref
        .split("/")
        .filter(Boolean)
        .slice(0, num - navUp);
    })(/\/$/.test(url) ? 0 : -2) +
    "/" +
    dotPathArr.slice(navUp)
  );
};
_$.prototype.leadAndTrailSlash = function(path) {
  var leadPath = /^\//.test(path) ? path : "/" + path;
  return /\/$/.test(leadPath) ? leadPath : leadPath + "/";
};
_$.prototype.frame = function(path, file, ext) {
  ext = ext || "html";
  var hash = this.OBJ(window, ["location", "hash"]);
  file = this.OBJ(window, ["history", "state"])
    ? this.OBJ(window, ["history", "state", "frame"])
    : hash
    ? hash.slice(1)
    : file;
  var rootnode = this.id("root"),
    req = new XMLHttpRequest(), //eslint-disable-line
    name = this.absoluteUrl(path, file) + "." + ext;
  req.open("GET", name, true);
  req.onreadystatechange = function() {
    try {
      if (4 === req.readyState) {
        if (200 !== req.status) throw new Error("XMLHttpError: " + req.status);
        rootnode.innerHTML = req.responseText;
      }
    } catch (e) {
      console && console.error(e, req.status);
    }
  };
  req.send(null);
};
_$.prototype.initFrame = function(path) {
  var that = this,
    hash = this.OBJ(window, ["location", "hash"]),
    file = this.OBJ(window, ["history", "state"])
      ? this.OBJ(window, ["history", "state", "frame"])
      : hash
      ? hash.slice(1)
      : "";
  this.addListener(
    window,
    ["hashchange", "popstate"],
    function(e) {
      var frame = e.state ? e.state.frame : e.newURL.split("#").pop();
      that.toggleActive(that.id(frame));
      that.frame(path, file);
    },
    false,
    { once: false, passive: false, capture: false },
    false
  );
  this.frame(path, file);
  this.toggleActive(this.id(file));
};
_$.prototype.frameLink = function(path, name, def) {
  name = name || def;
  var hash = this.OBJ(window, ["location", "hash"]),
    file = this.OBJ(window, ["history", "state"])
      ? this.OBJ(window, ["history", "state", "frame"])
      : hash
      ? hash.slice(1)
      : "";
  if (
    (this.toggleActive(this.id(file)),
    this.OBJ(window, ["history", "pushState"]))
  ) {
    var state = { frame: name },
      popState = new PopStateEvent("popstate", { state: state }); //eslint-disable-line
    window.history.pushState({ frame: name }, name, "#" + name);
    this.frame(path, name);
    dispatchEvent(popState);
  } else window.location.hash = name;
};
_$.prototype.getXML = function(url, cb) {
  var req = new XMLHttpRequest(); //eslint-disable-line
  req.open("GET", url, true);
  req.onreadystatechange = function() {
    try {
      if (4 === req.readyState) {
        if (200 !== req.status)
          throw new Error("XMLHttpError: " + req.response);
        return cb ? cb(req.response) : req.response;
      }
    } catch (e) {
      console && console.error(e, req.status);
    }
  };
  req.send(null);
};
_$.prototype.parseXML = function(text, cb) {
  var parser = new DOMParser(); //eslint-disable-line
  try {
    var doc = parser.parseFromString(text, "text/xml");
    return cb ? cb(doc) : doc;
  } catch (e) {
    console && console.error(e);
  }
};
_$.prototype.xmlNode = function(pNode, nodeName, def) {
  return (
    (def = def || void 0),
    this.OBJ(
      Array.from(this.OBJ(pNode, ["childNodes"], []), function(cNode) {
        return "[object Element]" === cNode.toString() &&
          nodeName === cNode.nodeName
          ? cNode
          : null;
      }).filter(Boolean),
      [0, "textContent"],
      def
    )
  );
};
_$.prototype._defineStatic = function(name, argTypes, cb) {
  if ("function" === typeof argTypes) cb = argTypes;
  if (argTypes && !this.arrayLike(argTypes)) argTypes = [].concat(argTypes);
  return Object.defineProperty(_$.prototype, name, {
    get: function() {
      try {
        var validator = {};
        for (var i = 0; i < argTypes.length; i++) validator[argTypes[i]] = i;
        if (!(typeof this.arg in validator))
          throw new TypeError(this.arg + " is not of type(s) " + argTypes);
        return cb ? cb(this.arg) : this.arg;
      } catch (e) {
        throw new Error(e);
      }
    },
    set: function(arg) {
      this.arg = arg;
    },
    enumerable: true,
    configurable: true
  });
};
_$.prototype._defineVPU = function(type) {
  try {
    if (typeof window !== "undefined") {
      var _type;
      var vw = window.innerWidth / 100;
      var vh = window.innerHeight / 100;
      var vmax = vw > vh ? vw : vh;
      var vmin = vw < vh ? vw : vh;
      switch (type) {
        case "vw":
          _type = vw;
          break;
        case "vh":
          _type = vh;
          break;
        case "vmax":
          _type = vmax;
          break;
        case "vmin":
          _type = vmin;
          break;
        default:
          _type = vw;
          break;
      }
      return this._defineStatic(type, "number", function(arg) {
        return arg * _type;
      });
    }
    return 0;
  } catch (e) {
    throw new Error(e);
  }
};

try {
  //eslint-disable-line
  module.exports = _$; //eslint-disable-line
} catch (e) {} //eslint-disable-line
