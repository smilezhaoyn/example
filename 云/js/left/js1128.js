class Per {
    constructor(){
        function $(ele){
            return document.querySelector(ele);
        }
        this.data = data;
        this.fEmpty = $('.f-empty');
        this.head = $('#head');
        this.section = $('#section'); //下边的大盒子
        this.folders = $('.folders'); //文件夹外边的大盒子
        this.checkedAll = $('#checkedAll'); //全选
        this.breadNav = $('.bread-nav');//面包屑
        this.M = this.Move.bind(this);
        this.U = this.Up.bind(this);
        this.D = this.Down.bind(this);
        this.Block = $('.Block'); //move移动的盒子
        this.rename = $('#rename'); //重命名
        this.del = $('#del'); //删除
        this.tanbox = $('#tanbox'); //删除的弹框
        this.a = this.tanbox.getElementsByTagName('a');
        this.confirm = this.a[0]; //确定
        this.cancel = this.a[1]; //取消
        this.create = $('#create'); //新建文件夹
        this.num = [];
        this.arr2 = [];
        this.refresh = $('#refresh');
        this.NUM = 0;  //DOM树种  父元素错位的距离
        this.treeMenu = $('.tree-menu');//DOM树
        this.remove = $('#remove'); //移动到
        this.modalTree = $('.modal-tree'); //移动时候的弹框
        this.con = $('.content');
        this.ok = $('.ok'); //移动时候的确定按钮
        this.no = $('.cancel'); //移动的时候点击的取消按钮
        this.recycle = $('#recycle '); //回收站
        this.hui = [];
        this.dianID = 0;
        this.Allson = [];

    }
    init(){
        this.SectionH();  //得到下边盒子的高度
        this.Child(-1);
        this.selected();
        this.BtnEvent();
        this.AddData('num',[]);
        this.MenuTree();
    }
    //给数据加一些属性
    AddData(attr,value){
        for(let k in this.data){
            if(Array.isArray(value)){
                this.data[k][attr] = []
            }else if(typeof attr === 'object'){
                this.data[k][attr] = {};
            }else{
                this.data[k][attr] = value;
            }
        }
    }
    //按钮的一些事件
    BtnEvent(){
        this.checkedAll.addEventListener('click',this.kedAll.bind(this)); //给全选加事件
        this.rename.addEventListener('click',this.Rename.bind(this)); //给重命名加事件
        document.addEventListener('keydown',this.Keydown.bind(this)); //加键盘事件
        this.del.addEventListener('click',this.Del.bind(this)); //删除加事件
        this.create.addEventListener('click',this.Create.bind(this)); //新建文件夹加事件
        this.refresh.addEventListener('click',this.Refresh.bind(this));
        this.remove.addEventListener('click',this.Remove.bind(this));
        this.ok.addEventListener('click',this.OK.bind(this)); //给移动时候的确定加事件
        this.no.addEventListener('click',this.NO.bind(this)); //给移动时候的取消加事件
        this.recycle.addEventListener('click',this.Recycle.bind(this)); //回收站事件
    }
    //加事件
    Event(){
        this.fileItem = document.getElementsByClassName('file-item');; //文件夹的
        this.file = Array.from(this.fileItem);
        // this.file.forEach( (ele) =>{
        //     this.span = ele.getElementsByTagName('span')[0];
        //     this.txt = ele.getElementsByTagName('input')[0];
        //     this.i = ele.getElementsByTagName('i')[0];
        //     this.img = ele.getElementsByTagName('img')[0];
        //     this.i.addEventListener('click',this.Click.bind(this,ele.dataset.index));
        //     this.img.addEventListener('dblclick',this.Dblclick.bind(this,ele.dataset.index));
        // });
    }
    SectionH(){
        this.headH = this.head.offsetHeight; //得到头部的高度
        this.iH = window.innerHeight; //得到了可视区的高度
        this.section.style.height = this.iH - this.headH + 'px';
    }
    //找子级  //通过父级的ID找子级
    Child(id){
        this.arr = [];
        for(let attr in this.data){
            if(this.data[attr].pid == id){
                this.arr.push(this.data[attr])
            }
        }
        this.Render();
        // this.Event();
    }

    Render(){
        this.folders.innerHTML = '';
        if(!this.arr.length){
            this.fEmpty.style.display = 'block';
        }else{
            this.fEmpty.style.display = 'none';
            this.arr.forEach( (e) =>{
            //创建div
            let div = document.createElement('div');
            div.dataset.index = e.id;
            div.className = e.checked ? 'file-item active':'file-item';
            // div.className = this.data[div.dataset.index].checked ? 'file-item active':'file-item';
            
            //创建img
            let img = new Image;
            img.src = 'img/folder-b.png';
            img.addEventListener('dblclick',this.Dblclick.bind(this,e.id));
            //创建span
            let span = document.createElement('span');
            span.className = 'folder-name';
            span.innerHTML = e.title;
            //创建INPUT
            let input = document.createElement('input');
            input.type = 'text';
            input.className = 'editor';

            //创建I
            let i = document.createElement('i');
            i.className = e.checked ? 'checked' : ''; 
            i.addEventListener('click',this.Click.bind(this,e.id));
            // i.className = this.data[div.dataset.index].checked ? 'checked' : ''; 
            div.appendChild(img);
            div.appendChild(span);
            div.appendChild(input);
            div.appendChild(i);
            this.folders.appendChild(div)
            });
        }
        this.Event();
    }
    //单击
    Click(id,ev){
        this.data[id].checked = !this.data[id].checked;
        let Every = this.arr.every( (e) => e.checked == true);
        if(Every){
            this.checkedAll.className = 'checked';
        }else{
            this.checkedAll.className = '';
        }
        this.Render();
        // ev.
        // this.folders.removeEventListener('mousedown',this.D);

    }
    //双击
    Dblclick(id){
        this.Child(id);
        this.Bread(id);
        this.False();
        this.checkedAll.className = '';
    }

    //全选

    kedAll(){
        this.checkedAll.classList.toggle('checked');
        console.log()
        this.arr.forEach((e)=>{
            // e.checked = !e.checked;
            e.checked = this.checkedAll.classList.contains('checked');
            this.Render();
        });
    }
    //通过PID找父级的数据
    //通过子级的PID找父级
    Parent(id){
        if(!this.data[id] || this.data.pid === -1)  return;
        return this.data[this.data[id].pid];
    }

    //找父级中的父级
    ParentSS(id){
        let ParArr = [];
        let now = this.data[id];  //当前id的数据

        while(now){
            ParArr.unshift(now);
            now = this.Parent(now.id)
        }
        return ParArr;
    }
    //面包屑
    Bread(id){
        this.breadNav.innerHTML = '';
        let arr = this.ParentSS(id);
        if(arr){
            arr.forEach( (e,i,all)=>{
                if(i!=all.length-1){ //i不是最后一个的时候
                    let a = document.createElement('a');
                    a.href = 'javascript:;';
                    a.innerHTML = e.title;
                    this.breadNav.appendChild(a);
                    a.addEventListener('click',this.Dhclick.bind(this,e.id));
                }else{
                    let span = document.createElement('span');
                    span.dataset.index = e.id;
                    span.innerHTML = e.title;
                    this.breadNav.appendChild(span)
                }
            });
        }

        // console.log(1)

    }
    //导航的点击事件
    Dhclick(id){
        this.Child(id);
        this.Bread(id);
        this.checkedAll.className = '';
        this.False();
    }


    //选框

    selected(){
        this.folders.addEventListener('mousedown',this.D);

    }
    Down(ev){
        this.L = ev.pageX;
        this.T = ev.pageY;
        if(ev.target.className === 'file-item' || ev.target.className === 'folder-name' ||ev.target.nodeName === 'IMG' || ev.target.nodeName === 'INPUT' ){
            document.removeEventListener('mousemove',this.M);
            document.removeEventListener('mouseup',this.U);
        }else{
            document.addEventListener('mousemove',this.M);
            document.addEventListener('mouseup',this.U);
        }
        if(ev.target.className === 'folders'){
            this.kuangBurl();
        }
    }
    Move(ev){
        this.Block.style.display = 'block';
        // this.folders.style.overflow = 'hidden';
        let MoveL = ev.pageX;
        let MoveT = ev.pageY;
        let a = this.folders.getBoundingClientRect().left;  //this.folders到左边的距离
        let b = this.folders.getBoundingClientRect().top;
        let minL = Math.min(MoveL-a,this.L - a);
        let minT = Math.min(MoveT-b,this.T - b)
        this.Block.style.left =minL + 'px';
        this.Block.style.top = minT + 'px';
        this.Block.style.width = Math.abs(MoveL - this.L) + 'px';
        this.Block.style.height = Math.abs(MoveT - this.T) + 'px';
        this.pengStyle();
        ev.preventDefault();
    }
    Up(){
        this.Block.style.width = this.Block.style.height = 0;
        this.Block.style.left = this.Block.style.top = 0;
        this.Block.style.display = 'none';
        document.removeEventListener('mousemove',this.M);
        document.removeEventListener('mouseup',this.U);
    }

    //选框碰撞

    peng(ele,Book){  //ele 是碰撞的元素   Bool是移动的盒子
        // let {left,top,right,bootom} = ele.getBoundingClientRect();
        // let {left:Bleft,top:Btop,right:Bright,bottom:Bbottom} = Book.getBoundingClientRect();
        let left = ele.offsetLeft;
        let top = ele.offsetTop;
        let right = left + ele.offsetWidth;
        let bottom = top + ele.offsetHeight;

        // console.log(this.folders.scrollTop)
        let Bleft = Book.offsetLeft;
        let Btop = Book.offsetTop + this.folders.scrollTop;
        let Bright = Bleft + Book.offsetWidth;
        let Bbottom = Btop + Book.offsetHeight;


        if(left > Bright || top > Bbottom || right < Bleft || bottom < Btop){
            return false;
        }else{
            return true;
        }
    }
    //碰撞之后的样式
    pengStyle(){
        this.zhongArr = [];  //选中的文件夹
        this.file.forEach( (e) =>{
            if(this.peng(e,this.Block)){
                e.classList.add('active');
                e.children[3].className = 'checked';
                this.zhongArr.push(this.data[e.dataset.index]);
                this.data[e.dataset.index].checked = true;
            }else{
                e.classList.remove('active');
                e.children[3].className = '';
                if(this.data[e.dataset.index]){
                    this.data[e.dataset.index].checked = false;
                }       
            }
        });

        this.checkedAll.className = (this.file.length === this.zhongArr.length) ? 'checked':'';
    }

    //点击空白失去焦点的时候
    kuangBurl(ev){
        this.file.forEach( (e) =>{
            e.classList.remove('active');
            e.children[3].className = '';
            this.data[e.dataset.index].checked = false;
        });
        this.checkedAll.className = '';
    }
    //选中   有一个数组
    XuanARR(){
        let One = this.arr.filter( (e) => e.checked == true);
        return One;
    }
    //重命名
    Rename(){
        //One  判断里边有几个true  然后过滤 
        // One = this.arr.filter( (e) => e.checked == true);
        let One = this.XuanARR();
        if(!One.length){
            alert('您没有选中文件夹，请您选中文件夹再进行重命名~');
            return;
        }else if(One.length > 1){
            alert('文件夹只能选一个，请重新选择哦~');
            return;
        }else{
            One.forEach( (ele) =>{  //ele代表One数组中的每一个
                this.file.forEach( (e)=>{ // e代表this.file的每一个
                    if(ele.id == e.dataset.index){
                        let txt = e.children[2];
                        txt.style.display = 'block';
                        txt.value = e.children[1].innerHTML;
                        let v = txt.value;
                        e.children[1].style.display = 'none';
                        e.children[3].className = '';
                        txt.select();
                        txt.addEventListener('blur',this.Txtblur.bind(this,e,v,ele.title));
                        txt.addEventListener('click',this.Txtclick.bind(this));
                    }
                });
            });
        }
    }
//当点击TXT的事件的时候
    Txtclick(){
        document.removeEventListener('mousemove',this.M);
        document.removeEventListener('mouseup',this.U);
    }
//文本失去焦点的时候
    Txtblur(e,v,title){
        let txt = e.children[2];
        if(!txt.value.trim()){
            console.log('文件名称不能为空');
            txt.value = v;
            txt.select();
            return;
        }
        //arr将不是当前选中的文件夹的名称过滤出来
        let arr = this.arr.filter( (e)=>{
            return e.title !=title;
        });
        //A arr用some 判断  input中的value是否和arr数组中各个名称是否
        //有相同的  有相同的就为true  就为重复
        let A = arr.some( (ele)=>{
            return ele.title == txt.value;
        });
        if(A){
            // alert('名字重复');
            console.log('名重复')
            // confirm('名字重复。覆盖点击确定，否则点击取消');
            txt.value = v;
            txt.select();
            return;
        }else{
            this.data[e.dataset.index].title = txt.value;
            this.False();
            this.Render();
        }
    }
    //键盘事件
    Keydown(ev){
        //F2  ---->  113
        //Del  ---> 46

        //新建  ctrl + shift + n
        switch(ev.keyCode){
            case 113:
            this.Rename();
            break;
            case 46:
            this.Del();
            break;
        }
        //全选 ctrl + a
        // if(ev.ctrlKey && ev.keyCode === 65){
        //     this.arr.forEach( (e)=>{
        //         this.data[e.id].checked = true;
        //         this.file.forEach((ele)=>{
        //             ele.children[3].className = 'checked';
        //         });
        //     });
        //     console.log(this.data)
        // }
        // if(ev.ctrlKey && ev.shiftKey && ev.keyCode === 82){
        //     this.Create();
        // }
    }

    Del(){
        let ary = this.XuanARR();
        if(ary.length){
            this.tanbox.style.display = 'block';
            this.confirm.addEventListener('click',this.Confirm.bind(this,ary)); //给确定加事件
            this.cancel.addEventListener('click',this.Cancel.bind(this)); 
        }else{
            alert('您没有选中文件夹，请选中文件夹再删除哦'); 
        }
    }
    //确定
    Confirm(ary){
        let a = '';
        let b = '';
        ary.forEach( (e) =>{
            a = e.pid;
            b = e.create;
            if(e.pid === -1){
                delete this.num[e.create];
            }else if(this.data[e.id] && 'create' in this.data[e.id]){
                delete this.data[a].num[b];
            }
                delete this.data[e.id];        
        });
        // this.Render();
        this.Child(a);
        this.MenuTree();
        this.MenuTree1();
        this.tanbox.style.display = 'none';
        this.checkedAll.className = '';
    }
    //取消
    Cancel(){
        this.tanbox.style.display = 'none';
    }

    //回收站
    Recycle(){
        // let ary = this.XuanARR();
        // ary.forEach( (e) =>{
        //     this.hui.push(e);
        // });
        // console.log(this.hui)
    } 

    //新建文件夹
    Create(){
        let v = '';//v是新建文件夹的编号
        this.fEmpty.style.display = 'none'; 
        //当在最后一级新建文件夹的时候  这个图片要隐藏，不然新建的文件夹看不到
        //新建DIV
        let div = document.createElement('div');
        div.className = 'file-item';
        //新建IMG
        let img = new Image();
        img.src = 'img/folder-b.png';
        //新建INPUT
        let input = document.createElement('input');
        input.type = 'text';
        input.className = 'editor';
        //通过面包屑  找到当前新建文件夹  在那个里边  的ID
        let id = '';
        if(!this.breadNav.children[0]){
            id = -1;
        }else{
            id = this.breadNav.getElementsByTagName('span')[0].dataset.index;
        }
        // console.log(id)
        if(id!=-1){
            if(!this.data[id].num.length){
                this.data[id].num.push(0);
            }else{
                for(let i=0;i<this.data[id].num.length+1;i++){
                    if(this.data[id].num[i] === undefined){
                        this.data[id].num[i] = i;
                        v = i;
                        break;
                    }
                }
            }
            
        }else{
            if(!this.num.length){
                this.num.push(0);
            }else{
                for(let i=0;i<this.num.length+1;i++){
                    if(this.num[i] === undefined){
                        this.num[i] = i;
                        v = i;  
                        break;
                    }
                }
            }
            // console.log(v,this.num,this.num.length)
            console.log(this.data)
   
        }
        if(v === 0){
            v = '';
        }
        input.value = '新建文件夹' + v;
        input.style.display = 'block';


        let span = document.createElement('span');
        //是否选中
        let i = document.createElement('i');
        i.className = '';
        div.appendChild(img);
        div.appendChild(span);
        div.appendChild(input);
        div.appendChild(i);
        
        this.folders.appendChild(div);
        input.select();

        let idn = +new Date;

        this.data[idn] = {
            "id":idn,
            "pid":id*1,
            "title":input.value,
            "type":"file",
            "checked":false,
            "create":v,
            "num":[]
        }

        input.addEventListener('blur',this.xinJtxt.bind(this,id));
    }
    //新建文件夹 txt失去焦点的时候   重新渲染
    xinJtxt(id){
        this.Child(id);
        this.MenuTree();
        // this.MenuTree1();
    }
    //刷新
    Refresh(){
        console.log(1)
        let id = '';
        if(!this.breadNav.children[0]){
            id = -1;
        }else{
            id = this.breadNav.getElementsByTagName('span')[0].dataset.index;
        }
        this.False();
        this.checkedAll.className = '';
        this.Child(id);
    }


    // 查看有没有子级
    getChild(id){
        // if(!this.data[id]) return null;
        let ary = [];
        // let onOff = false;
        for(let attr in this.data){
            if(this.data[attr].pid === id){
                ary.push(data[attr]);
                // onOff = true;
            }
        }
        return ary;
        // if(onOff){
        //     return ary;
        // }else{
        //     return null;
        // }
       
    }

    //判断是点击时候  还是DOM树的时候
// 左边DOM树
    Menu(Pid){
        this.treeMenu.innerHTML = '';  
        let ul = document.createElement('ul');
        this.NUM ++;
        ul.style.paddingLeft = this.NUM*5 + 'px';
        let arr =this.getChild(Pid);
        arr.forEach((e)=>{
            let ary = this.getChild(e.id);
            let li = document.createElement('li');
            let div = document.createElement('div');
            div.className = `tree-title ${ary.length >0?'tree-ico':''} close`;
            let span = document.createElement('span');
            span.className = `${ary.length>0 ? 'open':''}`;
            span.innerHTML = '<i></i>'+ e.title;
            span.addEventListener('click',this.Menuclick.bind(this,e.id));
            div.appendChild(span);
            li.appendChild(div);
            if(ary){
                li.appendChild(this.Menu(e.id))
            }
            ul.appendChild(li);
        });
        return ul;

    }
    MenuTree(){ 
            this.NUM = 0;
            this.treeMenu.appendChild(this.Menu(-1));
    }

    Menuclick(id){
        // let Tspan = this.treeMenu.getElementsByTagName('span');
        // this.Tspans = Array.from(Tspan);
        // this.Tspans.forEach( (e,i) =>{
        //     let ul = e.parentNode.nextElementSibling;
        //     if(ul){
        //         if(!this.spans[i].classList.toggle('open')){
        //             ul.style.display = 'none';
        //         }else{
        //             ul.style.display = 'block';
        //         }
        //     }
        // });
        this.Child(id);
    }





    // 弹框中的DOM树
    Menu1(Pid){
        this.con.innerHTML = '';  
        let ul = document.createElement('ul');
        this.NUM ++;
        ul.style.paddingLeft = this.NUM*5 + 'px';
        let arr =this.getChild(Pid);
        arr.forEach((e)=>{
            let ary = this.getChild(e.id);
            let li = document.createElement('li');
            let div = document.createElement('div');
            div.className = `tree-title ${ary.length >0?'tree-ico':''} close`;
            let span = document.createElement('span');
            span.innerHTML = '<i></i>'+ e.title;
            span.dataset.index = e.id;
            // li.addEventListener('click',this.SpanClick.bind(this,e.id));
            div.appendChild(span);
            li.appendChild(div);
            if(ary){
                li.appendChild(this.Menu1(e.id))
            }
            ul.appendChild(li);
        });
        // let ul = document.createElement('ul');
        // this.NUM ++;
        // ul.style.paddingLeft = this.NUM*5 + 'px';
        // // let arr = this.getChild(Pid);
        // // console.log(arr)
        // for(let attr in this.data){
        //     //创建一个UL
            
        //     if(this.data[attr].pid == Pid){
        //     let li = document.createElement('li');
        //     // li.addEventListener('click',this.TanLI.bind(this));
        //     let div = document.createElement('div');
        //     // div.className = `tree-title ${ary ? 'tree-ico':''} close`;
        //     div.className = `tree-title tree-ico close`;
        //     let span = document.createElement('span');
        //     let ary = this.getChild(this.data[attr].id);
        //     span.innerHTML = `${ary ?'<i></i>' : ''}` + this.data[attr].title;
        //     this.Spanclick();
        //     // span.addEventListener('click',this.Spanclick.bind(this));
        //     div.appendChild(span);
        //     li.appendChild(div);
        //         if(ary){
        //             li.appendChild(this.Menu1(this.data[attr].id));
        //         }
        //         ul.appendChild(li);
        //     }
        // }
        return ul;

    }
    MenuTree1(){
            this.NUM = 0;
            this.con.appendChild(this.Menu1(-1));
            this.ConLI();
    }
    // 弹框中LI的点击事件
    ConLI(){
        this.span = this.con.getElementsByTagName('span');
        this.spans = Array.from(this.span);
        this.spans.forEach( (e) =>{
            // console.log(e)
            e.addEventListener('click',this.SpanClick.bind(this,e));
        });
    }

    // 给span加点击事件

    SpanClick(e){
        this.span = this.con.getElementsByTagName('span');
        for(let i=0;i<this.span.length;i++){
            this.span[i].style.background = '';
        }
        e.style.background = '#999';
        this.dianID = e.dataset.index;
        }
    //移动到
    Remove(){
        let One = this.XuanARR();
        // console.log(One)
        if(One.length==0){
            alert('请选中你要移动的文件夹');
        }else{
            this.modalTree.style.display = 'block';
            this.MenuTree1();
        }
    }

//如果有子级  就将子级push进去  进行递归

    AllChild(id){
        let arr = this.getChild(id);
        arr && arr.forEach( (e) =>{
            this.Allson.push(e);
            this.AllChild(e.id);
        });
    }
    //移动到的确定按钮事件
    OK(){
        let One = this.XuanARR();
        One.forEach( (e) =>{
            this.Allson.push(e);
            this.AllChild(e.id);
        });
        console.log(this.Allson)
        if(!this.Allson.some( e => e.id == this.dianID) && this.dianID){
            One.forEach((e) =>{
                let ary = this.getChild(this.dianID*1);  //点击移动到的位置  看看他的子级。
                console.log(ary)
                if(ary.some(el => el.title === e.title)){

                    let Reg = ary.filter(f =>{
                        let re = new RegExp('^' + e.title + '?' + '(\\d)' + '(-副本)*$');
                        // let re = new RegExp('^' + e.title + '?' + '(\\d)' + + '?' +'(-副本)*$');
                        // let re = new RegExp('^' + e.title + '(-副本)*$');
                        return re.test(f.title);
                    }).sort( (a,b) =>{
                        return a.title.length - b.title.length;
                    });
                    console.log(Reg)
                    // e.title = e.title + '-副本';

                    if(Reg.length == 1){
                        e.title =Reg[0].title + '-副本';
                    }else{
                        e.title = Reg[Reg.length - 1].title + '-副本';
                    }
                }

                let yiD = new RegExp('^'+ '新建文件夹' + e.create);
                if(e.create === ''){
                    e.create = 0;
                }
                console.log(yiD.test(e.title))
                console.log(e)
                if(yiD.test(e.title)){
                    console.log(e.create);
                    console.log(this.num)
                    if(!this.breadNav.getElementsByTagName('span')[0]){
                        delete this.num[e.create];
                    }else{
                        delete this.data[this.breadNav.getElementsByTagName('span')[0].dataset.index].num[e.create]
                    }
                   
                }
                console.log(this.data)

                e.pid = this.dianID*1;
                this.False();
            });
            let a = '';
            if(!this.breadNav.getElementsByTagName('span')[0]){
                this.Child(-1);
            }else{
                a = this.breadNav.getElementsByTagName('span')[0].dataset.index;
                this.Child(a);
                
            }
            
            this.checkedAll.className = '';
            // this.Render();
            this.MenuTree();

        }else{
            alert(`您没有选中要移动到哪里的位置
或者这样的位置不能移动`);
        }
        this.modalTree.style.display = 'none';


    }
    //移动到的取消按钮事件
    NO(){
        this.modalTree.style.display = 'none';
    }
    //全部清空为false
    False(){
        for(let attr in this.data){
            this.data[attr].checked = false;
        }
    }
    
























































}
let p = new Per();
p.init();