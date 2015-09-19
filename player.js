/**
 * Created by zhoujh on 2015/9/14.
 */
// Define ChessPiece "Class"
function Player(pos, board) {
    this.init_pos = pos;
    this.pos = pos;
    this.valid_pos = [];
    this.clapboardNum = 10;
    this.board = board;
    this.turn = false;
}

/*Player.prototype.moveToward = function(dir) {
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
};*/

Player.prototype.moveToPos = function(pos) {
    var old_x = this.pos.x;
    var old_y = this.pos.y;
    this.pos = pos;
    this.board.ChessPieceArray[old_x + old_y * WIDTH].object = null;
    this.board.ChessPieceArray[this.pos.x + this.pos.y * WIDTH].object = this;
};

Player.prototype.putClapboard = function(cbi, cbj, state) {
    var pos1 = this.board.ChessPieceArray[cbi * WIDTH + cbj];
    var pos2 = this.board.ChessPieceArray[cbi * WIDTH + cbj + 1];
    var pos3 = this.board.ChessPieceArray[(cbi + 1) * WIDTH + cbj];
    var pos4 = this.board.ChessPieceArray[(cbi + 1) * WIDTH + cbj + 1];
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
        pos4.left = 0;
    }
};

Player.prototype.getValidMovePositions = function() {
    while (this.valid_pos.length > 0) {
        this.valid_pos.pop();
    }
    var new_pos;
    if (this.pos.up == 1) {
        new_pos = this.board.ChessPieceArray[(this.pos.y - 1) * WIDTH + this.pos.x];
        this.valid_pos.push(new_pos);
    }
    if (this.pos.down == 1) {
        new_pos = this.board.ChessPieceArray[(this.pos.y + 1) * WIDTH + this.pos.x];
        this.valid_pos.push(new_pos);
    }
    if (this.pos.left == 1) {
        new_pos = this.board.ChessPieceArray[(this.pos.y) * WIDTH + this.pos.x - 1];
        this.valid_pos.push(new_pos);
    }
    if (this.pos.right == 1) {
        new_pos = this.board.ChessPieceArray[(this.pos.y) * WIDTH + this.pos.x + 1];
        this.valid_pos.push(new_pos);
    }
};

Player.prototype.isWin = function() {
    if (this.init_pos.y == 0) {
        if (this.pos.y == 8) {
            return true;
        }
    } else if (this.init_pos.y == 8) {
        if (this.pos.y == 0) {
            return true;
        }
    }
    return false;
};