

    function runder(data){
        let html = '';
    data.push(...data);
    data.forEach( (e) => {
    html += `
        <li>
        <img data-src="${e.img}" alt="">
        <span>${e.title}</span>
        <span>${e.time}</span>
        <span>${e.price}</span>
        <span>${e.hot}</span>
        </li>
        `;
});
    list.innerHTML = html; 

    }

    runder(data)
    //以上都是将数据重绘到页面上

    let lis = document.getElementsByTagName('li');
    // console.log(lis)
    
    
    let vH = window.innerHeight;  //获得可视区的高度
    // console.log(vH)
    let timer = null;
    let num =0;
    fn();
    window.onscroll = function(){
    clearInterval(timer);
    timer = setTimeout(function(){
        fn();
    },50);

    }

//获取点击按钮
    let btns = Array.from(document.querySelectorAll('.header a'));
    // console.log(btns)

    btns.forEach((e,i) => {
        // console.log(e)
        e.onclick = function(){
            data.sort((a,b) => {
               let kk = e.dataset.kk;//获取行间属性  
                if(kk  === 'time'){
                    return b[kk].replace(/-/g,'') - a[kk].replace(/-/g,'');
                }
                return b[kk] - a[kk];

            });


        }

        runder(data);


    });








//懒加载   
function fn(){

    for(let i =0;i<lis.length && num != lis.length;i++){
        // if(num = lis.length) return;
        let imgs = lis[i].getElementsByTagName('img')[0];
        if(lis[i].getBoundingClientRect().top <= vH){

            if(imgs.dataset.src){
                let img = new Image;
                img.src = imgs.dataset.src;
                // console.log(img.src)
                img.onload = function(){
                    imgs.src = imgs.dataset.src;
                    imgs.style.opacity = '1';
                    setTimeout(function(){
                        imgs.dataset.src = '';
                    },50);
                    num++;
                }
                img.onerror = function(){
                    imgs.src = './img/timg.jpg';
                    imgs.style.opacity = '1';
                    setTimeout(function(){
                        imgs.dataset.src = '';
                    },50);
                    num++;
                }
            }
        }
    }
}
