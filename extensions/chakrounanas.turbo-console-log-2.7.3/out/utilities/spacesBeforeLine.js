"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spacesBeforeLine = void 0;
function spacesBeforeLine(document, lineNumber) {
    const textLine = document.lineAt(lineNumber);
    const lineFirstNonWhitespaceCharacterIndex = textLine.firstNonWhitespaceCharacterIndex;
    return textLine.text
        .split('')
        .splice(0, lineFirstNonWhitespaceCharacterIndex)
        .reduce((previousValue, currentValue) => previousValue + currentValue, '');
}
exports.spacesBeforeLine = spacesBeforeLine;
//# sourceMappingURL=spacesBeforeLine.js.map