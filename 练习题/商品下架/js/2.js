(function(){

    class Goodes {
        constructor(ele){
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
        }
        init(enE){
            this.txtGet();
            this.event(enE);
            // this.shelves();
        }
        txtGet(){
            // console.log(this.time.value)
            let txt = this.time.value;
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
        }
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

                        this.list.innerHTML += `<li style="background:#fff">
                        
                        <div class="li11">商品${this.h5.innerHTML}</div>
                        <div class="li22">价格${this.price.innerHTML}</div>
                        <div class="li33"><img src="${this.img.src}"></div>    
                        </li>`
                        // console.log(this.img.src)
                    }
                    // console.log(this)
                    // console.log(1)
                },1000);
            }
            
        }
        Shij(){
            this.spans.forEach((e,i)=> {
                e.innerHTML = this.str[i];
                // console.log(e.innerHTML)
            });
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