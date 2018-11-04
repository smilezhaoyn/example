(function(){
    
    function Goodes(ele){
        this.ele =ele;
        this.time = this.ele.getElementsByClassName('inputdate')[0];  
        this.h5 = this.ele.getElementsByTagName('h5')[0];
        // console.log(this.h5)
        this.price = this.ele.getElementsByClassName('price')[0];
        // console.log(this.price)
        this.img = this.ele.getElementsByTagName('img')[0];
        // console.log(this.img)
        this.btn = this.ele.getElementsByClassName('btn')[0];
        // console.log(this.btn)
        this.p = this.ele.getElementsByClassName('times')[0];
        this.spans = Array.from(this.p.getElementsByTagName('span'));
        // console.log(this.spans)
        this.str = '';
        this.timer = null;
        this.bg = this.ele.getElementsByClassName('bg')[0];
        this.big = this.ele.getElementsByClassName('big-c')[0];
        this.footer = document.getElementById('footer');
        this.list = this.footer.getElementsByClassName('list')[0];
        this.li1 = this.list.getElementsByClassName('li1')[0];
        this.li2 = this.list.getElementsByClassName('li2')[0];
        this.li3 = this.list.getElementsByClassName('li3')[0];
        this.zong = document.getElementsByClassName('zong')[0];
        this.con = this.zong.getElementsByTagName('span')[0];
    }

    Goodes.prototype = {
        init(enE){
            this.txtGet();
            this.event(enE);
            // this.shelves();
        },
        /*
         txtGet()
         获取到倒计时差的时间  并且将H\M\T    return出去 方便外边使用
        */ 
       txtGet(){
        // console.log(this.time.value)
            txt = this.time.value;
            // console.log(txt);
            let nowDate = new Date();
            let newDate = new Date(txt);
            // console.log(newDate)
            let  t =(newDate -nowDate)/1000;
            let D = Math.floor(t/86400);
            let H = Math.floor(t/3600);
            t%=3600;
            let M = Math.floor(t/60);
            t%=60;
            let T = Math.floor(t)
            function toD(n){
                return n<10 ? '0'+n:''+n;
            }
            this.str = toD(H) +toD(M) +toD(T);
            // console.log(this.str);

            return {
                H,
                M,
                T
            }
        },

        /*
        event(enE)点击事件
        点击时候 调用this.txtGet()方法
        */
       event(enE){
        this.btn[enE] =() =>{
            // console.log(this.img)
            // console.log(1);
            this.txtGet();
            // console.log(this)
            // console.log(this.str)

            this.timer = setInterval(() =>{
                this. txtGet();
                this.Shij();
                let a = this.txtGet();
                // console.log(a.H)
                // console.log(a.H == '00' && a.M == '00' && a.T == '00')
                if(a.H <= '00' && a.M <= '00' && a.T <= '00'){
                    clearInterval(this.timer);
                    this.str = '000000';
                    this.bg.style.display = 'block';
                    this.big.style.visibility = 'visible';
                    this.big.style.transform = 'scale(1)';
                    this.Dou(this.ele,'left',20,2)
                    this.list.innerHTML += `<li class="bs">
                    
                    <div class="li11">${this.h5.innerHTML}</div>
                    <div class="li22">${this.price.innerHTML}</div>
                    <div class="li33"><img src="${this.img.src}"></div>    
                    </li>`
                    // console.log(this.img.src)
                    this.geh();
                    this.he();
                    
                    
                }
                // console.log(this)
                // console.log(1)
            },1000);
        }
        
        },
        
        //将获取的到的时间差  依次放入到span中
        Shij(){
            this.spans.forEach((e,i)=> {
                e.innerHTML = this.str[i];
                // console.log(e.innerHTML)
            });
        },
        //隔行变色
        geh(){
            this.li = this.list.getElementsByTagName('li');
            // this.Dou(this.li,'top',80,2);
            // console.log(this.li)
           for(let i =1;i<this.li.length;i++){
           this.li[i].className = (i%2 == 1)?'bs geh':'bs geh1';
           }
        },
        he(){
            this.li22 = this.list.getElementsByClassName('li22');
            // console.log(this.li22)
            let arr = Array.from(this.li22)
            // console.log(arr)
            let num = 0;
            arr.forEach((e,i) => {
                let pri = Number(e.innerHTML.replace(/¥/,''));
                num += pri;
            });
            this.con.innerHTML = `总花费：￥${num}`;

            // let pri = Number(this.li22.innerHTML.replace(/¥/,''));  //获取到价格

            // console.log(this.li22.innerHTML.replace('¥',''))
        },

        Dou(ele,attr,n,pl,callback){
            //创建抖的数据
            let arr = [],timer = null,num = 0
            ,init = parseInt( getComputedStyle(ele)[attr] );
            for(let i=n; i>0 ;i-=pl){
                arr.push(-i,i);
            }
            arr.push(0);
        
            timer = setInterval(function(){
                ele.style[attr] = init + arr[num] + 'px';
                num ++;
                if(num >= arr.length){
                    clearInterval(timer);
                   callback && callback();
                }
            },16);
            
            // console.log(arr);
        }

    

    }


    const lis = document.getElementsByTagName('li');
    let btns = Array.from(document.getElementsByClassName('btn'));
    // console.log(btns)
    btns.forEach((e,i) => {
        let c = new Goodes(lis[i]);
        c.init('onclick');
    })


    window.Goodes = Goodes;
})();
