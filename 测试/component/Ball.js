import {canvas,ctx,left_bound,right_bound} from '../function/Init.js'
class Ball{
	
	constructor(x,y,speedx,speedy,radius,tag){
		this.x = x;
		this.y = y;
		this.speedx = speedx;
		this.speedy = speedy;
		this.radius = radius;
		this.tag = tag;
		this.activate = true;
	}
	
	update(){
		let x = this.x + this.speedx;
		let y = this.y + this.speedy;
		
		if(x - this.radius <= left_bound){
			this.speedx = Math.abs(this.speedx);
		}
		if(x + this.radius >= right_bound){
			this.speedx = -Math.abs(this.speedx);
		}
		
		if(y + this.radius >= canvas.height){
			this.activate = false;
		}
		
		if(y - this.radius <= 0){
			this.speedy = Math.abs(this.speedy);
		}
		
		this.x += this.speedx;
		this.y += this.speedy;
	}
	
	draw(){
		if(this.activate == false) return ;
		ctx.fillStyle = this.tag == 0 ? 'red' : 'yellow';
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2);
		ctx.fill();
	}
	
	clear(){
		let stepClear = 1;
		clearArc(this.x,this.y,this.radius+0.6);
	   	function clearArc(x,y,radius){
	      	let calcWidth = radius-stepClear;
	      	let calcHeight = Math.sqrt(radius*radius-calcWidth*calcWidth);  
	
	      	let posX = x - calcWidth;
	      	let posY = y - calcHeight;  
	
	      	let widthX = 2 * calcWidth;
	      	let heightY = 2 * calcHeight;  
	 
	      	if(stepClear <= radius){
	         	ctx.clearRect(posX,posY,widthX,heightY);
	         	stepClear += 1;
	         	clearArc(x,y,radius);
	      	}
	    }
	}

	changeDir(dir){
		switch(dir){
			case 0:this.speedx = Math.abs(this.speedx);break;		//右
			case 1:this.speedx = -Math.abs(this.speedx);break;		//左
			case 2:this.speedy = -Math.abs(this.speedy);break;		//上
			case 3:this.speedy = Math.abs(this.speedy);break;		//下
		}
	}

	changeColor(){
		this.tag = this.tag ^ 1;
	}

	disappear(){
		this.activate = false;
	}
}

export {Ball}