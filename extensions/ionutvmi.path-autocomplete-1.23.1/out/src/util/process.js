"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arch = exports.platform = exports.env = exports.cwd = void 0;
const platform_1 = require("./platform");
let safeProcess;
// Native sandbox environment
if (typeof platform_1.globals.vscode !== 'undefined' && typeof platform_1.globals.vscode.process !== 'undefined') {
    const sandboxProcess = platform_1.globals.vscode.process;
    safeProcess = {
        get platform() {
            return sandboxProcess.platform;
        },
        get arch() {
            return sandboxProcess.arch;
        },
        get env() {
            return sandboxProcess.env;
        },
        cwd() {
            return sandboxProcess.cwd();
        },
    };
}
// Native node.js environment
else if (typeof process !== 'undefined') {
    safeProcess = {
        get platform() {
            return process.platform;
        },
        get arch() {
            return process.arch;
        },
        get env() {
            return process.env;
        },
        cwd() {
            return process.env.VSCODE_CWD || process.cwd();
        },
    };
}
// Web environment
else {
    safeProcess = {
        // Supported
        get platform() {
            return platform_1.isWindows ? 'win32' : platform_1.isMacintosh ? 'darwin' : 'linux';
        },
        get arch() {
            return undefined; /* arch is undefined in web */
        },
        // Unsupported
        get env() {
            return {};
        },
        cwd() {
            return '/';
        },
    };
}
/**
 * Provides safe access to the `cwd` property in node.js, sandboxed or web
 * environments.
 *
 * Note: in web, this property is hardcoded to be `/`.
 */
exports.cwd = safeProcess.cwd;
/**
 * Provides safe access to the `env` property in node.js, sandboxed or web
 * environments.
 *
 * Note: in web, this property is hardcoded to be `{}`.
 */
exports.env = safeProcess.env;
/**
 * Provides safe access to the `platform` property in node.js, sandboxed or web
 * environments.
 */
exports.platform = safeProcess.platform;
/**
 * Provides safe access to the `arch` method in node.js, sandboxed or web
 * environments.
 * Note: `arch` is `undefined` in web
 */
exports.arch = safeProcess.arch;
//# sourceMappingURL=process.js.map