import {Events} from '../component/Event.js'
import {left_bound,right_bound} from './Init.js'

function calc(game)
{
	let event = new Events(0,0); 
	// 更新小球位置
	for(let i = 0;i < game.ballList.length;i++){ 
		if(game.ballList[i].activate == false) continue;
		game.ballList[i].update();
	}
	// 更新道具位置
	for(let i = 0;i < game.propList.length;i++){
		if(game.propList[i].activate == false) continue;
		game.propList[i].update();
	}
	// 更新板子位置
	for(let i = 0;i < game.player.length;i++)
		game.player[i].board.update(); 	

	for(let i = 0,tmp;i < game.ballList.length;i++){ 
		if(game.ballList[i].activate == false) continue;
		let tag = game.ballList[i].tag;
		
		// 检验球与边界碰撞
		tmp = checkBoundary(game.ballList[i],game);
		if(tmp != -1)
		{
			if(tmp == 2) // 小球出界
			{
				// 小球消失
				event = new Events(5,i,-1);
				game.eventList.push(event);
			}
			else
			{
				// 小球反弹
				event = new Events(3,i,-1);
				event.param.push(tmp);
				game.eventList.push(event);				
			}
		}

		// 检测球砖碰撞
		for(let j = 0;j < game.brickList.length;j++){
			
			if(game.brickList[j].activate == false) continue;
			tmp = checkCollision(game.brickList[j], game.ballList[i], game);
			if(tmp != -1){
				// 处理超级球
				if(game.ballList[i].supper == true){
					// 播放音效
					event = new Events(9,0,tag);
					game.eventList.push(event);		
					
					// 砖块消失
					event = new Events(1,j,tag);
					game.eventList.push(event);
					
				}
				else{
					// 播放音效
					if (game.brickList[j].level == 1) {
						event = new Events(9,0,tag);
						game.eventList.push(event);					
					}

					// 小球反弹
					event = new Events(3,i,tag);
					event.param.push(tmp);
					game.eventList.push(event);

					// 砖块降级
					event = new Events(2,j,tag);
					game.eventList.push(event);
				}
			}
		}

		// 检验球板碰撞
		for(let j = 0;j < game.player.length;j++){
			tmp = checkCollision2(game.player[j].board, game.ballList[i], game);
			if(tmp != -1){
				
				// 小球改变所属方
				event = new Events(4,i,j);
				event.param.push(tmp);
				game.eventList.push(event);
				
				// 小球反弹
				event = new Events(3,i,game.j);
				event.param.push(tmp);
				game.eventList.push(event);
				
			}
		}
	}

	// 检验板子与道具发生碰撞
	for(let j = 0;j < game.player.length;j++){
		for(let i = 0;i < game.propList.length;i++){
			if(game.propList[i].activate == false) continue;
			if(checkCollision3(game.propList[i],game.player[j].board)){
				// 道具生效
				event = new Events(6,i,game.player[j].tag);
				game.eventList.push(event);

				// 道具消失
				event = new Events(8,i,-1);
				game.eventList.push(event);
			}
		}
	}

	// 检验道具是否出界
	for(let i = 0;i < game.propList.length;i++)
		if(checkBoundary2(game.propList[i])){
			// 道具消失
			event = new Events(8,i,-1);
			game.eventList.push(event);
		}

	// 检测特殊效果是否失效
	game.time = game.time + 1;
	for(let i = 0;i < game.affectList.length;i++)
		if(!game.checkAffect(game.affectList[i])){
			// 道具失效
			event = new Events(7,i,game.affectList[i].tag);
			game.eventList.push(event);
		}
}	

//  检测砖,球碰撞
function checkCollision(brick,ball){
	let x = ball.x;
	let y = ball.y;
	let bottom = brick.y + brick.height;
	let right = brick.x + brick.width;
	let top = brick.y;
	let left = brick.x;
	let dis = ball.radius;
	
	if(Math.abs(left - x) <= dis && y >= top && y <= bottom){ //左边界
		return 1;
	}
	if(Math.abs(x - right) <= dis && y >= top && y <= bottom){ //右边界
		return 0;
	}
	if(Math.abs(bottom - y) <= dis && x >= left && x <= right){ //下边界
		return 3;
	}
	if(Math.abs(top - y) <= dis && x >= left && x <= right){ //上边界
		return 2;
	}

	return -1;
}

// 检测板,球碰撞
function checkCollision2(board,ball){
	let x = ball.x;
	let y = ball.y;
	let bottom = board.y + board.width;
	let right = board.x + board.len;
	let top = board.y;
	let left = board.x;
	let dis = ball.radius;
	
	if(Math.abs(left - x) <= dis && y >= top && y <= bottom){ //左边界
		return 1;
	}
	if(Math.abs(x - right) <= dis && y >= top && y <= bottom){ //右边界
		return 0;
	}
	if(Math.abs(bottom - y) <= dis && x >= left && x <= right){ //下边界
		return 3;
	}
	if(Math.abs(top - y) <= dis && x >= left && x <= right){ //上边界
		return 2;
	}

	return -1;
}

// 检测道具,板碰撞
function checkCollision3(prop,board)
{
	let x,y,flag = 0;
	x = prop.x, y = prop.y;
	if(x >= board.x && x <= board.x + board.len && y >= board.y && y <= board.y + board.width) flag = 1;

	x = prop.x + prop.width, y = prop.y;
	if(x >= board.x && x <= board.x + board.len && y >= board.y && y <= board.y + board.width) flag = 1;
	
	x = prop.x, y = prop.y + prop.height;
	if(x >= board.x && x <= board.x + board.len && y >= board.y && y <= board.y + board.width) flag = 1;
	
	x = prop.x + prop.width, y = prop.y + prop.height;
	if(x >= board.x && x <= board.x + board.len && y >= board.y && y <= board.y + board.width) flag = 1;
	
	x = board.x, y = board.y;
	if(x >= prop.x && x <= prop.x + prop.width && y >= prop.y && y <= prop.y + prop.height) flag = 1;
	
	x = board.x + board.len, y = board.y;
	if(x >= prop.x && x <= prop.x + prop.width && y >= prop.y && y <= prop.y + prop.height) flag = 1;
	
	x = board.x, y = board.y + board.width;
	if(x >= prop.x && x <= prop.x + prop.width && y >= prop.y && y <= prop.y + prop.height) flag = 1;
	
	x = board.x + board.len, y = board.y + board.width;
	if(x >= prop.x && x <= prop.x + prop.width && y >= prop.y && y <= prop.y + prop.height) flag = 1;
		
	return flag;
}

// 检测球,边界碰撞
function checkBoundary(ball,game)
{
	let x = ball.x + ball.speedx;
	let y = ball.y + ball.speedy;
	
	if(x - ball.radius <= left_bound){
		return 0;
	}
	if(x + ball.radius >= right_bound){
		return 1;
	}
	if(y + ball.radius >= canvas.height){
		return 2;
	}
	if(y - ball.radius <= 0){
		if(game.player.length == 2) return 2;

		return 3;
	}

	return -1;
}

// 检测道具,边界碰撞
function checkBoundary2(prop)
{
	if(prop.y + prop.height > canvas.height) return 1;
	return 0;
}
export {calc}