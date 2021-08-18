import {ctx} from './Init.js'
class Brick{
		
	constructor(x,y,width,height,level){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.level = level; 	
		this.audio = document.createElement("audio");
		this.audio.src = "./music/peng.mp3";
		this.img = new Image();
	}
	
	draw(){
		if (this.level == 1)
			this.img.src = "./images/brick1.png";
		else if (this.level == 2)
			this.img.src = "./images/brick2.png";
		else if (this.level == 3)
			this.img.src = "./images/brick3.png";
		else if (this.level == 1000000)
			this.img.src = "./images/wall1.png";

		ctx.drawImage(this.img, this.x, this.y);
	}
	
	checkCollision(ball){
		let x = ball.x;
		let y = ball.y;
		let bottom = this.y + this.height;
		let right = this.x + this.width;
		let top = this.y;
		let left = this.x;
		let dis = ball.radius;
		
		if(Math.abs(left - x) <= dis && y >= top && y <= bottom){
			ball.changeDir(1);
			if (this.level == 1)
				this.audio.play();
			if(this.level != 1000000) 
				this.level = this.level - 1;
			return ;
		}
		if(Math.abs(x - right) <= dis && y >= top && y <= bottom){
			ball.changeDir(0);
			if (this.level == 1)
				this.audio.play();
			if(this.level != 1000000) 
				this.level = this.level - 1;
			return ;
		}
		if(Math.abs(bottom - y) <= dis && x >= left && x <= right){
			ball.changeDir(3);
			if (this.level == 1)
				this.audio.play();
			if(this.level != 1000000)
				this.level = this.level - 1;
			return ;
		}
		if(Math.abs(top - y) <= dis && x >= left && x <= right){
			ball.changeDir(2);
			if (this.level == 1)
				this.audio.play();
			if(this.level != 1000000)
				this.level = this.level - 1;
			return ;
		}
	}
}
export {Brick}