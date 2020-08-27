(function(){
   var COORD_PATTERN = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/;
   function classReg(name) {
      return new RegExp('(^|\\s+)' + name + '(\\s+|$)');
   }
   var hasClass, addClass, removeClass;
   if ('classList' in document.documentElement) {
      hasClass = function(ele, name) {
         return ele.classList.contains(name);
      };
      addClass = function(ele, name) {
         ele.classList.add(name);
      };
      removeClass = function(ele, name) {
         ele.classList.remove(name);
      };
   } else {
      hasClass = function(ele, name) {
         return classReg(name).test(ele.className);
      };
      addClass = function(ele, name) {
         if (!hasClass(ele, name)) {
            ele.className += ' ' + name;
         }
      };
      removeClass = function(ele, name) {
         ele.className = ele.className.replace(classReg(name), ' ');
      }
   }
   var toggleClass = function(ele, name) {
      var fn = hasClass(ele, name) ? removeClass : addClass;
      fn(ele, name);
   },
   throttle = function(action, delay, context) {
      var timer = null;
      return function() {
         if (timer) {
            return ;
         }
         timer = setTimeout(function() {
            action.apply(context, arguments);
            timer = null;
         }, delay)
      }
   },
   ajax = function(type, url, success, data) {
      if (data == null) // null 和 undefined 的并集
         data = null;
      var xhr = new XMLHttpRequest(), res;
      if (type === 'get' && data != null) {
         url = addURLParam(url, data);
      }
      
      xhr.open(type, url, true);
      xhr.send(data);
      xhr.onreadystatechange = function() {
         if (xhr.readyState === 4 && xhr.status === 200) {
            res = xhr.responseText;
            success(res);
         }
      }
   },
   restajax = function(type, url, success, data) {
      if (data == null) { data = null } // null 和 undefined 的并集
      var xhr = new XMLHttpRequest(), res;
      if (data instanceof Array) {
         url = RESTful(url, data);
      }
      // if (type === 'get' && data != null) {
      //    url = RESTful(url, data);
      // }
      xhr.open(type, url, true);
      xhr.send(data);
      xhr.onreadystatechange = function() {
         if (xhr.readyState === 4 && xhr.status === 200) {
            res = xhr.responseText;
            success(res);
         }
      }
   },
   createCache = function() {
      var data = {};
      return {
         set: function(key, value) {
            data[key] = value;
            return 'ok';
         },
         get: function(key) {
            return data[key];
         }
      }
   },
   addURLParam = function(url, obj) {
      var key;
      for (key in obj) {
         url += (url.indexOf('?') == -1 ? '?' : '&');
         url += encodeURIComponent(key) + '=' + encodeURIComponent(decodeURI(obj[key]));
      }
      return url;
   },
   RESTful = function(uri, arr) {
      arr.forEach(function(item) {
         if (item == null) { return }
         if (item[0] !== '') { uri += '/' + encodeURIComponent(item[0]) }
         uri += '/' + encodeURIComponent(decodeURI(item[1]));
      })
      return uri;
   },
   CookieUtil = {
      get: function(name) {
         var cookieName = encodeURIComponent(name) + '=',
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;

         if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd === -1) {
               cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
         }
         return cookieValue;
      },
      set: function(name, value, expires, path, domain, secure) {
         var cookieText = encodeURIComponent(name) + '=' +
            encodeURIComponent(value);
         if (expires instanceof Date) {
            cookieText += '; expires=' + expires.toGMTString();
         }
         if (path) {
            cookieText += '; path=' + path;
         }
         if (domain) {
            cookieText += '; domain=' + domain;
         }
         if (secure) {
            cookieText += '; secure';
         }
         document.cookie = cookieText;
      }, unset: function(name, path, domain, secure) {
         this.set(name, "", new Date(0), path, domain, secure);
      }
   },
   appendHtml = function(elem, htmlString) {
      var div = document.createElement('div'),
         frag = document.createDocumentFragment(),
         res = []
      ;
      div.innerHTML = htmlString;
      while (div.firstChild) {
         res.push(div.firstChild);
         frag.appendChild(div.firstChild);
      }
      elem.appendChild(frag);
      return res;
   },
   coordChecker = function(lon, lat) {
      var coord = lon + ',' + lat, isok;
      isok = COORD_PATTERN.test(coord);
      if (isok) {
         lon = + lon;
         lat = + lat;
         if (lon > 180 || lon < -180 || lat > 90 || lat < -90) { return false }
         return true; 
      }
      return false;
   },
   fixedEncodeURIComponent = function(str)
   {
      return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
         return '%' + c.charCodeAt(0).toString(16);
      });
   },
   isNaN = function(value) {
      var n = Number(value);
      return n !== n;
   };
   window.util = {
      hc: hasClass,
      ac: addClass,
      rc: removeClass,
      tc: toggleClass,
      throttle: throttle,
      serve: ajax, // GET 请求时携带数据，第四个参数的类型为对象
      restserve: restajax,
      cache: createCache,
      url: addURLParam,
      rest: RESTful,
      cookie: CookieUtil,
      appendh: appendHtml,
      coordckr: coordChecker,
      encUri: fixedEncodeURIComponent,
      isNaN: isNaN,
   }
}());