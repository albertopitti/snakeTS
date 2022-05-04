"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Snake_1 = __importDefault(require("../models/Snake"));
const FruitFactory_1 = require("../factories/FruitFactory");
const Orientation_1 = require("../utils/Orientation");
const InputListener_1 = require("./InputListener");
const RestartGame_1 = require("../utils/RestartGame");
const InitializeGameMap_1 = __importDefault(require("./InitializeGameMap"));
class GameController {
    constructor() {
        throw new Error('You should not instantiate this class');
    }
    static startGame() {
        GameController.gameMap = (0, InitializeGameMap_1.default)(this.gameMap.ctx);
        GameController.snake = new Snake_1.default(GameController.gameMap.cells[70], [GameController.gameMap.cells[30], GameController.gameMap.cells[50]], Orientation_1.Orientation.RIGHT);
        GameController.snake.draw();
        (0, InputListener_1.setListener)(GameController.snake);
        GameController.setGameInterval();
    }
    static stopGame() {
        clearInterval(GameController.gameInterval);
        GameController.snake.clear();
        GameController.fruit.clear();
        GameController.gameMap.ctx.font = "30px Arial";
        GameController.gameMap.ctx.textAlign = "center";
        GameController.gameMap.ctx.fillStyle = "white";
        GameController.gameMap.ctx.fillText("Game Over. Your score: " + (GameController.snake.bodyCells.length - 2) + ". Press Enter to play again.", GameController.gameMap.ctx.canvas.width / 2, GameController.gameMap.ctx.canvas.height / 2);
        // @ts-ignore
        delete GameController.snake;
        // @ts-ignore
        delete GameController.fruit;
        document.addEventListener("keydown", RestartGame_1.restartGame);
    }
    static setGameInterval() {
        let excludedCells = Object.create(GameController.snake.bodyCells);
        excludedCells.push(Object.create(GameController.snake.cell));
        GameController.fruit = (0, FruitFactory_1.randomFruit)(Object.create(GameController.gameMap.cells), excludedCells);
        GameController.gameInterval = setInterval(() => {
            let cell = GameController.snake.calculateCell();
            if (cell)
                GameController.snake.moveTo(cell);
            if (GameController.snake.bodyCells.includes(GameController.snake.cell)) {
                GameController.stopGame();
            }
            if (GameController.fruit.cell === GameController.snake.cell) {
                GameController.fruit.beEaten(GameController.snake);
                excludedCells = Object.create(GameController.snake.bodyCells);
                excludedCells.push(Object.create(GameController.snake.cell));
                GameController.fruit = (0, FruitFactory_1.randomFruit)(GameController.gameMap.cells, excludedCells);
            }
        }, 200);
    }
}
exports.default = GameController;
