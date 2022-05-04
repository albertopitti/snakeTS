import Fruit from "../models/Fruit";

export default interface IEater {
    eat(fruit: Fruit): void;
}