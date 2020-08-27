(function () {
   function scrollX(options) {
      this.setByScript = false;
      this.options = scrollX.extend({}, this.options);
      scrollX.extend(this.options, options);
      this.Elem = this.options.xElem;
      this.init();
   }
   window.scrollX = scrollX;
   scrollX.prototype.options = {
      knob: true,
      xElem: 'body',
      pixelPerStep: 10,
      offsetX: 0,
      offsetY: 0,
   };
   scrollX.prototype.mouseWheelHandler = function (e) {
      var delta, change, newOffset, eleOffset, scrollWidth,
         winWidth, maxOffset, elem = this.Elem;

      delta = 0;

      eleOffset = elem.offsetWidth;
      scrollWidth = elem.scrollWidth;
      winWidth = elem.clientWidth;
      maxOffset = Math.max(eleOffset, scrollWidth) - winWidth;

      if (Math.abs(e.wheelDeltaX) >= Math.abs(e.wheelDeltaY) ||
         Math.abs(e.deltaX) >= Math.abs(e.deltaY)) {
         return ;
      }
      if ('deltaY' in e) {
         // console.log(e.deltaY);
         delta = e.deltaY*-10;
      } else if (e.detail) { // 老火狐、欧朋
         delta = e.detail*-240;
      } else if (e.wheelDelta) {
         delta = e.wheelDelta*5;
      }

      change = delta*(this.options.pixelPerStep)/120;
      newOffset = this.options.offsetX-change;
      this.setByScript = true;
      if (newOffset >= 0 && newOffset <= maxOffset) {
         this.options.offsetX = newOffset;
      } else if (this.options.offsetX !== 0 && this.options.offsetX !== maxOffset) {
         this.options.offsetX = newOffset > maxOffset ? maxOffset : 0;
      } else {
         return false;
      }
      elem.scrollTo(this.options.offsetX, this.options.offsetY);
      // elem.scrollTo({top: this.options.offsetY, left: this.options.offsetX, behavior: "instant"});
      if (e.preventDefault && e.stopPropagation) {
         e.preventDefault();
         e.stopPropagation();
      } else {
         return false;
      }

   };
   scrollX.prototype.scrollHandler = function () {
      if (!this.setByScript) {
         this.options.offsetX = scrollX.getOffset(this.Elem, 'x');
         this.options.offsetY = scrollX.getOffset(this.Elem, 'y');
      }
      this.setByScript = false;
   };
   scrollX.prototype.init = function () {
      if (!this.options.knob) {
         return ;
      }
      var useCaptureOrOptions = scrollX.supportsEventListenerPassiveOption() ? {
         capture: false, passive: false} : false,
         self = this;
      if ("onwheel" in this.Elem) {
         this.Elem.addEventListener("wheel", function(e){
            if (e.target.className === 'scrollY')
               return ;
            self.mouseWheelHandler(e);
         }, useCaptureOrOptions);
      } else if ("onmousewheel" in this.Elem) {
         this.Elem.addEventListener("mousewheel", function(e){
            if (e.target.className === 'scrollY')
               return ;
            self.mouseWheelHandler(e);
         }, useCaptureOrOptions);
      } else {
         this.Elem.addEventListener("DOMMouseScroll", function(e){
            if (e.target.className === 'scrollY')
               return ;
            self.mouseWheelHandler(e);
         }, useCaptureOrOptions);
      }

      this.Elem.addEventListener("scroll", function(e){
         self.scrollHandler(e);
      }, useCaptureOrOptions);
   };
   scrollX.getOffset = function (Elem, axis) {
      axis = axis.toUpperCase();
      var pageOffset = 'page' + axis + 'Offset',
         scrollValue = 'scroll' + axis,
         scrollDir = 'scroll' + (axis === 'X' ? 'Left' : 'Top');
      return Elem[pageOffset] || Elem[scrollValue] || Elem[scrollDir];
   };
   scrollX.supportsEventListenerPassiveOption = function () {
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
   scrollX.extend = function (x, y) {
      for (var key in y) {
         if (y.hasOwnProperty(key)) {
            x[key] = y[key];
         }
      }
      return x;
   }
})();