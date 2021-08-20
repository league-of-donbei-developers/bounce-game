import {ctx} from '../function/Init.js'
class Brick{
		
	constructor(x,y,width,height,level){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.level = level; 	
		this.activate = true;
		
		//砖块图像
		this.img = new Image();
	}
	
	draw(){
		if(this.level <= 0) return ;
		if (this.level == 1)
			this.img = document.getElementById('brick1')
		else if (this.level == 2)
			this.img = document.getElementById('brick2')
		else if (this.level == 3)
			this.img = document.getElementById('brick3')
		else if (this.level == 1000000)
			this.img = document.getElementById('wall1')
		ctx.drawImage(this.img, this.x, this.y,this.width,this.height);
	}
	
	//碰撞检测，砖块与球
	disappear(){
		this.activate = false;
	}
	
	degrade(){
		if(this.level == 1000000) return ;
		this.level = this.level - 1;
		if(this.level <= 0) this.disappear();
	}

}
export {Brick}