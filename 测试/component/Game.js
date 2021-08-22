import {Affect} from './Affect.js'
import {Events} from './Event.js'
import {Prop} from './Prop.js'
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
		this.scoreParam = 1;
		this.ballVateParam = 1;
		this.boardLenParam = 0;
		
		this.time = 0;
		//砖块音效
		this.audio = document.createElement("audio");
		this.audio.src = "./music/peng.mp3";
	}

	brickDisappear(id) // 砖块消失
	{
		this.brickList[id].disappear();
		let event = new Events(10,0);
		event.param.push(this.brickList[id]);
		this.eventList.push(event);
	}

	brickDegrade(id) // 砖块降级
	{
		this.brickList[id].degrade();
		if(this.brickList[id].level == 0)
			this.eventList.push(new Events(1,id));
	}

	ballRebound(id,param) // 弹球反弹
	{
		this.ballList[id].changeDir(param[0]);
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
		let affect = new Affect(this.propList[id],this.time);
		affect.converter(1,this);
		this.affectList.push(affect);
	}

	propStopping(id) // 道具失效
	{
		this.affectList[id].converter(0,this);
	}

	propDisappear(id) // 道具消失
	{
		this.propList[id].disappear();
	}

	propCreat(brick)
	{
		if(brick.propId != 0) 
			this.propList.push(new Prop(brick.propId,brick.x,brick.y));
	}

	playPeng()
	{
		this.audio.play();
	}


	doEvent(event)
	{
		let eid = event.eid, bid = event.bid, param = event.param;

		if(eid == 1) this.brickDisappear(bid);
		if(eid == 2) this.brickDegrade(bid);
		if(eid == 3) this.ballRebound(bid,param);
		if(eid == 4) this.ballChangeColor(bid);
		if(eid == 5) this.ballDisappear(bid)
		if(eid == 6) this.propWorking(bid);
		if(eid == 7) this.propStopping(bid);
		if(eid == 8) this.propDisappear(bid);
		if(eid == 9) this.playPeng();
		if(eid == 10) this.propCreat(param[0]);
	}
	checkAffect(affect)
	{
		if(affect.time == this.time) return 0;
		return 1;
	}
}	
export {Game};