"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __importDefault(require("./Cell"));
const GameController_1 = __importDefault(require("../services/GameController"));
class Fruit {
    constructor(cell) {
        this.cell = cell;
    }
    beEaten(eater) {
        eater.eat(this);
    }
    draw() {
        GameController_1.default.gameMap.ctx.fillStyle = 'rgb(255,255,255)';
        GameController_1.default.gameMap.ctx.fillRect(this.cell.x + Cell_1.default.size / 4, this.cell.y + Cell_1.default.size / 4, Cell_1.default.size / 2, Cell_1.default.size / 2);
    }
    clear() {
        this.cell.draw(GameController_1.default.gameMap.ctx);
    }
}
exports.default = Fruit;
