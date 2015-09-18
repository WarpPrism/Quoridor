/**
 * Created by zhoujh on 2015/9/14.
 */
// Define ChessPiece "Class"
function Player(pos, board) {
    this.pos = pos;
    this.moveDirection = [];
    this.valid_pos = [];
    this.clapboard = [];
    this.board = board;
}

Player.prototype.moveToward = function(dir) {
    // dir:the direction for moving
    if (this.moveDirection[dir] != 0) {
        var new_pos;
        switch (dir) {
            // Move Up
            case 0:
                new_pos = new Position(this.pos.x, this.pos.y - 1);
                break;
            // Move Down
            case 1:
                new_pos = new Position(this.pos.x, this.pos.y + 1);
                break;
            // Move Left
            case 2:
                new_pos = new Position(this.pos.x - 1, this.pos.y);
                break;
            // Move Right
            case 3:
                new_pos = new Position(this.pos.x + 1, this.pos.y);
                break;
            default:
                break;
        }
        var old_x = this.pos.x;
        var old_y = this.pos.y;
        this.pos = new_pos;
        this.board.ChessPieceArray[old_x + old_y * WIDTH].object = null;
        this.board.ChessPieceArray[this.pos.x + this.pos.y * WIDTH].object = this;
    }
};

Player.prototype.moveToPos = function(pos) {
    var old_x = this.pos.x;
    var old_y = this.pos.y;
    this.pos = pos;
    this.board.ChessPieceArray[old_x + old_y * WIDTH].object = null;
    this.board.ChessPieceArray[this.pos.x + this.pos.y * WIDTH].object = this;
};

/*Player.prototype.putClapboard = function(pos1, pos2, pos3, pos4, state) {
    var cb = null;
    // 检查隔板4个位置的状态
    if (pos1.x + 1 == pos2.x && pos1.y == pos2.y &&
        pos2.x - 1 == pos3.x && pos2.y + 1 == pos3.y &&
        pos3.x + 1 == pos4.x && pos3.y == pos4.y) {
        // 检查隔板横竖的状态
        if (state == 0 || state == 1) {
            // 确定位置可移动的方向
            if (state == 0) {
                // 0 横向
                pos1.down = 0;
                pos2.down = 0;
                pos3.up = 0;
                pos4.up = 0;
            } else if (state == 1) {
                // 1 纵向
                pos1.right = 0;
                pos2.left = 0;
                pos3.right = 0;
                pos4.right = 0;
            }
            cb = new ClapBoard(pos1, pos2, pos3, pos4, state);
            this.board.ClapBoardArray[pos1.x][pos1.y][state] = cb;
        }
    }
};*/

Player.prototype.getValidMovePositions = function() {
    while (this.valid_pos.length > 0) {
        this.valid_pos.pop();
    }
    if (this.moveDirection[0] == 1) {
        this.valid_pos.push(new Position(this.pos.x, this.pos.y - 1));
    }
    if (this.moveDirection[1] == 1) {
        this.valid_pos.push(new Position(this.pos.x, this.pos.y + 1));
    }
    if (this.moveDirection[2] == 1) {
        this.valid_pos.push(new Position(this.pos.x - 1, this.pos.y));
    }
    if (this.moveDirection[3] == 1) {
        this.valid_pos.push(new Position(this.pos.x + 1, this.pos.y));
    }
};