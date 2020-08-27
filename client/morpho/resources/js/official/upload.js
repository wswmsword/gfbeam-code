(function () {
   var fileInput = document.getElementById('file'),
   previewHolder = document.getElementById('preview-holder'),

   stateItems = document.getElementsByClassName('project-state')[0],
   redItems = [].slice.call(document.querySelectorAll('.red .state-item')),
   greenItems = [].slice.call(document.querySelectorAll('.green .state-item')),
   blueItems = [].slice.call(document.querySelectorAll('.blue .state-item')),
   pr = 3, pg = 3, pb = 3, // 状态的初始值
   offsetPixel = [-144, -108, -72, -36, 0, 36, 72, 108, 144], // 预存储移动至 5 个位置需要多少像素

   btnPublish = document.getElementById('publish'),
   title = document.getElementById('title'),
   previewModel,
   
   colorfulBoxes = document.getElementsByClassName('cbox-inner'),
   formLongitude = document.getElementById('longitude'),
   formLatitude = document.getElementById('latitude'),
   controlEle = document.getElementById('control'),
   ignoreEle = document.getElementById('ignore'),
   ignorelayerEle = document.getElementById('ignore-ceiling'),
   formLetter = document.getElementById('letter'),
   cache = createCache(),
   bucket = new upyun.Bucket('morpho'),
   client = new upyun.Client(bucket, () => {}),
   map,
   variableCherries = {

   },
   constLychees = {
      member: util.cookie.get('MEM'),
      node: decodeURIComponent(location.pathname.slice(location.pathname.lastIndexOf('/') + 1)),
      prevpage: util.cookie.get('PREV_LOCATION'),
   },
   copyLemons = {
      event: {

      },
      server: {
         membership: {
            login: {
               verify: '当前是非成员状态，请先登录:)',
            }
         },
         loading: '加载中……载中……中……'
      },
   };

   client.setBodySignCallback((bucket, serve) => {
      var method = 'POST';
      var params = 'bucket=' + bucket.bucketName + '&method=' + method + '&file=' + serve['filename'] + '&md5=' + serve['md5']
      return fetch('/proxy/project/getformapi?' + params + '&type=PJT')
         .then(function (response) {
            if (response.status !== 200) {
               console.error('gen header sign faild!')
               return;
            }
            return response.json()
         })
         .then(function(data) {
            return Promise.resolve(data);
         })
   })

   var functiongrapes = {
      eventCallback: {
         locationClickHandler: function() {
            // lon = formLongitude.value, lat = formLatitude.value;
            map.flyTo({ center: [formLongitude.value, formLatitude.value], zoom: 13, pitch: 0 });
         },
         ignoreClickHandler: function(event) {
            util.tc(ignorelayerEle, 'show');
         },
         publishClickHandler: function() {
            var lon = '', lat = '', isIgnore = false, data, file;
            // 判断：填写信息是否存在空值；位置信息是否忽略；位置信息格式的合法性
            if (constLychees.member == null || constLychees.member === '') { alert(copyLemons.server.membership.login.verify); return ; }
            if (! (fileInput.value)) {
               alert('There\'s nothing in box.')
               return;
            }
            if (util.hc(ignorelayerEle, 'show')) { isIgnore = true }
            if (! isIgnore) {
               lon = formLongitude.value, lat = formLatitude.value;
               if (! util.coordckr(lon, lat)) { alert('位置信息填写有误，请检查；）'); return ; }
            }
            data = new FormData(),
            file = fileInput.files[0];
            console.log(fileInput.files[0].size);
            console.time('upload');
            browserMD5File(file, function (err, md5) {
               client.formPutFile('/PROJECT', file, {filename: file.name, md5: md5.toUpperCase()})
               .then(res =>
               {
                  if (res.code === 200)
                  {
                     console.log('======= UPYUNTIME =======');
                     console.timeEnd('upload');
                     multiAppend(data, {
                        f: res.url.slice(res.url.lastIndexOf('/') + 1),
                        o: isIgnore ? 1 : 0,
                        j: lon,
                        w: lat,
                        n: constLychees.node,
                        l: filterXSS(formLetter.value),
                        r: pr,
                        g: pg,
                        b: pb,
                     });
                     return functiongrapes.serverCallback.promise.afterUploadingUpyun(data)
                  }
                  else { alert('文件上传失败，传输服务器错误:('); throw new Error('morpho ERROR'); }
               })
               .then(res => {
                  if (res.success) {
                     alert('已记录:)');
                     if (constLychees.prevpage == null) { location.href = "/" }
                     else { location.href = constLychees.prevpage }
                  }
                  else { alert('记录过程发生错误:(') }
               })
               .catch(err => {
                  console.log('条目记录失败，数据服务器错误:(')
               });
            });
         },
         stateColorDotClickHandler: function(e) {
            var target = e.target,
            parent = target.parentNode,
            dataI, length, i, offset;
            dataI = target.dataset['i'];
            if (util.hc(parent, 'red')) {
               pr = functiongrapes.common.selectState(target, parent, redItems, pr);
            } else if (util.hc(parent, 'green')) {
               pg = functiongrapes.common.selectState(target, parent, greenItems, pg);
            } else if (util.hc(parent, 'blue')) {
               pb = functiongrapes.common.selectState(target, parent, blueItems, pb);
            }
         },
         previewHolderClickHandler: function(e) {
            if (util.hc(e.target, 'btn-remove')) {
               fileInput.value = '';
               util.rc(previewHolder, 'open');
               previewModel.style.display = 'none';
               // previewHolder.style.height = '163px';
               open = 1;
      
               return;
            }
            fileInput.click();
         },
         fileiptChangeHandler: function(e) {
            var file;
            if (previewModel != null) {
               previewModel = document.getElementsByClassName('preview-model')[0];
               console.log(previewModel)
            }
            open = 0;
            if (!fileInput.value) {
               return;
            }
            file = fileInput.files[0];
      
            if (file.type !== 'image/jpeg' && file.type !== 'image/png'
               && file.type !== 'audio/wav' && file.type !== 'audio/x-m4a') {
               alert('Please check the type of file.');
               return;
            }
            previewHolder.style.height = 'auto';
            util.ac(previewHolder, 'open');
            var reader = new FileReader(),
               data
            ;
            reader.type = file.type;
            reader.onload = function (e) {
               data = e.target.result;
               if (previewModel !== undefined) {
                  previewModel.style.display = 'block';
                  previewModel.src = data;
                  // var c = window.setInterval(function(){
                  //    if (previewModel.complete)
                  //    {
                  //       clearInterval(c);
                  //    }
                  // }, 16);
               } else {
                  
                  if (this.type === 'audio/wav' || this.type === 'audio/x-m4a') {
                     var audio = document.createElement('audio');
                     audio.controls = true;
                     audio.src = data;
                     previewHolder.append(audio);
                     previewModel = audio;
                     return ;
                  }
                  
                  var image = document.createElement('img');
                  image.className = 'preview-model';
                  image.src = data;
                  previewHolder.append(image);
                  previewModel = image;
                  // var c = window.setInterval(function(){
                  //    if (image.complete)
                  //    {
                  //       clearInterval(c);
                  //    }
                  // }, 16);
               }
            };
            reader.readAsDataURL(file);
         },
      },
      serverCallback: {
         promise: {
            afterUploadingUpyun: function(data) {
               return new Promise((resolve, reject) => {
                  util.restserve('post', '/proxy/project/publish0f', functiongrapes.serverCallback.postCorePublish.bind(this, resolve, reject), data);
               })
            },
         },
         postCorePublish: function(resolve, reject, res, context) {
            res = JSON.parse(res);
            if (res.success) { resolve(res) }
            else { reject() }
         }
      },
      common: {
         generateColorfulBoxes: function() {
            var myProper = ['width', 'height'], random1, random2, i, l = colorfulBoxes.length;
            for (i = 0; i < l; ++ i) {
               random1 = Math.floor(Math.random()*2);
               random2 = Math.floor(Math.random()*150);
               colorfulBoxes[i].style[myProper[random1]] = random2 + 'px';
            }
         },
         selectState: function(target, parent, items, pI) {
            var length, i, offset;
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
         },
      },
   }
   init();
   function initEvents() {
      ignoreEle.addEventListener('click', functiongrapes.eventCallback.ignoreClickHandler);
      btnPublish.addEventListener('click', functiongrapes.eventCallback.publishClickHandler);
      stateItems.addEventListener('click', functiongrapes.eventCallback.stateColorDotClickHandler);
      previewHolder.addEventListener('click', functiongrapes.eventCallback.previewHolderClickHandler);
      fileInput.addEventListener('change', functiongrapes.eventCallback.fileiptChangeHandler);
      controlEle.addEventListener('click', functiongrapes.eventCallback.locationClickHandler);
   }
   function loadData() {
      functiongrapes.common.generateColorfulBoxes();
      window.addEventListener('load', function(e) {
         mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbmppYXpoaSIsImEiOiJjazE3b3BpNG0wODNkM3BydmJjaWx2bnNmIn0.wEwIwIpfIldJ055ZQvl4RQ';
            map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9'
         });
      })
   }
   function init() {
      loadData();
      initEvents();
   }

   function multiAppend(data, obj) {
      var key;
      for (key in obj) {
         if (obj.hasOwnProperty(key)) {
            data.append(key, obj[key]);
         }
      }
   }

   function createCache() {
      var data = {};
      data.prevType = 0;
      return {
         prevType: function() {
            return data.prevType;
         },
         setPrevType: function(v) {
            data.prevType = v;
         }
      }
   }

   title.innerHTML = '🌠 ' + '本条核心条目发布在名称是“' + constLychees.node + '”的结点中';
   document.getElementById('repo-potal').href += constLychees.node;
})();