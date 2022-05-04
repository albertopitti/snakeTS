"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomFruit = void 0;
const Fruit_1 = __importDefault(require("../models/Fruit"));
function randomFruit(cells, excludedCells) {
    let differenceArray = cells.filter(x => !excludedCells.includes(x));
    let randomCell = differenceArray[Math.floor(Math.random() * (differenceArray.length - 1))];
    let fruit = new Fruit_1.default(randomCell);
    fruit.draw();
    return fruit;
}
exports.randomFruit = randomFruit;
