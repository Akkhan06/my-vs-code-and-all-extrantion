"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locBrackets = void 0;
const entities_1 = require("../entities");
function locBrackets(loc, bracketType) {
    let openingBrackets = 0;
    let closingBrackets = 0;
    const openedElement = bracketType === entities_1.BracketType.PARENTHESIS ? /\(/g : /{/g;
    const closedElement = bracketType === entities_1.BracketType.PARENTHESIS ? /\)/g : /}/g;
    while (openedElement.exec(loc)) {
        openingBrackets++;
    }
    while (closedElement.exec(loc)) {
        closingBrackets++;
    }
    return {
        openingBrackets,
        closingBrackets,
    };
}
exports.locBrackets = locBrackets;
//# sourceMappingURL=locBrackets.js.map