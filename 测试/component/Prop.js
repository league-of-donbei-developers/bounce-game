import {ctx} from '../function/Init.js'
class Prop
{
	constructor(eid,x,y,tag){
		this.eid = eid;
		this.x = x + 11;
		this.y = y + 1;
		this.width = 18;
		this.height = 18;
		if(!tag) this.speed = 1;
		else this.speed = -1;
		this.activate = true;
		this.time = 3;
		this.img = new Image();
	}
	draw(){
		if(this.activate == false) return ;
		if (this.eid == 2)
			this.img = document.getElementById('prop_qiu');
		else if (this.eid == 5)
			this.img = document.getElementById('prop_ban');
		else if (this.eid == 114514)
			this.img = document.getElementById('prop_s');

		ctx.drawImage(this.img, this.x, this.y,this.width,this.height);
	}
	update(){
		this.y = this.y + this.speed;
	}
	disappear(){
		this.activate = false;
	}
}
export {Prop}