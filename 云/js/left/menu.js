// console.log(data)
class Per {
    constructor(data){
        //获取元素
        function $(ele){
            return document.querySelector(ele);
        }
        this.data = data;
        this.section = $('#section');
        this.treeMenu = $('#section .tree-menu');
        this.folders = $('.folders');
        this.menu = $('.tree-menu');
        this.con = $('#con');
        this.onOff = true;
        this.L = 0;
        this.T = 0;
        this.M = this.move.bind(this);
        this.U = this.up.bind(this);
        this.html = '';
        this.Block = document.getElementsByClassName('Block')[0];
        this.rename = $('#rename');
        this.del = $('#del');
        // console.log(this.Block)

    }
    init(){
        this.ArrayA();
        this.selected();
        this.leftMenu();
        // this.createUl()
    }
    //判断

    ArrayA(a=-1){
        this.arr = [];
        for(let attr in data){
            // arr.push(data[attr]);
            if(data[attr].pid === a){
                this.arr.push(data[attr]);
            }
        }
        this.xuanran(this.arr);
        this.Event();
    }
    //渲染数据
    xuanran(arr){
        this.folders.innerHTML = '';

        arr.forEach( (e,i) => {

                let div = document.createElement('div');
                div.className = 'file-item';
                div.index = e.id;
                div.innerHTML = `
                <img src="img/folder-b.png" alt="" />
                <span class="folder-name">${e.title}</span>
                <input type="text" class="editor"/>
                <i></i>
                `;
                this.folders.appendChild(div);
              
        });  
    }
    Event(ev){ //点击事件
        this.fileItem = Array.from(document.getElementsByClassName('file-item'));
        this.fileItem.forEach((e,i)=>{
            // e.ondblclick = function(){
            //     that.ArrayA(that.arr[i].id);
            //     this.i.className = '';
            // }
            console.log(e)
            e.addEventListener('dblclick',this.Db = this.Dblclick.bind(this,i));
            e.addEventListener('click',this.Cl = this.Click.bind(this,e));
            // ev.cancelBubble = true;

            e.onOff = true;
            // e.onclick = function(){
            //     this.i = e.getElementsByTagName('i')[0];
            //     that.hook(this.i);
            // }
        });
    }
    //双击事件
    Dblclick(i){
            this.ArrayA(this.arr[i].id);
    }
    //单击事件    //打对勾        // class="checked"  打对勾
    Click(e,ev){
        console.log(ev.target)
        if(ev.target.nodeName != 'INPUT'){
            if(e.onOff){
                e.children[3].className = 'checked';
                e.onOff = false;
                let num = e.index;
                this.rename.addEventListener('click',this.RE = this.Rename.bind(this,num));
            }else{
                e.children[3].className = '';
                e.onOff = true;
            }
        }

            
    }
//选框
    //selected  选中框选

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

    //碰撞选中

    collision(){  //对勾
        this.fileItem.forEach((e,i)=>{
             //得到了每一个块的各边距离
            let {left,top,right,bottom} = e.getBoundingClientRect();
            let {left:Yleft,top:Ytop,right:Yright,bottom:Ybottom} = this.Block.getBoundingClientRect();
            if(left > Yright || top > Ybottom || right < Yleft || bottom < Ytop){
                e.children[3].className = '';
            }else{
                e.children[3].className = 'checked';
                e.onOff = false;
            }
            this.folders.addEventListener('click',function(){
                e.children[3].className = '';
                // console.log(1)
            });
        });    
    }

    //重命名
    Rename(num,ev){
        // console.log(e)
        let txt = document.getElementsByClassName('editor');
        this.fileItem.forEach( (e) =>{
                if(e.index === num){
                    e.children[2].style.display = 'block';
                    e.children[2].value = e.children[1].innerHTML;
                    e.children[1].style.display = 'none';
                    e.children[3].className = '';
                    let index = e.index; //行间属性
                    
                    txt[num].addEventListener('click',this.moveclick.bind(this,e));
                    txt[num].addEventListener('blur',this.Blur.bind(this,index,e.children[2].value))
                    // txt[num].select();
                }

        });

    }

    //当点击文本框的时候  取消点击 双击的事件

    moveclick(e){
        e.removeEventListener('dblclick',this.Db);
        e.removeEventListener('click',this.Cl);
    }

    //当失去焦点的时候
    Blur(index,txtCon){
        for(let attr in this.data){
            if(this.data[attr].id === index){
                this.data[attr].title = txtCon;
                console.log(txtCon)
            }
        }
        console.log(data)
    }








    //左边菜单
    leftMenu(){
        let html = '';
        let ary = [];
        let num = 0;
        let con = document.getElementById('con');
        for(let attr in this.data){
                ary.push(this.data[attr]);
        }
        function fn(a){
            num ++;
            ary.forEach( (e)=>{
                if(e.pid === a){
                    e.checked = true;
                    html += '<li>';
                    html += `<div class="tree-title tree-ico close">
                        <span><i></i>${e.title}</span>
                    </div>`;
                    ary.forEach( (e1) =>{
                        if(!e1.checked){
                            html += '<ul>';
                            if(num > ary.length){
                                fn = null;
                            }else{
                                // html += fn(e1.pid);
                            }
                            // html += fn(e1.pid);
                            html += '<ul>';
                        }
                    });
                    html += '</li>';
                }
                con.innerHTML = html;
            });
        }
        fn(-1);
    }



}







let p = new Per(data);
p.init();