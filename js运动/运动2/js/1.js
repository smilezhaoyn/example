let movement = (

    function(){

        function move(obj){
            //opt是一个默认的配置，有配置就走配置，没有配置就走默认
            let opt = {
                ele:null, //box
                attr:{}, //对应的宽高这个对象
                duration:1000, //默认的总时间
                fx:'linear',//默认的运动方向
                callback:function(){}
            }
    
            //有配置就走配置，没有配置就走默认
            Object.assign(opt,obj);
    
    
            let j = {};
            let begin = 0;
            let time = 0;
            let re = /px|rem|em/;
            let unit = 'px';
            let timer = null;
    
            for(let i in opt.attr){
                if(typeof opt.attr[i] === 'string'){
                    begin = parseFloat(getComputedStyle(opt.ele)[i]); //获取开始的起始位置
                    unit = opt.attr[i].match(re) ? opt.attr[i].match(re)[0] : 'px';
                    j[i] = {
                        begin,
                        count:parseFloat(opt.attr[i]) - begin, //得到移动count的值
                        unit
                    }
                }else if(opt.attr[i].constructor === Object){
                    unit = opt.attr[i].count.match(re) ? opt.attr[i].count.match(re)[0] : 'px';
                    j[i] = {
                        begin:parseFloat(opt.attr[i].begin),
                        count:parseFloat(opt.attr[i].count) -parseFloat(opt.attr[i].begin),
                        unit
                    }
    
                }else{
                    begin = parseFloat(getComputedStyle(opt.ele)[i]);
                    j[i] = {
                        begin,
                        count:attr[i] - begin,
                        unit
                    }
    
                }
            }
    
            
            (function animate(){
                // console.log(1)
                timer = requestAnimationFrame(animate);
    
                time +=16.7;
                // console.log(time)
    
                if(time >= opt.duration) time = opt.duration;
    
                for(let m in j){
                    // console.log(m)

                        let v = Tween[opt.fx](time,j[m].begin,j[m].count, opt.duration);
                        // console.log(v)
    
                        opt.ele.style[m] = (m === 'opacity')? v : v + (j[m].unit ? j[m].unit : 'px'); 

                    // console.log(1)
    
                }
    
                if(time === opt.duration){
                    cancelAnimationFrame(timer);
                    opt.callback();
                }
    
    
            })();
    
        }

    return {
        move
    }


    }

    
)();


