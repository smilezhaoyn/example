    let html = '';
    data.push(...data);
//    data = data.concat(data)
//循环生成结构
    data.forEach(e => {
        html += `
        <li>
        <img _src="${e.img}" alt="">
        <span>${e.title}</span>
        <span>${e.time}</span>
        <span>${e.price}</span>
        <span>${e.hot}</span>
        </li>
        `;
    });
    
    list.innerHTML = html;

    //获取每一个li的绝对位置

    let lis = document.getElementsByTagName('li');
    let timer =null;
    let num = 0;
    //计算一下每一个li到顶部的距离
    for(let i =0;i<lis.length;i++){
        lis[i].top = obj.distance(lis[i]).top;
        // console.log(lis[i].top) //得到每一个li到顶部的距离
    }

    let Vis = window.innerHeight; //获得可视区的高度
    pic();
    window.onscroll = function(){ //滚轮时候，要看一下哪些图片该显示
        // pic();
        clearTimeout(timer);
        timer = setTimeout(()=>{
            pic();
        },100);

    }

    function pic(){
        for(let i=0;i<lis.length && num !=lis.length;i++){
            let img = lis[i].getElementsByTagName('img')[0];
            console.log(img)
            //window.pageYOffset + Vis 可视区的距离 + 滚动的距离，
            //看是否大于li到顶端的距离.如果大于了，就让图片显示出来
            if((window.pageYOffset + Vis)>=lis[i].top){
                //看img上边有没有_src这个属性
                if(img.getAttribute('_src')){

                    let img1 = new Image;
                    let linkPic = img.getAttribute('_src');
                    img1.src = linkPic;

                    img1.onload = function(){ 

                    img.src = img.getAttribute('_src');
                    img.style.opacity = 1;
                    img.removeAttribute('_src');
                    num ++;
                    console.log(num)
                    }

                    img1.onerror = function(){

                        img.src = './img/timg.jpg';
                        img.style.opacity = 1;
                        img.removeAttribute('_src');
                        num ++;

                    }
                    // img.src = img.getAttribute('_src');
                    // img.style.opacity = 1;
                    // img.removeAttribute('_src');
                    
                    // console.log(img.src)
                }
            }

        }
    }