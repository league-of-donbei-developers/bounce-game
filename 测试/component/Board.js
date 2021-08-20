import {ctx,left_bound,right_bound} from '../function/Init.js'
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
		this.img = document.getElementById('board')
		ctx.drawImage(this.img, this.x, this.y, this.len, this.width);	
	}	
	update(){
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
}
export {Board}