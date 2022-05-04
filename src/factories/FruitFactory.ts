import Fruit from "../models/Fruit";
import Cell from "../models/Cell";

export function randomFruit(cells: Cell[], excludedCells: Cell[]) {
    let differenceArray = cells.filter(x => !excludedCells.includes(x));
    let randomCell = differenceArray[Math.floor(Math.random() * (differenceArray.length - 1))];
    let fruit = new Fruit(randomCell);
    fruit.draw();
    return fruit;
}