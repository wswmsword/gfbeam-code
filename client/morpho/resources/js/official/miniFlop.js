(function () {
   function flop(options) {
      this.options = flop.extend({}, this.options);
      flop.extend(this.options, options);
      this.init();
      this.bindEvents();
   }
   flop.prototype.init = function () {

   };
   flop.prototype.bindEvents = function () {

   };
   flop.prototype.clickHandler = function (e) {
      var target = e.target;
      if (util.hc(target, this.options.cancelTriggerName)) { // 关闭信息概览面板
         util.rc(target.parentNode.parentNode, this.options.selectedName);
         return;
      }

      if (util.hc(target, this.options.detailPanelName)) { // 查看缩略图信息概览
         var parent = target.parentNode,
            html = '',
            sibling = target.nextSibling.lastChild,
            i, panelPoint, spanPoint;


         parent.style.visibility = 'hidden';
         setTimeout(function () {
            parent.style.visibility = 'visible';
         }, 30); // 刷新 DOM 避免点击事件逗留
         util.ac(parent, this.options.selectedName);
         if (util.hc(parent, this.options.visitedName)) {
            return;
         }
         panelPoint = parent.lastChild; // 添加已读标记
         spanPoint = document.createElement('span');
         spanPoint.className = 'point-model visited-type';
         panelPoint.appendChild(spanPoint);
         util.serve('get', util.url('/proxy/detailPreview', {
            id: target.id
         }), function (res) {
            res = JSON.parse(res);
            for (i = 0; i < res.res.length; ++i) {
               html += '<span class="preview-node">' + res.res[i].t + '</span>'
            }
            sibling.innerHTML = html;
            util.ac(parent, 'visited');
         })

      }

      if (util.hc(target, 'submit')) { // 弹出发布故事功能面板
         generateColorfulBoxes();
         util.ac(holderPublish, 'visible');
         holderPublish.pjId = parseInt(target.dataset['i']);
      }
   }
   flop.prototype.options = {
      'requestUri': '',
      'proxyLayer': document,
      'cancelTriggerName': 'cancel',
      'selectedName': 'selected',
      'visitedName': 'visited',
      'detailPanelName': 'effect-assis'
   };
   flop.extend = function (x, y) {
      for (var key in y) {
         if (y.hasOwnProperty(key)) {
            x[key] = y[key];
         }
      }
      return x;
   }
   window.flop = flop;
}());