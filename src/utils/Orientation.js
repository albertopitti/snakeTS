"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOppositeOrientation = exports.Orientation = void 0;
var Orientation;
(function (Orientation) {
    Orientation[Orientation["UP"] = 0] = "UP";
    Orientation[Orientation["DOWN"] = 1] = "DOWN";
    Orientation[Orientation["RIGHT"] = 2] = "RIGHT";
    Orientation[Orientation["LEFT"] = 3] = "LEFT";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
function isOppositeOrientation(orientation1, orientation2) {
    if ([Orientation.UP, Orientation.DOWN] === [orientation1, orientation2] || [Orientation.UP, Orientation.DOWN] === [orientation2, orientation1])
        return true;
    else if ([Orientation.LEFT, Orientation.RIGHT] === [orientation1, orientation2] || [Orientation.LEFT, Orientation.RIGHT] === [orientation2, orientation1])
        return true;
    return false;
}
exports.isOppositeOrientation = isOppositeOrientation;
