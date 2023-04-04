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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllLogMessagesCommand = void 0;
const vscode = __importStar(require("vscode"));
function deleteAllLogMessagesCommand() {
    return {
        name: 'turboConsoleLog.deleteAllLogMessages',
        handler: ({ delimiterInsideMessage, logMessagePrefix, logFunction, }, jsDebugMessage) => __awaiter(this, void 0, void 0, function* () {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }
            const document = editor.document;
            const logMessages = jsDebugMessage.detectAll(document, logFunction, logMessagePrefix, delimiterInsideMessage);
            editor.edit((editBuilder) => {
                logMessages.forEach(({ lines }) => {
                    const firstLine = lines[0];
                    const lastLine = lines[lines.length - 1];
                    const lineBeforeFirstLine = new vscode.Range(new vscode.Position(firstLine.start.line - 1, 0), new vscode.Position(firstLine.end.line - 1, 0));
                    const lineAfterLastLine = new vscode.Range(new vscode.Position(lastLine.start.line + 1, 0), new vscode.Position(lastLine.end.line + 1, 0));
                    if (document.lineAt(lineBeforeFirstLine.start).text === '') {
                        editBuilder.delete(lineBeforeFirstLine);
                    }
                    if (document.lineAt(lineAfterLastLine.start).text === '') {
                        editBuilder.delete(lineAfterLastLine);
                    }
                    lines.forEach((line) => {
                        editBuilder.delete(line);
                    });
                });
            });
        }),
    };
}
exports.deleteAllLogMessagesCommand = deleteAllLogMessagesCommand;
//# sourceMappingURL=deleteAllLogMessages.js.map