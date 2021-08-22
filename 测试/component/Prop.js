import {ctx} from '../function/Init.js'
class Prop
{
	constructor(eid,x,y){
		this.eid = eid;
		this.x = x;
		this.y = y;
		this.width = 20;
		this.height = 20;
		this.speed = 1;
		
		this.activate = true;
		this.time = 3;
		this.img = new Image();
	}
	draw(){
		if(this.activate == false) return ;
		this.img = document.getElementById('prop');
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