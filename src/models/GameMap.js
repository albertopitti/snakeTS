"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameMap {
    constructor(ctx, cells) {
        this.ctx = ctx;
        this.cells = cells;
    }
    drawMap() {
        this.ctx.fillRect(0, 0, 10, 10);
        this.cells.forEach(cell => {
            cell.draw(this.ctx);
        });
    }
}
exports.default = GameMap;
