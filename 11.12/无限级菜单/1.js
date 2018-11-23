

function Fill(data){

    let html = '';
    data.forEach(e => {
        html += '<li>';

        html += `
        <span class= "${e.child ? 'add':''}">${e.title}</span>       
        `;

        if(e.child){
            html += '<ul>';
            html += Fill(e.child);
            html += '</ul>';
        }

        html += '</li>';
    });

    return html;
}

oUl.innerHTML = Fill(data);
let lis = document.getElementsByTagName('li');
    let onoff = true;
    let a = 0;
for(let i = 0;i<lis.length;i++){
        lis[i].onclick = function(){
            lis[i].children[0].className = 'line';
            if(this.children[1]){
                this.children[1].style.display = 'block';
            }
            a = i;
            onoff = false;
        }
  

}