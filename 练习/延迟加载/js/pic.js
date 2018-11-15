
// console.log(data)
function  render(data){
    let html = '';
    data.forEach(e => {
    
        html += `

        <li>
        <img src="./${e.img}" alt="">
        <span>${e.title}</span>
        <span>${e.time}</span>
        <span>${e.hot}</span>
        <span>${e.price}</span>
        </li> 

        `;
        console.log(e.img)
    });

    list.innerHTML = html;
}

render(data);

let lis = document.getElementsByTagName('li');
let btns = Array.from(document.querySelectorAll('.header a'));

    let preV = btns[0];
    btns.forEach( (e,i) => {
        btns[i].onclick = function(){
            data.sort( (a,b) => {
                let kk = this.dataset.kk;
                console.log(kk)
                if( kk === 'time'){
                    return a[kk].replace(/-/g,'') -b[kk].replace(/-/g,'')
                }
                return a[kk] - b[kk];


            } );

            render(data);
        }
    });