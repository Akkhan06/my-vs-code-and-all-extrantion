"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCommands = void 0;
const displayLogMessage_1 = require("./displayLogMessage");
const commentAllLogMessages_1 = require("./commentAllLogMessages");
const uncommentAllLogMessages_1 = require("./uncommentAllLogMessages");
const deleteAllLogMessages_1 = require("./deleteAllLogMessages");
function getAllCommands() {
    return [
        displayLogMessage_1.displayLogMessageCommand(),
        commentAllLogMessages_1.commentAllLogMessagesCommand(),
        uncommentAllLogMessages_1.uncommentAllLogMessagesCommand(),
        deleteAllLogMessages_1.deleteAllLogMessagesCommand(),
    ];
}
exports.getAllCommands = getAllCommands;
//# sourceMappingURL=index.js.map