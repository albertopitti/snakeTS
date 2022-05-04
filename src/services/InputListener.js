"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setListener = void 0;
const Orientation_1 = require("../utils/Orientation");
function setListener(snake) {
    document.addEventListener('keydown', (e) => {
        let orientation = snake.selectedOrientation;
        switch (e.key) {
            case 'a':
                if (orientation != Orientation_1.Orientation.RIGHT)
                    orientation = Orientation_1.Orientation.LEFT;
                break;
            case 's':
                if (orientation != Orientation_1.Orientation.UP)
                    orientation = Orientation_1.Orientation.DOWN;
                break;
            case 'd':
                if (orientation != Orientation_1.Orientation.LEFT)
                    orientation = Orientation_1.Orientation.RIGHT;
                break;
            case 'w':
                if (orientation != Orientation_1.Orientation.DOWN)
                    orientation = Orientation_1.Orientation.UP;
                break;
        }
        snake.setSelectedOrientation(orientation);
    });
}
exports.setListener = setListener;
