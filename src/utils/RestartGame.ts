import GameController from "../services/GameController";

export function restartGame(e: KeyboardEvent) {
    if(e.key == "Enter") {
        GameController.gameMap.ctx.clearRect(0, 0, GameController.gameMap.ctx.canvas.width, GameController.gameMap.ctx.canvas.height);
        GameController.startGame()
        document.removeEventListener("keydown", restartGame)
    }
}