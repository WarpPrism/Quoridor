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
    // player1先走，player2后走
    this.player1.turn = true;
    // 初始时两个玩家棋子的位置。
    this.ChessPieceArray[4].object = this.player1;
    this.ChessPieceArray[WIDTH * 8 + 4].object = this.player2;
};

ChessBoard.prototype.getPositionInDir = function(pos, dir) {
    var x = pos.x;
    var y = pos.y;
    var new_x;
    var new_y;
    var index;
    switch (dir) {
        case 0:
            new_x = x;
            new_y = y - 1;
            index = WIDTH * new_y + new_x;
            if (index >= 0 && index < 81) {
                return this.ChessPieceArray[index];
            } else {
                return false;
            }
            break;
        case 1:
            new_x = x;
            new_y = y + 1;
            index = WIDTH * new_y + new_x;
            if (index >= 0 && index < 81) {
                return this.ChessPieceArray[index];
            } else {
                return false;
            }
            break;
        case 2:
            new_x = x - 1;
            new_y = y;
            index = WIDTH * new_y + new_x;
            if (index >= 0 && index < 81) {
                return this.ChessPieceArray[index];
            } else {
                return false;
            }
            break;
        case 3:
            new_x = x + 1;
            new_y = y;
            index = WIDTH * new_y + new_x;
            if (index >= 0 && index < 81) {
                return this.ChessPieceArray[index];
            } else {
                return false;
            }
            break;
        default:
            return false;
    }
};
