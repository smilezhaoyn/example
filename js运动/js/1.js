let box = document.getElementById('box');
let btn = document.getElementById('btn');

let timer = null;
let duration = 10000;
let begin =parseFloat(getComputedStyle(box).left);
let count = 500-begin;
// let old = new Date();
let time = 0
timer = setInterval(() =>{
// let newDate = new Date();
time += 16.7;
// let time = newDate - old;

// console.log(begin)
// console.log(count)
// console.log((time/duration * count)+ 'px')

if(time>=duration){
    time=duration;
// clearInterval(timer)
}
if(time === duration){
    clearInterval(timer)
}
box.style.left = begin+ (time/duration * count)+ 'px';


// if(time>=duration){
//     time = duration;
//     box.style.left = count + 'px';
//     clearInterval(timer);
// }else{
//     box.style.left = (time/duration * count)+ 'px';
// }
},16.7)