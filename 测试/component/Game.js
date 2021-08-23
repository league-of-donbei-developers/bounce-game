import {Prop} from './Prop.js'
import {Events} from './Event.js'
import {Affect} from './Affect.js'
import {Player} from './Player.js'
class Game
{
	constructor(brickList,ballList,myboard,yourboard)
	{
		this.brickList = brickList;
		this.ballList = ballList;
		this.propList = [];
		this.eventList = [];
		this.affectList = [];

		this.player = [];
		this.player.push(new Player(myboard,0));
		this.player.push(new Player(yourboard,1));
		
		this.time = 0;
		//砖块音效
		this.audioBrick = document.createElement("audio");
		this.audioBrick.src = "./music/peng.mp3";

		this.audioProp = document.createElement("audio");
		this.audioProp.src = "./music/get_prop.wav";
	}

	brickDisappear(id,tag) // 砖块消失
	{
		this.brickList[id].disappear();
		let event = new Events(10,0,tag);
		event.param.push(this.brickList[id]);
		this.eventList.push(event);
	}

	brickDegrade(id,tag) // 砖块降级
	{
		this.brickList[id].degrade();
		if(this.brickList[id].level == 0)
			this.eventList.push(new Events(1,id,tag));
	}

	ballRebound(id,param) // 弹球反弹
	{
		this.ballList[id].changeDir(param[0]);
	}

	ballChangeColor(id,tag) // 弹球改变所属方
	{
		this.ballList[id].changeColor(tag);
	}

	ballDisappear(id) // 小球消失
	{
		this.ballList[id].disappear();
	}

	propWorking(id,tag) // 道具生效
	{
		let affect = new Affect(this.propList[id],this.time,tag);
		affect.converter(1,this.player[tag],this);
		this.audioProp.play();
		this.affectList.push(affect);
	}

	propStopping(id,tag) // 道具失效
	{
		this.affectList[id].converter(0,this.player[tag],this);
	}

	propDisappear(id) // 道具消失
	{
		this.propList[id].disappear();
	}

	propCreat(brick,tag)
	{
		if(brick.propId != 0) 
			this.propList.push(new Prop(brick.propId,brick.x,brick.y,tag));
	}

	playPeng()
	{
		this.audioBrick.play();
	}


	doEvent(event)
	{
		let eid = event.eid, bid = event.bid, tag = event.tag, param = event.param;

		if(eid == 1) this.brickDisappear(bid,tag);
		if(eid == 2) this.brickDegrade(bid,tag);
		if(eid == 3) this.ballRebound(bid,param);
		if(eid == 4) this.ballChangeColor(bid,tag);
		if(eid == 5) this.ballDisappear(bid)
		if(eid == 6) this.propWorking(bid,tag);
		if(eid == 7) this.propStopping(bid,tag);
		if(eid == 8) this.propDisappear(bid);
		if(eid == 9) this.playPeng();
		if(eid == 10) this.propCreat(param[0],tag);
	}
	checkAffect(affect)
	{
		if(affect.time == this.time) return 0;
		return 1;
	}
}	
export {Game};