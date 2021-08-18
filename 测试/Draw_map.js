import {canvas,left_bound,right_bound} from './Init.js'
import {Ball} from './Ball.js'
import {Board} from './Board.js'
import {Brick} from './Brick.js'
import {map} from './Map.js'

function draw_map(id,flag) // 地图编号 单人关卡 flag = 1, 双人关卡 flag = 0.
{
	// -------------------------------------------------------- //  画地图 
	let brickList = [];
	if(id == 0)
	{
		for(let i = 0;i < 16;i++){
			for(let j = 0;j < 40;j++){

				let tmp = parseInt(Math.random()*10+1,10);
				if(tmp <= 2) tmp = 1000000; // 1/5几率是墙
				else tmp = parseInt(Math.random()*3+1,10); // 4/5几率是可破坏砖

				brickList.push(new Brick(left_bound + j * 19.95 + 1.3, i * 20 + 150,
										20, 20, tmp));
			}
		}
	}
	else
	{
		for(let i = 0;i < 20 ;i++) {
			for(let j = 0;j < 20;j++) {
				if (map[id][i][j])
					brickList.push(new Brick(left_bound + j * 39.8 + 2, i * 20,
											40, 20, map[id][i][j]));
			}
		}
	}
	for(let i = 0;i < brickList.length;i++)
		brickList[i].draw();

	// -------------------------------------------------------- //  画平板 
	let myBoard = new Board((left_bound+right_bound)/2,
						canvas.height-50,
						(right_bound-left_bound)/3,
						10,//宽度
						12);//速度

	// -------------------------------------------------------- //  画小球 
	let ballList = [];
	if(flag == 1)
	{
		ballList.push(new Ball( (myBoard.len+myBoard.x+myBoard.x)/2,
								canvas.height-60,
								0,0,5,1));
	}
	else
	{
		for(let i = 0;i < 15;i++){
			let tag = Math.floor(Math.random() * 2);
			ballList.push(new Ball(Math.random() * (right_bound - left_bound) + left_bound,
								Math.random() * 40,
								Math.random() * 2 + 2,
								Math.random() * 2 + 2,5,tag));
		}
	}
	return [brickList,ballList,myBoard]
}
export {draw_map}
