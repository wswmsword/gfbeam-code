(function () {
   var pathname = location.pathname,
      sweetIshulaa = false, sweetIsfrux = false, sweetIssweet = false, sweetfrux = undefined,
      SPEED_DOMAIN = 'http://naturelovefuture.com',
      PROJECT_ADDR = 'PROJECT', LIGHTP_ADDR = 'lPJT', TINYP_ADDR = 'tPJT',
      STORY_ADDR = 'STORY', LIGHTS_ADDR = 'lSTY', TINYS_ADDR = 'tSTY',
      TIME_ADDR = 'TIME', LIGHTT_ADDR = 'lTME', TINYT_ADDR = 'tTME',
      SEPARATOR_JOIN = '/', FULL_ADDR = [SPEED_DOMAIN, , , ],
      variableCherries = {
         horizontalElem: document.getElementById('project-list'),
         coreLinkEl: document.getElementById('p_core'),
         repoLinkEl: document.getElementById('p_repo'),
         bookSweetEle: document.getElementById('actnodeli'),
         btnSweetNode: document.getElementById('sweetnode'),
         btnUnSweetNode: document.getElementById('unsweetnode'),
         btnLogoutEl: document.getElementById('logout'),
         btnMoreEl: document.getElementById('more2'),
         sweetFruxLinkEl: document.getElementById('sweetfruxLink'),
         sweetCoreLinkEl: document.getElementById('sweetcoreLink'),
         btnNodeExpEl: document.getElementById('nsearch'),
         btnCordExpEl: document.getElementById('lsearch'),
         iptKeyNodeEl: document.getElementById('keynode'),
         iptKeyCordEl: document.getElementById('keylocation'),
         sweetnode: false,
         nodeIsFrux: false,
         bookInfoloaded: false,
         booleanmore: false,
         scrollPosition: 0,
      },
      constLychees = {
         member: util.cookie.get('MEM'),
         node: location.pathname.slice(pathname.lastIndexOf('/') + 1),
         nodeID: null,
      },
      copyLemons = {
         server: {
            explander: {
               sweetnode: {
                  success: '关注成功:)',
                  failure: '关注失败:(',
                  redundancy: '已关注;)',
               },
               unsweetnode: {
                  success: '取关成功:)',
                  failure: '取关失败:(',
                  redundancy: '已取关;)',
               },
               sweetIsfrux: '该结点还没有核心条目，无法关注，您可以率先在该结点内发布核心条目:)',
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
         sweetnodeSeilingOfFollow: function(res) {
            res = JSON.parse(res);
            if (res.success)
            {
               alert(copyLemons.server.explander.sweetnode.success);
               variableCherries.sweetnode = true;
               util.ac(variableCherries.bookSweetEle, 'disabled');
            }
            else { alert(copyLemons.server.explander.sweetnode.failure) }
         },
         unsweetnodeSeilingOfFollow: function(res) {
            res = JSON.parse(res);
            if (res.success)
            {
               alert(copyLemons.server.explander.unsweetnode.success);
               variableCherries.sweetnode = false;
               util.rc(variableCherries.bookSweetEle, 'disabled');
            }
            else { alert(copyLemons.server.explander.unsweetnode.failure) }
         },
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
            horlength = variableCherries.horizontalElem[parms[index][1]];
            direct = parms[index][2];
            prePosition = variableCherries.horizontalElem[parms[index][3]];
            console.log(`clilength=${clilength}, horlength=${horlength}, variableCherries.scrollPosition=${variableCherries.scrollPosition}`);
            if (horlength < clilength) { return }
            if (horlength - variableCherries.scrollPosition > clilength) {
               currPosition = variableCherries.scrollPosition;
               variableCherries.scrollPosition = horlength;
            } else {
               // currPosition = horlength - variableCherries.scrollPosition;
               // variableCherries.scrollPosition = horlength;
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
         verifymemberLink: function(e) {
            if (constLychees.member == null || constLychees.member === '') { alert(copyLemons.server.membership.login.verify); e.preventDefault(); }
         },
         more2ClickHandler: function(e) {
            if (! variableCherries.booleanmore) { return }
            util.serve('get', util.url(uriList, {pageIndex: pager.incr()}), functionGrapes.serveCallback.postMore2AutoScroll);
         },
         cardClickedHandler: function(e) {
            var target = e.target;
            if (util.hc(target, 'cancel')) { // 关闭信息概览面板
               util.rc(target.parentNode.parentNode, 'selected');
               return ;
            }
      
            if (util.hc(target, 'preview')) {
               alert('"预览"开发中');
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
               return ;
            }
         },
         linkVerifyMembershipClickHandler: function(e) {
            if (constLychees.member == null || constLychees.member === '') {
               alert(copyLemons.server.membership.login.verify);
               e.preventDefault();
               return ;
            }
         },
         sweetnodeClickHandler: function() {
            // 判断：加载中；成员状态；实验结点。
            if (! variableCherries.bookInfoloaded) { alert(copyLemons.server.loading); return ; }
            if (constLychees.member == null || constLychees.member === '') { alert(copyLemons.server.membership.login.verify); return ; }
            if (constLychees.nodeID == null) { alert(copyLemons.server.explander.sweetIsfrux); return ; }

            if (! variableCherries.sweetnode)
            {
               util.restserve('post', '/proxy/hulaa/sweet', functionGrapes.serveCallback.sweetnodeSeilingOfFollow, [
                  ['frux', constLychees.nodeID]
               ])
            }
            else { alert(copyLemons.server.explander.sweetnode.redundancy) }
         },
         unSweetnodeClickHandler: function() {
            if (! variableCherries.bookInfoloaded) { alert(copyLemons.server.loading); return ; }
            if (constLychees.member == null || constLychees.member === '') { alert(copyLemons.server.membership.login.verify); return ; }
            if (constLychees.nodeID == null) { alert(copyLemons.server.explander.sweetIsfrux); return ; }

            if (variableCherries.sweetnode)
            {
               util.restserve('post', '/proxy/hulaa/unsweet', functionGrapes.serveCallback.unsweetnodeSeilingOfFollow, [
                  ['frux', constLychees.nodeID]
               ])
            }
            else { alert(copyLemons.server.explander.sweetnode.redundancy) }
         },
         ready2LogoutClickHandler: function(e) {
            util.serve('post', '/proxy/hulaa/quit', functionGrapes.serveCallback.postLogout);
         },
         nodeExpClickHandler: function() {
            var node = util.encUri(variableCherries.iptKeyNodeEl.value);
            location.href = "/explore/" + node;
         },
         cordExpClickHandler: function() {
            var coord = util.encUri(variableCherries.iptKeyCordEl.value);
            // 判断：坐标的合法性
            if (! util.coordckr(coord.split(util.encUri(','))[0], coord.split(util.encUri(','))[1])) { alert('位置信息填写有误，请检查:('); return ; }
            location.href = "/explore/map/" + coord;
         },
      }
   }
   function init() {
      loadData();
      initEvents();
   }

   function loadData() {
      cache.set('initUrl', '/proxy/explore/listProjectsByText');
      cache.set('baseuri', '/proxy/explore');
      util.serve('get',
         util.url(cache.get('initUrl'), {
            pageIndex: 0,
            title: constLychees.node
         }),
         function (res) {
            res = JSON.parse(res);
            variableCherries.booleanmore = res.more;
            if (! variableCherries.booleanmore) {
               util.ac(document.getElementById('more-wrapper'), 'disabled')
               util.ac(variableCherries.btnMoreEl, 'disabled')
            }
            generateMiniProject(res.list);
            variableCherries.scrollPosition = window.innerWidth > 1024 ? variableCherries.horizontalElem.scrollWidth : variableCherries.horizontalElem.scrollHeight;
         }
      );
      util.restserve('get', cache.get('baseuri'), functionGrapes.serveCallback.getTitleHandler, [
         [decodeURIComponent(constLychees.node), 'info']
      ]);
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
      variableCherries.horizontalElem.addEventListener('click', functionGrapes.eventhandler.cardClickedHandler);
      variableCherries.coreLinkEl.addEventListener('click', functionGrapes.eventhandler.linkVerifyMembershipClickHandler);
      variableCherries.repoLinkEl.addEventListener('click', functionGrapes.eventhandler.linkVerifyMembershipClickHandler);
      variableCherries.btnSweetNode.addEventListener('click', functionGrapes.eventhandler.sweetnodeClickHandler);
      variableCherries.btnUnSweetNode.addEventListener('click', functionGrapes.eventhandler.unSweetnodeClickHandler);
      document.getElementById('repo').addEventListener('click', function() { location.href = '/explore/repo/' + constLychees.node })
      variableCherries.sweetFruxLinkEl.addEventListener('click', functionGrapes.eventhandler.verifymemberLink);
      variableCherries.sweetCoreLinkEl.addEventListener('click', functionGrapes.eventhandler.verifymemberLink);
      variableCherries.btnLogoutEl.addEventListener('click', functionGrapes.eventhandler.ready2LogoutClickHandler);
      variableCherries.btnNodeExpEl.addEventListener('click', functionGrapes.eventhandler.nodeExpClickHandler);
      variableCherries.btnCordExpEl.addEventListener('click', functionGrapes.eventhandler.cordExpClickHandler);
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
            aWrite = document.createElement('a'),
            spanCancel = document.createElement('span'),
            spanPreview = document.createElement('span'),
            spanStoryPoint = document.createElement('span'),
            a = document.createElement('a'),
            img = document.createElement('img');
            spanStoryPoint.className = 'point-model story-type'
         ;
         FULL_ADDR[1] = prefix[item.type];
         FULL_ADDR[2] = item.path.slice(32, 40);
         FULL_ADDR[3] = item.path + '!hw150';
         div.className = 'project-holder';
         spanEffectAssis.id = item.id;
         spanEffectAssis.className = 'effect-assis';
         img.src = FULL_ADDR.join(SEPARATOR_JOIN);
         // img.src = `/resources/img/work_img/pic${Math.round(Math.random()*10)}.jpg`;
         img.className = 'project';
         divScrollY.className = 'scrollY';
         aWrite.className = 'button detail-button submit';
         aWrite.textContent = '记录故事';
         aWrite.className = 'button detail-button';
         aWrite.href = '/story/corewrite/' + item.id;
         spanCancel.className = 'button detail-button cancel';
         spanPreview.className ='button detail-button preview';
         spanCancel.textContent = '返回';
         spanPreview.textContent = '预览';

         a.className = 'button detail-button';
         a.href = '/project/bloom/' + item.id;
         a.textContent = '查看';
         a.target = '_blank';
         divNode.className = 'node-panel';
         divPoint.className = 'point-panel';
         spanEffectAssis.appendChild(img);
         divScrollY.appendChild(aWrite);
         divScrollY.appendChild(spanCancel);
         divScrollY.appendChild(spanPreview);
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
      variableCherries.horizontalElem.append(frag);
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