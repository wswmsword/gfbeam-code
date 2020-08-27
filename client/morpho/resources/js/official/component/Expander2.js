(function() {
   function Expander(rootEl, options) {
      this.options = Expander.extend({}, this.options);
      Expander.extend(this.options, options);
      this.rootEl = rootEl;
      this.init();
   }
   Expander.prototype.options =
   {
      expanderCname: '.expander_wrapper',
      trggerCname: '.exp_trigger',
      tgbtnCname: '.expbtn_trigger',
      panelCname: '.exp_panel',
      skip: [],
   };
   Expander.prototype.init = function()
   {
      this.triggerEls = [].slice.call(this.rootEl.querySelectorAll(this.options.expanderCname + ' ' + this.options.trggerCname));
      this.tgbtnEls = [].slice.call(this.rootEl.querySelectorAll(this.options.expanderCname + ' ' + this.options.tgbtnCname));
      console.log(this.tgbtnEls)
      this.panelEls = [].slice.call(this.rootEl.querySelectorAll(this.options.expanderCname + ' ' + this.options.panelCname));
      console.log(this.panelEls)
      this.previdx = 0;
      this.bindedTriggerClickHandler = [];
      this.bindedTriggerBtnClickHandler = [];
      // this.show();
      this.initEvent();
   };
   Expander.prototype.show = function()
   {

   };
   Expander.prototype.initEvent = function()
   {
      var me = this;

      this.triggerEls.forEach(function(item, index)
      {
         if (me.options.skip.indexOf(index) !== -1) { return }
         me.bindedTriggerClickHandler[index] = me.eventHandler.triggerClickHandler.bind(me, index);
         me.bindedTriggerBtnClickHandler[index] = me.eventHandler.triggerBtnClickHandler.bind(me, index);
         item.addEventListener('click', me.bindedTriggerClickHandler[index]);
         me.tgbtnEls[index].addEventListener('click', me.bindedTriggerBtnClickHandler[index]);
      })

   };
   Expander.prototype.eventHandler =
   {
      triggerClickHandler:
      function(currentIdx, e)
      {
         this.tgbtnEls[currentIdx].click();
         e.stopPropagation();
      },
      triggerBtnClickHandler:
      function(currentIdx, e)
      {
         if (currentIdx === this.previdx)
         {
            util.tc(this.panelEls[currentIdx], 'visible');
         } else
         {
            util.rc(this.panelEls[this.previdx], 'visible');
            util.ac(this.panelEls[currentIdx], 'visible');
         }
         this.previdx = currentIdx;
         e.stopPropagation(); // 阻止冒泡
      },
         
   };
   Expander.extend = function(x, y)
   {
      for (var key in y)
      {
         if (y.hasOwnProperty(key))
         {
            x[key] = y[key];
         }
      }
      return x;
   };
   new Expander(document.getElementById('expander'), {});
})();