"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSDebugMessage = void 0;
const vscode_1 = require("vscode");
const entities_1 = require("../../entities");
const lodash_1 = __importStar(require("lodash"));
const DebugMessage_1 = require("../DebugMessage");
const JSDebugMessageLine_1 = require("./JSDebugMessageLine");
const utilities_1 = require("../../utilities");
const JSDebugMessageAnonymous_1 = require("./JSDebugMessageAnonymous");
const logMessageTypeVerificationPriority = lodash_1.default.sortBy([
    { logMessageType: entities_1.LogMessageType.ArrayAssignment, priority: 2 },
    { logMessageType: entities_1.LogMessageType.ObjectLiteral, priority: 3 },
    { logMessageType: entities_1.LogMessageType.ObjectFunctionCall, priority: 4 },
    { logMessageType: entities_1.LogMessageType.NamedFunction, priority: 5 },
    { logMessageType: entities_1.LogMessageType.NamedFunctionAssignment, priority: 6 },
    { logMessageType: entities_1.LogMessageType.MultiLineAnonymousFunction, priority: 7 },
    { logMessageType: entities_1.LogMessageType.MultilineParenthesis, priority: 8 },
    { logMessageType: entities_1.LogMessageType.MultilineBraces, priority: 9 },
    { logMessageType: entities_1.LogMessageType.Decorator, priority: 0 },
    { logMessageType: entities_1.LogMessageType.Ternary, priority: 1 },
], 'priority');
class JSDebugMessage extends DebugMessage_1.DebugMessage {
    constructor(lineCodeProcessing, debugMessageLine = new JSDebugMessageLine_1.JSDebugMessageLine()) {
        super(lineCodeProcessing, debugMessageLine);
        this.jsDebugMessageAnonymous = new JSDebugMessageAnonymous_1.JSDebugMessageAnonymous(lineCodeProcessing);
    }
    baseDebuggingMsg(document, textEditor, lineOfLogMsg, debuggingMsg, insertEmptyLineBeforeLogMessage, insertEmptyLineAfterLogMessage) {
        textEditor.insert(new vscode_1.Position(lineOfLogMsg >= document.lineCount ? document.lineCount : lineOfLogMsg, 0), `${insertEmptyLineBeforeLogMessage ? '\n' : ''}${lineOfLogMsg === document.lineCount ? '\n' : ''}${debuggingMsg}\n${insertEmptyLineAfterLogMessage ? '\n' : ''}`);
    }
    isEmptyBlockContext(selectedVarLinerLoc) {
        return /\){.*}/.test(selectedVarLinerLoc.replace(/\s/g, ''));
    }
    constructDebuggingMsg(extensionProperties, debuggingMsgContent, spacesBeforeMsg) {
        const wrappingMsg = `console.${extensionProperties.logType}(${extensionProperties.quote}${extensionProperties.logMessagePrefix} ${'-'.repeat(debuggingMsgContent.length - 16)}${extensionProperties.logMessagePrefix}${extensionProperties.quote})${extensionProperties.addSemicolonInTheEnd ? ';' : ''}`;
        const debuggingMsg = extensionProperties.wrapLogMessage
            ? `${spacesBeforeMsg}${wrappingMsg}\n${spacesBeforeMsg}${debuggingMsgContent}\n${spacesBeforeMsg}${wrappingMsg}`
            : `${spacesBeforeMsg}${debuggingMsgContent}`;
        return debuggingMsg;
    }
    constructDebuggingMsgContent(document, selectedVar, lineOfSelectedVar, lineOfLogMsg, extensionProperties) {
        const fileName = document.fileName.includes('/')
            ? document.fileName.split('/')[document.fileName.split('/').length - 1]
            : document.fileName.split('\\')[document.fileName.split('\\').length - 1];
        const funcThatEncloseTheVar = this.enclosingBlockName(document, lineOfSelectedVar, 'function');
        const classThatEncloseTheVar = this.enclosingBlockName(document, lineOfSelectedVar, 'class');
        const semicolon = extensionProperties.addSemicolonInTheEnd
            ? ';'
            : '';
        return `${extensionProperties.logFunction !== 'log'
            ? extensionProperties.logFunction
            : `console.${extensionProperties.logType}`}(${extensionProperties.quote}${extensionProperties.logMessagePrefix}${extensionProperties.logMessagePrefix.length !== 0 &&
            extensionProperties.logMessagePrefix !==
                `${extensionProperties.delimiterInsideMessage} `
            ? ` ${extensionProperties.delimiterInsideMessage} `
            : ''}${extensionProperties.includeFileNameAndLineNum
            ? `file: ${fileName}:${lineOfLogMsg +
                (extensionProperties.insertEmptyLineBeforeLogMessage ? 2 : 1)} ${extensionProperties.delimiterInsideMessage} `
            : ''}${extensionProperties.insertEnclosingClass
            ? classThatEncloseTheVar.length > 0
                ? `${classThatEncloseTheVar} ${extensionProperties.delimiterInsideMessage} `
                : ``
            : ''}${extensionProperties.insertEnclosingFunction
            ? funcThatEncloseTheVar.length > 0
                ? `${funcThatEncloseTheVar} ${extensionProperties.delimiterInsideMessage} `
                : ''
            : ''}${selectedVar}${extensionProperties.logMessageSuffix}${extensionProperties.quote}, ${selectedVar})${semicolon}`;
    }
    emptyBlockDebuggingMsg(document, textEditor, emptyBlockLine, logMsgLine, debuggingMsg, spacesBeforeMsg) {
        if (/\){.*}/.test(emptyBlockLine.text.replace(/\s/g, ''))) {
            const textBeforeClosedFunctionParenthesis = emptyBlockLine.text.split(')')[0];
            textEditor.delete(emptyBlockLine.rangeIncludingLineBreak);
            textEditor.insert(new vscode_1.Position(logMsgLine >= document.lineCount ? document.lineCount : logMsgLine, 0), `${textBeforeClosedFunctionParenthesis}) {\n${logMsgLine === document.lineCount ? '\n' : ''}${spacesBeforeMsg}${debuggingMsg}\n${spacesBeforeMsg}}\n`);
            return;
        }
    }
    msg(textEditor, document, selectedVar, lineOfSelectedVar, tabSize, extensionProperties) {
        const logMsgType = this.logMessageType(document, lineOfSelectedVar, selectedVar);
        const lineOfLogMsg = this.line(document, lineOfSelectedVar, selectedVar, logMsgType);
        const spacesBeforeMsg = this.spacesBeforeLogMsg(document, lineOfSelectedVar, lineOfLogMsg);
        const debuggingMsgContent = this.constructDebuggingMsgContent(document, selectedVar, lineOfSelectedVar, lineOfLogMsg, lodash_1.omit(extensionProperties, [
            'wrapLogMessage',
            'insertEmptyLineAfterLogMessage',
        ]));
        const debuggingMsg = this.constructDebuggingMsg(extensionProperties, debuggingMsgContent, spacesBeforeMsg);
        const selectedVarLine = document.lineAt(lineOfSelectedVar);
        const selectedVarLineLoc = selectedVarLine.text;
        if (this.isEmptyBlockContext(selectedVarLineLoc)) {
            this.emptyBlockDebuggingMsg(document, textEditor, selectedVarLine, lineOfLogMsg, debuggingMsgContent, spacesBeforeMsg);
            return;
        }
        if (this.jsDebugMessageAnonymous.isAnonymousFunctionContext(selectedVar, selectedVarLineLoc)) {
            this.jsDebugMessageAnonymous.anonymousPropDebuggingMsg(document, textEditor, tabSize, extensionProperties.addSemicolonInTheEnd, selectedVarLine, debuggingMsgContent);
            return;
        }
        this.baseDebuggingMsg(document, textEditor, lineOfLogMsg, debuggingMsg, extensionProperties.insertEmptyLineBeforeLogMessage, extensionProperties.insertEmptyLineAfterLogMessage);
    }
    logMessageType(document, selectionLine, selectedVar) {
        const currentLineText = document.lineAt(selectionLine).text;
        const multilineParenthesisVariableLine = utilities_1.getMultiLineContextVariableLine(document, selectionLine, entities_1.BracketType.PARENTHESIS);
        const multilineBracesVariableLine = utilities_1.getMultiLineContextVariableLine(document, selectionLine, entities_1.BracketType.CURLY_BRACES);
        const logMsgTypesChecks = {
            [entities_1.LogMessageType.ObjectLiteral]: () => {
                if (document.lineCount === selectionLine + 1) {
                    return false;
                }
                const nextLineText = document
                    .lineAt(selectionLine + 1)
                    .text.replace(/\s/g, '');
                return this.lineCodeProcessing.isObjectLiteralAssignedToVariable(`${currentLineText}\n${nextLineText}`);
            },
            [entities_1.LogMessageType.Decorator]: () => {
                return /@[a-zA-Z0-9]{1,}(.*)[a-zA-Z0-9]{1,}/.test(currentLineText);
            },
            [entities_1.LogMessageType.ArrayAssignment]: () => {
                return this.lineCodeProcessing.isArrayAssignedToVariable(`${currentLineText}\n${currentLineText}`);
            },
            [entities_1.LogMessageType.Ternary]: () => {
                return /`/.test(currentLineText);
            },
            [entities_1.LogMessageType.MultilineBraces]: () => {
                return (multilineBracesVariableLine !== null &&
                    !this.lineCodeProcessing.isAssignedToVariable(currentLineText));
            },
            [entities_1.LogMessageType.MultilineParenthesis]: () => {
                return (multilineParenthesisVariableLine !== null &&
                    document
                        .lineAt(multilineParenthesisVariableLine - 1)
                        .text.includes('{'));
            },
            [entities_1.LogMessageType.ObjectFunctionCall]: () => {
                if (document.lineCount === selectionLine + 1) {
                    return false;
                }
                const nextLineText = document
                    .lineAt(selectionLine + 1)
                    .text.replace(/\s/g, '');
                return this.lineCodeProcessing.isObjectFunctionCall(`${currentLineText}\n${nextLineText}`);
            },
            [entities_1.LogMessageType.NamedFunction]: () => {
                return this.lineCodeProcessing.doesContainsNamedFunctionDeclaration(currentLineText);
            },
            [entities_1.LogMessageType.NamedFunctionAssignment]: () => {
                return (this.lineCodeProcessing.isFunctionAssignedToVariable(`${currentLineText}`) && currentLineText.split('=')[0].includes(selectedVar));
            },
            [entities_1.LogMessageType.MultiLineAnonymousFunction]: () => {
                return (this.lineCodeProcessing.isFunctionAssignedToVariable(`${currentLineText}`) &&
                    this.lineCodeProcessing.isAnonymousFunction(currentLineText) &&
                    this.lineCodeProcessing.shouldTransformAnonymousFunction(currentLineText));
            },
        };
        for (const { logMessageType } of logMessageTypeVerificationPriority) {
            if (logMessageType !== entities_1.LogMessageType.PrimitiveAssignment &&
                logMsgTypesChecks[logMessageType]()) {
                return logMessageType;
            }
        }
        return entities_1.LogMessageType.PrimitiveAssignment;
    }
    enclosingBlockName(document, lineOfSelectedVar, blockType) {
        let currentLineNum = lineOfSelectedVar;
        while (currentLineNum >= 0) {
            const currentLineText = document.lineAt(currentLineNum).text;
            switch (blockType) {
                case 'class':
                    if (this.lineCodeProcessing.doesContainClassDeclaration(currentLineText)) {
                        if (lineOfSelectedVar > currentLineNum &&
                            lineOfSelectedVar <
                                utilities_1.closingBracketLine(document, currentLineNum, entities_1.BracketType.CURLY_BRACES)) {
                            return `${this.lineCodeProcessing.getClassName(currentLineText)}`;
                        }
                    }
                    break;
                case 'function':
                    if (this.lineCodeProcessing.doesContainsNamedFunctionDeclaration(currentLineText) &&
                        !this.lineCodeProcessing.doesContainsBuiltInFunction(currentLineText)) {
                        if (lineOfSelectedVar >= currentLineNum &&
                            lineOfSelectedVar <
                                utilities_1.closingBracketLine(document, currentLineNum, entities_1.BracketType.CURLY_BRACES)) {
                            if (this.lineCodeProcessing.getFunctionName(currentLineText)
                                .length !== 0) {
                                return `${this.lineCodeProcessing.getFunctionName(currentLineText)}`;
                            }
                            return '';
                        }
                    }
                    break;
            }
            currentLineNum--;
        }
        return '';
    }
    detectAll(document, logFunction, logMessagePrefix, delimiterInsideMessage) {
        const documentNbrOfLines = document.lineCount;
        const logMessages = [];
        for (let i = 0; i < documentNbrOfLines; i++) {
            const turboConsoleLogMessage = new RegExp(logFunction.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            if (turboConsoleLogMessage.test(document.lineAt(i).text)) {
                const logMessage = {
                    spaces: '',
                    lines: [],
                };
                logMessage.spaces = this.spacesBeforeLogMsg(document, i, i);
                const closedParenthesisLine = utilities_1.closingBracketLine(document, i, entities_1.BracketType.PARENTHESIS);
                let msg = '';
                for (let j = i; j <= closedParenthesisLine; j++) {
                    msg += document.lineAt(j).text;
                    logMessage.lines.push(document.lineAt(j).rangeIncludingLineBreak);
                }
                if (new RegExp(logMessagePrefix).test(msg) ||
                    new RegExp(delimiterInsideMessage).test(msg)) {
                    logMessages.push(logMessage);
                }
            }
        }
        return logMessages;
    }
}
exports.JSDebugMessage = JSDebugMessage;
//# sourceMappingURL=JSDebugMessage.js.map