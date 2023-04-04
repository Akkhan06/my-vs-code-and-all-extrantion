"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeroBasedPosition = void 0;
const vscode_1 = require("vscode");
class ZeroBasedPosition extends vscode_1.Position {
    constructor(editorDisplayedLine, editorDisplayedCharacter) {
        super(editorDisplayedLine - 1, editorDisplayedCharacter - 1);
    }
}
exports.ZeroBasedPosition = ZeroBasedPosition;
//# sourceMappingURL=ZeroBasedPosition.js.map