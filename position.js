/**
 * Created by zhoujh on 2015/9/15.
 */

// Create position class

function Position(x, y) {
    this.x = x;
    this.y = y;
    this.up = 1;
    this.down = 1;
    this.left = 1;
    this.right = 1;
    this.object = null;

    if (x <= 0) {
        this.left = 0;
    }
    if (this.x >= WIDTH - 1) {
        this.right = 0;
    }
    if (this.y <= 0) {
        this.up = 0;
    }
    if (this.y >= HEIGHT - 1) {
        this.down = 0;
    }
}

Position.prototype.isValid = function() {
    return this.x >= 0 && this.x < 9 && this.y >= 0 && this.y < 9;
};