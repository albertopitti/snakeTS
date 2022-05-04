import IEatable from "../interfaces/IEatable";
import IPresence from "../interfaces/IPresence";
import IEater from "../interfaces/IEater";
import Cell from "./Cell";
import GameController from "../services/GameController";

export default class Fruit implements IEatable, IPresence {
    cell: Cell;

    constructor(cell: Cell) {
        this.cell = cell;
    }

    beEaten(eater: IEater): void {
        eater.eat(this);
    }

    draw(): void {
        GameController.gameMap.ctx.fillStyle = 'rgb(255,255,255)';
        GameController.gameMap.ctx.fillRect(this.cell.x + Cell.size/4, this.cell.y + Cell.size/4, Cell.size/2, Cell.size/2);
    }

    clear(): void {
        this.cell.draw(GameController.gameMap.ctx);
    }
}