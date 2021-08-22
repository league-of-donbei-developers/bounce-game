import {canvas,ctx} from '../function/Init.js'
class Ball{
	
	constructor(x,y,speedx,speedy,radius,tag){
		this.x = x;
		this.y = y;
		this.speedx = speedx;
		this.speedy = speedy;
		this.radius = radius;
		this.tag = tag;
		this.activate = true;
		this.supper = false; // 超级球
	}
	
	update(){
		
		this.x += this.speedx;
		this.y += this.speedy;
	}
	
	draw(){
		if(this.activate == false) return ;
		ctx.fillStyle = this.tag == 1 ? 'red' : 'yellow';
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2);
		ctx.fill();
	}
	
	changeDir(dir){
		switch(dir){
			case 0:this.speedx = Math.abs(this.speedx);break;		//右
			case 1:this.speedx = -Math.abs(this.speedx);break;		//左
			case 2:this.speedy = -Math.abs(this.speedy);break;		//上
			case 3:this.speedy = Math.abs(this.speedy);break;		//下
		}
	}

	changeColor(tag){
		this.tag = tag;
	}

	disappear(){
		this.activate = false;
	}
}

export {Ball}