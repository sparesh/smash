"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppOptions {
    constructor(server, app) {
        this.server = server;
        this.app = app;
        this.modulesProps = {};
    }
    attachProp(module, name, value) {
        this[module][name] = value;
    }
    getProp(module, name) {
        return this[module][name];
    }
    getProps(module) {
        return { ...this[module] };
    }
}
exports.AppOptions = AppOptions;
//# sourceMappingURL=appOptions.js.map