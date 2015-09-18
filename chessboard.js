/**
 * Created by zhoujh on 2015/9/15.
 */
// Create "Class" ChessBoard
const WIDTH = 9;
const HEIGHT = 9;
const CLAPBOARD_NUM = 10;

function ChessBoard() {
    // The 9 X 9 chessboard, all null at the initial state.
    this.ChessPieceArray = [];
    // The 8 X 8 clapboard array.
    // 0: There is a transverse(横向的) clapboard.
    // 1: There is a longitudinal(纵向的) clapboard.
    this.ClapBoardArray = [
        [
            [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]
        ],
        [
            [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]
        ],
        [
            [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]
        ],
        [
            [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]
        ],
        [
            [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]
        ],
        [
            [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]
        ],
        [
            [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]
        ],
        [
            [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]
        ]
    ];

    this.player1 = null;
    this.player2 = null;
}

ChessBoard.prototype.init = function() {
    // 初始化整个棋盘， 这个棋盘拥有9 * 9 个Position对象。
    for (var i = 0; i < HEIGHT; i++) {
        for (var j = 0; j < WIDTH; j++) {
            var pos = new Position(j, i);
            this.ChessPieceArray.push(pos);
        }
    }
    // 初始化隔板数组
    for (var a = 0; a < 8; a++) {
        for (var b = 0; b < 8; b++) {
            this.ClapBoardArray[a][b][0] = 0;
            this.ClapBoardArray[a][b][1] = 0;
        }
    }
    // 新建两个玩家
    this.player1 = new Player(new Position(4, 0), this);
    this.player2 = new Player(new Position(4, 8), this);
    /*this.getValidDirections(this.player1);
    this.getValidDirections(this.player2);
    this.player1.getValidMovePositions();
    this.player2.getValidMovePositions();*/

    // 初始时两个玩家棋子的位置。
    this.ChessPieceArray[4].object = this.player1;
    this.ChessPieceArray[WIDTH * 8 + 4].object = this.player2;
    // 初始时两个玩家各有10块隔板
    /*for (var k = 0; k < CLAPBOARD_NUM; k++) {
        var invalid_pos = new Position(-1, -1);
        this.player1.clapboard.push(new ClapBoard(invalid_pos, invalid_pos, invalid_pos, invalid_pos, -1));
        this.player2.clapboard.push(new ClapBoard(invalid_pos, invalid_pos, invalid_pos, invalid_pos, -1));
    }*/
};



ChessBoard.prototype.getValidDirections = function(player) {
    if (player != null) {
        player.moveDirection[0] = player.pos.up;
        player.moveDirection[1] = player.pos.down;
        player.moveDirection[2] = player.pos.left;
        player.moveDirection[3] = player.pos.right;
    }
};
