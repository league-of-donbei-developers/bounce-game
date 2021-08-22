class Player
{
	constructor(board,tag)
	{
		this.tag = tag;
		this.board = board;
		this.board.tag = tag;
		this.score = 0;
		this.scoreParam = 1;
		this.ballVateParam = 1;
		this.boardLenParam = 0;
	}
}
export {Player}