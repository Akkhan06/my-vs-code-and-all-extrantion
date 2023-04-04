"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTabSize = void 0;
function getTabSize(tabSize) {
    if (!tabSize) {
        return 4;
    }
    return typeof tabSize === 'string' ? parseInt(tabSize) : tabSize;
}
exports.getTabSize = getTabSize;
//# sourceMappingURL=getTabSize.js.map