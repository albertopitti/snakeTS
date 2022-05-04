import Cell from "../models/Cell";

export default interface IMove {
    cell: Cell;

    moveTo(cell: Cell, orientation?: number): void;
}