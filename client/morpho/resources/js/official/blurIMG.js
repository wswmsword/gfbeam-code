!function() {
   function blurIMG(options) {
      this.windowHasBind = false;
      this.options = blurIMG.extend({}, this.options);
      blurIMG.extend(this.options, options);
      this.book = this.options.bElem.length; // 标记是否完全加载完，当为 0 时完
      this.loaded = [];
      this.animationEvent = blurIMG.getAnimationEvent();
      this.init();
   }
   window.blurIMG = blurIMG;
   blurIMG.prototype.options = {
      knob: true,
      window: '',
      bElem: []
   };
   blurIMG.prototype.init = function() {
      if (!this.options.knob) {
         return ;
      }
      var useCaptureOrOptions = blurIMG.supportsEventListenerPassiveOption() ? {
         capture: false, passive: true} : false,
         self = this;
      this.laceBox = util.throttle(this.scrollHandler, 300, this);
      if ("onwheel" in this.options.window) {
         this.bindedEvent = 'wheel';
      } else if ("onmousewheel" in this.options.window) {
         this.bindedEvent = 'mousewheel';
      } else {
         this.bindedEvent = 'DOMMouseScroll';
      }
      
      // window.addEventListener('wheel', this.laceBox, useCaptureOrOptions);
      this.options.window.addEventListener(this.bindedEvent, this.laceBox, useCaptureOrOptions);
      this.options.window.addEventListener('scroll', this.laceBox, useCaptureOrOptions);
      var l = this.options.bElem.length; // 首次进入页面，直接加载当前区域的图片
      for (var i = 0; i < l; ++ i) {
         if (this.loaded[i] == null) {
            var item = this.options.bElem[i],
            rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0) {
               var img = new Image();
               img.src = item.dataset.src;
               img.className = 'origin';
               img.alt = item.alt || '';
               img.onload = blurIMG.closureLoad(item, i, self, img);
               break;
            }
         }
      }
   }
   blurIMG.prototype.scrollHandler = function() {
      var l = this.options.bElem.length, self = this;
      if (this.book === 0) {
         this.options.window.removeEventListener(this.bindedEvent, this.laceBox);
         this.options.window.removeEventListener('scroll', this.laceBox);
      }
      for (var i = 0; i < l; ++ i) {
         if (this.loaded[i] == null) {
            var item = this.options.bElem[i],
            rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0) {
               var img = new Image();
               img.src = item.dataset.src;
               img.className = 'origin';
               img.alt = item.alt || '';
               img.onload = blurIMG.closureLoad(item, i, self, img);
               break;
            }
         }
      }
   }
   blurIMG.closureLoad = function(item, i, self, img) {
      var parent = item.parentNode;
      self.loaded[i] = true;
      return function() {
         -- self.book;
         console.log(this);
         parent.appendChild(img);
         parent.removeChild(item);
      }
   }
   blurIMG.getAnimationEvent = function() {
      var z = document.createElement('fake'),
         animations = {
            "animation": "animationend",
            "OAnimation": "oAnimationEnd",
            "MozAnimation": "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
         }
      for (var v in animations) {
         if (z.style[v] !== undefined) {
            return animations[v];
         }
      }
   }
   blurIMG.supportsEventListenerPassiveOption = function() {
      var supportsPassiveOption = false;
      try {
         var options = Object.defineProperty({}, 'passive', {
            get: function () {
               supportsPassiveOption = true;
            }
         });
         window.addEventListener('test', null, options);
         window.removeEventListener('test', null, options);
      } catch (error) {}
      return supportsPassiveOption;
   }
   blurIMG.extend = function(x, y) {
      for (var key in y) {
         if (y.hasOwnProperty(key)) {
            x[key] = y[key];
         }
      }
      return x;
   }
}();