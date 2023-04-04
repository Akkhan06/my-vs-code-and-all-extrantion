"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSDebugMessageAnonymous = void 0;
const vscode_1 = require("vscode");
const entities_1 = require("../../entities");
const utilities_1 = require("../../utilities");
class JSDebugMessageAnonymous {
    constructor(lineCodeProcessing) {
        this.lineCodeProcessing = lineCodeProcessing;
    }
    isAnonymousFunctionContext(selectedVar, selectedVarLineLoc) {
        return (this.lineCodeProcessing.isAnonymousFunction(selectedVarLineLoc) &&
            this.lineCodeProcessing.isArgumentOfAnonymousFunction(selectedVarLineLoc, selectedVar) &&
            this.lineCodeProcessing.shouldTransformAnonymousFunction(selectedVarLineLoc));
    }
    anonymousPropDebuggingMsg(document, textEditor, tabSize, addSemicolonInTheEnd, selectedPropLine, debuggingMsg) {
        const selectedVarPropLoc = selectedPropLine.text;
        const anonymousFunctionLeftPart = selectedVarPropLoc.split('=>')[0].trim();
        const anonymousFunctionRightPart = selectedVarPropLoc
            .split('=>')[1]
            .replace(';', '')
            .trim()
            .replace(/\)\s*;?$/, '');
        const spacesBeforeSelectedVarLine = utilities_1.spacesBeforeLine(document, selectedPropLine.lineNumber);
        const spacesBeforeLinesToInsert = `${spacesBeforeSelectedVarLine}${' '.repeat(tabSize)}`;
        const isCalledInsideFunction = /\)\s*;?$/.test(selectedVarPropLoc);
        const isNextLineCallToOtherFunction = document
            .lineAt(selectedPropLine.lineNumber + 1)
            .text.trim()
            .startsWith('.');
        const anonymousFunctionClosedParenthesisLine = utilities_1.closingBracketLine(document, selectedPropLine.lineNumber, entities_1.BracketType.PARENTHESIS);
        const isReturnBlockMultiLine = anonymousFunctionClosedParenthesisLine - selectedPropLine.lineNumber !==
            0;
        textEditor.delete(selectedPropLine.rangeIncludingLineBreak);
        textEditor.insert(new vscode_1.Position(selectedPropLine.lineNumber, 0), `${spacesBeforeSelectedVarLine}${anonymousFunctionLeftPart} => {\n`);
        if (isReturnBlockMultiLine) {
            textEditor.insert(new vscode_1.Position(selectedPropLine.lineNumber, 0), `${spacesBeforeLinesToInsert}${debuggingMsg}\n`);
            let currentLine = document.lineAt(selectedPropLine.lineNumber + 1);
            do {
                textEditor.delete(currentLine.rangeIncludingLineBreak);
                const addReturnKeyword = currentLine.lineNumber === selectedPropLine.lineNumber + 1;
                const spacesBeforeCurrentLine = utilities_1.spacesBeforeLine(document, currentLine.lineNumber);
                if (currentLine.text.trim() === ')') {
                    currentLine = document.lineAt(currentLine.lineNumber + 1);
                    continue;
                }
                if (currentLine.lineNumber === anonymousFunctionClosedParenthesisLine) {
                    textEditor.insert(new vscode_1.Position(currentLine.lineNumber, 0), `${spacesBeforeCurrentLine}${addReturnKeyword ? 'return ' : '\t'}${currentLine.text.trim().replace(/\)\s*$/, '')}\n`);
                }
                else {
                    textEditor.insert(new vscode_1.Position(currentLine.lineNumber, 0), `${spacesBeforeCurrentLine}${addReturnKeyword ? 'return ' : '\t'}${currentLine.text.trim()}\n`);
                }
                currentLine = document.lineAt(currentLine.lineNumber + 1);
            } while (currentLine.lineNumber <
                anonymousFunctionClosedParenthesisLine + 1);
            textEditor.insert(new vscode_1.Position(anonymousFunctionClosedParenthesisLine + 1, 0), `${spacesBeforeSelectedVarLine}}${addSemicolonInTheEnd && !isReturnBlockMultiLine ? ';' : ''})\n`);
        }
        else {
            const nextLineText = document.lineAt(selectedPropLine.lineNumber + 1).text;
            const nextLineIsEndWithinTheMainFunction = /^\)/.test(nextLineText.trim());
            textEditor.insert(new vscode_1.Position(selectedPropLine.lineNumber, 0), `${spacesBeforeLinesToInsert}${debuggingMsg}\n`);
            textEditor.insert(new vscode_1.Position(selectedPropLine.lineNumber, 0), `${spacesBeforeLinesToInsert}return ${anonymousFunctionRightPart}${addSemicolonInTheEnd ? ';' : ''}\n`);
            textEditor.insert(new vscode_1.Position(selectedPropLine.lineNumber, 0), `${spacesBeforeSelectedVarLine}}${isCalledInsideFunction ? ')' : ''}${addSemicolonInTheEnd &&
                !isNextLineCallToOtherFunction &&
                !nextLineIsEndWithinTheMainFunction
                ? ';'
                : ''}${nextLineText === '' ? '' : '\n'}`);
        }
    }
}
exports.JSDebugMessageAnonymous = JSDebugMessageAnonymous;
//# sourceMappingURL=JSDebugMessageAnonymous.js.map