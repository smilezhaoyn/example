class Per {
    constructor(){
        function $(ele){
            return document.querySelector(ele);
        }
        this.iH = window.innerHeight;//可视区的高度
        this.head = $('#head'); 
        this.headH = this.head.offsetHeight;
        this.data = data;
        this.section = $('#section');//下边内容ID
        this.fEmpty = $('.f-empty'); //没有文件夹就显示没有的图片
        this.folders = $('.folders'); //填充内容的大盒子

        this.breadmenu =$('.breadmenu');  //面包屑外边大盒子
        this.breadNav = $('.bread-nav');  //面包屑
        this.navLeft = $('.nav_left'); //刷新
        this.refresh = this.navLeft.children[6];
        this.rename = $('#rename'); //重命名
        this.Block = $('.Block'); //块
        this.M = this.move.bind(this);
        this.U = this.up.bind(this);
        this.checkedAll = $('#checkedAll'); //全选
        this.del = $('#del'); //删除
        this.tanbox = $('#tanbox'); //删除时候  出现一个弹框
    }

    init(){
        this.selected();
        this.Height();
        this.ArrayA(-1);
        this.refresh.addEventListener('click',this.Refresh.bind(this));
        this.checkedAll.addEventListener('click',this.QXuan.bind(this));
        this.rename.addEventListener('click',this.Rename.bind(this));
        // this.del.addEventListener('click',this.Del.bind(this));
        document.addEventListener('keydown',this.Keydown.bind(this));
    }
    Height(){
        this.section.style.height = this.iH - this.headH + 'px';
    }
    //事件
    Event(){
        this.fileItem = document.getElementsByClassName('file-item');
        this.File = Array.from(this.fileItem);
        this.File.forEach( (ele) =>{
            this.i = ele.getElementsByTagName('i')[0];
            this.i.addEventListener('click',this.Click.bind(this,ele));
            this.img = ele.getElementsByTagName('img')[0];
            this.img.addEventListener('dblclick',this.Dbclick.bind(this,ele));
            this.input = ele.getElementsByTagName('input')[0];
            this.span = ele.getElementsByTagName('span')[0];
        });
    }
    ArrayA(id){
        // if(!this.data[id]) return null;
        this.arr=[];
        for(let attr in this.data){
            if(this.data[attr].pid === id){
                this.arr.push(this.data[attr])
            }
        }
        // console.log(this.arr)
        this.xuanran();

    }
    //渲染
    xuanran(){
        // console.log(this.arr)
        this.folders.innerHTML = '';
        if(!this.arr.length){
            this.fEmpty.style.display = 'block';
        }else{
            this.fEmpty.style.display = 'none';
            this.arr.forEach( (e) =>{
                //新建DIV
                let div = document.createElement('div');
                div.className = e.checked ? 'file-item active':'file-item';
                div.dataset.index = e.id;

                //新建IMG
                let img = new Image();
                img.src = 'img/folder-b.png';

                //文件夹的名称
                let span = document.createElement('span');
                span.className = 'folder-name';
                span.innerHTML = e.title;

                //新建input
                let input = document.createElement('input');
                input.type = 'text';
                input.className = 'editor';

                //新建I 点击选中的哪一个
                let i = document.createElement('i');
                i.className = e.checked ? 'checked':'';

                //往div中appendChild
                div.appendChild(img);
                div.appendChild(span);
                div.appendChild(input);
                div.appendChild(i);

                //往大盒子中插入文件的全部布局
                this.folders.appendChild(div);
            });
            this.Event();
        }

        

    }
    //单击事件
    Click(e,ev){
        console.log(1)
        console.log(this.data)
        let a = e.dataset.index;
        this.data[a].checked = !this.data[a].checked;
        // if(this.data[a].checked){
        //     this.rename.addEventListener('click',this.Rename.bind(this,e));
        // }
        let Every = this.arr.every( (ele)=> ele.checked == true
        );
        // console.log(Every)
        if(Every){
            this.checkedAll.className = 'checked';
        }else{
            this.checkedAll.className = '';
        }
        
        // this.checkedAll.className = (this.File.length === this.xuanArr.length)? 'checked' : '';
        this.xuanran();
        // console.log(this.data)

    }

    //双击事件
    Dbclick(ele){
        this.ArrayA(ele.dataset.index*1);
        this.Bread(ele.dataset.index);
        this.checkedAll.className = '';
        // console.log(this.data)
    }

    QXuan(){
        // console.log(this.arr)
        this.checkedAll.classList.toggle('checked');
        this.arr.forEach( (ele) =>{
            ele.checked = !ele.checked;
            this.xuanran();
        });
    }

    //通过ID找PID
    //通过pid找到 父级ID的数据
    parent(id){
        if(!this.data[id] || this.data.pid === -1) return null;
        return this.data[this.data[id].pid]
    }
    //找父级中的父级
    ParentS(id){
        let ParentArr = [];
        let now = data[id];  //当前的ID

        while(now){
            ParentArr.unshift(now);
            now = this.parent(now.id)
        }
        return ParentArr;
    }

    //面包屑

    Bread(id){
        this.breadNav.innerHTML = '';
        let arr = this.ParentS(id);
        if(arr){
            arr.forEach( (e,i,all) =>{
                if(i!=all.length-1){ //不是最后一个
                    let a = document.createElement('a');
                    a.innerHTML = e.title;
                    a.href = 'javascript:;';
                    this.breadNav.appendChild(a);
                    a.addEventListener('click',this.Dhclick.bind(this,e.id));
                }else{//是最后一个的话  用span标签
                    let span = document.createElement('span');
                    span.innerHTML = e.title;
                    this.breadNav.appendChild(span);
                }
            });
        }

        this.False();
    }
    //给面包屑的导航加点击事件
    Dhclick(id){
        this.ArrayA(id);
        this.Bread(id);
        //点击面包屑的时候  需要将以前选中的对勾去取消
        this.checkedAll.className = '';
    }

    //Refresh刷新
    Refresh(){
        // parent.location.replace(parent.location.href);//服务器端重新创建页面 
        parent.document.location.reload();//相当于F5 
        // window.location.href(parent.location.href);//iframe内容重定向 
    }


    //选框
    selected(){
        this.folders.addEventListener('mousedown',this.Down.bind(this));
    }
    //DOWN
    Down(ev){
        this.L = ev.pageX;   
        this.T = ev.pageY;
        document.addEventListener('mousemove',this.M); 
        document.addEventListener('mouseup',this.U);
        if(ev.target.className === 'folders'){
            this.xuanBurl();
        }
        // ev.preventDefault();//不能在这里阻止默认行为，因为重命名时候，不会失去焦点
        // ev.returnValue = false; //阻止默认行为
        
    }
    move(ev){
        this.Block.style.display = 'block';
        this.folders.style.overflow = 'hidden';
        let MoveL = ev.pageX;
        let MoveT = ev.pageY;
        let a = this.folders.getBoundingClientRect().left;
        let b = this.folders.getBoundingClientRect().top;
        let minL = Math.min(MoveL-a,this.L-a);
        let minT = Math.min(MoveT-b,this.T-b);
        this.Block.style.left = minL + 'px';
        this.Block.style.top = minT + 'px';
        this.Block.style.width = Math.abs(MoveL-this.L) + 'px';
        this.Block.style.height = Math.abs(MoveT-this.T) + 'px';
        this.PengStyle();
        ev.preventDefault();

    }
    up(){
        this.Block.style.width = this.Block.style.height = 0;
        this.Block.style.left = this.Block.style.top = 0;
        this.Block.style.display = 'none';
        document.removeEventListener('mousemove',this.M);
        document.removeEventListener('mouseup',this.U);


        
        // this.Block.remove();
    }
    //碰撞选中
    collision(e,Book){  //box是你鼠标移动的盒子//e是文件夹
            let {left,top,right,bottom} = e.getBoundingClientRect();
            let {left:Yleft,top:Ytop,right:Yright,bottom:Ybottom} = Book.getBoundingClientRect();
        if(left > Yright || top > Ybottom || right < Yleft || bottom < Ytop){
                return false;
        }else{
                return true;
        }

    }
    //碰撞选中改变样式
    PengStyle(){
        this.xuanArr = [];
        this.File.forEach( (ele,i,all) =>{
            if(this.collision(ele,this.Block)){
                ele.classList.add('active');
                ele.children[3].className = 'checked';
                this.xuanArr.push(data[ele.dataset.index]);
                this.data[ele.dataset.index].checked = true;
            }else{
                ele.classList.remove('active');
                ele.children[3].className = '';
                //这里的判断是针对新建文件夹时候，因为新建文件时候，
                //还没有行间属性
                if(data[ele.dataset.index]){
                    this.data[ele.dataset.index].checked = false;
                }
            }   
        });
        //根据你选中中的this.xuanArr.lenght 和 页面中的this.File的length相同，证明全选了，就给全选点击对勾
        this.checkedAll.className = (this.File.length === this.xuanArr.length)? 'checked' : '';
    }

    //选框失去焦点的时候
    xuanBurl(ev){
        this.File.forEach( (e) =>{
            e.classList.remove('active');
            e.children[3].className = '';
            this.data[e.dataset.index*1].checked = false;
        });
        this.checkedAll.className = '';
        // this.False();
    }

    //data中的全部checked为false

    False(){
        for(let attr in this.data){
            this.data[attr].checked = false;
        }
    }



    //重命名
    Rename(){

        let One = this.arr.filter((e)=>{
            return e.checked == true;
        });
        //判断里边是否有一个true
        if(!One.length){
            alert('您没有选中文件夹，不能重命名');
            return;
        }else if(One.length > 1){
            alert('文件只能选一个，您选多了');
            this.False();
            this.xuanran();
            return;
        }else{
            One.forEach( (ele) =>{
                console.log(ele)
            if(ele.checked){

                this.File.forEach( (ele) =>{
                    if(this.data[ele.dataset.index].checked){
                        let txt = ele.children[2];
                        txt.style.display = 'block';
                        txt.value = ele.children[1].innerHTML;
                        let v = txt.value;
                        console.log(v)
                        ele.children[1].style.display = 'none';
                        ele.children[3].className = '';
                        txt.select();
                        console.log(ele)
                        txt.addEventListener('blur',this.TxtBlur.bind(this,ele,v));
                    }
                });
            } 

            });
        }
    }

    TxtBlur(ele,v){
        
        let txt = this.input;
        if(!txt.value.trim()){
            alert('名称不能为空');
            console.log(v)
            txt.value = v;
            txt.select();
            return;
        }
        let arr = this.arr.filter((e)=> e.title !=txt.value);
        console.log(arr)
        let A = arr.some( (e) =>{
            return e.title == txt.value;
        });
        console.log(arr)
        console.log(A)
        if(A){
            alert('名字重复');
        }else{
            data[ele.dataset.index].title = txt.value;
            this.False();
            this.xuanran();
        }
        this.checkedAll.className = '';
    }
    //键盘事件
    Keydown(ev){
        // console.log(e)
        // if(ev.keyCode === 113){
        //     this.Rename(e);
        // }
        switch(ev.keyCode){
            case 113:
            this.Rename();
            break;
            case 46:
            this.Del(e);
            break;
        }
    }
    //删除
    // Del(){
    //     //选中没的数据
    //     let One = this.arr.filter((e)=>{
    //         return e.checked == true;
    //     });
    //     if(!One.length){
    //         alert('你没有选中的文件，不能删除');
    //         return;
    //     }else{
    //         this.a = this.tanbox.getElementsByTagName('a');
    //         this.confirm = this.a[0]; //确定
    //         this.cancel = this.a[1];  //取消
    //         this.tanbox.style.display = 'block';
    //         this.confirm.addEventListener('click',this.Confirm.bind(this,One));
    //         this.cancel.addEventListener('click',this.Cancel.bind(this));
    //     }


    // }
    // //确定
    // Confirm(One){
    //     One.forEach( (e) =>{
    //         delete this.data[e.id];
    //     });

    //     this.xuanran();
    // }
    // Cancel(){

    // }





























}
let p = new Per();
p.init();