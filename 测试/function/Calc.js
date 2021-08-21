import {Events} from '../component/Event.js'
import {left_bound,right_bound} from './Init.js'

//碰撞校验处理函数
//校验并处理弹球，板块与砖块的碰撞事件
function checkCollision(brick,ball){
	let x = ball.x;
	let y = ball.y;
	let bottom = brick.y + brick.height;
	let right = brick.x + brick.width;
	let top = brick.y;
	let left = brick.x;
	let dis = ball.radius;
	
	//左边界
	if(Math.abs(left - x) <= dis && y >= top && y <= bottom){
		return 1;
	}
	
	//右边界
	if(Math.abs(x - right) <= dis && y >= top && y <= bottom){
		return 0;
	}
	
	//下边界
	if(Math.abs(bottom - y) <= dis && x >= left && x <= right){
		return 3;
	}
	
	//上边界
	if(Math.abs(top - y) <= dis && x >= left && x <= right){
		return 2;
	}

	return -1;
}

function checkCollision2(board,ball){
	let x = ball.x;
	let y = ball.y;
	let bottom = board.y + board.width;
	let right = board.x + board.len;
	let top = board.y;
	let left = board.x;
	let dis = ball.radius;
	
	if(Math.abs(left - x) <= dis && y >= top && y <= bottom){ 
		return 1;
	}
	if(Math.abs(x - right) <= dis && y >= top && y <= bottom){
		return 0;
	}
	if(Math.abs(bottom - y) <= dis && x >= left && x <= right){
		return 3;
	}
	if(Math.abs(top - y) <= dis && x >= left && x <= right){
		return 2;
	}

	return -1;
}

function checkBoundary(ball)
{
	let x = ball.x + ball.speedx;
	let y = ball.y + ball.speedy;
	
	if(x - ball.radius <= left_bound){
		return 0;
	}
	if(x + ball.radius >= right_bound){
		return 1
	}
	if(y + ball.radius >= canvas.height){
		return 2;
	}
	if(y - ball.radius <= 0){
		return 3;
	}

	return -1;
}

function calc(game)
{
	let event = new Events(0,0);

	for(let i = 0;i < game.ballList.length;i++){ // 清除飞出去的小球
		if(game.ballList[i].activate == false) continue;
		game.ballList[i].update();
	}
	game.board.update(); // 更新板位置	

	for(let i = 0,tmp;i < game.ballList.length;i++){ 
		if(game.ballList[i].activate == false) continue;
		
		// 检验球与边界碰撞
		tmp = checkBoundary(game.ballList[i]);
		if(tmp != -1)
		{
			if(tmp == 2)
			{
				// 小球消失
				event = new Events(5,i);
				game.eventList.push(event);
			}
			else
			{
				// 小球反弹
				event = new Events(3,i);
				event.parm.push(tmp);
				game.eventList.push(event);				
			}
		}

		// 检测球砖碰撞
		for(let j = 0;j < game.brickList.length;j++){
			
			if(game.brickList[j].activate == false) continue;
			tmp = checkCollision(game.brickList[j], game.ballList[i], game);
			if(tmp != -1)
			{
				
				// 处理超级球
				if(game.ballList[i].supper == true)
				{
					// 播放音效
					event = new Events(9,0);
					game.eventList.push(event);		
					
					// 砖块消失
					event = new Events(1,j);
					game.eventList.push(event);
				}
				else
				{
					// 播放音效
					if (game.brickList[j].level == 1) 
					{
						event = new Events(9,0);
						game.eventList.push(event);					
					}

					// 小球反弹
					event = new Events(3,i);
					event.parm.push(tmp);
					game.eventList.push(event);

					// 砖块降级
					event = new Events(2,j);
					game.eventList.push(event);

				}
			}
		}

		// 检验球板碰撞
		tmp = checkCollision2(game.board, game.ballList[i], game);
		
		if(tmp != -1)
		{
			// 小球反弹
			event = new Events(3,i);
			event.parm.push(tmp);
			game.eventList.push(event);
			
			// 小球改变所属方
			event = new Events(4,i);
			game.eventList.push(event);
			
		}
	}
	
}	
export {calc}