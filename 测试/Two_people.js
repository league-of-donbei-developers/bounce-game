import {canvas,ctx,left_bound,right_bound} from './function/Init.js'
import {Ball} from './component/Ball.js'
import {Game} from './component/Game.js'
import {Prop} from './component/Prop.js'
import {Affect} from './component/Affect.js'
import {draw_map} from './function/Draw_map.js'
import {calc} from './function/Calc.js'

window.onload = function()
{
	let tmp = draw_map(1,0); // 1号地图,双人模式
	let game = new Game(tmp[0],tmp[1],tmp[2],tmp[3]);
	let background = document.getElementById('background')
	let start = false;

	window.onkeydown = function(e)
	{
		e = e || window.event;
		if(e.keyCode == 37)
		{
			for(let i = 0;i < game.player.length;i++)
				game.player[i].board.leftDir = 1; // 左移
		}
		if(e.keyCode == 39)
		{
			for(let i = 0;i < game.player.length;i++)
				game.player[i].board.rightDir = 1; // 右移
		}
		if(e.keyCode == 32)
		{
			if(start == false)
			{ 
				let tmp = parseInt(Math.random()*2,10);
				if(tmp == 0) tmp = -1;
				let speedx = tmp*(Math.random() * 2 + 2);
				let speedy = -1*(Math.random() * 2 + 2);
				for(let i = 0;i < game.player.length;i++)
					if(i==0){
						game.ballList[i].speedx = speedx;
						game.ballList[i].speedy = speedy;
					}
					else{
						game.ballList[i].speedx = speedx;
						game.ballList[i].speedy = -speedy;
					}
			}
			start = true; 
		}
	}
	window.onkeyup = function(e)
	{
		e = e || window.event;
		if(e.keyCode == 37){
			for(let i = 0;i < game.player.length;i++)
				game.player[i].board.leftDir = 0; // 左移
		}
		if(e.keyCode == 39){
			for(let i = 0;i < game.player.length;i++)
				game.player[i].board.rightDir = 0; // 右移
		}
	}
	
	console.log(game);
	setInterval(function()
	{
		if(start == false)
		{
			// 计算
			for(let i = 0;i < game.player.length;i++)
			{
				game.player[i].board.update();
				if(i==0)
					game.ballList[i] = new Ball( (game.player[0].board.len + game.player[0].board.x + game.player[0].board.x)/2,
									canvas.height-65,
									0,0,10,0);
				else game.ballList[i] = new Ball( (game.player[1].board.len + game.player[1].board.x + game.player[1].board.x)/2,
									canvas.height-(canvas.height-65),
									0,0,10,1);
			}

			// 渲染
			ctx.drawImage(background, left_bound, 0, 800, canvas.height);
			for(let i = 0;i < game.brickList.length;i++)
				game.brickList[i].draw();

			for(let i = 0;i < game.player.length;i++){
				game.ballList[i].draw();
				game.player[i].board.draw();
			}
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
			
			for(let i = 0;i < game.player.length;i++)
				game.player[i].board.draw();
		}
		// 清空消息队列
		game.eventList = [];

	},1000 / 60);
}