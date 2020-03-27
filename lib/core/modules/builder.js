"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const __1 = require("..");
class ModulesBuilder {
    constructor() {
        this.modules = [];
        this.globalOptions = null;
    }
    add(...modules) {
        this.modules = this.modules.concat(...modules);
        return this;
    }
    remove(...modules) {
        this.modules = this.modules.filter(module => !modules.includes(module));
        return this;
    }
    options(options) {
        this.globalOptions = options;
        return this;
    }
    build(container, router = express_1.Router()) {
        const modulesMetadata = [];
        this.modules.forEach(function (Module) {
            const instance = container.get(Module);
            const mountPoint = Reflect.getMetadata(__1.EnumMetaKey.MountPoint, Module);
            const controllersCollection = [];
            const controllers = instance.getControllers();
            for (const controller in controllers) {
                if (controllers.hasOwnProperty(controller)) {
                    controllersCollection.push(controllers[controller]);
                }
            }
            instance.init(this.globalOptions);
            modulesMetadata.push([mountPoint, instance.getRouter(), new __1.ControllersBuilder().add(...controllersCollection).options(this.globalOptions)]);
        }, this);
        modulesMetadata.forEach(([mountPoint, moduleRouter, controllerBuilder]) => {
            router.use(`/${mountPoint}`, controllerBuilder.build(container, moduleRouter));
        });
        return router;
    }
}
exports.ModulesBuilder = ModulesBuilder;
//# sourceMappingURL=builder.js.map