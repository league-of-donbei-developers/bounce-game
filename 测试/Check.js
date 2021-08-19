
//碰撞校验处理函数
//校验并处理弹球，板块与砖块的碰撞事件
function check(ballList,brickList,myBoard)
{
	for(let i = 0;i < ballList.length;i++){ // 清除飞出去的小球
		ballList[i].update();
		if(ballList[i].activate == false)
			ballList.splice(i,1),i--;
	}
	for(let i = 0;i < ballList.length;i++){
		for(let j = 0;j < brickList.length;j++)
		{
			brickList[j].checkCollision(ballList[i]);
			if(brickList[j].level <= 0)
				brickList.splice(j,1),j--;
		}
		myBoard.checkCollision(ballList[i]);
	}
	
	if(ballList.length == 0 && brickList.length > 0)
		alert("You Lose!");
	
	if(brickList.length == 0) 
		alert("You Win!");
}	
export {check}