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
const assert = __importStar(require("assert"));
const vscode = __importStar(require("vscode"));
const mocha_1 = __importDefault(require("mocha"));
const helpers_1 = require("../../helpers");
test('Insert log message related to a class function param', () => __awaiter(void 0, void 0, void 0, function* () {
    yield helpers_1.openDocument('../files/js/classFunction.js');
    const { activeTextEditor } = vscode.window;
    const zeroBasedLineHelper = helpers_1.zeroBasedLine;
    if (activeTextEditor) {
        activeTextEditor.selections = [
            new vscode.Selection(new helpers_1.ZeroBasedPosition(2, 12), new helpers_1.ZeroBasedPosition(2, 20)),
        ];
        yield vscode.commands.executeCommand('turboConsoleLog.displayLogMessage', []);
        const textDocument = activeTextEditor.document;
        const logMessage = textDocument.lineAt(zeroBasedLineHelper(3)).text;
        assert.strictEqual(/console\.log\(.*/.test(logMessage), true);
        // Class name
        assert.strictEqual(logMessage.includes('Person'), true);
        // Function name
        assert.strictEqual(logMessage.includes('sayHello'), true);
    }
    mocha_1.default.afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield vscode.commands.executeCommand('workbench.action.closeActiveEditor', []);
    }));
}));
//# sourceMappingURL=classFunction.test.js.map