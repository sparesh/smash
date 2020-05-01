"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const util_1 = require("util");
const _1 = require(".");
const __1 = require("..");
class ControllersBuilder {
    constructor() {
        this.controllers = [];
        this.globalOptions = null;
    }
    add(...controllers) {
        this.controllers = this.controllers.concat(...controllers);
        return this;
    }
    remove(...controllers) {
        this.controllers = this.controllers.filter((controller) => !controllers.includes(controller));
        return this;
    }
    options(options) {
        this.globalOptions = options;
        return this;
    }
    build(container, router = express_1.Router()) {
        const defaultHandler = (req, res, next) => next();
        this.controllers.forEach((Controller) => {
            let instance = container.get(Controller);
            let resource = Reflect.getMetadata(__1.EnumMetaKey.Resource, Controller);
            let middlewares = Reflect.getMetadata(__1.EnumMetaKey.Middlewares, Controller);
            let routes = Reflect.getMetadata(__1.EnumMetaKey.Routes, Controller);
            if (!middlewares || !middlewares.length) {
                middlewares = [defaultHandler];
            }
            else {
                middlewares = middlewares.map((Middleware) => {
                    const middleware = container.get(Middleware);
                    const isAsync = util_1.types.isAsyncFunction(middleware.main);
                    return this.wrapRoute(middleware.main.bind(middleware), isAsync);
                });
            }
            if (!routes.length) {
                router.all("*", ...middlewares, (req, res, next) => res.send({ message: `${Controller.name} is alive!` }));
            }
            routes.forEach((route) => {
                const routePath = resource + route.path;
                if (!route.middlewares.length) {
                    route.middlewares = [defaultHandler];
                }
                else {
                    route.middlewares = route.middlewares.map((Middleware) => {
                        const middleware = container.get(Middleware);
                        const isAsync = util_1.types.isAsyncFunction(middleware.main);
                        return this.wrapRoute(middleware.main.bind(middleware), isAsync);
                    });
                }
                const handler = instance[route.name].bind(instance);
                const isAsync = util_1.types.isAsyncFunction(instance[route.name]);
                router[route.method](routePath, ...middlewares, ...route.middlewares, this.wrapRoute(handler, isAsync));
            });
        });
        return router.use(_1.errorController);
    }
    wrapRoute(route, isAsync = false) {
        return (req, res, next) => {
            if (isAsync) {
                route(req, res, next).catch(next);
            }
            else {
                try {
                    route(req, res, next);
                }
                catch (error) {
                    next(error);
                }
            }
        };
    }
}
exports.ControllersBuilder = ControllersBuilder;
//# sourceMappingURL=builder.js.map