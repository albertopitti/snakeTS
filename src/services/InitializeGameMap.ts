import Cell from "../models/Cell";
import GameMap from "../models/GameMap";

export default function InitializeGameMap (ctx: CanvasRenderingContext2D): GameMap {
    const cellSize = 40;
    Cell.setSize(cellSize);
    let cells = [];
    for (let i = 0; i < ctx.canvas.clientWidth; i+= cellSize) {
        for (let j = 0; j < ctx.canvas.clientHeight; j+= cellSize) {
            cells.push(new Cell(i, j));
        }
    }

    const gameMap = new GameMap(ctx, cells);
    gameMap.drawMap()
    return gameMap;
}