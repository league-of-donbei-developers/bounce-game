import {Ball} from './Ball.js'
class Affect
{
	constructor(prop,time)
	{
		this.eid = prop.eid;
		this.time = time + 60 * prop.time; 
	}

	doubleScore(flag,game)
	{
		if(flag) game.scoreParam = 1;
		if(!flag) game.scoreParam = 0;	
	}

	addBall(flag,game)
	{
		if(flag)
		{
			game.ballList.push(new Ball( (game.board.len + game.board.x + game.board.x)/2,
								canvas.height-65,
								1,-2,10,1));	
			game.ballList.push(new Ball( (game.board.len + game.board.x + game.board.x)/2,
								canvas.height-65,
								-1,-2,10,1));
			game.ballList.push(new Ball( (game.board.len + game.board.x + game.board.x)/2,
								canvas.height-65,
								2,-2,10,1));	
			game.ballList.push(new Ball( (game.board.len + game.board.x + game.board.x)/2,
								canvas.height-65,
								-2,-2,10,1));
		}
	}
	
	addScore(flag,game)
	{
		if(flag) game.score = game.score + 5;
	}

	doubleVate(flag,game)
	{
		if(flag) game.ballVateParam = 2; 
		if(!flag) game.ballVateParam = 1;
	}

	addBoardLen(flag,game)
	{
		console.log(1);
		if(flag) game.board.len += 20;
		if(!flag) game.board.len -= 20; 
	}

	converter(flag,game) // 生效:flag = 1, 失效:flag = 0;  
	{
		let eid = this.eid;
		if(eid == 1) this.doubleScore(flag,game);
		if(eid == 2) this.addBall(flag,game);
		if(eid == 3) this.addScore(flag,game);
		if(eid == 4) this.doubleVate(flag,game);
		if(eid == 5) this.addBoardLen(flag,game);
	}
	
}
export {Affect}