import {canvas,ctx,left_bound,right_bound} from './function/Init.js'
import {Ball} from './component/Ball.js'
import {Game} from './component/Game.js'
import {Prop} from './component/Prop.js'
import {Affect} from './component/Affect.js'
import {draw_map} from './function/Draw_map.js'
import {calc} from './function/Calc.js'
window.onload = function()
{
	let tmp = draw_map(1,1); // 1号地图,单人模式
	var game = new Game(tmp[0],tmp[1],tmp[2]);
	let background = document.getElementById('background')
	let start = false;

	window.onkeydown = function(e)
	{
		e = e || window.event;
		if(e.keyCode == 37)
			game.board.leftDir = 1; // 左移
		if(e.keyCode == 39)
			game.board.rightDir = 1; // 右移
		if(e.keyCode == 32)
		{
			if(start == false)
			{ 
				let tmp = parseInt(Math.random()*2,10);
				if(tmp == 0) tmp = -1;
				game.ballList[0].speedx = tmp*(Math.random() * 2 + 2);
				game.ballList[0].speedy = -1*(Math.random() * 2 + 2);
			}
			start = true; 
		}
	}
	window.onkeyup = function(e)
	{
		e = e || window.event;
		if(e.keyCode == 37){
			game.board.leftDir = 0;
		}
		if(e.keyCode == 39){
			game.board.rightDir = 0;
		}
	}

	setInterval(function()
	{
		if(start == false)
		{
			// 计算
			game.board.update();
			game.ballList[0] = new Ball( (game.board.len + game.board.x + game.board.x)/2,
							canvas.height-65,
							0,0,10,1);

			// 渲染
			ctx.drawImage(background, left_bound, 0, 800, canvas.height);
			for(let i = 0;i < game.brickList.length;i++)
				game.brickList[i].draw();
			game.ballList[0].draw();
			game.board.draw();
		} 
		else
		{
			
			// 计算: 更新位置 计算碰撞 清除失效的特殊效果
			calc(game);
			
			// 处理事件
			for(let i = 0;i < game.eventList.length;i++)
				game.doEvent(game.eventList[i]);
			
			// 渲染
			ctx.drawImage(background, left_bound, 0, 800, canvas.height);
			for(let i = 0;i < game.ballList.length;i++)
				game.ballList[i].draw();
			for(let i = 0;i < game.brickList.length;i++)
				game.brickList[i].draw();
			for(let i = 0;i < game.propList.length;i++)
				game.propList[i].draw();
			game.board.draw();
		}
		// 清空消息队列
		game.eventList = [];

	},1000 / 60);
}