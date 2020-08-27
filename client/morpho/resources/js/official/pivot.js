(function() {
   var variableCherries = { // 🍓
      cache: util.cache(),
      titleHolder: document.getElementById('title-holder'),
      vinesHolder: document.getElementById('vines-holder'),

      serverPanel: document.getElementById('server-panel'),
      serverItems: document.getElementsByClassName('server-item'),
      bookplaceServer: document.getElementsByClassName('server-bookplace'),
      holderSub: document.getElementById('sub-holder'),
      btnSub: document.getElementById('sub-btn'),
      sendLogin: document.getElementById('login-send'),
      mailElem: document.getElementById('mail'),
      pswdElem: document.getElementById('pswd'),
      amemebr: document.getElementById('amember'),
      memberBox: document.getElementById('member'),
      sendQuit: document.getElementById('quit-send'),
      sendSignup: document.getElementById('signup-send'),
      suMailElem: document.getElementById('mail-signup'),
      suMnameElem: document.getElementById('mname-signup'),
      suPswdElem: document.getElementById('pswd-signup'),
      btnSweetCore: document.getElementById('sweetcore'),
      btnUnSweetCore: document.getElementById('unsweetcore'),
      btnRepoStory: document.getElementById('csisubmit'),
      btnLocatCore: document.getElementById('locatecore'),
      bookSweetEle: document.getElementById('actcoreli'),
      bookLocatEle: document.getElementById('acttimeli'),
      btnNodeExpEl: document.getElementById('nsearch'),
      btnCordExpEl: document.getElementById('lsearch'),
      iptKeyNodeEl: document.getElementById('keynode'),
      iptKeyCordEl: document.getElementById('keylocation'),
      btnLogoutEl: document.getElementById('logout'),
      pTimeEl: document.getElementById('p_time'),
      goldencore: false,
      sweetcore: false,
      mapDrips: [], coreCord: {},
      member: + util.cookie.get('MEM'), optionlock: null, pivotprojectcreator: null, pushvinelock: null, newvinelock: null,
      core: location.href.substr(location.href.lastIndexOf('/')+1),
      vineauthor: undefined,
      SPEED_DOMAIN: 'http://naturelovefuture.com',
      PROJECT_ADDR: 'PROJECT',
      // LIGHTP_ADDR: 'lPJT',
      LIGHTP_ADDR: 'PROJECT',
      TINYP_ADDR: 'tPJT',
      STORY_ADDR: 'STORY', LIGHTS_ADDR: 'lSTY',
      TINYS_ADDR: 'STORY',
      // TINYS_ADDR: 'tSTY',
      TIME_ADDR: 'TIME', LIGHTT_ADDR: 'lTME',
      // TINYT_ADDR: 'tTME',
      TINYT_ADDR: 'TIME',
      SEPARATOR_JOIN: '/', FULL_ADDR: [ , , , ],

      iptBulbnodeEl: document.getElementById('bulbnodename'),
      iptRepoidEl: document.getElementById('clipboardstoryid'),

      indexMapQuestion: {},

   },
   constLychees = {
      member: util.cookie.get('MEM'),
      core: location.href.substr(location.href.lastIndexOf('/')+1),
   },
   copyLemons = { // 🍋 \\\\\\ L ====== E ====== M ====== O ====== N //////
      event: {

      },
      server: {
         explander: {
            sweetcore: {
               success: '关注成功:)',
               failure: '关注失败:(',
               redundancy: '已关注;)',
            },
            unsweetcore: {
               success: '取关成功:)',
               failure: '取关失败:(',
               redundancy: '已取关;)',
            },
            goldencore: {
               success: '提醒成功:)',
               failure: '提醒失败:(',
               redundancy: '已提醒;)',
            },
            writerepo: {
               prefix: '类型错误:(',
               success: '已转移至故事:)',
               failure: '转移失败:(',
            }
         },
         storymeun: {
            booth: {
               success: '发送成功:)',
               failure: '发送失败:)',
               checklength: '请别发送空内容:(',
            }
         },
         membership: {
            login: {
               verify: '当前是非成员状态，请先登录:)',
            }
         },
         loading: '加载中……载中……中……',
         sending: '发送中……送中……中……',
         syntax: {
            type: {
               Number: ''
            }
         }
      }
   };
   variableCherries.FULL_ADDR[0] = variableCherries.SPEED_DOMAIN;
   variableCherries.cache.set('pivotUrl', '/proxy/project/core'),
   variableCherries.cache.set('vinesUrl', '/proxy/project/core'),
   variableCherries.cache.set('storyitemsUrl', '/proxy/project/core'),
   variableCherries.cache.set('timeitemsUri', '/proxy/project/core'),
   variableCherries.cache.set('uriImprove', '/proxy/project/improve'),
   variableCherries.cache.set('uriNew', '/proxy/project/new'),
   variableCherries.cache.set('uriAccept', '/proxy/project/accept'),
   variableCherries.cache.set('uriReject', '/proxy/project/reject'),
   variableCherries.cache.set('uriFreeze', '/proxy/project/freeze'),
   variableCherries.cache.set('urlChat', '/proxy/story/chat'),
   variableCherries.cache.set('uriListItems', '/proxy/story/listItems'),
   variableCherries.cache.set('urlSave', '/proxy/story/save'),
   variableCherries.cache.set('uriRevokeSaved', '/proxy/story/revokesave');
   variableCherries.cache.set('uriLike', '/proxy/story/like'),
   variableCherries.cache.set('uriRemovelike', '/proxy/story/revokelike'),
   variableCherries.cache.set('uriDetail', '/proxy/story/detail'),
   variableCherries.cache.set('imgUrl', 'http://naturelovefuture.com/lPJT/20200616/'),
   variableCherries.cache.set('storyUrl', '/S/'),
   variableCherries.cache.set('timeUri', '/T/'),
   variableCherries.cache.set('lightImgUrl', '/tP/'),
   variableCherries.cache.set('lightStoryUrl', '/tS/'),
   variableCherries.cache.set('lightTimeUrl', '/tT/'),
   variableCherries.cache.set('uriSweetCore', '/proxy/hulaa'),
   variableCherries.cache.set('uriUnSweetCore', '/proxy/hulaa'),
   variableCherries.cache.set('PSB', 0);

   var functionGrapes = { // 🍇
      melonbutton: { // 🍉
         autoHeight: function(panel, eventTarget, eventClass, clear) {
            var h, target, childs, speed = 26; //book=0
            h = panel.offsetHeight;
            // 移除展开项
            childs = [].slice.call(panel.children);
            childs.forEach(function(item) {
               // console.log(item);
               if (util.hc(item, eventClass)) {
                  util.rc(item, eventClass);
                  // ++ book;
               }
            })
            // if (! book) {
            //    speed = 12;
            // }
            if (! clear) {
               util.ac(eventTarget, eventClass);
            } else {
               speed = 26;
            }
            target = panel.offsetHeight;
            util.ac(panel, 'blink');
            function closureHelperPlus() {
               var dif = target - h;
               if (speed > dif) {
                  speed = dif;
               }
               if (h < target) {
                  h += speed;
                  panel.style['height'] = h + 'px';
                  window.requestAnimationFrame(closureHelperPlus);
               } else {
                  panel.style['height'] = 'auto';
                  util.rc(panel, 'blink');
               }
            }
            function closureHelperMinus() {
               var dif = h - target;
               if (speed > dif) {
                  speed = dif + 0.5;
               }
               if (h > target) {
                  h -= speed - 0.5;
                  panel.style['height'] = h + 'px';
                  // panel.
                  window.requestAnimationFrame(closureHelperMinus);
               } else {
                  panel.style['height'] = 'auto';
                  util.rc(panel, 'blink');
               }
            }
            return function() {
               if (h < target) {
                  closureHelperPlus();
               } else {
                  closureHelperMinus();
               }
               
            }
         }
      },
      pineapplebutton: { // 🍍
      },
      eventhandler: {
         vineEventHandler: function(event) {
            // event = event || window.event;
            var target = event.target;
            // ========= 三点菜单被点击 =========
            if (util.hc(target, 'nav-node-actions')) {
               util.tc(target, 'visible');
            }
            // \\\\ 展开与折叠菜单 ////\/\/\/
            if (util.hc(target, 'expand')) {
               if (variableCherries.optionlock == null) {
                  alert('加载中，请稍后');
                  return ;
               } else if (variableCherries.optionlock) {
                  alert(copyLemons.server.membership.login.verify);
                  return ;
               }
               if ((util.hc(target, 'accept') || util.hc(target, 'reject') || util.hc(target, 'freeze') || util.hc(target, 'heat')) && (variableCherries.vineauthor == null || variableCherries.vineauthor !== variableCherries.member)) {
                  alert('快去发布，给自己的条目 采用、否认、加冰、融化 ；）');
                  return ;
               }
               if (util.hc(target, 'new') && variableCherries.newvinelock) { alert('已新建，请等待作者的反馈操作；）'); return ; }
               if (util.hc(target, 'improve') && variableCherries.pushvinelock) { alert('已改善，请等待作者的反馈操作；）'); return ; }
               if (util.hc(target, 'pinned') || util.hc(target, 'disable')) { return }
               var panel = target.parentNode, autoHeightFn;
               autoHeightFn = functionGrapes.melonbutton.autoHeight(panel, target, "pinned", false);
               autoHeightFn();
               
            } else if (util.hc(target, 'collapse')) {
               var panel = target.parentNode.parentNode.parentNode, autoHeightFn;
               autoHeightFn = functionGrapes.melonbutton.autoHeight(panel, null, "pinned", true);
               autoHeightFn();
            }
            if (util.hc(target, 'radio')) { // 选择采用描述
               var children, lastSelected, vine, itemId;
               if (util.hc(target, 'checked')) {
                  util.rc(target, 'checked');
                  return ;
               }
               children = [].slice.call(target.parentNode.children);
               vine = parseInt(target.dataset['vine']);
               itemId = parseInt(target.dataset['id']);
               lastSelected = variableCherries.cache.getRadio(vine);
               if (!(lastSelected == null)) {
                  util.rc(children[lastSelected], 'checked');
               }
               variableCherries.cache.setRadio(vine, itemId);
               util.ac(target, 'checked');
               return ;
            }
            // ========== 改善描述 ==========
            if (util.hc(target, 'btn-improve')) {
               var vines = variableCherries.cache.get('vines'), dataId = target.dataset['id'], vine = vines[dataId].id,
               mem = util.cookie.get('MEM'), mId,
               title = target.parentNode.previousElementSibling.firstElementChild.value,
               data = new FormData();
               if (title.trim() === '') { alert('非空 ；）'); return ;}
               if (variableCherries.pushvinelock) { alert('请等待作者的操作；）'); return ; }
               mId = mem.substr(mem.lastIndexOf('.') + 1); // 从 cookie 获取用户 id
               data.append('c', mId);
               data.append('v', vine);
               data.append('t', title);
               data.append('_csrf', util.cookie.get('XSRF-TOKEN'));
               util.serve('post', variableCherries.cache.get('uriImprove'), function(res) {
                  res = JSON.parse(res);
                  if (res.success) {
                     // alert('已改善 ；）');
                     alert(res.msg);
                     location.reload();
                  } else {
                     console.log('oh no');
                  }
               }, data);
               return ;
            }
            // ========== 采用描述 ==========
            if (util.hc(target, 'btn-accept')) {
               var vines = variableCherries.cache.get('vines'), dataId = parseInt(target.dataset['id']), vine = vines[dataId],
               mem = util.cookie.get('MEM'), mId, c,
               data = new FormData(),
               itemId = variableCherries.cache.getRadio(dataId);
               if (mem == null) {
                  alert(copyLemons.server.membership.login.verify);
                  return ;
               }
               mId = mem.substr(mem.lastIndexOf('.') + 1);
               c = vine.sprigList[0].nodeList[itemId].id;
               data.append('c', c);
               data.append('m', mId);
               data.append('_csrf', util.cookie.get('XSRF-TOKEN'));
               util.serve('post', variableCherries.cache.get('uriAccept'), function(res) {
                  res = JSON.parse(res);
                  if (res.success) {
                     // alert('已采用；）');
                     alert(res.msg);
                     location.reload();
                  } else {
                     console.log('oh no');
                  }
               }, data);
            }
            // ========== 冰冻描述藤 ========== \\
            if (util.hc(target, 'btn-freeze')) {
               var vines = variableCherries.cache.get('vines'), dataId = parseInt(target.dataset['id']), vine = vines[dataId].id,
               mem = util.cookie.get('MEM'), mId,
               data = new FormData();
               if (mem == null) {
                  alert(copyLemons.server.membership.login.verify);
                  return ;
               }
               mId = mem.substr(mem.lastIndexOf('.') + 1);
               data.append('m', mId);
               data.append('v', vine);
               util.serve('post', variableCherries.cache.get('uriFreeze'), function(res) {
                  res = JSON.parse(res);
                  if (res.success) {
                     // alert('已冰冻 ；）');
                     alert(res.msg);
                     location.reload();
                  } else {
                     console.log('oh no');
                  }
               }, data);
            }
            // ========== 否认一根描述 ========== \\ 
            if (util.hc(target, 'btn-reject')) {
               var vines = variableCherries.cache.get('vines'), dataId = parseInt(target.dataset['id']), vine = vines[dataId].id,
               mem = util.cookie.get('MEM'), mId,
               data = new FormData();
               if (mem == null) {
                  alert(copyLemons.server.membership.login.verify);
                  return ;
               }
               mId = mem.substr(mem.lastIndexOf('.') + 1);
               data.append('m', mId);
               data.append('v', vine);
               data.append('_csrf', util.cookie.get('XSRF-TOKEN'));
               util.serve('post', variableCherries.cache.get('uriReject'), function(res) {
                  res = JSON.parse(res);
                  if (res.success) {
                     // alert('已否认 ；）');
                     alert(res.msg);
                     location.reload();
                  } else {
                     console.log('oh no');
                  }
               }, data);
            }
            // ========== 新建描述 ===========
            if (util.hc(target, 'btn-new')) {
               var pId = variableCherries.cache.get('pId'),mem = util.cookie.get('MEM'), mId,
               data = new FormData(), value;
               mId = mem.substr(mem.lastIndexOf('.') + 1);
               value = target.parentNode.previousElementSibling.firstElementChild.value;
               if (value.trim() === '') { alert('非空 ；）'); return ;}
               data.append('p', pId);
               data.append('m', mId);
               data.append('t', value);
               data.append('_csrf', util.cookie.get('XSRF-TOKEN'));
               util.serve('post', variableCherries.cache.get('uriNew'), function(res) {
                  res = JSON.parse(res);
                  if (res.success) {
                     // alert('已新建 ；）');
                     alert(res.msg);
                     location.reload();
                  } else {
                     console.log('oh no');
                  }
               }, data);
            }
         },
         writeRepoClickHandler: function(event) {
            if (variableCherries.optionlock == null) { alert(copyLemons.server.loading); return ; }
            else if (variableCherries.optionlock) { alert(copyLemons.server.membership.login.verify); return ; }
            var repoid = + variableCherries.iptRepoidEl.value, data;
            if (repoid !== repoid) { alert(copyLemons.server.explander.writerepo.prefix); return ; }
            data = new FormData();
            data.append('r', repoid);
            data.append('c', variableCherries.core);
            util.restserve('post', '/proxy/story/reposhift',functionGrapes.serveCallback.postRepoShift, data);
            // iptRepoidEl
         },
         sweetcoreClickHandler: function() {
            if (variableCherries.optionlock == null) { alert(copyLemons.server.loading); return ; }
            else if (variableCherries.optionlock) { alert(copyLemons.server.membership.login.verify); return ; }
            if (! variableCherries.sweetcore)
            {
               util.restserve('post', variableCherries.cache.get('uriSweetCore'), functionGrapes.serveCallback.sweetcoreSeilingOfFollow.bind(this), [
                  ['', 'sweet'],
                  ['core', variableCherries.cache.get('pId')]
               ]);
            }
            else { alert(copyLemons.server.explander.sweetcore.redundancy) }
         },
         unSweetcoreClickHandler: function() {
            if (variableCherries.sweetcore)
            {
               util.restserve('post', variableCherries.cache.get('uriUnSweetCore'), functionGrapes.serveCallback.unsweetcoreSeilingOfFollow.bind(this), [
                  ['', 'unsweet'],
                  ['core', variableCherries.cache.get('pId')]
               ]);
            }
            else { alert(copyLemons.server.explander.sweetcore.redundancy) }
         },
         locatcoreClickHandler: function() {
            if (variableCherries.optionlock == null) { alert(copyLemons.server.loading); return ; }
            else if (variableCherries.optionlock) { alert(copyLemons.server.membership.login.verify); return ; }
            if (variableCherries.goldencore) { alert(copyLemons.server.explander.goldencore.redundancy); return; }
            util.restserve('post', '/proxy/hulaa', functionGrapes.serveCallback.remindLocationOfGold, [
               ['', 'locate'],
               ['core', variableCherries.cache.get('pId')]
            ]);
         },
         repobtnClickHandler: function() {
            if (variableCherries.optionlock == null) { alert(copyLemons.server.loading); return ; }
            else if (variableCherries.optionlock) { alert(copyLemons.server.membership.login.verify); return ; }
            var uri = util.encUri(variableCherries.iptBulbnodeEl.value.trim());
            location.href = "/story/nodewrite/" + uri;
         },
         linkVerifyMembership: function(e) {
            if (variableCherries.optionlock == null) {
               alert(copyLemons.server.loading);
               e.preventDefault();
               return ;
            }
            else if (variableCherries.optionlock) {
               alert(copyLemons.server.membership.login.verify);
               e.preventDefault();
               return ;
            }
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
         ready2LogoutClickHandler: function() {
            util.serve('post', '/proxy/hulaa/quit', functionGrapes.serveCallback.postLogout);
         },
      },
      serveCallback: {
         postRepoShift: function(res) {
            res = JSON.parse(res);
            console.log(res);
            if (res.success) 
            {
               alert(copyLemons.server.explander.writerepo.success);
               location.reload();
            }
            else { alert(copyLemons.server.explander.writerepo.failure); }
         },
         sweetcoreSeilingOfFollow: function(res) {
            res = JSON.parse(res);
            if (res.success)
            {
               alert(copyLemons.server.explander.sweetcore.success);
               variableCherries.sweetcore = true;
               util.ac(variableCherries.bookSweetEle, 'disabled');
            }
            else { alert(copyLemons.server.explander.sweetcore.failure) }
         },
         unsweetcoreSeilingOfFollow: function(res) {
            res = JSON.parse(res);
            if (res.success)
            {
               alert(copyLemons.server.explander.unsweetcore.success);
               variableCherries.sweetcore = false;
               util.rc(variableCherries.bookSweetEle, 'disabled');
            }
            else { alert(copyLemons.server.explander.unsweetcore.failure) }
         },
         remindLocationOfGold: function(res) {
            res = JSON.parse(res);
            if (res.success)
            {
               alert(copyLemons.server.explander.goldencore.success);
               variableCherries.goldencore = true;
               util.ac(variableCherries.btnLocatCore, 'disabled');
               document.getElementById('treasure-count').innerHTML = res.count;
            }
            else { alert(copyLemons.server.explander.goldencore.failure) }
         },
         initCordsInMapbox: function(context, currentMbboxIdx) {
            return function(res) {
               res = JSON.parse(res);
               console.log(res);
               if (res.success)
               {
                  res.coords.forEach(
                     function(coord)
                     {
                        var marker = new mapboxgl
                           .Marker({ color: context.options.dripcolor[currentMbboxIdx] })
                           .setLngLat([coord.longitude, coord.latitude])
                           .addTo(context.mbgl[context.options.maps[currentMbboxIdx]])
                        ;
                        marker._element.style.cursor = 'pointer';
                        marker._element.addEventListener('click', function() {
                           // location.href = '../bloom/' + item.id;
                           alert("clicked " + context.options.maps[currentMbboxIdx] + " T^T");
                        })
                     }
                  );
               }
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
      getQuestionId: function(text) { // 返回：楼层 ID
         var sharp = '#', sharpend = ' ', idx = text.indexOf(sharp), sharpindices = [], sharpindicesend = [], len = text.length, res = [];
         while (idx !== -1) {
            sharpindices.push(idx + 1);
            idx = text.indexOf(sharp, idx + 1);
         }
         sharpindicesend = sharpindices.map(function(leftidx) {
            var rightidx = text.indexOf(sharpend, leftidx + 1);
            return rightidx === -1 ? len : rightidx;
         })
         if (sharpindices.length !== sharpindicesend.length) { return null }
         sharpindices.forEach(function(item, index) {
            var tempstr = + text.slice(item, sharpindicesend[index]);
            if (util.isNaN(tempstr)) return ;
            res.push(tempstr);
         })
         console.log(res)
         return res;
      },
      generateQuestionID: function(l, storyid) {
         var len = l.length;
         variableCherries.indexMapQuestion[storyid] = {};
         l.forEach(function(item, index) {
            variableCherries.indexMapQuestion[storyid][len-index] = { chatid: item.chatId, creator: item.chatNameid };
         })
         console.log(variableCherries.indexMapQuestion);
      },
      prettydate: {
         formatDate: function(timestamp)  {
            var time = new Date(timestamp);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y+'.'+functionGrapes.prettydate.addlei(m)+'.'+functionGrapes.prettydate.addlei(d)+' '+functionGrapes.prettydate.addlei(h)+':'+functionGrapes.prettydate.addlei(mm)+':'+functionGrapes.prettydate.addlei(s);
         },
         addlei: function(m) {return m<10?'0'+m:m }
      },
      vinemodule: {
         createNodePanel: function(vines) {
            // 通过返回的结点藤获取每条藤的最新结点
            var nodePanel = document.getElementById('node-panel'),
               i, j, k, l = vines.length, node = [], keyNode, html = '', quoteSource, sprigs, sprigLen;
            for (i = 0; i < l; ++ i) {
               if (vines[i].state === 'B') {
                  continue;
               }
               sprigs = vines[i].sprigList;
               sprigLen = sprigs.length;
               for (j = 0; j < sprigLen; ++ j) {
                  if (sprigs[j].state === 'A') {
                     continue;
                  }
                  keyNode = sprigs[j].keyNode;
                  if (keyNode === 0) {
                     quoteSource = sprigs[j].nodeList[0].quoteSource;
                     node.push({title: sprigs[j].nodeList[0].title, alpha: quoteSource});
                  } else {
                     var nL = sprigs[j].nodeList.length;
                     for (k = 0; k < nL; ++ k) {
                        if (sprigs[j].nodeList[k].id === keyNode) {
                           node.push({title: sprigs[j].nodeList[k].title, alpha: 0});
                           break;
                        }
                     }
                  }
                  break;
               }
            }
            l = node.length;
            for (i = 0; i < l; ++ i) {
               if (node[i].alpha === 0) {
                  html += '<span class="pill">' + node[i].title + '</span>';
               } else {
                  html += '<span class="pill alpha">' + node[i].title + '</span>';
               }
            }
            if (variableCherries.cache.get('coord') != null) {
               html += '<span class="pill coordPill">' + variableCherries.cache.get('coord') + '</span>';
            }
            nodePanel.innerHTML = html;
            // console.log(node);
         },
         getAuthor: function(vines) { // 返回项目作者
            var vineGroup, firstNodeInVine, minId = vines[0].sprigList[vines[0].sprigList.length - 1].nodeList[0].id,
            minAuthor = vines[0].sprigList[vines[0].sprigList.length - 1].nodeList[0].author;
            vines.forEach(function(item) {
               vineGroup = item.sprigList;
               firstNodeInVine = vineGroup[vineGroup.length - 1].nodeList[0];
               if (firstNodeInVine.id < minId) {minAuthor = firstNodeInVine.author}
            })
            return minAuthor;
         },
         toJudgeVineStatus: function(panelVineStatus, operationStatus, vine, author, ctnnew, ctnimprove) {
            var latestVineGroupInVine, intMember;
            intMember = variableCherries.member;
            if (intMember == null) {
               panelVineStatus = 'ready2login'; // 面板状态是未登录*ready2login*，并且操作项皆为关闭状态*disable*。
            } else {
               if (intMember === author) {
                  operationStatus[5] = ''; // 可新建
                  // 是否关闭
                  if (vine.state === 'B') {
                     panelVineStatus = 'closedVine';
                  } else { // 藤组状态：A 否认❌ B 合并🈴️ C 归档📦 D 生长🌲
                     latestVineGroupInVine = vine.sprigList[0];
                     operationStatus[0] = '';
                     if (latestVineGroupInVine.state === 'D') {
                        operationStatus[1] = operationStatus[2] = '';
                     }
                     if (vine.freeze === 'B') {
                        operationStatus[4] = '';
                     } else {
                        operationStatus[3] = '';
                     }
                  }
               } else {
                  if (vine.freeze === 'A' && vine.state === 'A') {
                     if (ctnimprove === 'B') {
                        operationStatus[0] = '';
                     }
                  }
                  if (ctnnew === 'B') {
                     operationStatus[5] = '';
                  }
               }
            }
         },
         createVinesModel: function(res) {
            var html = '',
            length = res.vines.length, sprigLength, nodeLength, i, j, k,
            radioList = [], radioHtml = '', // 操作面板的采用展示数据
            panelVineStatus, operationStatus = ['disable', 'disable', 'disable', 'disable', 'disable', 'disable'], oi = -1, author;
            author = variableCherries.vineauthor = functionGrapes.vinemodule.getAuthor(res.vines);
            for (i = 0; i < length; ++ i) {
               oi = -1;
               sprigLength = res.vines[i].sprigList.length;
               html += '<div class="vine-panel">'
               for (j = 0; j < sprigLength; ++ j) {
                  var keyId = res.vines[i].sprigList[j].keyNode;
                  nodeLength = res.vines[i].sprigList[j].nodeList.length;
                  if (res.vines[i].freeze === 'B') {
                     html += '<ul class="vine-item freezed">'; // 冰冻
                  } else if (res.vines[i].sprigList[j].state === 'B')
                  {
                     html += '<ul class="vine-item merged">'; // 内合并
                  } else if (res.vines[i].sprigList[j].state === 'C') {
                     html += '<ul class="vine-item history">'; // 内合并
                  } else if (res.vines[i].sprigList[j].state === 'A') {
                     html += '<ul class="vine-item discard">';
                  } else {
                     html += '<ul class="vine-item">';
                  }
                  for (k = 0; k < nodeLength; ++ k) {
                     if (res.vines[i].sprigList[j].nodeList[k].id === keyId &&
                        res.vines[i].sprigList[j].state !== 'A')
                        if (res.vines[i].sprigList[j].nodeList[k].quoteSource !== 0) {
                           html += '<li class="node-item accept scissor"><a href="">'
                        } else {
                           html += '<li class="node-item accept"><a href="">'
                        }
                     else {
                        if (res.vines[i].sprigList[j].nodeList[k].quoteSource !== 0) {
                           html += '<li class="node-item scissor"><a href="">'
                        } else {
                           html += '<li class="node-item"><a href="">'
                        }
                     }
                     html += res.vines[i].sprigList[j].nodeList[k].title
                     + '</a></li>';
                  }
                  html += '</ul>';
               }
               radioList = [], radioHtml = '';
               nodeLength = res.vines[i].sprigList[0].nodeList.length;
               operationStatus = ['disable', 'disable', 'disable', 'disable', 'disable', 'disable'];
               functionGrapes.vinemodule.toJudgeVineStatus(panelVineStatus, operationStatus, res.vines[i], author, res.ctnnew, res.ctnimprove); // 生成操作面板和操作项的状态
      
               for (k = 0; k < nodeLength; ++ k) {
                  radioList.push(res.vines[i].sprigList[0].nodeList[k].title);
                  radioHtml += '<li class="radio" data-id="' + k +  '" data-vine="' + i + '">' + radioList[k] + '</li>';
               }
               html += `<ul class="nav-node-actions for-panel">
                        <span class="menu-panel">
                           <li class="improve expand ${operationStatus[++oi]}">改善</li>
                           <span class="menu-inner">
                              <li><input type="text" class="letter improve" placeholder="输入改善之后的描述"></li>
                              <li class="button-panel">
                                 <button class="button btn-improve" data-id="${i}">改善</button>
                                 <button class="button collapse">取消</button>
                              </li>
                           </span>
                           <hr style="height: 0px; border: none; border-top: 1px dashed rgb(219, 219, 219); width: 100%; margin: 11px auto;"/>
                           <li class="accept expand ${operationStatus[++oi]}">采用</li>
                           <span class="menu-inner p-bottom">
                              <li class="note">在藤组内选择一个描述并确定采用</li>
                              <span class="selector-panel">
                                 ${radioHtml}
                              </span>
                              <li class="button-panel">
                                 <button class="button btn-accept" data-id="${i}">采用</button>
                                 <button class="button collapse">取消</button>   
                              </li>
                           </span>
                           <li class="reject expand ${operationStatus[++oi]}">否认</li>
                           <span class="menu-inner p-bottom">
                              <li class="note">确定否认</li>
                              <li class="button-panel">
                                 <button class="button btn-reject" data-id="${i}">否认</button>
                                 <button class="button collapse">取消</button>
                              </li>
                           </span>
                           <li class="freeze expand ${operationStatus[++oi]}">加冰</li>
                           <span class="menu-inner p-bottom">
                              <li class="note">确定加冰</li>
                              <li class="button-panel">
                                 <button class="button btn-freeze" data-id="${i}">加冰</button>
                                 <button class="button collapse">取消</button>
                              </li>
                           </span>
                           <li class="heat expand ${operationStatus[++oi]}">融化</li>
                           <span class="menu-inner">
                              <li class="note">确定融化</li>
                              <li class="button-panel">
                                 <button class="button btn-heat" data-id="${i}">融化</button>
                                 <button class="button collapse">取消</button>
                              </li>
                           </span>
                           <hr style="height: 0px; border: none; border-top: 1px dashed rgb(219, 219, 219); width: 100%; margin: 11px auto;"/>
                           <li class="new expand ${operationStatus[++oi]}">新建描述</li>
                           <span class="menu-inner p-bottom">
                              <li><input type="text" class="letter new" placeholder="新建一个描述"></li>
                              <li class="button-panel">
                                 <button class="button btn-new" data-id="${i}">新建</button>
                                 <button class="button collapse">取消</button>
                              </li>
                           </span>
                        </span>
                     </ul>
                  </div>`
            }
            variableCherries.vinesHolder.innerHTML = html;
            variableCherries.pushvinelock = res.ctnimprove === 'A' ? true : false;
            variableCherries.newvinelock = res.ctnnew === 'A' ? true : false;
         },
         createProjectModel: function(res) {
            var orititle, title, letter = res.pInfo.letter,
            weather = res.pInfo.weather, action = res.pInfo.action, mood = res.pInfo.mood,
            time = functionGrapes.prettydate.formatDate(res.pInfo.time),
            name = res.pInfo.author,
            nid = res.pInfo.authorId;
            variableCherries.FULL_ADDR[2] = res.pInfo.addr.slice(32, 40);
            variableCherries.FULL_ADDR[3] = res.pInfo.addr + '!hw864';
            variableCherries.FULL_ADDR[1] = variableCherries.PROJECT_ADDR;
            orititle = variableCherries.FULL_ADDR.join(variableCherries.SEPARATOR_JOIN);
            variableCherries.FULL_ADDR[1] = variableCherries.LIGHTP_ADDR;
            title = variableCherries.FULL_ADDR.join(variableCherries.SEPARATOR_JOIN);
            variableCherries.titleHolder.innerHTML = functionGrapes.vinemodule.createPSBeamModel(orititle, title, letter, weather, action, mood, time, nid, name);
         },
         createPSBeamModel: function(orititle, title, letter, weather, action, mood, time, creator, creatorName, isStory, index, suffix, ink, archive) { // 生成项目和故事的公共 html
            var html = '', llen = letter.length, i, temp = '', mediaHtml = '', titleHead = '', storyTail = '', storyContentHtml = ['', ''], inkTriggerStatus = 'disable', archiveTriggerStatus = 'disable';
            if (isStory) {
               if (variableCherries.member != null) {
                  if (ink === 'A') { inkTriggerStatus = '' }
                  if (archive === 'B') { archiveTriggerStatus = 'roll' }
                  else if (archive === 'A') { archiveTriggerStatus = 'enable' }
               }
               // storyContentHtml[0] = '<div class="story-content">'
               // storyContentHtml[1] = '</div>'
            }
            if (title.endsWith('m4a') || title.endsWith('wav')) {
               mediaHtml = `<div class="snd-holder">
               <a class="time-anchor effect-assis" style="display: block; height: 100%;" href="${orititle}" target="_blank"><span class="sound-holder"><span class="record"><span class="sound-arm"></span></span><span class="hole top"></span><span class="hole bottom"></span></span></a>
               </div>`;
               if (isStory) {storyTail = mediaHtml;} else {titleHead = mediaHtml;}
            } else {
               if (isStory) {
                  mediaHtml = `<div class="img-holder">
                                 <a class="time-anchor effect-assis" style="display: block; height: 100%;" href="${orititle}" target="_blank"><img class="title preview" data-src="${orititle}" src="${title}"></a>
                                 <!-- <a class="time-anchor effect-assis" style="display: block; height: 100%;" href="${orititle}" target="_blank"><img class="title preview" data-src="${orititle}" src="/resources/img/work_highquality_img/pic1.jpg"></a> -->
                              </div>`
                  ;
                  storyTail = mediaHtml;
               } else {
                  mediaHtml = `<div class="img-holder">
                                 <img class="title preview" data-src="${orititle}" src="${title}">
                                 <!-- <img class="title preview" data-src="${orititle}" src="/resources/img/work_highquality_img/pic1.jpg"> -->
                              </div>`
                  ;
                  titleHead = mediaHtml;
               }
            }
            html += `
               ${titleHead}
               ${storyTail}
               <div class="info-holder">
                  <div class="letter-holder">
                     <pre class="letter">${letter}</pre>
                  </div>
                  <div class="state-items">
                     <span class="state-item">${weather}</span>
                     <span class="state-item">${action}</span>
                     <span class="state-item">${mood}</span>
                  </div>
               </div>
               <div class="tail-info">
                  <span class="tailinfo-item">${time}</span>
                  <span class="tailinfo-item"><a href="/member/${creator}" target="_blanck">${creatorName}</a></span>
               </div>
            `;
            if (isStory) {
               html += `
                  <ul class="menu-holder">
                     <li class="menu-item for-panel">
                        <span class="s-mark menu-btn">墨迹</span>
                        <ul class="menu-panel mark-menu">
                           <li class="show-marked s-check">展示墨迹</li>
                           <hr style="height: 0px; border: none; border-top: 1px dashed rgb(219, 219, 219); width: 100%; margin: 11px auto;">
                           <li class="mark ${inkTriggerStatus}">选取墨迹</li>
                        </ul>
                     </li>
                     <li class="menu-item">
                        <span class="s-reply menu-btn">回复</span>
                     </li>
                     <li class="menu-item save-holder ${archiveTriggerStatus}">
                        <span class="save-item s-save menu-btn" data-src="${suffix}">收藏</span>
                        <span class="save-item s-srollback menu-btn" data-src="${suffix}">撤回收藏</span>
                        <span class="save-item s-slogin menu-btn" data-src="${suffix}">收藏</span>
                     </li>
                  </ul>
                  <div class="stage-holder">
                     <ul class="my-letter">
                        <li class="letter-item"><address class="author">我：</address></li>
                        <li class="letter-item text-holder"><textarea class="text-content"></textarea></li>
                        <li class="letter-item" style="text-align: right;margin: 0 12px;">
                           <button class="button btn-letter">发送</button>
                        </li>
                     </ul>
                     <div class="booth-holder">
                        <ul class="chat-items"></ul>
                        <ul class="pager"></ul>
                     </div>
                  </div>
                  <div class="ceiling">加载中，请等待～</div>
               `;
            }
            return html;
         }
      }
   }

   function init() {

      initData();

      initProps();

      initEvent();

   }

   function initProps() {
      var pStoryEl = document.getElementById('p_story')
      ;

      pStoryEl.href = pStoryEl.href + variableCherries.cache.get('pId');
      variableCherries.pTimeEl.href = variableCherries.pTimeEl.href + variableCherries.cache.get('pId');

      localStorage.setItem('PREV_LOCATION', location.href);
      if (! (constLychees.member == null || constLychees.member === ''))
      {
         console.log(constLychees.member)
         util.ac(document.getElementById('accountli'), 'loginok');
         document.getElementById('personalinfo').href += constLychees.member;
      }
   }

   function initData() {
      var suffix = location.search,
         temp = location.href, nodePanel;
         suffix = temp.substr(temp.lastIndexOf('/')+1);
         variableCherries.cache.set('pId', suffix)
      ;
      util.serve('get', util.rest(variableCherries.cache.get('pivotUrl'), [['', suffix]]), (res) => {
         res = JSON.parse(res);
         if (res.success) {
            variableCherries.coreCord = res.pInfo.coordinate.split(',');
            variableCherries.optionlock = res.optionlock;
            variableCherries.pivotprojectcreator = res.pInfo.authorId;
            variableCherries.sweetcore = res.sweet;
            if (! res.sweet) { util.rc(variableCherries.bookSweetEle, 'disabled') }
            if (res.pInfo.authorId === + constLychees.member || util.coordckr(res.pInfo.coordinate.split(',')[0], res.pInfo.coordinate.split(',')[1])) { util.rc(variableCherries.bookLocatEle, 'disabled') }
            if (res.pInfo.authorId === + constLychees.member && ! util.coordckr(res.pInfo.coordinate.split(',')[0], res.pInfo.coordinate.split(',')[1])) { variableCherries.pTimeEl.href = '/time/corewrite/withcoord/' + constLychees.core; }
            document.getElementById('treasure-count').innerHTML = res.locatcount;
            variableCherries.goldencore = res.locate;
            if (variableCherries.goldencore) { util.ac(variableCherries.btnLocatCore, 'disabled') }
            variableCherries.btnLocatCore.addEventListener('click', functionGrapes.eventhandler.locatcoreClickHandler);
            functionGrapes.vinemodule.createProjectModel(res);
         } else {
            console.log("WRONG!!!");
         }
      });
      util.serve('get', util.rest(variableCherries.cache.get('vinesUrl'), [['', suffix], ['', 'vines']]), (res) => {
         res = JSON.parse(res);
         if (res.success) {
            variableCherries.cache.set('vines', res.vines);
            functionGrapes.vinemodule.createVinesModel(res);
            // functionGrapes.vinemodule.createNodePanel(res.vines);
         } else {
            console.log("WRONG!!!");
         }
      });

   }

   function initEvent() {
      var bnnsubmitEl = document.getElementById('bnnsubmit');
      /**
       * 为结点藤面板设置代理事件
       */
      variableCherries.vinesHolder.addEventListener('click', functionGrapes.eventhandler.vineEventHandler);
      bnnsubmitEl.addEventListener('click', functionGrapes.eventhandler.repobtnClickHandler);
      variableCherries.btnSweetCore.addEventListener('click', functionGrapes.eventhandler.sweetcoreClickHandler);
      variableCherries.btnUnSweetCore.addEventListener('click', functionGrapes.eventhandler.unSweetcoreClickHandler);
      document.getElementById('p_story').addEventListener('click', functionGrapes.eventhandler.linkVerifyMembership);
      variableCherries.btnRepoStory.addEventListener('click', functionGrapes.eventhandler.writeRepoClickHandler);
      variableCherries.btnNodeExpEl.addEventListener('click', functionGrapes.eventhandler.nodeExpClickHandler);
      variableCherries.btnCordExpEl.addEventListener('click', functionGrapes.eventhandler.cordExpClickHandler);
      variableCherries.btnLogoutEl.addEventListener('click', functionGrapes.eventhandler.ready2LogoutClickHandler);
   }

   function initHeanderFunction() {
      // 登出账户
      variableCherries.sendQuit.addEventListener('click', function() {
         var data = new FormData();
         data.append('_csrf', util.cookie.get('XSRF-TOKEN'));
         util.serve('post', '/proxy/hulaa/quit', function(res) {
            res = JSON.parse(res);
            console.log(res);
            if (res.success) {
               localStorage.removeItem('mname');
               util.cookie.unset('VAL');
               util.cookie.unset('MEM');
               alert('成功');
            } else {
               alert('失败');
            }
         }, data);
      }, false)
   }
   
   init();

   function tabs(el, options) {
      this.el = el;
      this.options = extend({}, this.options);
      extend(this.options, options);
      this.init();
   }
   tabs.prototype.options = {
      nav: 'nav',
      start: 0,
      skip: [],
      maps: ['nearby_map', 'core_map', 'story_map'],
      uricoords: ['/proxy/project/coords', '/proxy/time/coords', '/proxy/story/coords'],
      dripcolor: ['#0c3398', '#2b580c', '#fb8120'],
   }
   tabs.prototype.init = function() {
      this.tabs = [].slice.call(this.el.querySelectorAll(this.options.nav + '>ul>li'));
      this.items = [].slice.call(this.el.querySelectorAll('section'));
      this.current = -1;
      this.mbgl = {};
      this.mbel = {};
      this.show();
      this.initEvents();
   }
   tabs.prototype.show = function(idx) {
      if (this.current > -1) {
         util.rc(this.tabs[this.current], 'current');
         util.rc(this.items[this.current], 'current');
      }
      this.current = idx != null ? idx : this.options.start > -1 && this.options.start < this.items.length ? this.options.start : 0;
      this.mbel[this.options.maps[this.current]] = this.initMap.bind(this);
      if (this.mbgl[this.options.maps[this.current]] == null && ! (typeof mapboxgl === 'undefined')) 
      {
         this.mbel[this.options.maps[this.current]]();
      } else if (this.mbgl[this.options.maps[this.current]] == null && typeof mapboxgl === 'undefined')
      {
         if (idx != null) { window.removeEventListener('load', this.mbel[this.options.maps[idx]]) }
         window.addEventListener('load', this.mbel[this.options.maps[this.current]]);
      }
      util.ac(this.tabs[this.current], 'current');
      util.ac(this.items[this.current], 'current');
   }
   tabs.prototype.initEvents = function() {
      var self = this, skip = this.options.skip;
      this.tabs.forEach(function(tab, idx) {
         if (skip.indexOf(idx) === -1) {
            tab.addEventListener('click', function(e) {
               e.preventDefault();
               if (idx === self.current) {
                  return ;
               }
               self.show(idx);
            });
         } else {
            // 跳过的 tab 加上标记
         }
      });
   }
   tabs.prototype.initMap = function() {
      var me = this;
      setTimeout(function() {
         mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbmppYXpoaSIsImEiOiJjazE3b3BpNG0wODNkM3BydmJjaWx2bnNmIn0.wEwIwIpfIldJ055ZQvl4RQ';
         me.mbgl[me.options.maps[me.current]] = new mapboxgl.Map({
            container: me.options.maps[me.current],
            center: [56, 37],
            zoom: 1,
            style: 'mapbox://styles/mapbox/streets-v9'
         });
         util.restserve('get', me.options.uricoords[me.current], functionGrapes.serveCallback.initCordsInMapbox(me, me.current), [
            ['', variableCherries.cache.get('pId')]
         ]); // 获取 3 模块的 redis 地图信息
      }, 0);
   }

   function greedlyroll(el, options) {
      this.el = el;
      this.options = extend({}, this.options);
      extend(this.options, options);
      if (this.options.type < 1 || this.options.type > greedlyroll.appendDifftype.length - 1) { return }
      this.init();
   }

   greedlyroll.prototype.options = {
      button: 'button',
      holder: 'ul',
      switch: true,
      type: 0
   }

   greedlyroll.prototype.init = function() { 
      this.index = -1;
      this.rollbtn = [].slice.call(this.el.querySelectorAll(this.options.button))[0];
      this.resHolder = [].slice.call(this.el.querySelectorAll(this.options.holder))[0];
      this.stories = [];
      this.times = [];
      this.show();
      this.initEvents();
   }

   greedlyroll.prototype.show = function() {
      if (! this.options.switch) {
         this.rollbtn.removeEventListener("click", this.handleClick);
         return ;
      }
      util.restserve('get', greedlyroll.options.typeuri[this.options.type], this.serveCallback.bind(this), [
         ['', variableCherries.cache.get('pId')],
         ['', greedlyroll.options.typekey[this.options.type]],
         ['p', ++ this.index]
      ]);
   }

   greedlyroll.prototype.initEvents = function() {
      this.handleClick = this.show.bind(this);
      this.rollbtn.addEventListener('click', this.handleClick);
   }

   greedlyroll.prototype.serveCallback = function(res) {
      res = JSON.parse(res);
      if (res.success) {
         greedlyroll.appendDifftype[this.options.type](res.items, this);
         if (! res.more) {
            this.options.switch = false;
            util.ac(this.rollbtn, 'disabled');
            this.show();
         }
      } else {
         console.log("WRONG!!!");
      }
   }

   greedlyroll.options = {
      typeuri: ['', variableCherries.cache.get('storyitemsUrl'), variableCherries.cache.get('timeitemsUri')],
      typekey: ['', 'storynuts', 'timeleaves']
      // type: {
      //    max: 2,
      //    min: 1
      // }
   }

   greedlyroll.appendDifftype = [
      'RMS',
      function(stories, context) {
         var len = stories.length,
            orititle, title, suffix, letter, weather, action, mood, time, creator, creatorName, ink, archive,
            i, j, k,
            html = '', storyDoms, ids = [], inklocks = [], archivelocks = []
         ;
         stories.forEach(function(item, cursor) {
            variableCherries.FULL_ADDR[2] = item.path.slice(32, 40);
            variableCherries.FULL_ADDR[3] = item.path;
            variableCherries.FULL_ADDR[1] = variableCherries.STORY_ADDR;
            orititle = variableCherries.FULL_ADDR.join(variableCherries.SEPARATOR_JOIN);
            variableCherries.FULL_ADDR[3] = item.path + '!hw864';
            variableCherries.FULL_ADDR[1] = variableCherries.TINYS_ADDR;
            title = variableCherries.FULL_ADDR.join(variableCherries.SEPARATOR_JOIN);
            letter = item.letter, weather = item.weather, action = item.action, mood = item.mood, time = functionGrapes.prettydate.formatDate(item.time), creator = item.creator, creatorName = item.cname;
            ink = item.ink, archive = item.archive;
            html += '<div class="story-item" id="s' + item.id +  '">'
                  + functionGrapes.vinemodule.createPSBeamModel(orititle, title, letter, weather, action, mood, time, creator, creatorName, true, cursor, suffix, ink, archive)
                  + '</div>';
            ids.push(item.id);
            inklocks.push(item.ink);
            archivelocks.push(item.archive);
            if (item.ink === 'C') { variableCherries.optionlock = true }
            else { variableCherries.optionlock = false }
         })
         storyDoms = util.appendh(context.resHolder, html);
         storyDoms.forEach(function(item, idx) {
            context.stories.push(new storyWidget(item, ids[idx], inklocks[idx], archivelocks[idx]));
         })
      },
      function(times, context) {
         // this[1](times, context);
         var src, letter, time, member, weather, action, mood, like, talk, memberId, html = '', mediaHtml = '';
         times.forEach(function(item) {
            src = item.addr;
            letter = item.letter;
            time = functionGrapes.prettydate.formatDate(item.time);
            member = item.author;
            memberId = item.authorId;
            weather = item.weather;
            action = item.action;
            mood = item.mood;
            like = item.like;
            talk = item.talk;
            variableCherries.FULL_ADDR[2] = item.addr.slice(32, 40);
            variableCherries.FULL_ADDR[3] = item.addr;
            variableCherries.FULL_ADDR[1] = variableCherries.TIME_ADDR;
            orititle = variableCherries.FULL_ADDR.join(variableCherries.SEPARATOR_JOIN);
            variableCherries.FULL_ADDR[3] = item.addr + '!hw864';
            variableCherries.FULL_ADDR[1] = variableCherries.TINYT_ADDR;
            title = variableCherries.FULL_ADDR.join(variableCherries.SEPARATOR_JOIN);
            mediaHtml = '';
            if (src.endsWith('m4a') || src.endsWith('wav')) {
               mediaHtml = `<div class="snd-holder">
               <a class="time-anchor effect-assis" style="display: block; height: 100%;" href="${orititle}" target="_blank"><span class="sound-holder"><span class="record"><span class="sound-arm"></span></span><span class="hole top"></span><span class="hole bottom"></span></span></a>
               </div>`;
            } else {
               mediaHtml = `<div class="img-holder">
                              <a class="time-anchor effect-assis" style="display: block; height: 100%;" href="${orititle}" target="_blank"><img class="title preview" data-src="${orititle}" src="${title}"></a>
                           </div>`
               ;
            }
            html += `
            <li class="time-item">
               <div class="time-content">
                  ${mediaHtml}
                  <div class="info-holder">
                     <div class="letter-holder">
                        <pre class="letter">${letter}</pre>
                     </div>
                     <div class="state-items">
                        <span class="state-item">${weather}</span>
                        <span class="state-item">${action}</span>
                        <span class="state-item">${mood}</span>
                     </div>
                  </div>
               </div>
               <div class="tail-info">
                  <span class="tailinfo-item">${time}</span>
                  <span class="tailinfo-item"><a href="/member/${memberId}" target="_blank">${member}</a></span>
               </div>
            </li>
            `
         });
         util.appendh(context.resHolder, html);
      }
   ]

   function storyWidget(el, id, inklock, archivelock) {
      this.el = el;
      this.id = id;
      this.inklock = inklock;
      this.arclock = archivelock;
      this.init();
   }

   storyWidget.prototype.init = function() {
      this.ink = [].slice.call(this.el.querySelectorAll('.mark'))[0];
      this.inkshow = [].slice.call(this.el.querySelectorAll('.show-marked'))[0];
      this.reply = [].slice.call(this.el.querySelectorAll('.s-reply'))[0];
      this.replybtn = [].slice.call(this.el.querySelectorAll('.btn-letter'))[0];
      this.save = [].slice.call(this.el.querySelectorAll('.save-holder'))[0];

      this.letter = [].slice.call(this.el.querySelectorAll('.letter'))[0];
      this.stage = [].slice.call(this.el.querySelectorAll('.stage-holder'))[0];
      this.letterstr = this.letter.textContent;

      this.ceiling = [].slice.call(this.el.querySelectorAll('.ceiling'))[0];

      this.couples = [];

      this.cachecollectionserve = false;
      this.cachemessageserve = false;

      this.sendingBook = false;

      if (this.inklock === 'B') { util.rc(this.ink, 'disable') }
      this.initEvents();
   }

   storyWidget.prototype.initEvents = function() {
      this.hcmarkkey = undefined;
      this.hcshowkey = undefined;
      this.ink.addEventListener('click', this.inkHandler.handleclickOfmark.bind(this));
      this.inkshow.addEventListener('click', this.inkHandler.handleclickOfshow.bind(this));
      this.save.addEventListener('click', this.storeHandler.handleclickOfsave.bind(this));
      this.reply.addEventListener('click', this.boothHandler.handleclickOfreply.bind(this));
      this.replybtn.addEventListener('click', this.boothHandler.handleclickOfsend.bind(this));
   }
   
   storyWidget.prototype.serveCallback = {
      inkceilingOfpublish: function(res) {
         res = JSON.parse(res);
         if (res.success) {
            util.rc(this.ceiling, 'isvisible');
            util.ac([].slice.call(this.el.querySelectorAll('.bpacommit'))[0], 'disabled');
            util.ac(this.ink, 'disable'); // >>>>>>> disable <<<<<<< xxxxxxdisable>d<xxxxxx
            this.inklock = 'A';
         } else { alert('发生错误：（') }

      },
      inkceilingOfrevoke: function(res) {
         res = JSON.parse(res);
         if (res.success) {
            util.rc(this.ceiling, 'isvisible');
            util.ac([].slice.call(this.el.querySelectorAll('.bparevoke'))[0], 'disabled');
            util.rc(this.ink, 'disable'); // >>>>>>> disable <<<<<<< xxxxxxdisable>d<xxxxxx
            this.inklock = 'B';
         } else { alert('发生错误：（') }
      },
      inkcollection: function(res) {
         var likes, left, right, wordslength, i, j, k, q, max = 0,
            levelBucket = Array.from({ length: 168 }, function() { return 0 }), level,
            llen, spanhtml = '', elems,
            revokedisabledclass = this.inklock === 'B' ? 'disabled' : ''
         ;
         this.level = [];
         res = JSON.parse(res);
         likes = res.likes;
         likes.forEach(function(item) {
            item = item.r.split(',');
            for (k = 0; k < item.length; k += 2) {
               left = parseInt(item[k]);
               right = parseInt(item[k + 1]);
               for (q = left; q < right + 1; ++ q) {
                  ++ levelBucket[q];
                  if (max < levelBucket[q]) {
                     max = levelBucket[q];
                  }
               }
            }
         })
         // console.log(levelBucket);
         level = storyWidget.ink.setLevel(max);

         this.hcshowkey = this.inkHandler.handleclickOfcookedelem.bind(this);
         llen = this.letterstr.length;
         for (i = 0; i < llen; ++ i) {
            spanhtml += '<span class="elem" data-i="' + i + '">' + this.letterstr[i] + '</span>'
         }
         spanhtml += '<button class="btn-paragraph_a bparevoke ' + revokedisabledclass + '">撤销</button><button class="btn-paragraph_b bpbcancel">恢复</button>';
         this.letter.innerHTML = spanhtml;
         this.letter.addEventListener('click', this.hcshowkey);
         elems = [].slice.call(this.el.querySelectorAll('.elem'));
         for (k = 0; k < llen; ++ k) {
            if (levelBucket[k] === 0) { continue }
            for (q = 1; q < 7; ++ q) {
               if (levelBucket[k] < level[q] + 1) {
                  util.ac(elems[k], 'level' + q);
                  this.level[k] = q;
                  break;
               }
            }
         }
         util.rc(this.ceiling, 'isvisible');
         this.cachecollectionserve = true;
      },
      messageshow: function(items, res) {
         var list, mhtml = '', len;
         res = JSON.parse(res);
         if (res.success) {
            len = res.l.length;
            list = res.l;
            functionGrapes.generateQuestionID(res.l, this.id);
            list.forEach(function(item, index) {
               mhtml += '<li class="chat-item" id="'+ `${item.chatStory}_${item.chatId}_${len-index}` +'"><strong class="chat-header"><address>' + item.chatName + ' - </address><span><span class="q_index">' + `#${len-index} ` + '</span><time>' + functionGrapes.prettydate.formatDate(item.chatCreatetime) + '</time></span></strong><pre class="fragment">' + item.chatContent + '</pre></li>';
            })
            items.innerHTML = mhtml;
            this.cachemessageserve = true;
         }
      },
      messagerocket: function(res) {
         res = JSON.parse(res);
         if (res.success) {
            console.log(res);
            alert(copyLemons.server.storymeun.booth.success);
         } else {
            console.log('null');
            alert(copyLemons.server.storymeun.booth.failure);
         }
      },
      chestnutOfsave: function(res) {
         alert('已收藏；）');
         this.arclock = 'B';
         util.ac(this.save, 'roll');
         util.rc(this.save, 'enable');
         util.rc(this.ceiling, 'isvisible');
      },
      chestnutOfrevoke: function(res) {
         alert('已撤销；）');
         this.arclock = 'A';
         util.ac(this.save, 'enable');
         util.rc(this.save, 'roll');
         util.rc(this.ceiling, 'isvisible');
      }
   }

   storyWidget.prototype.boothHandler = {
      handleclickOfsend: function() {
         var data = new FormData(),
            texte = [].slice.call(this.el.querySelectorAll('.text-content'))[0], questionidarray, chatidarray, storyid = this.id
         ;
         if (this.inklock === 'C') {
            alert(copyLemons.server.membership.login.verify);
            return ;
         }
         if (texte.value.trim() === '') { alert(copyLemons.server.storymeun.booth.checklength); return ; }
         if (this.sendingBook) { alert(copyLemons.server.sending); return ; }
         this.sendingBook = true;
         questionidarray = functionGrapes.getQuestionId(texte.value.trim());
         chatidarray = questionidarray.map(function(item) {
            if (variableCherries.indexMapQuestion[storyid][item] == null) { return null }
            else { return variableCherries.indexMapQuestion[storyid][item].chatid }
         })
         chatidarray = chatidarray.filter(function(item, index) {
            return item != null && item !== '' && chatidarray.indexOf(item, 0) === index;
         })
         chatidarray = chatidarray.join(',');
         data.append('c', filterXSS(texte.value.trim())); // xss 处理
         data.append('s', this.id);
         data.append('q', chatidarray);
         util.serve('post', variableCherries.cache.get('urlChat'), this.serveCallback.messagerocket.bind(this), data);
      },
      handleclickOfreply: function() {
         var items;
         if (util.hc(this.stage, 'opened')) {
            util.rc(this.stage, 'opened');
            return ;
         }
         util.ac(this.stage, 'opened');
         if (this.cachemessageserve === false) {
            items = [].slice.call(this.el.querySelectorAll('.chat-items'))[0];
            util.serve('get', variableCherries.cache.get('uriListItems'), this.serveCallback.messageshow.bind(this, items), {'s': this.id, 'i': 0});
         }

      }
   }

   storyWidget.prototype.storeHandler = {
      handleclickOfsave: function(event) {
         var target = event.target
         ;
         if (this.arclock === 'C') {
            alert(copyLemons.server.membership.login.verify);
            return ;
         }
         if (util.hc(target, 's-srollback')) {
            util.ac(this.ceiling, 'isvisible');
            this.storeHandler.handleclickOfrevoke.call(this);
         } else if (util.hc(target, 's-save')) {
            util.ac(this.ceiling, 'isvisible');
            this.storeHandler.handleclickOfsavechestnut.call(this);
         }
      },
      handleclickOfsavechestnut: function() {
         var data = new FormData();
         console.log(this);
         if (this.arclock === 'B') {
            alert('这个操作不被允许：（');
            return;
         }
         data.append('s', this.id);
         util.serve('post', variableCherries.cache.get('urlSave'), this.serveCallback.chestnutOfsave.bind(this), data);
      },
      handleclickOfrevoke: function() {
         var data = new FormData();
         console.log(this)
         if (this.arclock === 'A') {
            alert('这个操作不被允许：（');
            return;
         }
         data.append('i', this.id);
         util.serve('post', variableCherries.cache.get('uriRevokeSaved'), this.serveCallback.chestnutOfrevoke.bind(this), data);
      }
   }

   storyWidget.prototype.inkHandler = {
      releaseclickOfmark: function(textcontent) {
         if (! (textcontent.hcmarkkey == null)) { textcontent.letter.removeEventListener('click', textcontent.hcmarkkey) }
      },
      handleclickOfquit: function(isrehandle) {
         if (! (this.hcmarkkey == null)) { this.letter.removeEventListener('click', this.hcmarkkey) }
         if (! (this.hcshowkey == null)) { this.letter.removeEventListener('click', this.hcshowkey) }
         if (! isrehandle) { this.letter.innerHTML = this.letterstr; }
         
      },
      handleclickOfsubmit: function() {
         var point = [], plen, restring = '', step = 1,
            i, j, k,
            data = new FormData()
         ;
         if (this.status === storyWidget.options.ink.ready2finish || this.couplenum === 0) {
            alert('点击内容以正确的格式选取');
            return ;
         }
         util.ac(this.ceiling, 'isvisible');
         // !!! 添加遮罩层
         this.couples.forEach(function(item) {
            point.push(item[0], item[1]);
         })
         point.sort(function(x, y) { return x - y });
         plen = point.length;
         for (i = 0; i < plen; ++ i) {
            if (step & 1) { // 奇数，左区间
               restring += point[i] + ',';
            } else { // 相反
               if (point[i+1] - point[i] === 1) {
                  ++ i;
                  continue;
               }
               restring += point[i] + ',';
            }
            ++ step;
         }
         restring = restring.split(',');
         restring.pop();
         restring = restring.join(',');
         data.append('i', this.id);
         data.append('l', restring);
         util.serve('post', variableCherries.cache.get('uriLike'), this.serveCallback.inkceilingOfpublish.bind(this), data);
      },
      handleclickOfshow: function() {
         var key, element, llen, spanhtml = '', revokedisabledclass = this.inklock === 'B' ? 'disabled' : '';
         this.inkHandler.handleclickOfquit.call(this, true);
         if (this.cachecollectionserve === false) {
            util.ac(this.ceiling, 'isvisible');
            util.serve('get', variableCherries.cache.get('uriDetail'), this.serveCallback.inkcollection.bind(this), { 's' : this.id });
         } else {
            this.hcshowkey = this.inkHandler.handleclickOfcookedelem.bind(this);
            llen = this.letterstr.length;
            for (i = 0; i < llen; ++ i) {
               spanhtml += '<span class="elem" data-i="' + i + '">' + this.letterstr[i] + '</span>'
            }
            spanhtml += '<button class="btn-paragraph_a bparevoke ' + revokedisabledclass + '">撤销</button><button class="btn-paragraph_b bpbcancel">恢复</button>';
            this.letter.innerHTML = spanhtml;
            elems = [].slice.call(this.el.querySelectorAll('.elem'));
            this.letter.addEventListener('click', this.hcshowkey);
            for (key in this.level) {
               if (this.level.hasOwnProperty(key)) {
                  element = this.level[key];
                  util.ac(elems[key], 'level' + element);
               }
            }
         }
      },
      handleclickOfmark: function() {
         var llen, spanhtml = '', i, j, k;
         if (this.inklock === 'A') {
            alert('这个操作不被允许:(');
            return;
         }
         if (this.inklock === 'C') {
            alert(copyLemons.server.membership.login.verify);
            return
         }
         this.inkHandler.handleclickOfquit.call(this, true);
         this.hcmarkkey = this.inkHandler.handleclickOfelem.bind(this);
         llen = this.letterstr.length;
         for (i = 0; i < llen; ++ i) {
            spanhtml += '<span class="elem" data-i="' + i + '">' + this.letterstr[i] + '</span>'
         }
         spanhtml += '<button class="btn-paragraph_a bpacommit">提交</button><button class="btn-paragraph_b bpbcancel">恢复</button>';
         this.letter.innerHTML = spanhtml;
         this.elems = [].slice.call(this.el.querySelectorAll('.elem'));
         this.letter.addEventListener('click', this.hcmarkkey);
         this.couples = [];
         this.couplenum = 0;
         this.currentcp = [];
         this.currentcpidx = 0;
         this.recpqueue = []; // 需要重新插入 cp 的队列
         this.status = storyWidget.options.ink.ready2begin;
      },
      handleclickOfelem: function(event) {
         var target = event.target;
         if (util.hc(target, 'bpacommit')) {
            if (this.inklock === 'A') {
               alert('这个操作不被允许:(');
               return;
            }
            if (this.inklock === 'C') {
               alert(copyLemons.server.membership.login.verify);
               return
            }
            this.inkHandler.handleclickOfsubmit.call(this);
            return ;
         } else if (util.hc(target, 'bpbcancel')) {
            this.inkHandler.handleclickOfquit.call(this);
            return ;
         }
         if (util.hc(target, 'p-o-p') || ! (util.hc(target, 'elem'))) { return }
         switch(this.status) {
            case storyWidget.options.ink.ready2begin:
               this.status = storyWidget.options.ink.ready2finish;
               if (util.hc(target, 'pl-op')) {
                  this.currentcpidx = target.dataset['p'];
                  target.dataset['p'] = '';
                  util.rc(target, 'pl-op');
                  util.rc(this.elems[this.couples[this.currentcpidx][1]], 'po-rp');
                  util.ac(this.elems[this.couples[this.currentcpidx][1]], 'pl-op');
                  this.currentcp[0] = this.couples[this.currentcpidx][1];
                  storyWidget.ink.removeviewcouple(this.couples[this.currentcpidx][0], this.couples[this.currentcpidx][1], this.elems);
                  this.couples[this.currentcpidx][0] = this.couples[this.currentcpidx][1];
               } else if (util.hc(target, 'po-rp')) {
                  this.currentcpidx = target.dataset['p'];
                  target.dataset['p'] = '';
                  util.rc(target, 'po-rp');
                  this.currentcp[0] = this.couples[this.currentcpidx][0];
                  storyWidget.ink.removeviewcouple(this.couples[this.currentcpidx][0], this.couples[this.currentcpidx][1], this.elems);
               } else {
                  this.currentcpidx = this.recpqueue.length === 0 ? this.couples.length : this.recpqueue.pop();
                  util.ac(target, 'pl-op');
                  this.currentcp[0] = + target.dataset['i'];
                  this.couples[this.currentcpidx] = [];
                  this.couples[this.currentcpidx][0] = this.currentcp[0];
                  target.dataset['p'] = this.currentcpidx;
               }
               break;
            case storyWidget.options.ink.ready2finish:
               if (util.hc(target, 'pl-op')) {
                  if (! (+ this.currentcpidx === + target.dataset['p'])) { return }
                  this.status = storyWidget.options.ink.ready2begin; 
                  util.rc(target, 'pl-op');
                  this.recpqueue.push(this.currentcpidx);
                  target.dataset['p'] = '';
                  -- this.couplenum;
               } else if (util.hc(target, 'po-rp')) {
                  return ;
               } else {
                  this.currentcp[1] = + target.dataset['i'];
                  this.couples[this.currentcpidx][1] = this.currentcp[1];
                  if (! storyWidget.ink.addviewcouple(this.currentcp[0], this.currentcp[1], this.elems)) { return }
                  this.status = storyWidget.options.ink.ready2begin;
                  target.dataset['p'] = this.currentcpidx;
                  util.ac(target, 'po-rp');
                  ++ this.couplenum;
               }
               break;
         }
      },
      handleclickOfcookedelem: function(event) {
         var target = event.target;
         if (util.hc(target, 'bparevoke')) {
            if (this.inklock === 'A') {
               alert('这个操作不被允许：（');
               return;
            }
            if (this.inklock === 'C') {
               alert(copyLemons.server.membership.login.verify);
               return
            }
            this.inkHandler.handleclickOfrevoke.call(this);
         } else if (util.hc(target, 'bpbcancel')) {
            this.inkHandler.handleclickOfquit.call(this);
            return ;
         }
      },
      handleclickOfrevoke: function() {
         var data = new FormData();
         data.append('i', this.id);
         util.ac(this.ceiling, 'isvisible');
         util.serve('post', variableCherries.cache.get('uriRemovelike'), this.serveCallback.inkceilingOfrevoke.bind(this), data);
      }
   }

   storyWidget.ink = {
      addviewcouple: function(left, right, elems) {
         var i;
         if (left > right) {
            left += right;
            right = left - right;
            left = left - right;
         }
         for (i = left + 1; i < right; ++ i) {
            
            if (util.hc(elems[i], 'p-o-p')) {
               console.log(elems[i])
               while(-- i > left) {
                  util.rc(elems[i], 'p-o-p');
               }
               return false;
            }
            util.ac(elems[i], 'p-o-p');
         }
         return true;
      },
      removeviewcouple: function(left, right, elems) {
         var i;
         if (left > right) {
            left += right;
            right = left - right;
            left = left - right;
         }
         for (i = left + 1; i < right; ++ i) {
            util.rc(elems[i], 'p-o-p');
         }
      },
      setLevel: function(max) {
         var baseE = parseInt(max/6), mod = max%6, level = [], k;
         level[0] = 0;
         for (k = 1; k < 7; ++ k) {
            level[k] = level[k-1] + baseE;
            if (k < mod + 1) {
               ++ level[k];
            }
         }
         return level;
      }
   }

   storyWidget.options = {
      ink: {
         ready2begin: 0,
         ready2finish: 1,
         finished: 2
      }
   }

   function extend(a, b) {
      for (var key in b) {
         if (b.hasOwnProperty(key)) {
            a[key] = b[key];
         }
      }
      return a;
   }

   var tb = new tabs(document.getElementById('tabs-attachment'), { start: 2 }),
      jr = new greedlyroll(document.getElementById('story-tab'), { type: 1, holder: 'div'}),
      jv = new greedlyroll(document.getElementById('time-tab'), {type: 2, holder: 'ul'})
   ;
})();