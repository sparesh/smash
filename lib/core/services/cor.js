"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CORBuilder {
    constructor(container) {
        this.container = container;
        this.head = null;
    }
    add(handler) {
        const handlerInstance = this.container.get(handler);
        if (this.head === null) {
            this.head = handlerInstance;
        }
        else {
            let ptr = this.head;
            while (ptr.next !== null) {
                ptr = ptr.next;
            }
            ptr.next = handlerInstance;
        }
        return this;
    }
    props(props) {
        for (let ptr = this.head; ptr !== null; ptr = ptr.next) {
            ptr.props = props;
        }
        return this;
    }
    build() {
        if (this.head !== null) {
            return this.head;
        }
        else {
            throw new Error("cannot build COR with zero handlers attached");
        }
    }
}
exports.CORBuilder = CORBuilder;
//# sourceMappingURL=cor.js.map