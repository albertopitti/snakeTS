"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restartGame = void 0;
const GameController_1 = __importDefault(require("../services/GameController"));
function restartGame(e) {
    if (e.key == "Enter") {
        GameController_1.default.gameMap.ctx.clearRect(0, 0, GameController_1.default.gameMap.ctx.canvas.width, GameController_1.default.gameMap.ctx.canvas.height);
        GameController_1.default.startGame();
        document.removeEventListener("keydown", restartGame);
    }
}
exports.restartGame = restartGame;
