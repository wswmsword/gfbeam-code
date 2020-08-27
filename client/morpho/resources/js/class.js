(function(window){
    function classreg(classname){
        return new RegExp("(^|\\s+)"+classname+"(\\s+|$)");
    }
    var hasclass,addclass,removeclass;
    if('classList' in document.documentElement){
        hasclass=function(e,c){
            return e.classList.contains(c);
        };
        addclass=function(e,c){
            e.classList.add(c);
        };
        removeclass=function(e,c){
            e.classList.remove(c);
        };
    }else{
        hasclass=function(e,c){
            return classreg(c).test(e.className);
        };
        addclass=function(e,c){
            if(!hasclass(e,c)){
                e.className=e.className+' '+c;
            }
        };
        removeclass=function(e,c){
            e.className=e.className.replace(classreg(c),' ');
        };
    }
    function toggleclass(e,c){
        var fn=hasclass(e,c)?removeclass:addclass;
        fn(e,c);
    }
    var co={
        hasclass:hasclass,
        addclass:addclass,
        removeclass:removeclass,
        toggleclass:toggleclass
    };
    window.co=co;
})(window);