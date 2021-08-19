import {ctx,left_bound,right_bound} from './Init.js'
class Board{
	
	constructor(dx,dy,len,wide,speed){
		this.x = dx-len/2; // 左上横坐标
		this.y = dy-wide/2; // 左上纵坐标
		this.len = len; // 长度
		this.width = wide; // 宽度
		this.speed = speed; // 移动速度
		this.leftDir = 0;
		this.rightDir = 0;
		this.img = new Image();
	}
	draw(){
		this.img.src = "./images/board.png";
		ctx.drawImage(this.img, this.x, this.y, this.len, this.width);
	}	
	update()
	{
		if(this.rightDir == 1)
		{
			if(this.x + this.len + this.speed <= right_bound)
				this.x = this.x + this.speed; 
		}
		if(this.leftDir == 1)
		{
			if(this.x - this.speed >= left_bound)
				this.x = this.x - this.speed; 
		}
	}
	checkCollision(ball){
		let x = ball.x;
		let y = ball.y;
		let bottom = this.y + this.width;
		let right = this.x + this.len;
		let top = this.y;
		let left = this.x;
		let dis = ball.radius;
		
		if(Math.abs(left - x) <= dis && y >= top && y <= bottom){
			ball.changeDir(1);
			ball.tag = ball.tag ^ 1;  
			return true;
		}
		if(Math.abs(x - right) <= dis && y >= top && y <= bottom){
			ball.changeDir(0);
			ball.tag = ball.tag ^ 1;
			return true;
		}
		if(Math.abs(bottom - y) <= dis && x >= left && x <= right){
			ball.changeDir(3);
			ball.tag = ball.tag ^ 1;
			return true;
		}
		if(Math.abs(top - y) <= dis && x >= left && x <= right){
			ball.changeDir(2);
			ball.tag = ball.tag ^ 1;
			return true;
		}
		return false;
	}
	clear(){
		ctx.clearRect(this.x-0.5,this.y,this.len+0.7,this.width);
	}
	move(){
		this.clear(),this.update(),this.draw();
	}
}
export {Board}