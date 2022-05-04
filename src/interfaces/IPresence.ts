import Cell from "../models/Cell";
import GameMap from "../models/GameMap";

export default interface IPresence {
    cell: Cell;

    draw(orientation?: number) : void;

    clear(): void;
}