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
exports.displayLogMessageCommand = void 0;
const vscode = __importStar(require("vscode"));
const utilities_1 = require("../utilities");
function displayLogMessageCommand() {
    return {
        name: 'turboConsoleLog.displayLogMessage',
        handler: (extensionProperties, jsDebugMessage) => __awaiter(this, void 0, void 0, function* () {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }
            const tabSize = utilities_1.getTabSize(editor.options.tabSize);
            const document = editor.document;
            for (let index = 0; index < editor.selections.length; index++) {
                const selection = editor.selections[index];
                let wordUnderCursor = '';
                const rangeUnderCursor = document.getWordRangeAtPosition(selection.active);
                // if rangeUnderCursor is undefined, `document.getText(undefined)` will return the entire file.
                if (rangeUnderCursor) {
                    wordUnderCursor = document.getText(rangeUnderCursor);
                }
                const selectedVar = document.getText(selection) || wordUnderCursor;
                const lineOfSelectedVar = selection.active.line;
                if (selectedVar.trim().length !== 0) {
                    yield editor.edit((editBuilder) => {
                        jsDebugMessage.msg(editBuilder, document, selectedVar, lineOfSelectedVar, tabSize, extensionProperties);
                    });
                }
            }
        }),
    };
}
exports.displayLogMessageCommand = displayLogMessageCommand;
//# sourceMappingURL=displayLogMessage.js.map