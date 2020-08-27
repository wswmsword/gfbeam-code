(function() {
   var basepath = 'member', cookieMember, navigatorMember, mapbox, complete = false;
   cookieMember = (function() {
      var res = util.cookie.get('MEM');
      return res;
   })();
   navigatorMember = (function() {
      var blen = basepath.length, pathname = location.pathname,
         i1 = pathname.indexOf(basepath), i2 = i1 + blen + 1, i3 = pathname.indexOf('/', i2),
         res
      ;
      i3 = i3 === -1 ? undefined : i3;
      res = pathname.slice(i2, i3);
      window.navigatorMember = res;
      return res;
   })();
   function hrefReplace(classname, match, replacement) {
      this.elems = [].slice.call(document.getElementsByClassName(classname));
      this.elems.forEach(function(item) {
         item.href = item.href.replace(match, replacement);
      });
   }
   var as = new hrefReplace('item-a', '#_', '');

   function gfer(el, options) {
      this.el = el;
      this.options = extend({}, this.options);
      extend(this.options, options);
      this.init();
   }
   gfer.prototype.init = function() {
      this.ename = gfer.options.ename;
      this.mantra = gfer.options.mantra;
      this.ebirthday = gfer.options.ebirthday;
      this.epic = gfer.options.epic;
      this.isvip = false;
      this.followEl = document.getElementById('follow');
      this.loading = false;
      this.issweet = false;
      this.isvisitor = true;
      this.show();
   }
   gfer.prototype.show = function() {
      util.restserve('get', gfer.options.baseuri, gfer.serveCallback.navigatorMemberGetHandler.bind(this), [
         [navigatorMember, 'vipprofile']
      ]);
   }
   gfer.options = {
      baseuri: '/proxy/hulaa',
      ename: 'gfer',
      mantra: 'power to the people',
      ebirthday: '2020-6-1',
      epic: undefined
   }
   gfer.serveCallback = { 
      navigatorMemberGetHandler: function(res) {
         var prof, epic;
         res = JSON.parse(res);
         prof = res.vip;
         if (res.success) {
            document.getElementById('n1').innerText = prof.name;
            document.getElementById('n2').innerText = prof.mantra;
            document.getElementById('n3').innerText = greedlyroll.generateTime.formatDate(prof.time) + ' 时刻加入';
            document.title = prof.name;
            epic = document.createElement('img');
            epic.src = 'http://naturelovefuture.com/EAVATOR/' + prof.pic;
            document.getElementById('pic-wrapper').appendChild(epic);
            this.issweet = res.issweet;
            this.isvisitor = res.visitor;
            if (this.issweet || this.isvisitor) { util.ac(this.followEl, 'disabled') }
            if (res.isvip) { util.ac(document.getElementById('flower-option'), 'hidden') }
            else { this.followEl.addEventListener('click', gfer.eventCallback.followClickHandler.bind(this)) } // 添加关注点击事件
         } else {
            alert("：（"); // 成员获取失败
         }
      },
      sweetFlowerGetHandler: function(res) {
         res = JSON.parse(res);
         if (res.success) {
            alert('已关注；）');
            util.ac(this.followEl, 'disabled');
            this.issweet = true;
         } else {
            alert("：（"); // 关注成员失败
         }
         this.loading = false;
      }
   }  
   gfer.eventCallback = {
      followClickHandler: function() {
         if (this.loading) { alert('加载中 ；）'); return ; }
         if (this.isvisitor) { alert('注册了再关注喔 ；）'); return ;}
         if (this.issweet) { alert('已关注该成员 ；）'); return ; }
         this.loading = true;
         util.restserve('post', gfer.options.baseuri, gfer.serveCallback.sweetFlowerGetHandler.bind(this), [
            ['', 'sweet'],
            ['member', navigatorMember]
         ]);
      }
   }
   var vip = new gfer(document.getElementById('member-info'),{});
// >>>>>>>>> 豉汁面板 >>>>>>>>>>

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
      itemclass: 'mnav-item'
   };
   tabs.prototype.init = function() {
      this.tabs = [].slice.call(this.el.querySelectorAll(this.options.nav + ' .' + this.options.itemclass));
      this.items = [].slice.call(this.el.querySelectorAll('section'));
      this.treestru = [].slice.call(this.el.querySelectorAll(this.options.nav + ' .' + 'mtreeroot'));
      this.current = -1;
      this.greedlyrollE = [];
      this.show();
      this.initEvents();
   };
   tabs.prototype.show = function(idx) {
      var type;
      if (this.current > -1) {
         util.rc(this.tabs[this.current], 'current');
         util.rc(this.items[this.current], 'current');
      }
      this.current = idx != null ? idx : this.options.start > -1 && this.options.start < this.items.length ? this.options.start : 0;
      util.ac(this.tabs[this.current], 'current');
      util.ac(this.items[this.current], 'current');
      type = this.current + 1;
      if (! greedlyroll.options.isserved[type] || ! greedlyroll.options.isserved[7]) {
         // 已解决 --- 地图的加载：本方案适合在点击事件之前，请求应用的服务不会被挂起，因为挂起后绘图 wrapper 的显示已经是 null。解决方案：在地图加载函数中添加判断绘图 wrapper 是否为 null。
         if (! greedlyroll.options.isserved[7] && this.greedlyrollE[7] != null && this.greedlyrollE[7].mbel != null) { document.removeEventListener('load', this.greedlyrollE[7].mbel) }
         if (this.greedlyrollE[type] == null)
         {
            this.greedlyrollE[type] = new greedlyroll(document.getElementById(greedlyroll.options.domid[type]), {type: type, holder: greedlyroll.options.holder[type]});
            if (! greedlyroll.options.async[type]) { greedlyroll.options.isserved[type] = true }
         } else
         { greedlyroll.appendDifftype[7](this.greedlyrollE[7].serveres, this.greedlyrollE[7]) }
      }
   };
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
         }
      });
      this.treestru.forEach(function(tree, idx) {
         var key = [].slice.call(tree.querySelectorAll('.mparent-key'));
         key[0].addEventListener('click', function(e) {
            util.tc(tree, 'visible');
         })
      });
   };
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
      util.restserve('get', greedlyroll.options.baseuri, greedlyroll.serveCallback.bind(this), [
         ['', navigatorMember],
         ['', greedlyroll.options.typekey[this.options.type]],
         greedlyroll.options.pageswitch[this.options.type] === 1 ? ['p', ++ this.index] : null
      ]);
   }

   greedlyroll.prototype.initEvents = function() {
      this.handleClick = this.show.bind(this);
      if (!! greedlyroll.options.pageswitch[this.options.type]) {
         this.rollbtn.addEventListener('click', this.handleClick);
      }
   }

   greedlyroll.serveCallback = function(res) {
      res = JSON.parse(res);
      if (res.success) {
         this.serveres = res.items;
         console.log(this.serveres)
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
      baseuri: '/proxy/hulaa',
      typekey: ['', 'cores', 'timeleaves', 'storynuts', 'collections', 'sweetcores', 'sweetfruxs', 'fooot', 'flower', 'follower', 'knock'],
      pageswitch: ['', 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
      isserved: ['', !!0, !!0, !!0, !!0, !!0, !!0, !!0, !!0, !!0, !!0],
      domid: ['', 'core-tab', 'time-tab', 'story-tab', 'collection-tab', 'sweetcore-tab', 'sweetfrux-tab', 'foot-tab', 'flower-tab', 'follower-tab', 'knock-tab'],
      holder: ['', 'div', 'ul', 'div', 'ul', 'ul', 'ul', 'div', 'ul', 'div', 'div'],
      SPEED_DOMAIN: 'http://naturelovefuture.com',
      PROJECT_ADDR: 'PROJECT', LIGHTP_ADDR: 'lPJT', TINYP_ADDR: 'tPJT',
      STORY_ADDR: 'STORY', LIGHTS_ADDR: 'lSTY', TINYS_ADDR: 'tSTY',
      TIME_ADDR: 'TIME', LIGHTT_ADDR: 'lTME', TINYT_ADDR: 'tTME',
      SEPARATOR_JOIN: '/', FULL_ADDR: [ , , , ],
      async: ['', 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
   };
   greedlyroll.initMap = function(fooot) {
      var typeColorMap = {
         'A': '#00a8cc', // 蓝色项目
         'B': '#fe346e', // 粉色故事
         'C': '#2b580c', // 深绿附近项目
         'D': '#be79df'  // 紫色附近故事
      };
      mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbmppYXpoaSIsImEiOiJjazE3b3BpNG0wODNkM3BydmJjaWx2bnNmIn0.wEwIwIpfIldJ055ZQvl4RQ';
      mapbox = new mapboxgl.Map({
         container: 'map',
         center: [56, 37],
         zoom: 1,
         style: 'mapbox://styles/mapbox/streets-v9'
      });
      fooot.forEach(function(item) {
         var coord, marker;
         coord = item.g.split(',');
         marker = new mapboxgl.Marker({
            color: typeColorMap[item.type]
         })
            .setLngLat([coord[0], coord[1]])
            .addTo(mapbox)
         ;
         marker._element.addEventListener('click', function() {
            location.href = '../bloom/' + item.id;
         })
         marker._element.style.cursor = 'pointer';
      });
      greedlyroll.options.isserved[this.options.type] = true;
   };
   greedlyroll.appendDifftype = [
      'RMS',
      function(cores, context) {
         var html = '';
         greedlyroll.options.FULL_ADDR[0] = greedlyroll.options.SPEED_DOMAIN;
         cores.forEach(function(core) {
            var id = core.authorId, path = core.addr, letter = core.letter, type = core.type, coord = core.coordinate, weather = core.weather, mood = core.mood, action = core.action, station = core.stationFormat, time = core.time, creator = core.author, creatorid = core.authorId,
               mediaHtml = '', titleHead = ''
            ;
            greedlyroll.options.FULL_ADDR[3] = path + '!hw864';
            greedlyroll.options.FULL_ADDR[2] = path.slice(32, 40);
            greedlyroll.options.FULL_ADDR[1] = greedlyroll.options.PROJECT_ADDR;
            path = greedlyroll.options.FULL_ADDR.join(greedlyroll.options.SEPARATOR_JOIN);
            if (path.endsWith('m4a') || path.endsWith('wav')) {
               mediaHtml = `<div class="snd-holder">
                              <a class="time-anchor effect-assis" style="display: block; height: 100%;" href="${path}" target="_blank"><span class="sound-holder"><span class="record"><span class="sound-arm"></span></span><span class="hole top"></span><span class="hole bottom"></span></span></a>
                           </div>`
               ;
               titleHead = mediaHtml;
            } else {
               mediaHtml = `<div class="img-holder">
                              <img class="title preview" data-src="${path}" src="${path}">
                           </div>`
               ;
               titleHead = mediaHtml;
            }
            html += '<div class="core-item">'
            html += `
               ${titleHead}
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
                  <span class="tailinfo-item"><a href="../../member/${creatorid}" target="_blanck">${creator}</a></span>
               </div>`
            ;
            html += '</div>';
         })
         util.appendh(context.resHolder, html);
      },
      function(times, context) {
         // this[1](times, context);
         var src, letter, time, weather, action, mood, like, talk, geo, member, memberId, html = '', mediaHtml = '';
         greedlyroll.options.FULL_ADDR[0] = greedlyroll.options.SPEED_DOMAIN;
         times.forEach(function(item) {
            src = item.timeMainpath;
            letter = item.timeLetter;
            time = greedlyroll.generateTime.formatDate(item.timeCreatetime);
            member = item.timeCreator;
            memberId = item.timeCreatorid;
            weather = item.timeWeather;
            action = item.timeAction;
            mood = item.timeMood;
            like = item.timeLike;
            talk = item.timeTalk;
            geo = item.timeGeolocation;
            greedlyroll.options.FULL_ADDR[2] = src.slice(32, 40);
            greedlyroll.options.FULL_ADDR[3] = src + '!hw150';
            greedlyroll.options.FULL_ADDR[1] = greedlyroll.options.TINYT_ADDR;
            title = greedlyroll.options.FULL_ADDR.join(greedlyroll.options.SEPARATOR_JOIN);
            greedlyroll.options.FULL_ADDR[1] = greedlyroll.options.TIME_ADDR;
            orititle = greedlyroll.options.FULL_ADDR.join(greedlyroll.options.SEPARATOR_JOIN);
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
                  <span class="tailinfo-item"><a href="../../member/${memberId}" target="_blank">${member}</a></span>
               </div>
            </li>
            `
         });
         util.appendh(context.resHolder, html);
      },
      function(stories, context) {
         var orititle, title, suffix, letter, weather, action, mood, time, creator, creatorName, id,
            i, j, k,
            html = '', storyDoms, ids = []
         ;
         greedlyroll.options.FULL_ADDR[0] = greedlyroll.options.SPEED_DOMAIN;
         stories.forEach(function(item, cursor) {
            suffix = item.storyMainpath;
            greedlyroll.options.FULL_ADDR[2] = suffix.slice(32, 40);
            greedlyroll.options.FULL_ADDR[3] = suffix + '!hw150';
            greedlyroll.options.FULL_ADDR[1] = greedlyroll.options.STORY_ADDR;
            title = greedlyroll.options.FULL_ADDR.join(greedlyroll.options.SEPARATOR_JOIN);
            greedlyroll.options.FULL_ADDR[3] = suffix;
            greedlyroll.options.FULL_ADDR[1] = greedlyroll.options.STORY_ADDR;
            orititle = greedlyroll.options.FULL_ADDR.join(greedlyroll.options.SEPARATOR_JOIN);
            id = item.storyId, letter = item.storyLetter, weather = item.storyWeather, action = item.storyAction, mood = item.storyMood, time = greedlyroll.generateTime.formatDate(item.storyCreatetime), creator = item.storyCreator, creatorName = '已知';
            if (title.endsWith('m4a') || title.endsWith('wav')) {
               mediaHtml = `<div class="snd-holder">
                              <a class="time-anchor effect-assis" style="display: block; height: 100%;" href="${orititle}" target="_blank"><span class="sound-holder"><span class="record"><span class="sound-arm"></span></span><span class="hole top"></span><span class="hole bottom"></span></span></a>
                           </div>`
               ;
            } else {
               mediaHtml = `<div class="img-holder">
                              <a class="time-anchor effect-assis" style="display: block; height: 100%;" href="${orititle}" target="_blank"><img class="title preview" data-src="${orititle}" src="${title}"></a>
                           </div>`
               ;
            }

            html += `
               <div class="story-item" id="s${id}">
               <div class="story-content">
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
                  ${mediaHtml}
               </div>
               <div class="tail-info">
                  <span class="tailinfo-item">${time}</span>
                  <span class="tailinfo-item"><a href="../../member/${creator}" target="_blanck">${creatorName}</a></span>
               </div>
               </div>
            `;
            ids.push(id);
         })
         storyDoms = util.appendh(context.resHolder, html);
      },
      function(collections, context) {
         var html = '';
         greedlyroll.options.FULL_ADDR[0] = greedlyroll.options.SPEED_DOMAIN;
         collections.forEach(function(item, cursor) {
            var title = '', orititle = '';
            greedlyroll.options.FULL_ADDR[2] = item.slice(32, 40);
            greedlyroll.options.FULL_ADDR[3] = item + '!hw150';
            greedlyroll.options.FULL_ADDR[1] = greedlyroll.options.TINYS_ADDR;
            title = greedlyroll.options.FULL_ADDR.join(greedlyroll.options.SEPARATOR_JOIN);
            greedlyroll.options.FULL_ADDR[1] = greedlyroll.options.STORY_ADDR;
            orititle = greedlyroll.options.FULL_ADDR.join(greedlyroll.options.SEPARATOR_JOIN);
            if (title.endsWith('m4a') || title.endsWith('wav')) {
               html += `<li class="snd-holder">
                           <a class="time-anchor effect-assis" style="display: block; height: 100%;" href="${orititle}" target="_blank"><span class="sound-holder"><span class="record"><span class="sound-arm"></span></span><span class="hole top"></span><span class="hole bottom"></span></span></a>
                        </li>`
               ;
            } else {
               html += `<li class="img-holder">
                           <a class="time-anchor effect-assis" style="display: block; height: 100%;" href="${orititle}" target="_blank"><img class="title preview" data-src="${orititle}" src="${title}"></a>
                        </li>`
               ;
            }
         })
         util.appendh(context.resHolder, html);
      },
      function(sweetcores, context) {
         var html = '';
         greedlyroll.options.FULL_ADDR[0] = greedlyroll.options.SPEED_DOMAIN;
         sweetcores.forEach(function(item, cursor) {
            var title = '', orititle = '';
            greedlyroll.options.FULL_ADDR[2] = item.corePath.slice(32, 40);
            greedlyroll.options.FULL_ADDR[3] = item.corePath + '!hw150';
            greedlyroll.options.FULL_ADDR[1] = greedlyroll.options.TINYP_ADDR;
            title = greedlyroll.options.FULL_ADDR.join(greedlyroll.options.SEPARATOR_JOIN);
            greedlyroll.options.FULL_ADDR[1] = greedlyroll.options.PROJECT_ADDR;
            orititle = greedlyroll.options.FULL_ADDR.join(greedlyroll.options.SEPARATOR_JOIN);
            if (title.endsWith('m4a') || title.endsWith('wav')) {
               html += `<li class="snd-holder">
                           <a class="time-anchor effect-assis" style="display: block; height: 100%;" href="${orititle}" target="_blank"><span class="sound-holder"><span class="record"><span class="sound-arm"></span></span><span class="hole top"></span><span class="hole bottom"></span></span></a>
                        </li>`
               ;
            } else {
               html += `<li class="img-holder">
                           <a class="time-anchor effect-assis" style="display: block; height: 100%;" href="${orititle}" target="_blank"><img class="title preview" data-src="${orititle}" src="${title}"></a>
                        </li>`
               ;
            }
         })
         util.appendh(context.resHolder, html);
      },
      function(sweetfruxs, context) {
         console.log(sweetfruxs);
         var html = '';
         sweetfruxs.forEach(function(item) {
            html += `
               <li class="frux-holder">
                  <div class="ftitle">${item.ftitle}</div>
                  <div class="ftime">${greedlyroll.generateTime.formatDate(item.time)}</div>
               </li>`;
         })
         util.appendh(context.resHolder, html);
      },
      function(fooot, context) {
         if (! util.hc(context.el, 'current')) { return }
         context.mbel = greedlyroll.initMap.bind(context, fooot);
         if (! (typeof mapboxgl === 'undefined')) {
            greedlyroll.options.isserved[context.options.type] = true;
            context.mbel();
            context.mbel = null;
         } else {
            window.addEventListener('load', context.mbel);
         }
      },
      function(flowers, context) {
         console.log(context.resHolder);
         var html = '';
         flowers.forEach(function(item, cursor) {
            console.log(item);
            html += `
               <li class="flower-item">
                  <div class="epic-wrapper">
                     <a href="/member/${item.id}/project">
                        <img src="${item.epic}">
                     </a>
                  </div>
                  <span><a href="/member/${item.id}/project">${item.name}</a></span>
               </li>
            `;
         })
         util.appendh(context.resHolder, html);
      },
      function(followers, context) {
         console.log(context.resHolder);
         var html = '';
         followers.forEach(function(item, cursor) {
            console.log(item);
            html += `
               <li class="follower-item">
                  <div class="epic-wrapper">
                     <a href="/member/${item.id}/project">
                        <img src="${item.epic}">
                     </a>
                  </div>
                  <span><a href="/member/${item.id}/project">${item.name}</a></span>
               </li>
            `;
         })
         util.appendh(context.resHolder, html);
      },
      function(tips, context) {
         var mhtml = '<ul class="tips">';
         tips.forEach(function(item, index) {
            console.log(item)
            var abooth = item.abooth,
               content = item.content,
               name = item.name,
               nid = item.nid,
               qbooth = item.qbooth,
               qcontent = item.qcontent,
               story = item.story,
               time = item.time
            ;
            mhtml += '<li class="chat-item" id="'+ `${story}_${abooth}` +'"><strong class="chat-header"><address><a href="/member/' + nid + '" target="_blank">' + name + ' - </address><span><time>' + greedlyroll.generateTime.formatDate(time) + '</time></span></strong><pre class="fragment">' + content + '</pre>' + '<pre class="fragment">' + qcontent + '</pre>' + '</li>';
         })
         mhtml += '</ul>';
         util.appendh(context.resHolder, mhtml);
      },
   ]
   greedlyroll.generateTime = {
      formatDate: function(timestamp)
      {
         var time = new Date(timestamp);
         var y = time.getFullYear();
         var m = time.getMonth()+1;
         var d = time.getDate();
         var h = time.getHours();
         var mm = time.getMinutes();
         var s = time.getSeconds();
         return y+'.'+this.addlei(m)+'.'+this.addlei(d)+' '+this.addlei(h)+':'+this.addlei(mm)+':'+this.addlei(s);
      },
      addlei: function(m){return m<10?'0'+m:m }
   }
   function extend(a, b) {
      for (var key in b) {
         if (b.hasOwnProperty(key)) {
            a[key] = b[key];
         }
      }
      return a;
   }
   var tb = new tabs(document.getElementById('tabs-attachment'), { start: 6 });
}());