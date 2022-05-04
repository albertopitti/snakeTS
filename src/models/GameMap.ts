import Cell from "./Cell";

export default class GameMap {
    ctx: CanvasRenderingContext2D;
    cells: Cell[];

    constructor(ctx: CanvasRenderingContext2D, cells: Cell[]) {
        this.ctx = ctx;
        this.cells = cells;
    }

    drawMap() {
        this.ctx.fillRect(0, 0, 10, 10);
        this.cells.forEach(cell => {
            cell.draw(this.ctx)
        })
    }

}