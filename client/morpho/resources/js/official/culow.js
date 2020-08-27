;(function() {
    function cuteOverflow(el, options, elChild) {
        this.el = el;
        this.elChild = elChild;
        this.options = extend({}, this.OPTIONS);
        extend(this.OPTIONS, options);
        this.init();
    }
    
    cuteOverflow.prototype.OPTIONS = {
        speed: 1,
        clickswitch: true,
        stickysize : 236,
        reallystrid: undefined
    }
    
    cuteOverflow.prototype.init = function() {
        this.elRect = this.el.getBoundingClientRect();
        this.letter = this.el.innerText;
        if (this.reallystrid == null) { this.reallystring = this.elChild }
        else { this.reallystring = [].slice.call(this.el.querySelectorAll('#' + this.OPTIONS.reallystrid))[0] }
        this.rsscrollwidth = this.reallystring.scrollWidth - this.elRect.width;
        this.frontX = this.tailX = 0;
        this.book = false;
        // console.log(this.elRect)
        this.initEvents();
    }
    
    cuteOverflow.prototype.show = function() {
    
    }
    
    cuteOverflow.prototype.initEvents = function() {
        if (this.OPTIONS.clickswitch) { // 点击完整显示内容
            this.reallystring.addEventListener('click', cuteOverflow.eventHandler.clickPanel.bind(this));
        }
        this.el.addEventListener('mousemove', cuteOverflow.eventHandler.hoverMove.bind(this));
        this.el.addEventListener('mouseout', cuteOverflow.eventHandler.hoverOut.bind(this));
    }
    
    cuteOverflow.eventHandler = {
        clickPanel: function(event) {
            var stickyx, sticky;
            stickyx = event.clientX;
            sticky = event.clientY;
            console.log(event);
            cuteOverflow.stickyGenerator(stickyx, sticky, this.letter, this.OPTIONS.stickysize);
        },
        hoverMove: function(event) {
            this.frontX = event.clientX - this.elRect.left;
            // this.reallystring.style.filter = 'url("#blur")';
            if (! this.book) {
                this.book = true;
                this.tailX = this.frontX;
                cuteOverflow.framefn.call(this);
            }
            // console.log(`event.offsetX = ${event.offsetX}, event.clientX = ${event.clientX}`);
        },
        hoverOut: function(event) {
            // this.reallystring.style.filter = 'none';
            // alert('hey');
            this.book = false;
        }
    }
    
    cuteOverflow.framefn = function() {
        if (! this.book) { return ; }
        var dPosition = (this.frontX - this.tailX) * this.rsscrollwidth / this.elRect.width;
        var tailposition = this.tailX * this.rsscrollwidth / this.elRect.width;
        tailposition += dPosition;
        this.tailX = this.frontX;
        this.reallystring.style.transform = `translateX(-${tailposition}px)`;
        // if (dPosition === 0) {
        //     this.book = false;
        //     return ;
        // }
        requestAnimationFrame(cuteOverflow.framefn.bind(this));
        // } {
        //     this.book = false;
        // }
    }
    
    cuteOverflow.stickyGenerator = function(x, y, content, SIZE) {
        var html = '', div = document.createElement('div'),
            frag = document.createDocumentFragment(),
            cutipEl = document.getElementById('cutip'),
            windowX = window.innerWidth,
            leftX = x, rightX = windowX - x
        ;
        if (cutipEl != null) { return }
        if (windowX > SIZE * 2) {
            if (leftX > SIZE) { x -= SIZE; }
        } else if (windowX > SIZE) {
            x = (windowX - SIZE) / 2;
        } else {
            SIZE = windowX;
            x = 0;
        }
        html = `
            <div id="cutip" onclick="var cutipEl = document.getElementById('cutip');document.documentElement.removeChild(cutipEl)" style="position: absolute; width: ${SIZE}px; height: auto; background-color: #f5e7cc; border: 1px solid #cab379; color: #634a13; box-sizing: border-box; padding: 7px; border-radius: 3px; font-size: 14px; left: ${x}px; top: ${y}px; cursor: pointer; z-index: 36;">
                ${content}
            </div>
        `;
        div.innerHTML = html;
        while (div.firstChild) {
            console.log(div.firstChild);
            frag.appendChild(div.firstChild);
        }
        console.log(frag);
        document.documentElement.appendChild(frag);
    }
    
    // var cof1 = new cuteOverflow(document.getElementById('unwell-point'), {
    //     clickswitch: true
    // }, document.getElementById('really-string'));
    window.cuteOverflow = cuteOverflow;

    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }
})()