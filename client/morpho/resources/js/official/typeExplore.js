(function() {
   function loadBody(type) {
      this.init(type);
      this.serveInit();
      this.bindEvents();
   }
   loadBody.prototype.init = function(type) {
      this.type = type;
      this.initUri = '/explore/listTypeProjects';
      this.previewUri = '/proxy/detailPreview';
      this.page = 0;
      this.contentHolder = document.getElementById('project-list');
      this.redItems = [].slice.call(document.querySelectorAll('.red .state-item')),
      this.greenItems = [].slice.call(document.querySelectorAll('.green .state-item')),
      this.blueItems = [].slice.call(document.querySelectorAll('.blue .state-item')),
      this.stateItems = document.getElementsByClassName('project-state')[0],
      this.pr = 3, this.pg = 3, this.pb = 3, // 状态的初始值
      this.colorfulBoxes = document.getElementsByClassName('cbox-inner'),
      this.previewHolder = document.getElementById('preview-holder'),
      this.fileInput = document.getElementById('file'),
      this.formLongitude = document.getElementById('longitude'),
      this.formLatitude = document.getElementById('latitude'),
      this.previewModel = undefined,
      this.holderPublish = document.getElementById('write-holder'),
      this.idLinkStoryAndProject = undefined,
      this.offsetPixel = [-144, -108, -72, -36, 0, 36, 72, 108, 144] // 预存储移动至 5 个位置需要多少像素;
   };
   loadBody.prototype.serveInit = function() {
      util.serve('get', util.url(this.initUri, {
         'i': this.page,
         't': this.type
      }), loadBody.miniProjectsCallback.bind(this));
   };
   loadBody.prototype.bindEvents = function() {
      this.contentHolder.addEventListener('click', this.proxyLayerEventHandler.bind(this));
      this.stateItems.addEventListener('click', this.stateFormEventHandler.bind(this));
      this.holderPublish.addEventListener('click', this.storyExecutionHandler.bind(this));
      this.fileInput.addEventListener('change', this.randerFileHandler.bind(this));
      this.previewHolder.addEventListener('click', this.storyPreviewHandler.bind(this));
   };
   loadBody.prototype.storyPreviewHandler = function(e) {
      if (util.hc(e.target, 'btn-remove')) {
         this.fileInput.value = '';
         util.rc(this.previewHolder, 'open');
         this.previewModel.style.display = 'none';
         // this.previewHolder.style.height = '163px';
         return;
      }
      this.fileInput.click();
   }
   loadBody.prototype.randerFileHandler = function() {
      var file, self = this;
      if (this.previewModel != null) {
         this.previewModel = document.getElementsByClassName('preview-model')[0];
      }
      open = 0;
      if (!this.fileInput.value) {
         return;
      }
      file = this.fileInput.files[0];

      if (file.type !== 'image/jpeg' && file.type !== 'image/png'
         && file.type !== 'audio/wav' && file.type !== 'audio/x-m4a') {
         alert('Please check the type of file.');
         return;
      }
      this.previewHolder.style.height = 'auto';
      util.ac(this.previewHolder, 'open');
      var reader = new FileReader(),
         data
      ;
      reader.type = file.type;
      reader.onload = function (e) {
         data = e.target.result;
         if (self.previewModel !== undefined) {
            self.previewModel.style.display = 'block';
            self.previewModel.src = data;
         } else {
            if (self.fileInput.type === 'audio/wav' || self.fileInput.type === 'audio/x-m4a') {
               var audio = document.createElement('audio');
               audio.controls = true;
               audio.src = data;
               self.previewHolder.append(audio);
               self.previewModel = audio;
               return ;
            }
            
            var image = document.createElement('img');
            image.className = 'preview-model';
            image.src = data;
            self.previewHolder.append(image);
            self.previewModel = image;
         }
      };
      reader.readAsDataURL(file);
   }
   loadBody.prototype.storyExecutionHandler = function(e) {
      var target = e.target,
         projectId, data, file, mem, mId
      ;
      if (util.hc(target, 'button-cancel')) {
         util.rc(this.holderPublish, 'visible');
         return ;
      }
      if (util.hc(target, 'button-upload')) {
         mem = util.cookie.get('MEM');
         if (mem == null) {
            alert("请先登录");
            return ;
         }
         mId = mem.substr(mem.lastIndexOf('.') + 1);
         projectId = this.idLinkStoryAndProject;
         data = new FormData();
         file = this.fileInput.files[0];
         loadBody.multiAppend(data, {
            'm': mId,
            'p': projectId,
            'f': file,
            'j': this.formLongitude.value, 'w': this.formLatitude.value,
            'l': document.getElementById('letter').value,
            'r': this.pr, 'g': this.pg, 'b': this.pb
         });
         util.serve('post', '/story/publish', function(res) {
            res = JSON.parse(res);
            if (res.success) {

            } else {
               console.log('oh no');
            }
         }, data);
      }
   }
   loadBody.multiAppend = function(data, obj) {
      for (var key in obj) {
         if (obj.hasOwnProperty(key)) {
            data.append(key, obj[key]);
         }
      }
   }
   loadBody.prototype.stateFormEventHandler = function(e) {
      var target = e.target,
         parent = target.parentNode
      ;
      dataI = target.dataset['i'];
      if (util.hc(parent, 'red')) {
         this.pr = loadBody.selectState(target, parent, this.redItems, this.pr, this.offsetPixel);
      } else if (util.hc(parent, 'green')) {
         this.pg = loadBody.selectState(target, parent, this.greenItems, this.pg, this.offsetPixel);
      } else if (util.hc(parent, 'blue')) {
         this.pb = loadBody.selectState(target, parent, this.blueItems, this.pb, this.offsetPixel);
      }
   };
   loadBody.prototype.proxyLayerEventHandler = function(e) {
      var target = e.target;
      if (util.hc(target, 'cancel')) { // 关闭信息概览面板
         util.rc(target.parentNode.parentNode, 'selected');
         return ;
      }

      if (util.hc(target, 'effect-assis')) { // 查看缩略图信息概览
         var parent = target.parentNode,
            html = '',
            sibling = target.nextSibling.lastChild, i, panelPoint, spanPoint;

         
         parent.style.visibility = 'hidden';
         setTimeout(function() {
            parent.style.visibility = 'visible';
         }, 30); // 刷新 DOM 避免点击事件逗留
         util.ac(parent, 'selected');
         if (util.hc(parent, 'visited')) {
            return ;
         }
         panelPoint = parent.lastChild; // 添加已读标记
         spanPoint = document.createElement('span');
         spanPoint.className = 'point-model visited-type';
         panelPoint.appendChild(spanPoint);
         util.serve('get', util.url(this.previewUri, {id: target.id}), loadBody.previewCallback(parent, sibling))
         return ;
      }

      if (util.hc(target, 'submit')) { // 弹出发布故事功能面板
         loadBody.generateColorfulBoxes(this.colorfulBoxes);
         util.ac(this.holderPublish, 'visible');
         this.idLinkStoryAndProject = parseInt(target.dataset['i']);
         return ;
      }
   }
   loadBody.miniProjectsCallback = function(res) {
      res = JSON.parse(res);
      loadBody.generateMiniProject(res.list, this.contentHolder);
   }
   loadBody.previewCallback = function(parent, sibling) {
      return function(res) {
         var html = '';
         res = JSON.parse(res);
         for (i = 0; i < res.res.length; ++ i) {
            html += '<span class="preview-node">' + res.res[i].t + '</span>'
         }
         sibling.innerHTML = html;
         util.ac(parent, 'visited');
      }
   }
   loadBody.generateMiniProject = function(list, contentHolder) {
      var frag = document.createDocumentFragment();
      list.forEach(function(item, index) {
         var div = document.createElement('div'),
            divScrollY = document.createElement('div'),
            divNode = document.createElement('div'),
            divPoint = document.createElement('div'),
            spanEffectAssis = document.createElement('span'),
            spanWrite = document.createElement('span'),
            spanCancel = document.createElement('span'),
            spanStoryPoint = document.createElement('span'),
            a = document.createElement('a'),
            img = document.createElement('img');
            spanStoryPoint.className = 'point-model story-type'
         ;
         div.className = 'project-holder';
         spanEffectAssis.id = item.id;
         spanEffectAssis.className = 'effect-assis';
         img.src = '../../tP/' + item.path;
         img.className = 'project';
         divScrollY.className = 'scrollY';
         spanWrite.className = 'button detail-button submit';
         spanWrite.dataset['i'] = item.id;
         spanWrite.textContent = '记录故事';
         spanCancel.className = 'button detail-button cancel';
         spanCancel.textContent = '返回';
         a.className = 'button detail-button';
         a.href = '/project/bloom/' + item.id;
         a.textContent = '探索';
         divNode.className = 'node-panel';
         divPoint.className = 'point-panel';
         spanEffectAssis.appendChild(img);
         divScrollY.appendChild(spanWrite);
         divScrollY.appendChild(spanCancel);
         divScrollY.appendChild(a);
         divScrollY.appendChild(divNode);
         if (item.type === 'S') {
            divPoint.appendChild(spanStoryPoint);
         }
         div.appendChild(spanEffectAssis);
         div.appendChild(divScrollY);
         div.appendChild(divPoint);
         frag.appendChild(div);
      });
      contentHolder.append(frag);
   }
   loadBody.generateColorfulBoxes = function(colorfulBoxes) {
      var myProper = ['width', 'height'], random1, random2, i, l = colorfulBoxes.length;
      for (i = 0; i < l; ++ i) {
         random1 = Math.floor(Math.random()*2);
         random2 = Math.floor(Math.random()*150);
         colorfulBoxes[i].style[myProper[random1]] = random2 + 'px';
         colorfulBoxes[i].style[myProper[random1^1]] = '100%';
      }
   }
   loadBody.selectState = function(target, parent, items, pI, offsetPixel) {
      var length, i, offset
      ;
      if (util.hc(target, 'current-state')) {
         if (util.hc(parent, 'selected')) {
            util.tc(parent, 'selected');
            return pI;
         }
         length = items.length;
         for (i = 0; i < length; ++i) {
            offset = offsetPixel[(i - pI + 5)];
            items[i].style.left = offset + 'px';
         }
         util.ac(parent, 'selected');
      } else {
         util.rc(items[pI - 1], 'current-state');
         util.ac(target, 'current-state');
         pI = parseInt(target.dataset['i']);
         util.tc(parent, 'selected');
         target.style.left = '0px';
      }
      return pI;
   }
   window.loadBody = loadBody;

   function loadHead() {
      this.init();
      this.serveInit();
      this.bindEvents();
   }
   loadHead.prototype.init = function() {
      this.serverPanel = document.getElementById('server-panel'),
      this.serverItems = document.getElementsByClassName('server-item'),
      this.bookplaceServer = document.getElementsByClassName('server-bookplace'),
      this.holderSub = document.getElementById('sub-holder'),
      this.btnSub = document.getElementById('sub-btn'),
      this.sendLogin = document.getElementById('login-send'),
      this.mailElem = document.getElementById('mail'),
      this.pswdElem = document.getElementById('pswd'),
      this.memberBox = document.getElementById('member'),
      this.sendQuit = document.getElementById('quit-send'),
      this.sendSignup = document.getElementById('signup-send'),
      this.suMailElem = document.getElementById('mail-signup'),
      this.suMnameElem = document.getElementById('mname-signup'),
      this.suPswdElem = document.getElementById('pswd-signup'),
      this.mname = undefined,
      this.prevServerBook = 0;
   };

   loadHead.prototype.serveInit = function() {
      this.mname = localStorage.getItem('mname');
      this.memberBox.innerHTML = this.mname;
   }

   loadHead.prototype.bindEvents = function() {
      var self = this;
      this.serverPanel.addEventListener('click', this.proxyLayerHeadEventHandler.bind(this));
      this.btnSub.addEventListener('mouseover', function() {
         util.ac(self.btnSub, 'book');
         util.ac(self.holderSub, 'visible');
      });
      this.holderSub.addEventListener('mouseleave', function() {
         util.rc(self.btnSub, 'book');
         util.rc(self.holderSub, 'visible');
      }, false);
      this.sendLogin.addEventListener('click', this.loaginHandler.bind(this));
      this.sendSignup.addEventListener('click', this.signupHandler.bind(this));
   }
   loadHead.prototype.signupHandler = function() {
      var mail, mname, pswd, data = new FormData();
      mail = suMailElem.value;
      mname = suMnameElem.value;
      pswd = suPswdElem.value;
      data.append('m', mail);
      data.append('n', mname);
      data.append('p', pswd);
      data.append('_csrf', util.cookie.get('XSRF-TOKEN'));
      util.serve('post', '/hulaa/signup', this.signupCallback.bind(this), data);
   }
   loadHead.prototype.loaginHandler = function() {
      var mail, pswd, data = new FormData();
      mail = this.mailElem.value;
      pswd = this.pswdElem.value;
      data.append('m', mail);
      data.append('p', pswd);
      util.serve('post', '/hulaa/login', this.loginCallback.bind(this), data);
   }
   loadHead.prototype.loginCallback = function(res) {
      res = JSON.parse(res);
      if (res.success) {
         localStorage.setItem('mname', res.name);
         this.memberBox.innerHTML = res.name;
      } else {

      }
   }
   loadHead.prototype.signupCallback = function(res) {
      res = JSON.parse(res);
      if (res.success) {
         localStorage.setItem('mname', res.name);
         memberBox.innerHTML = res.name;
      } else {

      }
   }
   loadHead.prototype.proxyLayerHeadEventHandler = function(e) {
      var target = e.target,
         prevSB = this.prevServerBook,
         nxtI;
      if (util.hc(target, 'server-bookplace')) {
         if (util.hc(target, 'book')) {
            util.rc(target, 'book');
            util.rc(target.parentNode, 'visible');
            return ;
         }

         nxtI = target.dataset['i'];
         util.rc(this.bookplaceServer[prevSB], 'book');
         util.ac(target, 'book');

         util.rc(this.serverItems[prevSB], 'blink');
         util.ac(this.serverItems[nxtI], 'blink');

         util.ac(target.parentNode, 'visible');
         this.prevServerBook = nxtI;
      }
      if (util.hc(target, 'btn-signup')) {
         nxtI = parseInt(target.dataset['nxti']);
         util.rc(this.bookplaceServer[prevSB], 'book');
         util.ac(this.bookplaceServer[nxtI], 'book');

         util.rc(this.serverItems[prevSB], 'blink');
         util.ac(this.serverItems[nxtI], 'blink');
         this.prevServerBook = nxtI;
      }
      if (util.hc(target, 'btn-login')) {
         nxtI = parseInt(target.dataset['nxti']);
         util.rc(this.bookplaceServer[prevSB], 'book');
         util.ac(this.bookplaceServer[nxtI], 'book');

         util.rc(this.serverItems[prevSB], 'blink');
         util.ac(this.serverItems[nxtI], 'blink');
         this.prevServerBook = nxtI;
      }
   }
   var head = new loadHead();
}());