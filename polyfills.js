!(function() {
  "use strict";
  var _slice = Array.prototype.slice;
  try {
    _slice.call(document.documentElement);
  } catch (e) {
    Array.prototype.slice = function(begin, end) {
      if (
        ((end = void 0 !== end ? end : this.length),
        "[object Array]" === Object.prototype.toString.call(this))
      )
        return _slice.call(this, begin, end);
      var i,
        size,
        cloned = [],
        len = this.length,
        start = begin || 0;
      start = start >= 0 ? start : Math.max(0, len + start);
      var upTo = "number" == typeof end ? Math.min(end, len) : len;
      if ((end < 0 && (upTo = len + end), (size = upTo - start) > 0))
        if (((cloned = new Array(size)), this.charAt))
          for (i = 0; i < size; i++) cloned[i] = this.charAt(start + i);
        else for (i = 0; i < size; i++) cloned[i] = this[start + i];
      return cloned;
    };
  }
})(),
  "function" != typeof Object.assign &&
    Object.defineProperty(Object, "assign", {
      value: function(target, varArgs) {
        "use strict";
        if (null == target)
          throw new TypeError("Cannot convert undefined or null to object");
        for (
          var to = Object(target), index = 1;
          index < arguments.length;
          index++
        ) {
          var nextSource = arguments[index];
          if (null != nextSource)
            for (var nextKey in nextSource)
              Object.prototype.hasOwnProperty.call(nextSource, nextKey) &&
                (to[nextKey] = nextSource[nextKey]);
        }
        return to;
      },
      writable: !0,
      configurable: !0
    }),
  Array.from ||
    (Array.from = (function() {
      var toStr = Object.prototype.toString,
        isCallable = function(fn) {
          return (
            "function" == typeof fn || "[object Function]" === toStr.call(fn)
          );
        },
        toInteger = function(value) {
          var number = Number(value);
          return isNaN(number)
            ? 0
            : 0 !== number && isFinite(number)
            ? (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
            : number;
        },
        maxSafeInteger = Math.pow(2, 53) - 1,
        toLength = function(value) {
          var len = toInteger(value);
          return Math.min(Math.max(len, 0), maxSafeInteger);
        };
      return function(arrayLike) {
        var C = this,
          items = Object(arrayLike);
        if (null == arrayLike)
          throw new TypeError(
            "Array.from requires an array-like object - not null or undefined"
          );
        var T,
          mapFn = arguments.length > 1 ? arguments[1] : void 0;
        if (void 0 !== mapFn) {
          if (!isCallable(mapFn))
            throw new TypeError(
              "Array.from: when provided, the second argument must be a function"
            );
          arguments.length > 2 && (T = arguments[2]);
        }
        for (
          var kValue,
            len = toLength(items.length),
            A = isCallable(C) ? Object(new C(len)) : new Array(len),
            k = 0;
          k < len;

        )
          (kValue = items[k]),
            (A[k] = mapFn
              ? void 0 === T
                ? mapFn(kValue, k)
                : mapFn.call(T, kValue, k)
              : kValue),
            (k += 1);
        return (A.length = len), A;
      };
    })()),
  Array.prototype.includes ||
    Object.defineProperty(Array.prototype, "includes", {
      value: function(searchElement, fromIndex) {
        if (null == this) throw new TypeError('"this" is null or not defined');
        var o = Object(this),
          len = o.length >>> 0;
        if (0 === len) return !1;
        for (
          var n = 0 | fromIndex,
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
          k < len;

        ) {
          if (
            (function(x, y) {
              return (
                x === y ||
                ("number" == typeof x &&
                  "number" == typeof y &&
                  isNaN(x) &&
                  isNaN(y))
              );
            })(o[k], searchElement)
          )
            return !0;
          k++;
        }
        return !1;
      }
    }),
  Element.prototype.matches ||
    (Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector),
  Element.prototype.closest ||
    (Element.prototype.closest = function(s) {
      var el = this;
      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (null !== el && 1 === el.nodeType);
      return null;
    }),
  Array.prototype.filter ||
    (Array.prototype.filter = function(func, thisArg) {
      "use strict";
      if (("Function" != typeof func && "function" != typeof func) || !this)
        throw new TypeError();
      var len = this.length >>> 0,
        res = new Array(len),
        t = this,
        c = 0,
        i = -1;
      if (void 0 === thisArg)
        for (; ++i !== len; )
          i in this && func(t[i], i, t) && (res[c++] = t[i]);
      else
        for (; ++i !== len; )
          i in this && func.call(thisArg, t[i], i, t) && (res[c++] = t[i]);
      return (res.length = c), res;
    });