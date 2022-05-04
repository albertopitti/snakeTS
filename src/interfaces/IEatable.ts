import IEater from "./IEater";

export default interface IEatable {
    beEaten(eater: IEater): void;
}