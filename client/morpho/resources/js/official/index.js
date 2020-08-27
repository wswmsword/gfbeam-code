(function() {
   var horizontalElem = document.getElementById('project-list'),
      booleanmore = false,
      scrollPosition = 0,
      pager = (function() {
         pageIndex = -1;
         return {
            incr: function() {
               ++ pageIndex;
               return pageIndex;
            }
         }
      })(),
      uriList = '/proxy/mainList',
      SPEED_DOMAIN = 'http://naturelovefuture.com',
      PROJECT_ADDR = 'PROJECT', LIGHTP_ADDR = 'lPJT', TINYP_ADDR = 'tPJT',
      STORY_ADDR = 'STORY', LIGHTS_ADDR = 'lSTY', TINYS_ADDR = 'tSTY',
      TIME_ADDR = 'TIME', LIGHTT_ADDR = 'lTME', TINYT_ADDR = 'tTME',
      SEPARATOR_JOIN = '/', FULL_ADDR = [SPEED_DOMAIN, , , ],
      variableCherries = {
         btnRepoLinkEl: document.getElementById('bnnsubmit'),
         iptBulbnodeEl: document.getElementById('bulbnodename'),
         btnNodeExpEl: document.getElementById('nsearch'),
         btnCordExpEl: document.getElementById('lsearch'),
         iptKeyNodeEl: document.getElementById('keynode'),
         iptKeyCordEl: document.getElementById('keylocation'),
         sweetFruxLinkEl: document.getElementById('sweetfruxLink'),
         sweetCoreLinkEl: document.getElementById('sweetcoreLink'),
         btnLogoutEl: document.getElementById('logout'),
         btnMoreEl: document.getElementById('more2'),
         optionlock: null,
      },
      constLychees = {
         member: util.cookie.get('MEM'),
      },
      copyLemons = {
         server: {
            membership: {
               login: {
                  verify: '当前是非成员状态，请先登录:)',
               }
            },
            loading: '加载中……载中……中……',
         }
      }
   ;
   var useCaptureOrOptions = supportsEventListenerPassiveOption() ? {
      capture: false, passive: true} : false;
   // if (!(localStorage.getItem('mname') == null)) {
   //    memberBox.innerHTML = `<a href="/member/${util.cookie.get('MEM')}">${localStorage.getItem('mname')}</a>`;
   // }
   function ajax(type, url, success) {
      var xhr = new XMLHttpRequest();
      xhr.open(type, url, true);
      xhr.send();
      xhr.onreadystatechange = function() {
         if (xhr.readyState == 4 && xhr.status == 200) {
            var res = xhr.responseText;
            success(res);
         }
      }
   }
   function supportsEventListenerPassiveOption() {
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
   
   function generateEarthPlate(list) { // 大地石板
      var list_html = '', i, length = list.length, point_html = '', media_html = '',
      prefix = {
         'A': PROJECT_ADDR,
         'D': PROJECT_ADDR,
         'S': STORY_ADDR,
         'T': TIME_ADDR
      }, middle_addr = '';

      for (i = 0; i < length; ++ i){
         point_html = '';
         if (list[i].type === 'S') {
            point_html = '<span class="point-model story-type"></span>';
         }
         if (list[i].path.endsWith('m4a') || list[i].path.endsWith('wav')) {
            media_html = '<span class="sound-holder"><span class="record"><span class="sound-arm"></span></span><span class="hole top"></span><span class="hole bottom"></span></span>'
         } else {
            middle_addr = list[i].path.slice(32, 40);
            FULL_ADDR[1] = prefix[list[i].type];
            FULL_ADDR[2] = list[i].path.slice(32, 40);
            FULL_ADDR[3] = list[i].path + '!hw150';
            media_html = '<img src="' + FULL_ADDR.join(SEPARATOR_JOIN) + '" class="project">';
            // media_html = '<img src="http://naturelovefuture.com/tSTY/20200617/1ab27ff1535c4c579b7964c7621a5b582020061715525812739.jpg" class="project">';
            // media_html = `<img src="/resources/img/work_img/pic${Math.round(Math.random()*10)}.jpg" class="project">`;
         }
         list_html += '<div class="project-holder">'
                        + '<span class="effect-assis"'
                        + 'id="' + list[i].id + '">'
                        + media_html
                        + '</span>'
                        + '<div class="scrollY">'
                           + '<span class="button detail-button cancel">恢复</span>'
                           + '<a class="button detail-button" href="' + '/project/bloom/' + list[i].id + '" target="_blank">查看</a>'
                           + '<div class="node-panel"></div>'
                        + '</div>'
                        + '<div class="point-panel">'+ point_html +'</div>'
                     + '</div>'
         ;
      }
      util.appendh(horizontalElem, list_html);
   }

   var functionGrapes = { // 🍇
      eventhandler: {
         more2ClickHandler: function(e) {
            if (! booleanmore) { return }
            util.serve('get', util.url(uriList, {pageIndex: pager.incr()}), functionGrapes.servercallback.postMore2AutoScroll);
         },
         nodeExpClickHandler: function() {
            var node = util.encUri(variableCherries.iptKeyNodeEl.value);
            location.href = "/explore/" + node;
         },
         cordExpClickHandler: function() {
            var coord = util.encUri(variableCherries.iptKeyCordEl.value);
            // 判断：坐标的合法性 129.945602,33.013130
            if (! util.coordckr(coord.split(util.encUri(','))[0], coord.split(util.encUri(','))[1])) { alert('位置信息填写有误，请检查:('); return ; }
            location.href = "/explore/map/" + coord;
         },
         repobtnClickHandler: function() {
            // 成员状态判断
            var optionlock = constLychees.member;
            if (optionlock == null || optionlock === '') { alert(copyLemons.server.membership.login.verify); return ; }
            var uri = util.encUri(variableCherries.iptBulbnodeEl.value.trim());
            location.href = "/story/nodewrite/" + uri;
         },
         cardClickedHandler: function(e) {
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
               util.serve('get', util.url('/proxy/detailPreview', {id: target.id}), function(res) {
                  res = JSON.parse(res);
                  for (i = 0; i < res.res.length; ++ i) {
                     html += '<span class="preview-node">' + res.res[i].t + '</span>'
                  }
                  sibling.innerHTML = html;
                  util.ac(parent, 'visited');
               })
               
            }
         },
         verifymemberLink: function(e) {
            if (constLychees.member == null || constLychees.member === '') { alert(copyLemons.server.membership.login.verify); e.preventDefault(); }
         },
         ready2LogoutClickHandler: function(e) {
            util.serve('post', '/proxy/hulaa/quit', functionGrapes.servercallback.postLogout);
         },
      },
      servercallback: {
         postMore2AutoScroll: function(res) {
            var horlength, clilength, direct, prePosition, currPosition, winwidth = window.innerWidth, parms = [['innerWidth', 'scrollWidth', 'left', 'scrollLeft'], ['innerHeight', 'scrollHeight', 'top', 'scrollTop']], index;
            res = JSON.parse(res);
            booleanmore = res.more;
            if (! booleanmore) {
               util.ac(document.getElementById('more-wrapper'), 'disabled')
               util.ac(variableCherries.btnMoreEl, 'disabled')
            }
            generateEarthPlate(res.list);
            index = winwidth > 1024 ? 0 : 1;
            clilength = window[parms[index][0]];
            horlength = horizontalElem[parms[index][1]];
            direct = parms[index][2];
            prePosition = horizontalElem[parms[index][3]];
            console.log(`clilength=${clilength}, horlength=${horlength}, scrollPosition=${scrollPosition}`);
            if (horlength < clilength) { return }
            if (horlength - scrollPosition > clilength) {
               currPosition = scrollPosition;
               scrollPosition = horlength;
            } else {
               // currPosition = horlength - scrollPosition;
               // scrollPosition = horlength;
               currPosition = horlength - clilength;
               scrollPosition = horlength;
            }
            if (index === 0) {
               horizontalElem.scrollTo({
                  left: currPosition,
                  behavior: "smooth"
               });
            } else {
               horizontalElem.scrollTo({
                  top: currPosition,
                  behavior: "smooth"
               });
            }
         },
         postLogout: function(res) {
            res = JSON.parse(res);
            if (res.success) {
               localStorage.removeItem('mname');
               util.cookie.unset('VAL', '/');
               util.cookie.unset('MEM', '/');
               alert('成功');
               location.reload();
            } else {
               alert('失败');
            }
         },
      },
   }
   function initEvents() {
      variableCherries.btnMoreEl.addEventListener('click', functionGrapes.eventhandler.more2ClickHandler);
      variableCherries.btnRepoLinkEl.addEventListener('click', functionGrapes.eventhandler.repobtnClickHandler);
      variableCherries.btnNodeExpEl.addEventListener('click', functionGrapes.eventhandler.nodeExpClickHandler);
      variableCherries.btnCordExpEl.addEventListener('click', functionGrapes.eventhandler.cordExpClickHandler);
      horizontalElem.addEventListener('click', functionGrapes.eventhandler.cardClickedHandler);
      variableCherries.sweetFruxLinkEl.addEventListener('click', functionGrapes.eventhandler.verifymemberLink);
      variableCherries.sweetCoreLinkEl.addEventListener('click', functionGrapes.eventhandler.verifymemberLink);
      variableCherries.btnLogoutEl.addEventListener('click', functionGrapes.eventhandler.ready2LogoutClickHandler);
   }
   function initData() {
      //  初始化展示首页项目
      ajax('get', util.url(uriList, {pageIndex: pager.incr()}), function(res){
         res = JSON.parse(res);
         booleanmore = res.more;
         if (! booleanmore) {
            util.ac(document.getElementById('more-wrapper'), 'disabled')
            util.ac(variableCherries.btnMoreEl, 'disabled')
         }
         generateEarthPlate(res.list);
         scrollPosition = window.innerWidth > 1024 ? horizontalElem.scrollWidth : horizontalElem.scrollHeight;
      })
      localStorage.setItem('PREV_LOCATION', location.href);
      if (! (constLychees.member == null || constLychees.member === ''))
      {
         util.ac(document.getElementById('accountli'), 'loginok');
         document.getElementById('personalinfo').href += constLychees.member;
      }
   }
   function init() {
      initData();
      initEvents();
   }
   init();
   
   var cache = (function() {
      var prevServerBook = 0;
      return {
         setPSB: function(i) {
            prevServerBook = i;
         },
         getPSB: function() {
            return prevServerBook;
         }
      }
   })();
   var isNaN = function(value) {
      var n = Number(value);
      return n !== n;
   }
})();