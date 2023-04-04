"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMultiLineContextVariableLine = void 0;
const locBrackets_1 = require("./locBrackets");
const closingBracketLine_1 = require("./closingBracketLine");
function getMultiLineContextVariableLine(document, lineNum, bracketType, innerScope = true) {
    const { openingBrackets, closingBrackets } = locBrackets_1.locBrackets(document.lineAt(lineNum).text, bracketType);
    if (innerScope &&
        openingBrackets !== 0 &&
        openingBrackets === closingBrackets) {
        return null;
    }
    let currentLineNum = lineNum - 1;
    let nbrOfOpenedBlockType = 0;
    let nbrOfClosedBlockType = 1; // Closing parenthesis
    while (currentLineNum >= 0) {
        const currentLineText = document.lineAt(currentLineNum).text;
        const currentLineParenthesis = locBrackets_1.locBrackets(currentLineText, bracketType);
        nbrOfOpenedBlockType += currentLineParenthesis.openingBrackets;
        nbrOfClosedBlockType += currentLineParenthesis.closingBrackets;
        if (nbrOfOpenedBlockType === nbrOfClosedBlockType) {
            return closingBracketLine_1.closingBracketLine(document, currentLineNum, bracketType) + 1;
        }
        currentLineNum--;
    }
    return null;
}
exports.getMultiLineContextVariableLine = getMultiLineContextVariableLine;
//# sourceMappingURL=getMultiLineContextVariableLine.js.map