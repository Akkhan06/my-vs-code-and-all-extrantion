"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSDebugMessageLine = void 0;
const entities_1 = require("../../entities");
const utilities_1 = require("../../utilities");
class JSDebugMessageLine {
    line(document, selectionLine, selectedVar, logMsgType) {
        const multilineParenthesisVariableLine = utilities_1.getMultiLineContextVariableLine(document, selectionLine, entities_1.BracketType.PARENTHESIS);
        const multilineBracesVariableLine = utilities_1.getMultiLineContextVariableLine(document, selectionLine, entities_1.BracketType.CURLY_BRACES);
        switch (logMsgType) {
            case entities_1.LogMessageType.ObjectLiteral:
                return this.objectLiteralLine(document, selectionLine);
            case entities_1.LogMessageType.NamedFunctionAssignment:
                return this.functionAssignmentLine(document, selectionLine);
            case entities_1.LogMessageType.Decorator:
                return (utilities_1.getMultiLineContextVariableLine(document, selectionLine, entities_1.BracketType.PARENTHESIS, false) || selectionLine + 1);
            case entities_1.LogMessageType.MultiLineAnonymousFunction:
                return (this.functionClosedLine(document, selectionLine, entities_1.BracketType.CURLY_BRACES) + 1);
            case entities_1.LogMessageType.ObjectFunctionCall:
                return this.objectFunctionCallLine(document, selectionLine, selectedVar);
            case entities_1.LogMessageType.ArrayAssignment:
                return this.arrayLine(document, selectionLine);
            case entities_1.LogMessageType.MultilineParenthesis:
                return multilineParenthesisVariableLine || selectionLine + 1;
            case entities_1.LogMessageType.Ternary:
                return this.templateStringLine(document, selectionLine);
            case entities_1.LogMessageType.MultilineBraces:
                return multilineBracesVariableLine || selectionLine + 1;
            default:
                return selectionLine + 1;
        }
    }
    objectLiteralLine(document, selectionLine) {
        const currentLineText = document.lineAt(selectionLine).text;
        let nbrOfOpenedBrackets = (currentLineText.match(/{/g) || [])
            .length;
        let nbrOfClosedBrackets = (currentLineText.match(/}/g) || [])
            .length;
        let currentLineNum = selectionLine + 1;
        while (currentLineNum < document.lineCount) {
            const currentLineText = document.lineAt(currentLineNum).text;
            nbrOfOpenedBrackets += (currentLineText.match(/{/g) || []).length;
            nbrOfClosedBrackets += (currentLineText.match(/}/g) || []).length;
            currentLineNum++;
            if (nbrOfOpenedBrackets === nbrOfClosedBrackets) {
                break;
            }
        }
        return nbrOfClosedBrackets === nbrOfOpenedBrackets
            ? currentLineNum
            : selectionLine + 1;
    }
    functionAssignmentLine(document, selectionLine) {
        const currentLineText = document.lineAt(selectionLine).text;
        if (/{/.test(currentLineText)) {
            return (this.closingElementLine(document, selectionLine, entities_1.BracketType.CURLY_BRACES) + 1);
        }
        else {
            const closedParenthesisLine = this.closingElementLine(document, selectionLine, entities_1.BracketType.PARENTHESIS);
            return (this.closingElementLine(document, closedParenthesisLine, entities_1.BracketType.CURLY_BRACES) + 1);
        }
    }
    /**
     * Log line of a variable in multiline context (function parameter, or deconstructed object, etc.)
     */
    functionClosedLine(document, declarationLine, bracketType) {
        let nbrOfOpenedBraces = 0;
        let nbrOfClosedBraces = 0;
        while (declarationLine < document.lineCount) {
            const { openedElementOccurrences, closedElementOccurrences } = this.locOpenedClosedElementOccurrences(document.lineAt(declarationLine).text, bracketType);
            nbrOfOpenedBraces += openedElementOccurrences;
            nbrOfClosedBraces += closedElementOccurrences;
            if (nbrOfOpenedBraces - nbrOfClosedBraces === 0) {
                return declarationLine;
            }
            declarationLine++;
        }
        return -1;
    }
    objectFunctionCallLine(document, selectionLine, selectedVar) {
        let currentLineText = document.lineAt(selectionLine).text;
        let nextLineText = document
            .lineAt(selectionLine + 1)
            .text.replace(/\s/g, '');
        if (/\((\s*)$/.test(currentLineText.split(selectedVar)[0]) ||
            /,(\s*)$/.test(currentLineText.split(selectedVar)[0])) {
            return selectionLine + 1;
        }
        let totalOpenedParenthesis = 0;
        let totalClosedParenthesis = 0;
        const { openedElementOccurrences, closedElementOccurrences } = this.locOpenedClosedElementOccurrences(currentLineText, entities_1.BracketType.PARENTHESIS);
        totalOpenedParenthesis += openedElementOccurrences;
        totalClosedParenthesis += closedElementOccurrences;
        let currentLineNum = selectionLine + 1;
        if (totalOpenedParenthesis !== totalClosedParenthesis ||
            currentLineText.endsWith('.') ||
            nextLineText.trim().startsWith('.')) {
            while (currentLineNum < document.lineCount) {
                currentLineText = document.lineAt(currentLineNum).text;
                const { openedElementOccurrences, closedElementOccurrences } = this.locOpenedClosedElementOccurrences(currentLineText, entities_1.BracketType.PARENTHESIS);
                totalOpenedParenthesis += openedElementOccurrences;
                totalClosedParenthesis += closedElementOccurrences;
                if (currentLineNum === document.lineCount - 1) {
                    break;
                }
                nextLineText = document.lineAt(currentLineNum + 1).text;
                currentLineNum++;
                if (totalOpenedParenthesis === totalClosedParenthesis &&
                    !currentLineText.endsWith('.') &&
                    !nextLineText.trim().startsWith('.')) {
                    break;
                }
            }
        }
        return totalOpenedParenthesis === totalClosedParenthesis
            ? currentLineNum
            : selectionLine + 1;
    }
    arrayLine(document, selectionLine) {
        const currentLineText = document.lineAt(selectionLine).text;
        let nbrOfOpenedBrackets = (currentLineText.match(/\[/g) || [])
            .length;
        let nbrOfClosedBrackets = (currentLineText.match(/\]/g) || [])
            .length;
        let currentLineNum = selectionLine + 1;
        if (nbrOfOpenedBrackets !== nbrOfClosedBrackets) {
            while (currentLineNum < document.lineCount) {
                const currentLineText = document.lineAt(currentLineNum).text;
                nbrOfOpenedBrackets += (currentLineText.match(/\[/g) || []).length;
                nbrOfClosedBrackets += (currentLineText.match(/\]/g) || []).length;
                currentLineNum++;
                if (nbrOfOpenedBrackets === nbrOfClosedBrackets) {
                    break;
                }
            }
        }
        return nbrOfOpenedBrackets === nbrOfClosedBrackets
            ? currentLineNum
            : selectionLine + 1;
    }
    templateStringLine(document, selectionLine) {
        const currentLineText = document.lineAt(selectionLine).text;
        let currentLineNum = selectionLine + 1;
        let nbrOfBackticks = (currentLineText.match(/`/g) || []).length;
        while (currentLineNum < document.lineCount) {
            const currentLineText = document.lineAt(currentLineNum).text;
            nbrOfBackticks += (currentLineText.match(/`/g) || []).length;
            if (nbrOfBackticks % 2 === 0) {
                break;
            }
            currentLineNum++;
        }
        return nbrOfBackticks % 2 === 0 ? currentLineNum + 1 : selectionLine + 1;
    }
    locOpenedClosedElementOccurrences(loc, bracketType) {
        let openedElementOccurrences = 0;
        let closedElementOccurrences = 0;
        const openedElement = bracketType === entities_1.BracketType.PARENTHESIS ? /\(/g : /{/g;
        const closedElement = bracketType === entities_1.BracketType.PARENTHESIS ? /\)/g : /}/g;
        while (openedElement.exec(loc)) {
            openedElementOccurrences++;
        }
        while (closedElement.exec(loc)) {
            closedElementOccurrences++;
        }
        return {
            openedElementOccurrences,
            closedElementOccurrences,
        };
    }
    closingElementLine(document, lineNum, bracketType) {
        const docNbrOfLines = document.lineCount;
        let closingElementFound = false;
        let openedElementOccurrences = 0;
        let closedElementOccurrences = 0;
        while (!closingElementFound && lineNum < docNbrOfLines - 1) {
            const currentLineText = document.lineAt(lineNum).text;
            const openedClosedElementOccurrences = this.locOpenedClosedElementOccurrences(currentLineText, bracketType);
            openedElementOccurrences +=
                openedClosedElementOccurrences.openedElementOccurrences;
            closedElementOccurrences +=
                openedClosedElementOccurrences.closedElementOccurrences;
            if (openedElementOccurrences === closedElementOccurrences) {
                closingElementFound = true;
                return lineNum;
            }
            lineNum++;
        }
        return lineNum;
    }
}
exports.JSDebugMessageLine = JSDebugMessageLine;
//# sourceMappingURL=JSDebugMessageLine.js.map