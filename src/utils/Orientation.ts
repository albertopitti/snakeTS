export enum Orientation {
    UP = 0,
    DOWN = 1,
    RIGHT = 2,
    LEFT = 3
}

export function isOppositeOrientation(orientation1: number, orientation2: number) {
    if([Orientation.UP, Orientation.DOWN] === [orientation1, orientation2] || [Orientation.UP, Orientation.DOWN] === [orientation2, orientation1])
        return true;
    else if([Orientation.LEFT, Orientation.RIGHT] === [orientation1, orientation2] || [Orientation.LEFT, Orientation.RIGHT] === [orientation2, orientation1])
        return true;

    return false;
}