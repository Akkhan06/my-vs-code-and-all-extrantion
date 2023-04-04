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
suite('Insert log message related to a variable with a function as the value', () => {
    const { activeTextEditor } = vscode.window;
    const zeroBasedLineHelper = helpers_1.zeroBasedLine;
    mocha_1.default.afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield helpers_1.openDocument('../files/js/functionAssignedToVariable.ts');
    }));
    mocha_1.default.afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield vscode.commands.executeCommand('workbench.action.closeActiveEditor', []);
    }));
    test('Example 01', () => __awaiter(void 0, void 0, void 0, function* () {
        if (activeTextEditor) {
            const textDocument = activeTextEditor.document;
            activeTextEditor.selection = new vscode.Selection(new helpers_1.ZeroBasedPosition(3, 7), new helpers_1.ZeroBasedPosition(3, 14));
            yield vscode.commands.executeCommand('turboConsoleLog.displayLogMessage', []);
            assert.strictEqual(/console\.log\(.*/.test(textDocument.lineAt(zeroBasedLineHelper(6)).text), true);
        }
    }));
    test('Example 02', () => __awaiter(void 0, void 0, void 0, function* () {
        if (activeTextEditor) {
            const textDocument = activeTextEditor.document;
            activeTextEditor.selection = new vscode.Selection(new helpers_1.ZeroBasedPosition(7, 7), new helpers_1.ZeroBasedPosition(3, 17));
            yield vscode.commands.executeCommand('turboConsoleLog.displayLogMessage', []);
            assert.strictEqual(/console\.log\(.*/.test(textDocument.lineAt(zeroBasedLineHelper(10)).text), true);
        }
    }));
    test('Example 03', () => __awaiter(void 0, void 0, void 0, function* () {
        if (activeTextEditor) {
            const textDocument = activeTextEditor.document;
            activeTextEditor.selection = new vscode.Selection(new helpers_1.ZeroBasedPosition(11, 7), new helpers_1.ZeroBasedPosition(11, 34));
            yield vscode.commands.executeCommand('turboConsoleLog.displayLogMessage', []);
            assert.strictEqual(/console\.log\(.*/.test(textDocument.lineAt(zeroBasedLineHelper(17)).text), true);
        }
    }));
});
//# sourceMappingURL=functionAssignedToVariable.test.js.map