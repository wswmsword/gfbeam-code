(function() {
   function station() {
      this.init();
      this.bindEvents();
   }
   station.prototype.init = function() {
      this.sideBar = document.getElementById('side-bar');
      this.pathContent = document.getElementById('path-content');
      this.pathMap = document.getElementById('path-map');

      this.slideItemHolderList = [document.getElementById('country'), document.getElementById('province'), document.getElementById('city'), document.getElementById('area'), document.getElementById('station')];
      this.slideItemList = ['country-item', 'province-item', 'city-item', 'area-item', 'station-item'];
      this.layerUri = ['/explore/station/province', '/explore/station/city', '/explore/station/area', '/explore/station/get'];

      this.map = document.getElementById('path-map');

      this.currentLayer = -1;

      this.cache = {};
      this.cache.LayerDetail = [];
   }

   station.prototype.slide2FrontOneStepHandler = function(e) {
      var target = e.target, i, j,
         text = target.textContent, self = this,
         code = target.dataset['c'],
         cacheString = ''
      ;
      for (i = 0; i < this.slideItemList.length - 1; ++ i) {
         if (util.hc(target, this.slideItemList[i])) {

            if (this.currentLayer === -1) {
               cacheString = '#' + '0' + '+' + target.dataset['i'];
            } else {
               for (j = 0; j < this.currentLayer + 1; ++ j) {
                  cacheString += '#' +j + '+' + this.cache.LayerDetail[j];
               }
               cacheString += '#' + j + '+' + target.dataset['i'];
            }
            // console.log(cacheString);
            // console.log(this.cache)
            if (this.cache[cacheString] == null) {
               util.serve('get', util.url(this.layerUri[i], {
                     c: code
                  }), function(res) {
                     var j;
                     res = JSON.parse(res), futureCurrentLayer = self.currentLayer + 1;
                     cacheString = '';

                     self.cache.LayerDetail.push(target.dataset['i']);
                     for (j = 0; j < futureCurrentLayer + 1; ++ j) {
                        cacheString += '#' +j + '+' + self.cache.LayerDetail[j];
                     }
                     self.cache[cacheString] = res.list;
                     console.log(self.cache);
                     isNull = self.generateSlideItems(res.list, i);
                     if (isNull) {
                        alert("无站台");
                        self.cache.LayerDetail.pop();
                        return ;
                     }
                     station.classOptInSliding(i, i+1, self.slideItemHolderList);

                     self.generateMapItem(text);
                  }
               );
            } else {
               var j, isNull;
               list = this.cache[cacheString];
               
               isNull = this.generateSlideItems(list, i);
               if (isNull) {
                  alert("无站台");
                  return ;
               }
               station.classOptInSliding(i, i+1, this.slideItemHolderList);
               this.generateMapItem(text);
               

               this.cache.LayerDetail.push(target.dataset['i']);
            }
            return ;
         }
      }
   }

   station.prototype.bindEvents = function() {
      this.pathContent.addEventListener('click', this.slide2FrontOneStepHandler.bind(this));
      this.pathMap.addEventListener('click', this.jumpSlideHandler.bind(this));
   }

   station.prototype.jumpSlideHandler = function(e) {
      var target = e.target, nextI, currentI, nextSiblingE = target, ready2RemoveE = [target], self = this;
      if (util.hc(target, 'map-item')) {
         nextI = target.dataset['i'];
         currentI = this.currentLayer + 1;
         this.currentLayer = nextI - 1;

         station.classOptInSliding(currentI, nextI, this.slideItemHolderList);

         while(nextSiblingE = nextSiblingE.nextSibling) {
            ready2RemoveE.push(nextSiblingE);
         }
         ready2RemoveE.forEach(function(item) {
            self.cache.LayerDetail.pop();
            item.remove();
         })
      }
   }

   station.prototype.generateMapItem = function(text) {
      var MapItem, MapItemText;
      MapItem = document.createElement('li');
      MapItem.className = 'map-item';
      MapItem.dataset['i'] = ++ this.currentLayer;
      MapItemText = document.createTextNode(text);
      MapItem.appendChild(MapItemText);
      this.map.appendChild(MapItem);
   }

   station.prototype.generateSlideItems = function(list, i) {
      var j, resLen = list.length;
      if (resLen === 0) {
         return true;
      }
      htmlItems = '<li class="' + this.slideItemList[i+1] + ' border-top" data-i="0" data-c="' + list[0].c + '">' + list[0].n + '</li>';
      for (j = 1; j < resLen; ++ j) {
         htmlItems += '<li class="' + this.slideItemList[i+1] + '"' + 'data-i="' + j + '" data-c="' + list[j].c + '">' + list[j].n + '</li>';
      }
      this.slideItemHolderList[i+1].innerHTML = htmlItems;
   }

   station.classOptInSliding = function(currentLayer, nextLayer, eList) {
      var i, l = eList.length;
      for (i = 0; i < l; ++ i) {
         util.rc(eList[i], 'left-hidden');
         util.rc(eList[i], 'right-hidden');
         util.rc(eList[i], 'left-visible');
         util.rc(eList[i], 'right-visible');
      }
      if (nextLayer > currentLayer) {
         util.ac(eList[currentLayer], 'left-hidden');
         util.ac(eList[nextLayer], 'left-visible');
      } else {
         util.ac(eList[currentLayer], 'right-hidden');
         util.ac(eList[nextLayer], 'right-visible');
      }
   }

   var hello = new station();
}());