import {ctx} from './Init.js'
class Brick{
		
	constructor(x,y,width,height,level){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.level = level; 	
	}
	
	draw(){
		if(this.level != 1000000)
			ctx.fillStyle = '#55007f';
		else ctx.fillStyle = '#1E9FFF';

		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(this.x,this.y);
		ctx.lineTo(this.x + this.width,this.y);
		ctx.lineTo(this.x + this.width,this.y + this.height);
		ctx.lineTo(this.x,this.y + this.height);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		if(this.level != 1000000) ctx.strokeText(this.level,this.x + this.width/2 - 3, this.y + 13);
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
			if(this.level != 1000000)
				this.level = this.level - 1;
			return ;
		}
		if(Math.abs(x - right) <= dis && y >= top && y <= bottom){
			ball.changeDir(0);
			if(this.level != 1000000) 
				this.level = this.level - 1;
			return ;
		}
		if(Math.abs(bottom - y) <= dis && x >= left && x <= right){
			ball.changeDir(3);
			if(this.level != 1000000)
				this.level = this.level - 1;
			return ;
		}
		if(Math.abs(top - y) <= dis && x >= left && x <= right){
			ball.changeDir(2);
			if(this.level != 1000000)
				this.level = this.level - 1;
			return ;
		}
	}
}
export {Brick}