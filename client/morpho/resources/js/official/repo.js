(function () {
   var contentHolder = document.getElementById('project-list'),
      pathname = location.pathname,
      sweetIshulaa = false, sweetIsfrux = false, sweetIssweet = false, sweetfrux = undefined,
      SPEED_DOMAIN = 'http://naturelovefuture.com',
      PROJECT_ADDR = 'PROJECT', LIGHTP_ADDR = 'lPJT', TINYP_ADDR = 'tPJT',
      STORY_ADDR = 'STORY', LIGHTS_ADDR = 'lSTY', TINYS_ADDR = 'tSTY',
      TIME_ADDR = 'TIME', LIGHTT_ADDR = 'lTME', TINYT_ADDR = 'tTME',
      SEPARATOR_JOIN = '/', FULL_ADDR = [SPEED_DOMAIN, , , ],
      pager = (function() {
         pageIndex = -1;
         return {
            incr: function() {
               ++ pageIndex;
               return pageIndex;
            }
         }
      })(),
      variableCherries = {
         horizontalElem: document.getElementById('project-list'),
         coreLinkEl: document.getElementById('p_core'),
         repoLinkEl: document.getElementById('p_repo'),
         bookSweetEle: document.getElementById('actnodeli'),
         btnSweetNode: document.getElementById('sweetnode'),
         btnUnSweetNode: document.getElementById('unsweetnode'),
         sweetnode: false,
         nodeIsFrux: false,
         booleanmore: false,
         scrollPosition: 0,
         bookInfoloaded: false,
         btnMoreEl: document.getElementById('more2'),
         btnLogoutEl: document.getElementById('logout'),
      },
      constLychees = {
         member: util.cookie.get('MEM'),
         node: location.pathname.slice(pathname.lastIndexOf('/') + 1),
         nodeID: null,
      },
      copyLemons = {
         server: {
            explander: {
               
            },
            membership: {
               login: {
                  verify: '当前是非成员状态，请先登录:)',
               }
            },
            loading: '加载中……载中……中……',
         }
      }
   ;
   var functionGrapes = {
      serveCallback: {
         getTitleHandler: function(res) {
            res = JSON.parse(res);
            constLychees.nodeID = res.frux;
            variableCherries.sweetnode = res.issweet;
            variableCherries.nodeIsFrux = res.isfrux;
            variableCherries.bookInfoloaded = true;
            if (res.isfrux && ! res.issweet) { util.rc(variableCherries.bookSweetEle, 'disabled') }
            else { util.ac(variableCherries.bookSweetEle, 'disabled') }
         },
         listFruxes: function(res) {
            res = JSON.parse(res);
            console.log(res);
            variableCherries.booleanmore = res.more;
            if (! variableCherries.booleanmore) { util.ac(variableCherries.btnMoreEl, 'disabled'); util.ac(document.getElementById('more-wrapper'), 'disabled'); }
            generateMiniProject(res.l)
            variableCherries.scrollPosition = window.innerWidth > 1024 ? variableCherries.horizontalElem.scrollWidth : variableCherries.horizontalElem.scrollWidth.scrollHeight;
         },
         postMore2AutoScroll: function(res) {
            var horlength, clilength, direct, prePosition, currPosition, winwidth = window.innerWidth, parms = [['innerWidth', 'scrollWidth', 'left', 'scrollLeft'], ['innerHeight', 'scrollHeight', 'top', 'scrollTop']], index;
            res = JSON.parse(res);
            variableCherries.booleanmore = res.more;
            if (! variableCherries.booleanmore) {
               util.ac(document.getElementById('more-wrapper'), 'disabled')
               util.ac(variableCherries.btnMoreEl, 'disabled')
            }
            generateEarthPlate(res.list);
            index = winwidth > 1024 ? 0 : 1;
            clilength = window[parms[index][0]];
            horlength = variableCherries.horizontalElem[parms[index][1]];
            direct = parms[index][2];
            prePosition = variableCherries.horizontalElem[parms[index][3]];
            if (horlength < clilength) { return }
            if (horlength - variableCherries.scrollPosition > clilength) {
               currPosition = variableCherries.scrollPosition;
               variableCherries.scrollPosition = horlength;
            } else {
               currPosition = horlength - clilength;
               variableCherries.scrollPosition = horlength;
            }
            if (index === 0) {
               variableCherries.horizontalElem.scrollTo({
                  left: currPosition,
                  behavior: "smooth"
               });
            } else {
               variableCherries.horizontalElem.scrollTo({
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
      eventhandler: {
         linkVerifyMembershipClickHandler: function(e) {
            if (constLychees.member == null || constLychees.member === '') {
               alert(copyLemons.server.membership.login.verify);
               e.preventDefault();
               return ;
            }
         },
         more2ClickHandler: function() {
            if (! variableCherries.booleanmore) { return }
            util.serve('get', util.url(cache.get('initUrl'), {i: pager.incr(), n: constLychees.node}), functionGrapes.serveCallback.postMore2AutoScroll);
         },
         ready2LogoutClickHandler: function() {
            util.serve('post', '/proxy/hulaa/quit', functionGrapes.serveCallback.postLogout);
         },
      }
   }
   function init() {
      loadData();
      initEvents();
   }

   function loadData() {
      cache.set('initUrl', '/proxy/story/reponodelistshot');
      util.serve('get',
         util.url(cache.get('initUrl'), {
            i: pager.incr(),
            n: constLychees.node
         }),
         functionGrapes.serveCallback.listFruxes
      );
      variableCherries.coreLinkEl.href +=  constLychees.node;
      variableCherries.repoLinkEl.href += constLychees.node;

      localStorage.setItem('PREV_LOCATION', location.href);

      if (! (constLychees.member == null || constLychees.member === ''))
      {
         util.ac(document.getElementById('accountli'), 'loginok');
         document.getElementById('personalinfo').href += constLychees.member;
      }
   }

   function initEvents() {
      variableCherries.btnMoreEl.addEventListener('click', functionGrapes.eventhandler.more2ClickHandler);
      contentHolder.addEventListener('click', function(e) {
         var target = e.target;
   
         if (util.hc(target, 'effect-assis')) { // 查看缩略图信息概览
            var parent = target.parentNode,
               html = '',
               sibling = target.nextSibling.lastChild, i, panelPoint, spanPoint;
   
            alert('clicked the repo-panel')
            return ;
         }
      });
      variableCherries.coreLinkEl.addEventListener('click', functionGrapes.eventhandler.linkVerifyMembershipClickHandler);
      variableCherries.repoLinkEl.addEventListener('click', functionGrapes.eventhandler.linkVerifyMembershipClickHandler);
      document.getElementById('node').addEventListener('click', function() { location.href = '/explore/' + constLychees.node });
      variableCherries.btnLogoutEl.addEventListener('click', functionGrapes.eventhandler.ready2LogoutClickHandler);
   }

   function generateMiniProject(list) {
      var prefix = {
         'A': PROJECT_ADDR,
         'D': PROJECT_ADDR,
         'S': STORY_ADDR,
         'T': TIME_ADDR
      }, frag = document.createDocumentFragment();
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
         item.type = 'REPOSITORY';
         FULL_ADDR[1] = prefix[item.type];
         FULL_ADDR[2] = item.path.slice(32, 40);
         FULL_ADDR[3] = item.path + '!hw150';
         div.className = 'project-holder';
         spanEffectAssis.id = item.id;
         spanEffectAssis.className = 'effect-assis';
         // img.src = FULL_ADDR.join(SEPARATOR_JOIN);
         img.src = `/resources/img/work_img/pic${Math.round(Math.random()*10)}.jpg`;
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
   var cache = (function() {
      var prevServerBook = 0,
      data = {};
      return {
         setPSB: function(i) {
            prevServerBook = i;
         },
         getPSB: function() {
            return prevServerBook;
         },
         set: function(key, value) {
            data[key] = value;
            return 'ok';
         },
         get: function(key) {
            return data[key];
         }
      }
   })();
   init();
})();