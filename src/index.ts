import InitializeGameMap from "./services/InitializeGameMap";
import GameController from "./services/GameController";

let canvas = <HTMLCanvasElement> document.getElementById('canvas');
let ctx = canvas.getContext('2d');
if(ctx == null)
    throw new DOMException('No Canvas Found');

const gameMap = InitializeGameMap(ctx);

GameController.gameMap = gameMap;
GameController.startGame();