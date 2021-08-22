import {Ball} from './Ball.js'
class Affect
{
	constructor(prop,time,tag)
	{
		this.eid = prop.eid;
		this.time = time + 60 * prop.time;
		this.tag = tag;
	}

	doubleScore(flag,player)
	{
		if(flag) player.scoreParam = 1;
		if(!flag) player.scoreParam = 0;	
	}

	addBall(flag,player,game)
	{
		if(flag)
		{
			let x,y;
			if(player.tag == 0) x = -2, y = canvas.height-65;
			else x = 1, y = 65; 
			game.ballList.push(new Ball( (player.board.len + player.board.x + player.board.x)/2,
								y,1,x,10,player.tag));	
			game.ballList.push(new Ball( (player.board.len + player.board.x + player.board.x)/2,
								y,-1,x,10,player.tag));
			game.ballList.push(new Ball( (player.board.len + player.board.x + player.board.x)/2,
								y,2,x,10,player.tag));	
			game.ballList.push(new Ball( (player.board.len + player.board.x + player.board.x)/2,
								y,-2,x,10,player.tag));
		}
	}
	
	addScore(flag,player)
	{
		if(flag) player.score = player.score + 5;
	}

	doubleVate(flag,player)
	{
		if(flag) player.ballVateParam = 2; 
		if(!flag) player.ballVateParam = 1;
	}

	addBoardLen(flag,player)
	{
		console.log(1);
		if(flag) player.board.len += 20;
		if(!flag) player.board.len -= 20; 
	}

	converter(flag,player,game) // 生效:flag = 1, 失效:flag = 0;  
	{
		let eid = this.eid;
		if(eid == 1) this.doubleScore(flag,player);
		if(eid == 2) this.addBall(flag,player,game);
		if(eid == 3) this.addScore(flag,player);
		if(eid == 4) this.doubleVate(flag,player);
		if(eid == 5) this.addBoardLen(flag,player);
	}
	
}
export {Affect}