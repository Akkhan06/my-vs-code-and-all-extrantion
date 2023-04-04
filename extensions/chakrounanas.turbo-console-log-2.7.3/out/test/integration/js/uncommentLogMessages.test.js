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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = __importDefault(require("mocha"));
const assert = __importStar(require("assert"));
const vscode = __importStar(require("vscode"));
const helpers_1 = require("../../helpers");
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
test('UnComment log messages commented by the extension', () => __awaiter(void 0, void 0, void 0, function* () {
    yield helpers_1.openDocument('../files/js/uncommentLogMessages.js');
    const { activeTextEditor } = vscode.window;
    if (activeTextEditor) {
        yield vscode.commands.executeCommand('turboConsoleLog.uncommentAllLogMessages', []);
        yield wait(250);
        const textDocument = activeTextEditor.document;
        const logMessagesLines = [9, 13, 16];
        for (const logMessageLine of logMessagesLines) {
            assert.strictEqual(textDocument
                .lineAt(logMessageLine)
                .text.replace(/\s/g, '')
                .startsWith('//'), false);
        }
    }
    mocha_1.default.afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield vscode.commands.executeCommand('workbench.action.closeActiveEditor', []);
    }));
}));
//# sourceMappingURL=uncommentLogMessages.test.js.map