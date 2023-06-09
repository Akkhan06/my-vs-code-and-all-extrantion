"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAndroid = exports.isEdge = exports.isSafari = exports.isFirefox = exports.isChrome = exports.isLittleEndian = exports.OS = exports.setTimeout0 = exports.setTimeout0IsFaster = exports.translationsConfigFile = exports.locale = exports.Language = exports.language = exports.userAgent = exports.platform = exports.isCI = exports.isIOS = exports.isWebWorker = exports.isWeb = exports.isElectron = exports.isNative = exports.isLinuxSnap = exports.isLinux = exports.isMacintosh = exports.isWindows = exports.PlatformToString = exports.globals = void 0;
const LANGUAGE_DEFAULT = 'en';
let _isWindows = false;
let _isMacintosh = false;
let _isLinux = false;
let _isLinuxSnap = false;
let _isNative = false;
let _isWeb = false;
let _isElectron = false;
let _isIOS = false;
let _isCI = false;
let _locale = undefined;
let _language = LANGUAGE_DEFAULT;
let _translationsConfigFile = undefined;
let _userAgent = undefined;
exports.globals = typeof self === 'object' ? self : typeof global === 'object' ? global : {};
let nodeProcess = undefined;
if (typeof exports.globals.vscode !== 'undefined' && typeof exports.globals.vscode.process !== 'undefined') {
    // Native environment (sandboxed)
    nodeProcess = exports.globals.vscode.process;
}
else if (typeof process !== 'undefined') {
    // Native environment (non-sandboxed)
    nodeProcess = process;
}
const isElectronProcess = typeof nodeProcess?.versions?.electron === 'string';
const isElectronRenderer = isElectronProcess && nodeProcess?.type === 'renderer';
// Web environment
if (typeof navigator === 'object' && !isElectronRenderer) {
    _userAgent = navigator.userAgent;
    _isWindows = _userAgent.indexOf('Windows') >= 0;
    _isMacintosh = _userAgent.indexOf('Macintosh') >= 0;
    _isIOS =
        (_userAgent.indexOf('Macintosh') >= 0 ||
            _userAgent.indexOf('iPad') >= 0 ||
            _userAgent.indexOf('iPhone') >= 0) &&
            !!navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 0;
    _isLinux = _userAgent.indexOf('Linux') >= 0;
    _isWeb = true;
    _locale = LANGUAGE_DEFAULT;
    _language = _locale;
}
// Native environment
else if (typeof nodeProcess === 'object') {
    _isWindows = nodeProcess.platform === 'win32';
    _isMacintosh = nodeProcess.platform === 'darwin';
    _isLinux = nodeProcess.platform === 'linux';
    _isLinuxSnap = _isLinux && !!nodeProcess.env.SNAP && !!nodeProcess.env.SNAP_REVISION;
    _isElectron = isElectronProcess;
    _isCI = !!nodeProcess.env.CI || !!nodeProcess.env.BUILD_ARTIFACTSTAGINGDIRECTORY;
    _locale = LANGUAGE_DEFAULT;
    _language = LANGUAGE_DEFAULT;
    const rawNlsConfig = nodeProcess.env.VSCODE_NLS_CONFIG;
    if (rawNlsConfig) {
        try {
            const nlsConfig = JSON.parse(rawNlsConfig);
            const resolved = nlsConfig.availableLanguages['*'];
            _locale = nlsConfig.locale;
            // VSCode's default language is 'en'
            _language = resolved ? resolved : LANGUAGE_DEFAULT;
            _translationsConfigFile = nlsConfig._translationsConfigFile;
        }
        catch (e) { }
    }
    _isNative = true;
}
// Unknown environment
else {
    console.error('Unable to resolve platform.');
}
function PlatformToString(platform) {
    switch (platform) {
        case 0 /* Platform.Web */:
            return 'Web';
        case 1 /* Platform.Mac */:
            return 'Mac';
        case 2 /* Platform.Linux */:
            return 'Linux';
        case 3 /* Platform.Windows */:
            return 'Windows';
        default:
            return '';
    }
}
exports.PlatformToString = PlatformToString;
let _platform = 0 /* Platform.Web */;
if (_isMacintosh) {
    _platform = 1 /* Platform.Mac */;
}
else if (_isWindows) {
    _platform = 3 /* Platform.Windows */;
}
else if (_isLinux) {
    _platform = 2 /* Platform.Linux */;
}
exports.isWindows = _isWindows;
exports.isMacintosh = _isMacintosh;
exports.isLinux = _isLinux;
exports.isLinuxSnap = _isLinuxSnap;
exports.isNative = _isNative;
exports.isElectron = _isElectron;
exports.isWeb = _isWeb;
exports.isWebWorker = _isWeb && typeof exports.globals.importScripts === 'function';
exports.isIOS = _isIOS;
/**
 * Whether we run inside a CI environment, such as
 * GH actions or Azure Pipelines.
 */
exports.isCI = _isCI;
exports.platform = _platform;
exports.userAgent = _userAgent;
/**
 * The language used for the user interface. The format of
 * the string is all lower case (e.g. zh-tw for Traditional
 * Chinese)
 */
exports.language = _language;
// eslint-disable-next-line @typescript-eslint/no-namespace
var Language;
(function (Language) {
    function value() {
        return exports.language;
    }
    Language.value = value;
    function isDefaultVariant() {
        if (exports.language.length === 2) {
            return exports.language === 'en';
        }
        else if (exports.language.length >= 3) {
            return exports.language[0] === 'e' && exports.language[1] === 'n' && exports.language[2] === '-';
        }
        else {
            return false;
        }
    }
    Language.isDefaultVariant = isDefaultVariant;
    function isDefault() {
        return exports.language === 'en';
    }
    Language.isDefault = isDefault;
})(Language = exports.Language || (exports.Language = {}));
/**
 * The OS locale or the locale specified by --locale. The format of
 * the string is all lower case (e.g. zh-tw for Traditional
 * Chinese). The UI is not necessarily shown in the provided locale.
 */
exports.locale = _locale;
/**
 * The translations that are available through language packs.
 */
exports.translationsConfigFile = _translationsConfigFile;
exports.setTimeout0IsFaster = typeof exports.globals.postMessage === 'function' && !exports.globals.importScripts;
/**
 * See https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#:~:text=than%204%2C%20then-,set%20timeout%20to%204,-.
 *
 * Works similarly to `setTimeout(0)` but doesn't suffer from the 4ms artificial delay
 * that browsers set when the nesting level is > 5.
 */
exports.setTimeout0 = (() => {
    if (exports.setTimeout0IsFaster) {
        const pending = [];
        exports.globals.addEventListener('message', (e) => {
            if (e.data && e.data.vscodeScheduleAsyncWork) {
                for (let i = 0, len = pending.length; i < len; i++) {
                    const candidate = pending[i];
                    if (candidate.id === e.data.vscodeScheduleAsyncWork) {
                        pending.splice(i, 1);
                        candidate.callback();
                        return;
                    }
                }
            }
        });
        let lastId = 0;
        return (callback) => {
            const myId = ++lastId;
            pending.push({
                id: myId,
                callback: callback,
            });
            exports.globals.postMessage({ vscodeScheduleAsyncWork: myId }, '*');
        };
    }
    return (callback) => setTimeout(callback);
})();
exports.OS = _isMacintosh || _isIOS
    ? 2 /* OperatingSystem.Macintosh */
    : _isWindows
        ? 1 /* OperatingSystem.Windows */
        : 3 /* OperatingSystem.Linux */;
let _isLittleEndian = true;
let _isLittleEndianComputed = false;
function isLittleEndian() {
    if (!_isLittleEndianComputed) {
        _isLittleEndianComputed = true;
        const test = new Uint8Array(2);
        test[0] = 1;
        test[1] = 2;
        const view = new Uint16Array(test.buffer);
        _isLittleEndian = view[0] === (2 << 8) + 1;
    }
    return _isLittleEndian;
}
exports.isLittleEndian = isLittleEndian;
exports.isChrome = !!(exports.userAgent && exports.userAgent.indexOf('Chrome') >= 0);
exports.isFirefox = !!(exports.userAgent && exports.userAgent.indexOf('Firefox') >= 0);
exports.isSafari = !!(!exports.isChrome && exports.userAgent && exports.userAgent.indexOf('Safari') >= 0);
exports.isEdge = !!(exports.userAgent && exports.userAgent.indexOf('Edg/') >= 0);
exports.isAndroid = !!(exports.userAgent && exports.userAgent.indexOf('Android') >= 0);
//# sourceMappingURL=platform.js.map