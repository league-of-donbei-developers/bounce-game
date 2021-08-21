class Game
{
	constructor(brickList,ballList,board)
	{
		this.brickList = brickList;
		this.ballList = ballList;
		this.board = board;
		this.propList = [];
		this.eventList = [];
		this.affectList = [];

		this.score = 0;
		this.scorePram = 1;
		this.ballVatePram = 1;
		this.boardLenPram = 0;
		
		this.time = 0;
		//砖块音效
		this.audio = document.createElement("audio");
		this.audio.src = "./music/peng.mp3";
	}

	brickDisappear(id) // 砖块消失
	{
		this.brickList[id].disappear();
	}

	brickDegrade(id) // 砖块降级
	{
		this.brickList[id].degrade();
	}

	ballRebound(id,parm) // 弹球反弹
	{
		this.ballList[id].changeDir(parm[0]);
	}

	ballChangeColor(id) // 弹球改变所属方
	{
		this.ballList[id].changeColor();
	}

	ballDisappear(id) // 小球消失
	{
		this.ballList[id].disappear();
	}

	propWorking(id) // 道具生效
	{

	}

	propStopping(id) // 道具失效
	{

	}

	propDisappear(id) // 道具消失
	{

	}

	playPeng()
	{
		this.audio.play();
	}

	doEvent(event)
	{
		let eid = event.eid, bid = event.bid, parm = event.parm;

		if(eid == 1) this.brickDisappear(bid);
		if(eid == 2) this.brickDegrade(bid);
		if(eid == 3) this.ballRebound(bid,parm);
		if(eid == 4) this.ballChangeColor(bid);
		if(eid == 5) this.ballDisappear(bid)
		if(eid == 6) this.propWorking(bid);
		if(eid == 7) this.propStopping(bid);
		if(eid == 8) this.propDisappear(bid);
		if(eid == 9) this.playPeng();
	}
	checkAffect(affect)
	{
		if(affect.time == game.time)
		{
			affect.converter(0,this);
			return 0;
		} 
		return 1;
	}
}	
export {Game};