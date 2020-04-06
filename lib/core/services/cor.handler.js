"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CORHandler {
    constructor() {
        this.next = null;
        this.props = {};
    }
    request(data) {
        if (this.canHandle(data)) {
            return this.transform(data);
        }
        else if (this.next !== null) {
            return this.next.request(data);
        }
        else {
            return undefined;
        }
    }
}
exports.CORHandler = CORHandler;
//# sourceMappingURL=cor.handler.js.map