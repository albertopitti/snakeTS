"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InitializeGameMap_1 = __importDefault(require("./services/InitializeGameMap"));
const GameController_1 = __importDefault(require("./services/GameController"));
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
if (ctx == null)
    throw new DOMException('No Canvas Found');
const gameMap = (0, InitializeGameMap_1.default)(ctx);
GameController_1.default.gameMap = gameMap;
GameController_1.default.startGame();
