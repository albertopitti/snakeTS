"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static setSize(size) {
        this.size = size;
    }
    static setStyle(style) {
        this.style = style;
    }
    draw(ctx) {
        ctx.fillStyle = Cell.style;
        ctx.fillRect(this.x, this.y, Cell.size, Cell.size);
    }
}
exports.default = Cell;
Cell.style = 'rgb(100,100,100)';
