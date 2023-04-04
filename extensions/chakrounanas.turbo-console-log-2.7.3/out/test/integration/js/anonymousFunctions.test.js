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
suite('d', () => {
    const { activeTextEditor } = vscode.window;
    const zeroBasedLineHelper = helpers_1.zeroBasedLine;
    mocha_1.default.afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield helpers_1.openDocument('../files/js/anonymousFunctions.ts');
    }));
    mocha_1.default.afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield vscode.commands.executeCommand('workbench.action.closeActiveEditor', []);
    }));
    suite('Single line', () => {
        test('Assigned to a variable', () => __awaiter(void 0, void 0, void 0, function* () {
            if (activeTextEditor) {
                activeTextEditor.selections = [
                    new vscode.Selection(new helpers_1.ZeroBasedPosition(3, 29), new helpers_1.ZeroBasedPosition(3, 37)),
                ];
                yield vscode.commands.executeCommand('turboConsoleLog.displayLogMessage', []);
                const textDocument = activeTextEditor.document;
                assert.strictEqual(/\{\s*$/.test(textDocument.lineAt(zeroBasedLineHelper(3)).text), true);
                assert.strictEqual(/console\.log\(.*/.test(textDocument.lineAt(zeroBasedLineHelper(4)).text), true);
                assert.strictEqual(/return /.test(textDocument.lineAt(zeroBasedLineHelper(5)).text), true);
            }
        }));
        test('Parameter of a function', () => __awaiter(void 0, void 0, void 0, function* () {
            if (activeTextEditor) {
                activeTextEditor.selections = [
                    new vscode.Selection(new helpers_1.ZeroBasedPosition(5, 14), new helpers_1.ZeroBasedPosition(5, 20)),
                ];
                yield vscode.commands.executeCommand('turboConsoleLog.displayLogMessage', []);
                const textDocument = activeTextEditor.document;
                assert.strictEqual(/\{\s*$/.test(textDocument.lineAt(zeroBasedLineHelper(5)).text), true);
                assert.strictEqual(/console\.log\(.*/.test(textDocument.lineAt(zeroBasedLineHelper(6)).text), true);
                assert.strictEqual(/return member.include\('S'\)/.test(textDocument.lineAt(zeroBasedLineHelper(7)).text), true);
                assert.strictEqual(/}\)/.test(textDocument.lineAt(zeroBasedLineHelper(8)).text), true);
            }
        }));
        test('Chained call', () => __awaiter(void 0, void 0, void 0, function* () {
            if (activeTextEditor) {
                activeTextEditor.selections = [
                    new vscode.Selection(new helpers_1.ZeroBasedPosition(8, 14), new helpers_1.ZeroBasedPosition(8, 18)),
                ];
                yield vscode.commands.executeCommand('turboConsoleLog.displayLogMessage', []);
                const textDocument = activeTextEditor.document;
                assert.strictEqual(/\{\s*$/.test(textDocument.lineAt(zeroBasedLineHelper(8)).text), true);
                assert.strictEqual(/console\.log\(.*/.test(textDocument.lineAt(zeroBasedLineHelper(9)).text), true);
                assert.strictEqual(/return item.index !== original.index/.test(textDocument.lineAt(zeroBasedLineHelper(10)).text), true);
                assert.strictEqual(/}\)/.test(textDocument.lineAt(zeroBasedLineHelper(11)).text), true);
            }
        }));
    });
    suite('Multiple lines', () => {
        test('Example 01', () => __awaiter(void 0, void 0, void 0, function* () {
            if (activeTextEditor) {
                activeTextEditor.selections = [
                    new vscode.Selection(new helpers_1.ZeroBasedPosition(12, 16), new helpers_1.ZeroBasedPosition(12, 22)),
                ];
                yield vscode.commands.executeCommand('turboConsoleLog.displayLogMessage', []);
                const textDocument = activeTextEditor.document;
                assert.strictEqual(/\{\s*$/.test(textDocument.lineAt(zeroBasedLineHelper(12)).text), true);
                assert.strictEqual(/console\.log\(.*/.test(textDocument.lineAt(zeroBasedLineHelper(13)).text), true);
                assert.strictEqual(/return checkAccountingPeriodDivide\(budget._id, accountingPeriodId\)/.test(textDocument.lineAt(zeroBasedLineHelper(14)).text), true);
                assert.strictEqual(/}\)/.test(textDocument.lineAt(zeroBasedLineHelper(15)).text), true);
            }
        }));
        test('Example 02', () => __awaiter(void 0, void 0, void 0, function* () {
            if (activeTextEditor) {
                activeTextEditor.selections = [
                    new vscode.Selection(new helpers_1.ZeroBasedPosition(19, 16), new helpers_1.ZeroBasedPosition(19, 22)),
                ];
                yield vscode.commands.executeCommand('turboConsoleLog.displayLogMessage', []);
                const textDocument = activeTextEditor.document;
                assert.strictEqual(/\{\s*$/.test(textDocument.lineAt(zeroBasedLineHelper(19)).text), true);
                assert.strictEqual(/console\.log\(.*/.test(textDocument.lineAt(zeroBasedLineHelper(20)).text), true);
                assert.strictEqual(/return checkAccountingPeriodDivide\(budget._id\)/.test(textDocument.lineAt(zeroBasedLineHelper(21)).text), true);
                assert.strictEqual(/}\)/.test(textDocument.lineAt(zeroBasedLineHelper(23)).text), true);
            }
        }));
        test('Example 03', () => __awaiter(void 0, void 0, void 0, function* () {
            if (activeTextEditor) {
                activeTextEditor.selections = [
                    new vscode.Selection(new helpers_1.ZeroBasedPosition(27, 18), new helpers_1.ZeroBasedPosition(27, 24)),
                ];
                yield vscode.commands.executeCommand('turboConsoleLog.displayLogMessage', []);
                const textDocument = activeTextEditor.document;
                assert.strictEqual(/\{\s*$/.test(textDocument.lineAt(zeroBasedLineHelper(27)).text), true);
                assert.strictEqual(/console\.log\(.*/.test(textDocument.lineAt(zeroBasedLineHelper(28)).text), true);
                assert.strictEqual(/return checkAccountingPeriodDivide\(budget._id, accountingPeriodId\)/.test(textDocument.lineAt(zeroBasedLineHelper(29)).text), true);
                assert.strictEqual(/}\)/.test(textDocument.lineAt(zeroBasedLineHelper(30)).text), true);
            }
        }));
        test('Example 04', () => __awaiter(void 0, void 0, void 0, function* () {
            if (activeTextEditor) {
                activeTextEditor.selections = [
                    new vscode.Selection(new helpers_1.ZeroBasedPosition(35, 18), new helpers_1.ZeroBasedPosition(35, 24)),
                ];
                yield vscode.commands.executeCommand('turboConsoleLog.displayLogMessage', []);
                const textDocument = activeTextEditor.document;
                assert.strictEqual(/\{\s*$/.test(textDocument.lineAt(zeroBasedLineHelper(35)).text), true);
                assert.strictEqual(/console\.log\(.*/.test(textDocument.lineAt(zeroBasedLineHelper(36)).text), true);
                assert.strictEqual(/return checkAccountingPeriodDivide\(budget._id\)/.test(textDocument.lineAt(zeroBasedLineHelper(37)).text), true);
                assert.strictEqual(/}\)/.test(textDocument.lineAt(zeroBasedLineHelper(39)).text), true);
            }
        }));
    });
});
//# sourceMappingURL=anonymousFunctions.test.js.map