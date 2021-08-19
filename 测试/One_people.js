import {canvas,ctx,left_bound,right_bound} from './Init.js'
import {Ball} from './Ball.js'
import {Board} from './Board.js'
import {Brick} from './Brick.js'
import {draw_map} from './Draw_map.js'
import {check} from './Check.js'

let tmp = draw_map(1,1); // 1号地图,单人模式
let brickList = tmp[0], ballList = tmp[1], myBoard = tmp[2];
let start = false;

window.onkeydown = function(e)
{
	var e = e || window.event;
	if(e.keyCode == 37)
		myBoard.dir = -1; // 左移
	if(e.keyCode == 39)
		myBoard.dir = 1; // 右移
	if(e.keyCode == 32)
	{
		if(start == false)
		{ 
			let tmp = parseInt(Math.random()*2,10);
			if(tmp == 0) tmp = -1;
			ballList[0].speedx = tmp*(Math.random() * 2 + 2);
			ballList[0].speedy = -1*(Math.random() * 2 + 2);
		}
		start = true; 
	}
}
window.onkeyup = function(e)
{
	var e = e || window.event;
	if(e.keyCode == 37 || e.keyCode == 39)
		myBoard.dir = 0;
}


setInterval(function()
{
	var background = new Image();
	background.src = "./images/background.jpeg";
	if(start == false)
	{
		ctx.drawImage(background, left_bound, 0, 800, canvas.height);
	
		for(let i = 0;i < brickList.length;i++)
			brickList[i].draw();
		ballList[0].clear();
		ballList[0] = new Ball( (myBoard.len+myBoard.x+myBoard.x)/2,
						canvas.height-65,
						0,0,10,1);
		ballList[0].draw();
		myBoard.move();
		return ;
	} 
	else
	{
		check(ballList,brickList,myBoard);
		// 渲染
		ctx.drawImage(background, left_bound, 0, 800, canvas.height);
		myBoard.move();
		for(let i = 0;i < ballList.length;i++)
			ballList[i].draw();
		for(let i = 0;i < brickList.length;i++)
			brickList[i].draw();
	}
},1000 / 60);
