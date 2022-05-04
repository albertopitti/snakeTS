import GameMap from "../models/GameMap";
import Snake from "../models/Snake";
import Fruit from "../models/Fruit";
import {randomFruit} from "../factories/FruitFactory";
import {Orientation} from "../utils/Orientation";
import {setListener} from "./InputListener";
import {restartGame} from "../utils/RestartGame";
import InitializeGameMap from "./InitializeGameMap";

export default class GameController {
    static gameInterval: NodeJS.Timer;
    static gameMap: GameMap;
    static snake: Snake;
    static fruit: Fruit;

    constructor() {
        throw new Error('You should not instantiate this class');
    }

    static startGame() {
        GameController.gameMap = InitializeGameMap(this.gameMap.ctx);
        GameController.snake = new Snake(GameController.gameMap.cells[70], [GameController.gameMap.cells[30], GameController.gameMap.cells[50]], Orientation.RIGHT);
        GameController.snake.draw();
        setListener(GameController.snake);
        GameController.setGameInterval();
    }

    static stopGame() {
        clearInterval(GameController.gameInterval);
        GameController.snake.clear();
        GameController.fruit.clear();

        GameController.gameMap.ctx.font = "30px Arial";
        GameController.gameMap.ctx.textAlign = "center";
        GameController.gameMap.ctx.fillStyle = "white";
        GameController.gameMap.ctx.fillText("Game Over. Your score: " + (GameController.snake.bodyCells.length - 2) + ". Press Enter to play again.", GameController.gameMap.ctx.canvas.width/2, GameController.gameMap.ctx.canvas.height/2);
        // @ts-ignore
        delete GameController.snake;
        // @ts-ignore
        delete GameController.fruit;
        document.addEventListener("keydown", restartGame)
    }


    static setGameInterval() {
        let excludedCells = Object.create(GameController.snake.bodyCells);
        excludedCells.push(Object.create(GameController.snake.cell));
        GameController.fruit = randomFruit(Object.create(GameController.gameMap.cells), excludedCells);

        GameController.gameInterval = setInterval(() => {
            let cell = GameController.snake.calculateCell();

            if(cell)
                GameController.snake.moveTo(cell);

            if(GameController.snake.bodyCells.includes(GameController.snake.cell)) {
                GameController.stopGame()
            }

            if(GameController.fruit.cell === GameController.snake.cell) {
                GameController.fruit.beEaten(GameController.snake);
                excludedCells = Object.create(GameController.snake.bodyCells);
                excludedCells.push(Object.create(GameController.snake.cell));
                GameController.fruit = randomFruit(GameController.gameMap.cells, excludedCells);
            }

        }, 200);
    }
}