console.log(arr)
class Per {
    constructor(i){
        this.list = document.getElementById('list');
        this.index = i;
        this.arr = arr;
    }
    init(){
        // console.log(1)
        this.render();
    }
    render(){
        let  li = document.createElement('li');
        li.innerHTML =`
        <i></i>
            <em>${this.arr[this.index].num}</em>
        <i></i>
        <span>
            单价：<strong class="price">${this.arr[this.index].price}元 </strong> 小计：<strong class="sum">${arr[this.index].sum}元</strong>
        </span>
    `;
    this.list.appendChild(li);

    }

}
// new Per().init();
//     p.init();
console.log(this.arr)
this.arr.forEach((e,i) => {
    new Per(i).init();
});