let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let left_bound  = canvas.width / 6;
let right_bound = canvas.width - left_bound;

ctx.strokeStyle = 'white';
ctx.beginPath();
ctx.moveTo(left_bound,0);
ctx.lineTo(left_bound,canvas.height);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(right_bound,0);
ctx.lineTo(right_bound,canvas.height);
ctx.stroke(); 	
	
let brickList = [];
for(let i = 0;i < 20;i++){
	for(let j = 0;j < 40;j++){

		let tmp = parseInt(Math.random()*10+1,10);
		if(tmp <= 2) tmp = 1000000; // 1/5几率是墙
		else tmp = parseInt(Math.random()*3+1,10); // 4/5几率是可破坏砖

		brickList.push(new Brick(left_bound + 70 + j * 22.5,
								120 + i * 22.5,
								20,
								20,
								tmp));
	}
}

for(let i = 0;i < brickList.length;i++){
	brickList[i].draw();
}
	
let ballList = [];
let myBoard = new Board((left_bound+right_bound)/2,
					canvas.height-50,
					(right_bound-left_bound)/3,
					10,//宽度
					12);//速度

ballList.push(new Ball( (myBoard.len+myBoard.x+myBoard.x)/2,
						canvas.height-60,
						0,0,5,1
					));

let start = false ;
document.addEventListener('keyup', function (e) {
	if(e.keyCode == 32)
	{
		if(start == false )
		{ 
			let tmp = parseInt(Math.random()*2,10);
			if(tmp == 0) tmp = -1;
			ballList[0].speedx = tmp*(Math.random() * 2 + 2);
			ballList[0].speedy = -1*(Math.random() * 2 + 2);
		}
		start = true; 
	}
});


var render = function(){
	myBoard.clear();
	myBoard.update();
	myBoard.draw();
	if(start == false)
	{
		ballList[0].clear();
		ballList[0] = new Ball( (myBoard.len+myBoard.x+myBoard.x)/2,
						canvas.height-60.1,
						0,0,5,1
					);
		ballList[0].draw();
	}

	window.requestAnimationFrame(render);
	window.onkeydown = function(e)
	{
		var e = e || window.event;
		if(e.keyCode == 37)
			myBoard.dir = -1; // 左移
		if(e.keyCode == 39)
			myBoard.dir = 1; // 右移
	}
	window.onkeyup = function(e)
	{
		var e = e || window.event;
		if(e.keyCode == 37 || e.keyCode == 39)
			myBoard.dir = 0;
	}
};
render();
