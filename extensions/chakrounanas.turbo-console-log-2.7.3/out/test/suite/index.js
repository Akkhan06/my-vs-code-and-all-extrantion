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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const path = __importStar(require("path"));
const mocha_1 = __importDefault(require("mocha"));
const glob_1 = __importDefault(require("glob"));
function run() {
    // Create the mocha test
    const mocha = new mocha_1.default({
        ui: 'tdd',
        color: true,
    });
    mocha.timeout(10000);
    const testsRoot = path.resolve(__dirname, '..');
    return new Promise((c, e) => {
        glob_1.default('**/**.test.js', { cwd: testsRoot }, (err, files) => {
            if (err) {
                return e(err);
            }
            // Add files to the test suite
            files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));
            try {
                // Run the mocha test
                mocha.run((failures) => {
                    if (failures > 0) {
                        e(new Error(`${failures} tests failed.`));
                    }
                    else {
                        process.exit();
                    }
                });
            }
            catch (err) {
                console.error(err);
                e(err);
            }
        });
    });
}
exports.run = run;
//# sourceMappingURL=index.js.map