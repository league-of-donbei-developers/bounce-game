import {Events} from '../component/Event.js'

//碰撞校验处理函数
//校验并处理弹球，板块与砖块的碰撞事件
function checkCollision(brick,ball,game){
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
		return 4;
	}
	return -1;
}
function checkCollision2(board,ball,game){
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

function calc(game)
{
	let event = new Events(0,0);

	for(let i = 0;i < game.ballList.length;i++){ // 清除飞出去的小球
		if(game.ballList[i].activate == false) continue;
		game.ballList[i].update();
	}

	for(let i = 0;i < game.ballList.length;i++){ // 检测碰撞
		if(game.ballList[i].activate == false) continue;
		for(let j = 0;j < game.brickList.length;j++){
			
			if(game.brickList[j].activate == false) continue;
			let tmp = checkCollision(game.brickList[j],game.ballList[i],game);
			if(tmp != -1)
			{
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

		let nmp = checkCollision2(game.board, game.ballList[i],game);
		if(nmp != -1)
		{
			// 小球反弹
			event = new Events(3,i);
			event.parm.push(nmp);
			game.eventList.push(event);
			
			// 小球改变所属方
			event = new Events(4,i);
			game.eventList.push(event);
			
		}
	}
	
	game.board.update(); // 更新板	
}	
export {calc}