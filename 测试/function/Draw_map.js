import {canvas,ctx,left_bound,right_bound,equator} from './Init.js'
import {Ball} from '../component/Ball.js'
import {Board} from '../component/Board.js'
import {Brick} from '../component/Brick.js'
import {one_map} from '../component/Map.js'
import {two_map} from '../component/Map.js'
 

function draw_map(id,flag,tag) // 地图编号 单人关卡 flag = 1, 双人关卡 flag = 0.
{
	// -------------------------------------------------------- //  画地图 
	let brickList = [];
	if(flag == 0){
		for(let i = 0;i < 10;i++){
			for(let j = 0;j < 20;j++){
				if (two_map[id][i][j])
					brickList.push(new Brick(left_bound + j * 40, equator - 100 + i * 20,
											40, 20, two_map[id][i][j]));
			}
		}
	}
	else {
		for(let i = 0;i < 20 ;i++) {
			for(let j = 0;j < 20;j++) {
				if (one_map[id][i][j])
					brickList.push(new Brick(left_bound + j * 40, i * 20,
											40, 20, one_map[id][i][j]));
			}
		}
	}

	// -------------------------------------------------------- //  画平板 
	let myBoard = new Board((left_bound+right_bound)/2,canvas.height-50,
						100,10,12,tag); // 长度,宽度,速度,tag

	let yourBoard = new Board((left_bound+right_bound)/2,(canvas.height)-(canvas.height-50),
						100,10,12,tag^1); // 长度,宽度,速度,tag
	// -------------------------------------------------------- //  画小球 
	let ballList = [];
	ballList.push(new Ball( (myBoard.len+myBoard.x+myBoard.x)/2,
							canvas.height-60,
							0,0,10,tag));
	if(!flag) ballList.push(new Ball( (myBoard.len+myBoard.x+myBoard.x)/2,
							60,
							0,0,10,tag^1));
	return [brickList,ballList,myBoard,yourBoard]
}
export {draw_map}
