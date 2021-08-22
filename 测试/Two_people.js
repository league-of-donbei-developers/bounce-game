import {canvas,ctx,left_bound,right_bound} from './function/Init.js'
import {Ball} from './component/Ball.js'
import {Game} from './component/Game.js'
import {Prop} from './component/Prop.js'
import {Affect} from './component/Affect.js'
import {draw_map} from './function/Draw_map.js'
import {calc} from './function/Calc.js'
import {reverse} from './function/Reverse.js'
window.onload = function()
{
	let background = document.getElementById('background');
	let tmp ,game;
	let start = false;

	window.onkeydown = function(e)
	{
		e = e || window.event;
		if(e.keyCode == 37)
			game.player[0].board.leftDir = 1; // 左移
		if(e.keyCode == 39)
			game.player[0].board.rightDir = 1; // 右移
		if(e.keyCode == 32)
		{
			if(start == false)
			{ 
				let tp = parseInt(Math.random()*2,10);
				if(tp == 0) tp = -1;
				let speedx = tp*(Math.random() * 2 + 2);
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

	let socket = new WebSocket('ws://60.205.211.19:3005');
	let msg = '1;' + "快乐老家" + ';' + "Spb";
	let tag = 0; // 本方的角色
	

	socket.onopen = function()
	{
		socket.send(msg);
	}

	let objectbuffer = [];
	let ready = false;
	socket.onmessage = function(msg)
	{
		console.log(msg.data);
		var tmp = msg.data.split(";");
		if(tmp[0] == "4")
		{
			tag = parseInt(tmp[2], 10);
			tmp = draw_map(1,0,tag); // 1号地图,双人模式
			game = new Game(tmp[0],tmp[1],tmp[2],tmp[3],tag);
			ready = true;

			console.log(game);
		}
		if(tmp[0] == "3")
		{
			var tmp = tmp[1].split("++");
			if(tmp.length == 2)
			{
				tmp[1] = JSON.parse(tmp[1]);
				if(tmp[0]=='1')
					objectbuffer.push({id:1, msg:tmp[1]});
				else 
					objectbuffer.push({id:0, msg:tmp[1]});
			} 
		}
	}

	setInterval(function()
	{
		if(ready == false)  return ;
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
			
			// 清空消息队列
			game.eventList = [];

			socket.send("2;0++" + JSON.stringify({
					left:game.player[0].board.leftDir,
					right:game.player[0].board.rightDir}) );
			
			if(tag == 0) // 发消息的一方
			{
				if(game.time % 60 == 0 && game.time)
					socket.send("2;1++"+JSON.stringify(game));
			}
			
			if(objectbuffer.length > 0) // 收消息
			{
				if(objectbuffer[0].id == 1)
				{
					let msg = objectbuffer[0].msg;
					reverse(msg);
					game = msg;
				}
				if(objectbuffer[0].id == 0)
				{
					game.player[1].board.leftDir = objectbuffer[0].msg.left;
					game.player[1].board.rightDir = objectbuffer[0].msg.right;
				}
				objectbuffer.splice(0,1);
			}
		}
	},1000 / 60);
}