import IEater from "../interfaces/IEater";
import IPresence from "../interfaces/IPresence";
import IMove from "../interfaces/IMove";
import Cell from "./Cell";
import {isOppositeOrientation, Orientation} from "../utils/Orientation";
import GameController from "../services/GameController";
import Fruit from "./Fruit";

export default class Snake implements IEater, IPresence, IMove {
    cell: Cell;
    headStyle: string = 'rgb(255,255,255)';
    bodyStyle: string = 'rgb(255,255,255)';
    bodyCells: Cell[];

    private currentOrientation: number;
    selectedOrientation: number;

    setSelectedOrientation(orientation: number) {
        this.selectedOrientation = orientation;
    }

    constructor(cell: Cell, bodyCells: Cell[], orientation: number) {
        this.cell = cell;
        this.bodyCells = bodyCells;
        this.currentOrientation = orientation;
        this.selectedOrientation = orientation;
    }

    private drawHead() {
        GameController.gameMap.ctx.fillStyle = this.headStyle;
        GameController.gameMap.ctx.beginPath();
        switch (this.currentOrientation) {
            case Orientation.UP:
                GameController.gameMap.ctx.moveTo(this.cell.x, this.cell.y + Cell.size);
                GameController.gameMap.ctx.lineTo(this.cell.x + Cell.size/2, this.cell.y);
                GameController.gameMap.ctx.lineTo(this.cell.x + Cell.size, this.cell.y + Cell.size);
                break;
            case Orientation.DOWN:
                GameController.gameMap.ctx.moveTo(this.cell.x, this.cell.y);
                GameController.gameMap.ctx.lineTo(this.cell.x + Cell.size/2, this.cell.y + Cell.size);
                GameController.gameMap.ctx.lineTo(this.cell.x + Cell.size, this.cell.y);
                break;
            case Orientation.RIGHT:
                GameController.gameMap.ctx.moveTo(this.cell.x, this.cell.y);
                GameController.gameMap.ctx.lineTo(this.cell.x + Cell.size, this.cell.y + Cell.size/2);
                GameController.gameMap.ctx.lineTo(this.cell.x, this.cell.y + Cell.size);
                break;
            case Orientation.LEFT:
                GameController.gameMap.ctx.moveTo(this.cell.x, this.cell.y + Cell.size/2);
                GameController.gameMap.ctx.lineTo(this.cell.x + Cell.size, this.cell.y);
                GameController.gameMap.ctx.lineTo(this.cell.x + Cell.size, this.cell.y + Cell.size);
                break;
        }

        GameController.gameMap.ctx.fill();
    }

    draw(): void {
        this.drawBody();
        this.drawHead();
    }

    private drawBody() {
        GameController.gameMap.ctx.fillStyle = this.bodyStyle;
        this.bodyCells.forEach(cell => {
            GameController.gameMap.ctx.fillRect(cell.x, cell.y, Cell.size, Cell.size);
        });
    }

    private clearBody() {
        this.bodyCells.forEach(cell => {
            cell.draw(GameController.gameMap.ctx);
        });
    }

    clear() {
        this.clearBody();
        this.clearHead();
    }

    private clearHead() {
        this.cell.draw(GameController.gameMap.ctx);
    }

    eat(fruit: Fruit): void {
        this.bodyCells.push(fruit.cell);
    }

    moveTo(cell: Cell): void {
        this.clear();
        this.bodyCells.shift();
        this.bodyCells.push(this.cell);
        this.cell = cell;
        this.draw();
    }

    calculateCell() {
        let cell: Cell;
        let index = GameController.gameMap.cells.findIndex( cell => {
            return cell === this.cell
        });

        if(!isOppositeOrientation(this.selectedOrientation, this.currentOrientation))
            this.currentOrientation = this.selectedOrientation

        switch (this.currentOrientation) {
            case Orientation.LEFT:
                if( index - (GameController.gameMap.ctx.canvas.clientWidth / Cell.size) < 0 ) {
                    cell = GameController.gameMap.cells[GameController.gameMap.cells.length - (GameController.gameMap.ctx.canvas.clientWidth / Cell.size) + index];
                } else {
                    cell = GameController.gameMap.cells[index - (GameController.gameMap.ctx.canvas.clientWidth / Cell.size)]
                }
                break;
            case Orientation.RIGHT:
                if( index + (GameController.gameMap.ctx.canvas.clientWidth / Cell.size) >
                    (GameController.gameMap.ctx.canvas.clientWidth / Cell.size) * (GameController.gameMap.ctx.canvas.clientHeight / Cell.size) - 1 ) {
                    cell = GameController.gameMap.cells[index % (GameController.gameMap.ctx.canvas.clientWidth / Cell.size)];
                } else {
                    cell = GameController.gameMap.cells[index + (GameController.gameMap.ctx.canvas.clientWidth / Cell.size)]
                }
                break;
            case Orientation.UP:
                if( index % (GameController.gameMap.ctx.canvas.clientHeight / Cell.size) == 0 ) {
                    cell = GameController.gameMap.cells[index + (GameController.gameMap.ctx.canvas.clientHeight / Cell.size) - 1];
                } else {
                    cell = GameController.gameMap.cells[index - 1]
                }
                break;
            case Orientation.DOWN:
                if( index % (GameController.gameMap.ctx.canvas.clientHeight / Cell.size) == (GameController.gameMap.ctx.canvas.clientHeight / Cell.size) - 1 ) {
                    cell = GameController.gameMap.cells[index - (index % (GameController.gameMap.ctx.canvas.clientHeight / Cell.size))];
                } else {
                    cell = GameController.gameMap.cells[index + 1]
                }
                break;
            default:
                return false;
        }

        return cell;
    }
}