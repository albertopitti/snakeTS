"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __importDefault(require("./Cell"));
const Orientation_1 = require("../utils/Orientation");
const GameController_1 = __importDefault(require("../services/GameController"));
class Snake {
    constructor(cell, bodyCells, orientation) {
        this.headStyle = 'rgb(255,255,255)';
        this.bodyStyle = 'rgb(255,255,255)';
        this.cell = cell;
        this.bodyCells = bodyCells;
        this.currentOrientation = orientation;
        this.selectedOrientation = orientation;
    }
    setSelectedOrientation(orientation) {
        this.selectedOrientation = orientation;
    }
    drawHead() {
        GameController_1.default.gameMap.ctx.fillStyle = this.headStyle;
        GameController_1.default.gameMap.ctx.beginPath();
        switch (this.currentOrientation) {
            case Orientation_1.Orientation.UP:
                GameController_1.default.gameMap.ctx.moveTo(this.cell.x, this.cell.y + Cell_1.default.size);
                GameController_1.default.gameMap.ctx.lineTo(this.cell.x + Cell_1.default.size / 2, this.cell.y);
                GameController_1.default.gameMap.ctx.lineTo(this.cell.x + Cell_1.default.size, this.cell.y + Cell_1.default.size);
                break;
            case Orientation_1.Orientation.DOWN:
                GameController_1.default.gameMap.ctx.moveTo(this.cell.x, this.cell.y);
                GameController_1.default.gameMap.ctx.lineTo(this.cell.x + Cell_1.default.size / 2, this.cell.y + Cell_1.default.size);
                GameController_1.default.gameMap.ctx.lineTo(this.cell.x + Cell_1.default.size, this.cell.y);
                break;
            case Orientation_1.Orientation.RIGHT:
                GameController_1.default.gameMap.ctx.moveTo(this.cell.x, this.cell.y);
                GameController_1.default.gameMap.ctx.lineTo(this.cell.x + Cell_1.default.size, this.cell.y + Cell_1.default.size / 2);
                GameController_1.default.gameMap.ctx.lineTo(this.cell.x, this.cell.y + Cell_1.default.size);
                break;
            case Orientation_1.Orientation.LEFT:
                GameController_1.default.gameMap.ctx.moveTo(this.cell.x, this.cell.y + Cell_1.default.size / 2);
                GameController_1.default.gameMap.ctx.lineTo(this.cell.x + Cell_1.default.size, this.cell.y);
                GameController_1.default.gameMap.ctx.lineTo(this.cell.x + Cell_1.default.size, this.cell.y + Cell_1.default.size);
                break;
        }
        GameController_1.default.gameMap.ctx.fill();
    }
    draw() {
        this.drawBody();
        this.drawHead();
    }
    drawBody() {
        GameController_1.default.gameMap.ctx.fillStyle = this.bodyStyle;
        this.bodyCells.forEach(cell => {
            GameController_1.default.gameMap.ctx.fillRect(cell.x, cell.y, Cell_1.default.size, Cell_1.default.size);
        });
    }
    clearBody() {
        this.bodyCells.forEach(cell => {
            cell.draw(GameController_1.default.gameMap.ctx);
        });
    }
    clear() {
        this.clearBody();
        this.clearHead();
    }
    clearHead() {
        this.cell.draw(GameController_1.default.gameMap.ctx);
    }
    eat(fruit) {
        this.bodyCells.push(fruit.cell);
    }
    moveTo(cell) {
        this.clear();
        this.bodyCells.shift();
        this.bodyCells.push(this.cell);
        this.cell = cell;
        this.draw();
    }
    calculateCell() {
        let cell;
        let index = GameController_1.default.gameMap.cells.findIndex(cell => {
            return cell === this.cell;
        });
        if (!(0, Orientation_1.isOppositeOrientation)(this.selectedOrientation, this.currentOrientation))
            this.currentOrientation = this.selectedOrientation;
        switch (this.currentOrientation) {
            case Orientation_1.Orientation.LEFT:
                if (index - (GameController_1.default.gameMap.ctx.canvas.clientWidth / Cell_1.default.size) < 0) {
                    cell = GameController_1.default.gameMap.cells[GameController_1.default.gameMap.cells.length - (GameController_1.default.gameMap.ctx.canvas.clientWidth / Cell_1.default.size) + index];
                }
                else {
                    cell = GameController_1.default.gameMap.cells[index - (GameController_1.default.gameMap.ctx.canvas.clientWidth / Cell_1.default.size)];
                }
                break;
            case Orientation_1.Orientation.RIGHT:
                if (index + (GameController_1.default.gameMap.ctx.canvas.clientWidth / Cell_1.default.size) >
                    (GameController_1.default.gameMap.ctx.canvas.clientWidth / Cell_1.default.size) * (GameController_1.default.gameMap.ctx.canvas.clientHeight / Cell_1.default.size) - 1) {
                    cell = GameController_1.default.gameMap.cells[index % (GameController_1.default.gameMap.ctx.canvas.clientWidth / Cell_1.default.size)];
                }
                else {
                    cell = GameController_1.default.gameMap.cells[index + (GameController_1.default.gameMap.ctx.canvas.clientWidth / Cell_1.default.size)];
                }
                break;
            case Orientation_1.Orientation.UP:
                if (index % (GameController_1.default.gameMap.ctx.canvas.clientHeight / Cell_1.default.size) == 0) {
                    cell = GameController_1.default.gameMap.cells[index + (GameController_1.default.gameMap.ctx.canvas.clientHeight / Cell_1.default.size) - 1];
                }
                else {
                    cell = GameController_1.default.gameMap.cells[index - 1];
                }
                break;
            case Orientation_1.Orientation.DOWN:
                if (index % (GameController_1.default.gameMap.ctx.canvas.clientHeight / Cell_1.default.size) == (GameController_1.default.gameMap.ctx.canvas.clientHeight / Cell_1.default.size) - 1) {
                    cell = GameController_1.default.gameMap.cells[index - (index % (GameController_1.default.gameMap.ctx.canvas.clientHeight / Cell_1.default.size))];
                }
                else {
                    cell = GameController_1.default.gameMap.cells[index + 1];
                }
                break;
            default:
                return false;
        }
        return cell;
    }
}
exports.default = Snake;
