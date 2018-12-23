
class Cloud {
    constructor(){
        function $(ele){
            return document.querySelector(ele);
        }
        //打印
        let  {log:g,dir} = console;
        this.g = g; //是一个打印
        //
        this.num = 0;
        // this.obj = Object.assign({},data);
        this.data = data;
        this.folders = $('.folders');
        this.rename = $('#rename');
        this.del = $('#del');
        this.breadNav = $('.bread-nav');
        this.navLeft = $('.nav_left'); 
        this.create = $('#create'); //新建文件夹
        this.refresh = this.navLeft.children[6];  //刷新
        this.treeMenu = $('.tree-menu');
        this.con = '';
        this.head = $('#head');
        this.section = $('#section');
        this.checkall = $('.checkall');
        this.checkedAll = $('#checkedAll');
        // this.g(this.checkedAll)
        this.iH = window.innerHeight; //可视区的高度
        this.fEmpty = $('.f-empty');
        this.M = this.move.bind(this);
        this.U = this.up.bind(this);
        this.Block = $('.Block');

        
    }
    init(){
        this.ArrayD();
        this.create.addEventListener('click',this.newFolder.bind(this));
        this.createCon();
        this.Height();
        this.selected();
    }
    //下边section  的高度 
    Height(){
        this.headH = this.head.offsetHeight;
        this.section.style.height = this.iH -this.headH + 'px';
    }
    //加事件
    Event(){
        this.fileItem = Array.from(document.getElementsByClassName('file-item'));
        this.refresh.addEventListener('click',this.Refresh.bind(this));
        // this.checkedAll.addEventListener('click',this.Checkall.bind(this));//全选5
        this.fileItem.forEach((e,i) =>{
            e.addEventListener('click',this.Click.bind(this,e));
            e.addEventListener('dblclick',this.Dblclick.bind(this,i));
            e.onOff = true;  
        });


    }
    //数据
    ArrayD(a=-1){
        this.arr = [];
        for(let attr in this.data){
            if(this.data[attr].pid === a){
                this.arr.push(this.data[attr]);
            }

        }
        this.xuanran();
        this.Event();
    }
    //渲染
    xuanran(){
        this.html = '';
        if(!this.arr.length){
            this.fEmpty.style.display = 'block';
        }else{
            this.arr.forEach( (e) =>{
                this.fEmpty.style.display = 'none';
                //class="checked"打对勾
                this.html += `
                <div class="file-item" data-index= "${e.id}">
                    <img src="img/folder-b.png" alt="" />
                    <span class="folder-name">${e.title}</span>
                    <input type="text" class="editor"/>
                    <i></i>
                </div>
                `;
            });
            this.folders.innerHTML = this.html;
        }
        
    }
    //单击事件

    Click(e){
        // console.log(e.onOff)
        if(e.onOff){
            e.className = 'file-item active';
            e.children[3].className = 'checked';
            e.onOff = !e.onOff;

        }else{
            e.className = 'file-item'
            e.children[3].className = '';
            e.onOff = !e.onOff;   
        }
        if(e.children[3].className != ''){
            this.rename.addEventListener('click',this.Rename.bind(this,e));
            document.addEventListener('keydown',this.Keydown.bind(this,e));
            this.del.addEventListener('click',this.Del.bind(this,e));
            //e.dataset.index行间属性
        } 
        
    }
    //双击事件
    Dblclick(i){
        this.Dhtiao(this.arr[i].id);
        this.ArrayD(this.arr[i].id);
    }

    //选框

    selected(){
        this.folders.addEventListener('mousedown',this.down.bind(this));
    }

        //down的方法
        down(ev){
            this.L = ev.pageX;
            this.T = ev.pageY;
            this.folders.addEventListener('mousemove',this.M); 
            document.addEventListener('mouseup',this.U);
            // let div = document.createElement('div');
            // div.className = 'Block';
            // body.appendChild(div);
            // this.Block = document.getElementsByClassName('Block')[0];
            // ev.preventDefult();
        }
        move(ev){
            let MoveL = ev.pageX;
            let MoveT = ev.pageY;
            let a = this.folders.offsetLeft;
            let b = this.folders.offsetTop;
            let minL = Math.min(MoveL,this.L);
            let minT = Math.min(MoveT,this.T);
            this.Block.style.left = minL + 'px';
            this.Block.style.top = minT + 'px';
            this.Block.style.width = Math.abs(MoveL-this.L) + 'px';
            this.Block.style.height = Math.abs(MoveT-this.T) + 'px';
            this.collision();
    
        }
        up(){
            this.folders.removeEventListener('mousemove',this.M);
            document.removeEventListener('mouseup',this.U);
            this.Block.style.width = this.Block.style.height = 0;
            this.Block.style.left = this.Block.style.top = 0;

            
            // this.Block.remove();
        }
        //全局点击取消选中
        Quan(){
            // console.log(1)
            // this.fileItem.children[3].className = '';
            // this.fileItem.className = 'file-item';
        }
        //碰撞选中
    
        collision(){  //对勾
            this.fileItem.forEach((e,i)=>{
                 //得到了每一个块的各边距离
                let {left,top,right,bottom} = e.getBoundingClientRect();
                let {left:Yleft,top:Ytop,right:Yright,bottom:Ybottom} = this.Block.getBoundingClientRect();
                if(left > Yright || top > Ybottom || right < Yleft || bottom < Ytop){
                    e.children[3].className = '';
                    e.className = 'file-item';
                }else{
                    e.children[3].className = 'checked';
                    e.className = 'file-item active';
                    e.onOff = false;
                }
                this.folders.addEventListener('click',(ev)=>{
                    if(!this.targetParent(ev.target)){
                        e.children[3].className = '';
                        e.className = 'file-item';
                        e.onOff = false;
                    }
                   
                    

                });
            });    
        }
        targetParent(ele){

            if(ele.classList.contains('file-item'))return true;

            return ele.parentNode.classList.contains('file-item')?true:false;
        }

       
    











    //全选
    // Checkall(){

    //     this.fileItem.forEach((e) =>{
    //         console.log(e.onOff)

    //     });

    //     // if(){

    //     // }
    // }

    //重命名
    Rename(e){
        e.children[2].style.display = 'block';
        e.children[2].value = e.children[1].innerHTML;
        e.children[1].style.display = 'none';
        e.children[3].className = '';
        let txt = e.getElementsByTagName('input')[0];
        txt.addEventListener('click',this.Fouse.bind(this));
        txt.addEventListener('dblclick',this.Shuangj.bind(this));
        txt.addEventListener('blur',this.Blur.bind(this,e));
        // console.log(txt)
        txt.select();
    }
    //点击文本框的时候
    Fouse(ev){
        ev.cancelBubble = true;
    }
    //点击文本框双击的时候   阻止冒泡
    Shuangj(ev){
        ev.cancelBubble = true;
    }
    //键盘F2
    Keydown(e,ev){
        // console.log(e)
        // if(ev.keyCode === 113){
        //     this.Rename(e);
        // }
        switch(ev.keyCode){
            case 113:
            this.Rename(e);
            break;
            case 46:
            this.Del(e);
            break;
        }
    }

    //Blur失去焦点的时候
    Blur(e){
            //可以用for  in操作data
        // for(let attr in this.data){
        //     if(e.dataset.index == this.data[attr].id){
        //         this.data[attr].title = e.children[2].value;
        //     }
        // }

        //可以用arr操作
        this.arr.forEach( (ele) =>{
            if(e.dataset.index == ele.id){
                ele.title = e.children[2].value;
            }
        });
        this.xuanran();
        this.Event();
        this.treeMenu.innerHTML= '';
        this.num = 0;
        this.createCon();
        // this.g(e.children[2].value);
    }

    //删除
    Del(e){
        this.arr.forEach((ele,i) =>{
            if(e.dataset.index == ele.id){
                this.arr.splice(i,1);
                delete this.data[e.dataset.index];
            } 
        });
        this.xuanran();
        this.Event();
        this.treeMenu.innerHTML = '';
        this.num = 0;
        this.createCon();
        // this.g(this.arr)
    }

    //通过ID找PID  
    parent(id){
        if(!data[id] || data[id].pid == -1) return null;
        return data[data[id].pid]  //找到当前父级的数据
    }

    //找父级的父级
    getParents(id){
        let ParentArr = [];
        let now = data[id];  //当前的ID
        while(now){
            ParentArr.unshift(now);
            now = this.parent(now.id);
        }

        return ParentArr;
    }

    //点击上边出现进去的文件夹名称

    Dhtiao(id){
                // this.breadNav.innerHTML += `
                // <a href="javascript" class="xian">${this.arr[i].title}</a>`;
                // let a = Array.from(this.breadNav.getElementsByTagName('a'));
                // let b = a[0];
                // a.forEach( (e,i) =>{
                //     b.className = '';
                //     a[i].className = 'xian';
                //     b = a[i];
                // });
                this.breadNav.innerHTML = '';
                let arr = this.getParents(id)
                console.log(arr)
                if(arr){
                    arr.forEach( (e,i,all) =>{
                        console.log(i,all.length-1)
                        if(i!=(all.length-1)){
                            let a = document.createElement('a');
                            a.innerHTML = e.title;
                            a.href = 'javascript:;';
                            this.breadNav.appendChild(a);
                            a.addEventListener('click',this.Dhclick.bind(this,e.id));
                        }else{
                            let span = document.createElement('span');
                            span.innerHTML = e.title;
                            this.breadNav.appendChild(span);
                        }
                    });
                }
                
    }

    Dhclick(id){
        this.ArrayD(id);
        this.Dhtiao(id);
    }


    //Refresh刷新
    Refresh(){
        // parent.location.replace(parent.location.href);//服务器端重新创建页面 
        parent.document.location.reload();//相当于F5 
        // window.location.href(parent.location.href);//iframe内容重定向 
    }
    //新建文件夹
    newFolder(){
        this.html += `
        <div class="file-item" data-index= "${new Date}">
            <img src="img/folder-b.png" alt="" />
            <span class="folder-name"></span>
            <input type="text" class="editor" value= "新建文件夹"/ style="display:block">
            <i></i>
        </div>
        `;
        this.folders.innerHTML = this.html;
        let txt1 = Array.from(document.getElementsByClassName('editor'));
        console.log(txt1)
        txt1.forEach((e)=>{
            e.select();
        });
        // txt1.select();
        

    }
    // leftDOM树
    Menu(pid){
        // console.log(this.data)
        this.num += 7;
        let con = `<ul style="margin-left:${this.num}px">`;
        for(let attr in this.data){ 
            if(this.data[attr].pid == pid){

                con += `<li>
                <div class="tree-title tree-ico close">
                    <span>`;
                if(this.getChild(this.data[attr].id).length>0){
                    con += `<i></i>`;
                }    
                con +=`${this.data[attr].title}</span>
                </div>
                ${this.Menu(this.data[attr].id)}
                </li>`;
                // for(let i in this.obj){
                //     if(this.obj[i].pid == this.obj[attr].id){
                //         // this.con += this.Menu(this.obj[i].pid);
                //         // delete this.obj[i];
                //     }
                // }
                // con += '';
            }
        }
        con += '</ul>';

        return con;
    }

    //将多级菜单填充到页面中
    createCon(){
        this.treeMenu.innerHTML = this.Menu(-1);
        
    }
    //查看有没有子级
    getChild(id){
        if(!this.data[id]) return null;
        let arr = [];
        for(let attr in this.data){
            if(this.data[attr].pid === id){
                arr.push(data[attr])
            }
        }
        return arr;
    }






















}

let  p = new Cloud();
    p.init();