"use strict";
function _$(arg) {
  if (!(this instanceof _$)) return new _$(arg);
  this.arg = arg;
  Object.defineProperties(this, {
    bool: {
      get: function() {
        return "true" === this.arg || "yes" === this.arg || true === this.arg;
      }
    },
    slash: {
      get: function() {
        return this.arg + "/";
      }
    },
    element: {
      get: function() {
        return document.createElement(this.arg);
      }
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
            return returnBigger(this._vw, this._vh);
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
}

_$.prototype._getWidthWithRef = function(arg, ref) {
  return (
    //directly returning one or the other dependent on arguments causes initialization at 0
    //it will then remain at 0 when ref is supplied.
    //but 0, when coerced to boolean, will evaluate to false, causing initialization with window
    (((ref && ref.clientWidth) || window.innerWidth) / 100) * arg
  );
};

_$.prototype._getHeightWithRef = function(arg, ref) {
  return (
    //directly returning one or the other dependent on arguments causes initialization at 0
    //it will then remain at 0 when ref is supplied.
    //but 0, when coerced to boolean, will evaluate to false, causing initialization with window
    (((ref && ref.clientHeight) || window.innerHeight) / 100) * arg
  );
};

_$.prototype.addListener = function(els, evt, cb, options, useCapture) {
  if (
    typeof options === "boolean" &&
    (typeof useCapture === "object" || !useCapture)
  ) {
    var swap = useCapture;
    useCapture = options;
    options = swap;
  }
  var _this = this;

  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
  var passiveSupport = false;
  try {
    options = {
      get passive() {
        return (passiveSupport = true);
      }
    };
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (e) {
    passiveSupport = false;
  }

  if (typeof this.arg !== "undefined" && typeof evt === "function")
    return output(els, _this.arg, _this);
  return output(evt, els, _this);

  function output(e, l, _$this) {
    return Array.isArray(e)
      ? e.forEach(function(e) {
          listen(l, e);
        }, _$this)
      : listen(l, e);
  }

  function listen(els, evt) {
    var __this = _this;

    if (Array.isArray(els)) {
      els.map(function(el) {
        return __this.arrayLike(el)
          ? addListenerToEach(el, __this)
          : _$listen(el, evt);
      }, __this);
    }

    return __this.arrayLike(els) && addListenerToEach(els), _$listen(els, evt);

    function addListenerToEach(el, _this) {
      return Array.from(el).forEach(function(l) {
        _$listen(l, evt);
      }, _this);
    }
  }

  function _$listen(el, evt) {
    if (el) {
      if (_this.OBJ(el, ["addEventListener"])) {
        return passiveSupport
          ? el.addEventListener(
              evt,
              cb,
              options || { passive: true, capture: true, once: true },
              useCapture || true
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

_$.prototype.glideTo = function(latitude, speed) {
  latitude = latitude || 0;
  speed = speed || 0.5;
  function step(newTimestamp) {
    scrollCount += Math.PI / (speed / (newTimestamp - oldTimestamp));
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

_$.prototype.id = function(selector, parent) {
  if (!selector && this.arg) {
    parent = selector;
    selector = this.arg;
  }
  parent = parent || document;
  return parent.getElementById(selector);
};

_$.prototype.cl = function(selector, parent) {
  if (!selector && this.arg) {
    parent = selector;
    selector = this.arg;
  }
  parent = parent || document;
  return parent.getElementsByClassName(selector);
};

_$.prototype.tags = function(selector, parent) {
  if (!selector && this.arg) {
    parent = selector;
    selector = this.arg;
  }
  parent = parent || document;
  return parent.getElementsByTagName(selector);
};

_$.prototype.qs = function(selector, parent) {
  if (!selector && this.arg) {
    parent = selector;
    selector = this.arg;
  }
  parent = parent || document;
  return parent.querySelector(selector);
};

_$.prototype.qsa = function(selector, parent) {
  if (!selector && this.arg) {
    parent = selector;
    selector = this.arg;
  }
  parent = parent || document;
  return parent.querySelectorAll(selector);
};

_$.prototype.el = function(selector) {
  return document.createElement(selector);
};

_$.prototype.toggleActive = function(el) {
  return el && el.classList && el.classList.toggle("active");
}

_$.prototype.frag = function(els, _parent) {
  var frag = document.createDocumentFragment();
  _parent = _parent || frag;
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
      if (el.text) l.innerHTML = el.text;
      if (el.children) l.appendChild(this.frag(el.children, l));
      if (el.onclick) this.addListener(l, "click", el.onclick);
      _parent.appendChild(l);
    }, _this),
    frag
  );
};

_$.prototype.remove = function(el) {
  return el.parentElement && el.parentElement.removeChild(el);
};

_$.prototype.before = function(el, newEl) {
  return el.parentElement && el.parentElement.insertBefore(newEl, el);
};

_$.prototype.kids = function(el, findParentBy) {
  if ("object" === typeof el && !findParentBy)
    return this.arrayLike(el) ? el[0].children : el.children;
  findParentBy = findParentBy || "id";
  return this.OBJ(
    this[findParentBy](el),
    [0, "children"],
    this.OBJ(
      this[findParentBy](el),
      ["children"],
      this.OBJ(this.qs(el), [0, "children"])
    )
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
  document.body.appendChild(frag);
};

_$.prototype._count = function(arr, value) {
  if (!value && this.arg) {
    value = arr;
    arr = this.arg;
  }
  return arr.reduce(function(n, val) {
    return n + Number(val === value);
  }, 0);
};

_$.prototype._relativeUrl = function(url) {
  function removeBase(url) {
    return url.slice(url.indexOf("/"));
  }
  return url
    ? /^https?:\/\//.test(url.toLowerCase())
      ? removeBase(url.split("://").pop())
      : /^(www\.)?.+?\.\w{2,4}\//.test(_$(url).slash)
      ? removeBase(url)
      : /^\.\./.test(url)
      ? this._rewriteDotPath(url)
      : url
    : "";
};

_$.prototype._extractBase = function(url) {
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

_$.prototype._absoluteUrl = function(url, file) {
  return (
    (file = file || ""),
    "//" +
      this._extractBase(url) +
      this._leadAndTrailSlash(this._relativeUrl(url)) +
      file
  );
};

_$.prototype._rewriteDotPath = function(url) {
  var dotPathArr = url.split("/").filter(Boolean),
    relHref = this._relativeUrl(this.OBJ(window, ["location", "href"])),
    navUp = this._count(dotPathArr, "..");
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

_$.prototype._leadAndTrailSlash = function(path) {
  var leadPath = /^\//.test(path) ? path : "/" + path;
  return /\/$/.test(leadPath) ? leadPath : leadPath + "/";
};

_$.prototype.frame = function(path, file) {
  var hash = this.OBJ(window, ["location", "hash"]);
  file = window.history.state
    ? this.OBJ(window, ["history", "state", "frame"])
    : hash
    ? hash.slice(1)
    : file;
  var rootnode = this.id("root"),
    req = new XMLHttpRequest(),
    name = this._absoluteUrl(path, file) + ".html";
  req.open("GET", name, !0),
    (req.onreadystatechange = function() {
      try {
        if (4 === req.readyState) {
          if (200 !== req.status)
            throw new Error("XMLHttpError: " + req.status);
          rootnode.innerHTML = req.responseText;
        }
      } catch (e) {
        console.error(e, req.status);
      }
    }),
    req.send(null);
}

_$.prototype.initFrame = function(path) {
  var that = this,
    hash = this.OBJ(window, ["location", "hash"]),
    file = window.history.state
      ? this.OBJ(window, ["history", "state", "frame"])
      : hash
      ? hash.slice(1)
      : "";
  this.addListener(
    window,
    ["hashchange", "popstate"],
    function(e) {
      var frame = e.state ? e.state.frame : e.newURL.split("#").pop();
      that.toggleActive(that.id(frame)), that.frame(path, file);
    },
    !1,
    { once: !1, passive: !1, capture: !1 },
    !1
  ),
    this.frame(path, file),
    this.toggleActive(this.id(file));
}

_$.prototype.frameLink = function(path, name, def) {
  name = name || def;
  var hash = this.OBJ(window, ["location", "hash"]),
    file = window.history.state
      ? this.OBJ(window, ["history", "state", "frame"])
      : hash
      ? hash.slice(1)
      : "";
  if ((this.toggleActive(this.id(file)), window.history.pushState)) {
    var state = { frame: name },
      popState = new PopStateEvent("popstate", { state: state });
    window.history.pushState({ frame: name }, name, "#" + name),
      this.frame(path, name),
      dispatchEvent(popState);
  } else window.location.hash = name;
}

_$.prototype.getXML = function(url, cb) {
  if (!url && this.arg) url = this.arg;
  if (typeof url === "function" && this.arg) {
    cb = url;
    url = this.arg;
  }
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.onreadystatechange = function() {
    if (200 !== req.status) throw new Error("XMLHttpError: " + req.response);
    return cb ? cb(req.response) : req.response;
  };
  req.send(null);
};

_$.prototype.parseXML = function(text, cb) {
  if (!text && this.arg) text = this.arg;
  if (typeof text === "function" && this.arg) {
    cb = text;
    text = this.arg;
  }
  var parser = new DOMParser();
  var doc = parser.parseFromString(text, "text/xml");
  return cb ? cb(doc) : doc;
};

try {
  module.exports = _$; //eslint-disable-line
} catch (e) {} //eslint-disable-line
