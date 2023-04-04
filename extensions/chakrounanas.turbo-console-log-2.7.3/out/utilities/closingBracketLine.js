"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closingBracketLine = void 0;
const locBrackets_1 = require("./locBrackets");
function closingBracketLine(document, declarationLine, bracketType) {
    let nbrOfOpenedBraces = 0;
    let nbrOfClosedBraces = 0;
    while (declarationLine < document.lineCount) {
        const { openingBrackets, closingBrackets } = locBrackets_1.locBrackets(document.lineAt(declarationLine).text, bracketType);
        nbrOfOpenedBraces += openingBrackets;
        nbrOfClosedBraces += closingBrackets;
        if (nbrOfOpenedBraces - nbrOfClosedBraces === 0) {
            return declarationLine;
        }
        declarationLine++;
    }
    return -1;
}
exports.closingBracketLine = closingBracketLine;
//# sourceMappingURL=closingBracketLine.js.map