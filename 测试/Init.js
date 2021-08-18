let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let left_bound  = canvas.width / 2 - 400;
let right_bound = canvas.width / 2 + 400;

ctx.strokeStyle = 'white';
ctx.beginPath();
ctx.moveTo(left_bound, 0);
ctx.lineTo(left_bound, canvas.height);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(right_bound, 0);
ctx.lineTo(right_bound, canvas.height);
ctx.stroke(); 	

export{canvas,ctx,left_bound,right_bound}