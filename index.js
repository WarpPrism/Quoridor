/**
 * Created by zhoujh on 2015/9/15.
 */

var board;
var cells = [];
var clapboards = [];
var gap;
var cell_width;
var canvas;
var cxt;


window.onload = function() {
    /*document.body.addEventListener('keydown', function(e) {
        switch (e.which) {
            // key code for left arrow
            case 37:
                console.log('left arrow key pressed!');
                break;

            // key code for right arrow
            case 39:
                console.log('right arrow key pressed!');
                break;
        }
    });*/
    var right_column = document.getElementById("right-column");
    var right_column_width = parseInt(right_column.offsetWidth * 0.6);
    canvas = document.getElementById("canvas");
    canvas.height = right_column_width;
    canvas.width = right_column_width;
    cxt = canvas.getContext("2d");
    gap = canvas.width / 37.0;
    cell_width =  3.0 * gap;

    board = new ChessBoard();
    board.init();
    getCells();
    getClapBoards();
    drawChessBoard(canvas.width);

    canvas.addEventListener("mouseup", detectClick);
};

function drawChessBoard(width) {
    board.player1.getValidMovePositions();
    board.player2.getValidMovePositions();

    cxt.clearRect(0, 0, canvas.width, canvas.width);
    for (var i = 0; i < cells.length; i++) {
        var c = cells[i];
        if (c.obj == board.player1) {
            cxt.fillStyle = "blue";
        } else if (c.obj == board.player2) {
            cxt.fillStyle = "yellow";
        } else {
            cxt.fillStyle = "#242329";
        }
        cxt.fillRect(c.x, c.y, c.w, c.h);
    }

    for (var j = 0; j < clapboards.length; j++) {
        var cb = clapboards[j];
        cxt.fillStyle = "#763f38";
        cxt.fillRect(cb.x, cb.y, cb.w, cb.h);
    }

    for (var k = 0; k < clapboards.length; k++) {
        var cb1 = clapboards[k];
        if (cb1.obj != 0) {
            cxt.fillStyle = "#f2e47c";
            cxt.fillRect(cb1.x, cb1.y, cb1.w, cb1.h);
        }
    }

    drawBorder(width);
}

function drawBorder(width) {
    cxt.strokeStyle = "rgb(100, 50, 25)";
    cxt.lineWidth = gap;
    cxt.beginPath();
    cxt.lineTo(gap / 2, gap/ 2);
    cxt.lineTo(width - gap / 2, gap/ 2);
    cxt.lineTo(width - gap / 2, width - gap / 2);
    cxt.lineTo(gap / 2, width - gap/ 2);
    cxt.closePath();
    cxt.stroke();
}

function getCells() {
    while (cells.length > 0) {
        cells.pop();
    }
    for (var x = 0; x < board.ChessPieceArray.length; x++) {
        var i = board.ChessPieceArray[x].x;
        var j = board.ChessPieceArray[x].y;
        var obj = board.ChessPieceArray[x].object;
        var a_cell = {
            i:i,
            j:j,
            x:gap + i * (gap + cell_width),
            y:gap + j * (gap + cell_width),
            w:cell_width,
            h:cell_width,
            obj:obj
        };
        cells.push(a_cell);
    }
}
function getClapBoards() {
    while (clapboards.length > 0) {
        clapboards.pop();
    }
    for (var k = 0; k < 8; k++) {
        for (var l = 0; l < 8; l++) {
            var obj = board.ClapBoardArray[k][l][0];
            var clapboard_a = {
                i:k,
                j:l,
                x:gap + l * (gap + cell_width),
                y:gap + cell_width + k * (gap + cell_width),
                w:gap + 2 * cell_width,
                h:gap,
                state:0,
                obj:obj
            };
            obj = board.ClapBoardArray[k][l][1];
            var clapboard_b = {
                i:k,
                j:l,
                x:gap + cell_width + l * (gap + cell_width),
                y:gap + k * (gap + cell_width),
                w:gap,
                h:gap + 2 * cell_width,
                state:1,
                obj:obj
            };
            clapboards.push(clapboard_a);
            clapboards.push(clapboard_b);
        }
    }
}

function detectClick(event) {
    var x = parseFloat(event.clientX) - parseFloat(canvas.getBoundingClientRect().left);
    var y = parseFloat(event.clientY) - parseFloat(canvas.getBoundingClientRect().top);
    var current_player = board.player1.turn == true ? board.player1 : board.player2;
    var next_player = board.player1.turn == true ? board.player2 : board.player1;

    var cc = board.player1.turn == true ? "Player2" : "Player1";
    console.log(cc);

    if (handleCells(x, y, current_player, next_player) == true) {
        return;
    }
    handleClapboards(x, y, current_player, next_player);
}

function handleCells(x, y, current_player, next_player) {
    var find = false;
    for (var i = 0; i < cells.length; i++) {
        var c = cells[i];
        cxt.beginPath();
        cxt.rect(c.x, c.y, c.w, c.h);
        if (cxt.isPointInPath(x, y)) {
            find = true;
            for (var j = 0; j < current_player.valid_pos.length; j++) {
                var Pos1 = current_player.valid_pos[j];
                /*console.log(Pos.x, Pos.y, c.i, c.j);*/
                if ((Pos1.x == c.i) && (Pos1.y == c.j)) {
                    current_player.moveToPos(Pos1);
                    current_player.turn = false;
                    next_player.turn = true;
                    getCells();
                    drawChessBoard(canvas.width);
                    if (current_player.isWin()) {
                        gameOver();
                    }
                    return find;
                }
            }
        }
    }
    return find;
}
function handleClapboards(x, y, current_player, next_player) {
    var cbs = [];
    for (var k = 0; k < clapboards.length; k++) {
        var cb = clapboards[k];
        cxt.beginPath();
        cxt.rect(cb.x, cb.y, cb.w, cb.h);
        if (cxt.isPointInPath(x, y)) {
            cbs.push(cb);
            if (cbs.length >= 2) {
                break;
            }
        }
    }
    console.log(cbs.length);
    var temp;
    var which;
    var another;
    var flag;
    if (cbs.length == 1) {
        which = 0;
    } else if (cbs.length == 2) {
        which = 1;
    }
    if (cbs[which].obj == 0) {
        flag = true;
        another = (cbs[which].state == 0) ? 1: 0;
        var cbi = cbs[which].i;
        var cbj = cbs[which].j;
        // 判断这个位置是不是已经有木板，如果有，flag = false.
        if (cbs[which].state == 0) {
            if ((cbj - 1) >= 0 && board.ClapBoardArray[cbi][cbj - 1][cbs[which].state] != 0) {
                flag = false;
            }
            if ((cbj + 1) < 8 && board.ClapBoardArray[cbi][cbj + 1][cbs[which].state] != 0) {
                flag = false;
            }
        } else if (cbs[which].state == 1) {
            if ((cbi - 1) >= 0 && board.ClapBoardArray[cbi - 1][cbj][cbs[which].state] != 0) {
                flag = false;
            }
            if ((cbi + 1) < 8 && board.ClapBoardArray[cbi + 1][cbj][cbs[which].state] != 0) {
                flag = false;
            }
        }
        if (board.ClapBoardArray[cbi][cbj][another] != 0) {
            flag = false;
        }
        console.log(flag);

        if (flag == true) {
            current_player.putClapboard(cbi, cbj, cbs[which].state);
            current_player.turn = false;
            next_player.turn = true;
            temp = new ClapBoard(cbi, cbj, cbs[which].state);
            board.ClapBoardArray[cbi][cbj][cbs[which].state] = temp;
            getClapBoards();
            drawChessBoard(canvas.width);
        } else {
            console.log("This place already has a clapboard.");
        }
    }

    while (cbs.length > 0) {
        cbs.pop();
    }
}

function gameOver() {
    alert("Game Over!");
    board.init();
    getCells();
    getClapBoards();
    drawChessBoard(canvas.width);
}