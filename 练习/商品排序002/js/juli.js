let obj = (function(){

    function distance(ele){

        if(ele.nodeType === 1){ //判断是否是一个元素
            ele = ele;
        }else if(typeof ele === 'string'){
            ele = document.querySelector(ele);
        }else{
            return null;
        }
        //存目标元素的边框
        let  bLeft = ele.clientLeft;
        let  bTop = ele.clientTop;
        //给obj一个默认的left和top值为0
        let obj = {
            left:0,
            top:0
        }
        while(ele){
            obj.left +=ele.offsetLeft + ele.clientLeft;
            obj.top += ele.offsetTop + ele.clientTop;
            ele = ele.offsetParent;
        }
        obj.left -= bLeft;
        obj.top -= bTop;
        return obj;

    }

    
    return {
        distance
    };

})();

