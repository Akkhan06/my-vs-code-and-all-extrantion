"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMessage = void 0;
class DebugMessage {
    constructor(lineCodeProcessing, debugMessageLine) {
        this.lineCodeProcessing = lineCodeProcessing;
        this.debugMessageLine = debugMessageLine;
    }
    line(document, selectionLine, selectedVar, logMsgType) {
        return this.debugMessageLine.line(document, selectionLine, selectedVar, logMsgType);
    }
    spacesBeforeLogMsg(document, selectedVarLine, logMsgLine) {
        const selectedVarTextLine = document.lineAt(selectedVarLine);
        const selectedVarTextLineFirstNonWhitespaceCharacterIndex = selectedVarTextLine.firstNonWhitespaceCharacterIndex;
        const spacesBeforeSelectedVarLine = selectedVarTextLine.text
            .split('')
            .splice(0, selectedVarTextLineFirstNonWhitespaceCharacterIndex)
            .reduce((previousValue, currentValue) => previousValue + currentValue, '');
        if (logMsgLine < document.lineCount) {
            const logMsgTextLine = document.lineAt(logMsgLine);
            const logMsgTextLineFirstNonWhitespaceCharacterIndex = logMsgTextLine.firstNonWhitespaceCharacterIndex;
            const spacesBeforeLogMsgLine = logMsgTextLine.text
                .split('')
                .splice(0, logMsgTextLineFirstNonWhitespaceCharacterIndex)
                .reduce((previousValue, currentValue) => previousValue + currentValue, '');
            return spacesBeforeSelectedVarLine.length > spacesBeforeLogMsgLine.length
                ? spacesBeforeSelectedVarLine
                : spacesBeforeLogMsgLine;
        }
        return spacesBeforeSelectedVarLine;
    }
}
exports.DebugMessage = DebugMessage;
//# sourceMappingURL=DebugMessage.js.map