"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExtensionProperty = exports.zeroBasedLine = exports.ZeroBasedPosition = exports.openDocument = void 0;
const openDocument_1 = __importDefault(require("./openDocument"));
exports.openDocument = openDocument_1.default;
const ZeroBasedPosition_1 = require("./ZeroBasedPosition");
Object.defineProperty(exports, "ZeroBasedPosition", { enumerable: true, get: function () { return ZeroBasedPosition_1.ZeroBasedPosition; } });
const zeroBasedLine_1 = __importDefault(require("./zeroBasedLine"));
exports.zeroBasedLine = zeroBasedLine_1.default;
const updateExtensionProperty_1 = require("./updateExtensionProperty");
Object.defineProperty(exports, "updateExtensionProperty", { enumerable: true, get: function () { return updateExtensionProperty_1.updateExtensionProperty; } });
//# sourceMappingURL=index.js.map