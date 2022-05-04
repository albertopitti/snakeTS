import Snake from "../models/Snake";
import {Orientation} from "../utils/Orientation";

export function setListener(snake: Snake) {
    document.addEventListener('keydown', (e) => {
        let orientation = snake.selectedOrientation;

        switch (e.key) {
            case 'a':
                if (orientation != Orientation.RIGHT)
                    orientation = Orientation.LEFT;
                break;
            case 's':
                if (orientation != Orientation.UP)
                    orientation = Orientation.DOWN;
                break;
            case 'd':
                if (orientation != Orientation.LEFT)
                    orientation = Orientation.RIGHT;
                break;
            case 'w':
                if (orientation != Orientation.DOWN)
                    orientation = Orientation.UP;
                break;
        }

        snake.setSelectedOrientation(orientation);
    });
}