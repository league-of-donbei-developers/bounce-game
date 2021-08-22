import {canvas,ctx,left_bound,right_bound,equator} from './Init.js'
function lok(x)
{
	return Math.abs(canvas.height - x);
}
function reverse(game)
{
	// 镜像砖
	for(let i = 0;i < game.brickList.length; i++)
		game.brickList[i].y = lok(game.brickList[i].y);

	// 镜像球
	for(let i = 0;i < game.ballList.length;i++){
		game.ballList[i].y = lok(game.ballList[i].y);
		game.ballList[i].speedy = -game.ballList[i].speedy;
	}

	// 镜像道具
	for(let i = 0;i < game.propList.length;i++){
		game.propList[i].y = lok(game.propList[i].y);
		game.propList[i].speedy = -game.propList[i].speedy;
	}

	// 镜像板
	for(let i = 0;i < game.player.length; i++)
		game.brickList[i].y = lok(game.brickList[i].y);

}
export {reverse};