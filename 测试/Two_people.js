import {canvas,ctx,left_bound,right_bound} from './init.js'
import {Ball} from './Ball.js'
import {Board} from './Board.js'
import {Brick} from './Brick.js'
import {draw_map} from './Draw_map.js'
import {check} from './Check.js'

let tmp = draw_map(0,0); // 随机地图,双人模式
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
		start = true; 
}
window.onkeyup = function(e)
{
	var e = e || window.event;
	if(e.keyCode == 37 || e.keyCode == 39)
		myBoard.dir = 0;
}

setInterval(function()
{
	if(start == false)
	{
		myBoard.move();
		return ;
	}
	else
	{
		ctx.clearRect(left_bound,0,right_bound - left_bound,canvas.height);
		myBoard.move();
		check(ballList,brickList,myBoard);
	}
},1000 / 60);