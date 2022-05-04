"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __importDefault(require("../models/Cell"));
const GameMap_1 = __importDefault(require("../models/GameMap"));
function InitializeGameMap(ctx) {
    const cellSize = 40;
    Cell_1.default.setSize(cellSize);
    let cells = [];
    for (let i = 0; i < ctx.canvas.clientWidth; i += cellSize) {
        for (let j = 0; j < ctx.canvas.clientHeight; j += cellSize) {
            cells.push(new Cell_1.default(i, j));
        }
    }
    const gameMap = new GameMap_1.default(ctx, cells);
    gameMap.drawMap();
    return gameMap;
}
exports.default = InitializeGameMap;
