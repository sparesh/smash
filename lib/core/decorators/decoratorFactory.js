"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const __1 = require("..");
var EnumMetaKey;
(function (EnumMetaKey) {
    EnumMetaKey["MountPoint"] = "MOUNT_POINT";
    EnumMetaKey["Resource"] = "RESOURCE";
    EnumMetaKey["Routes"] = "ROUTES";
    EnumMetaKey["Middlewares"] = "MIDDLEWARES";
    EnumMetaKey["Type"] = "TYPE";
})(EnumMetaKey = exports.EnumMetaKey || (exports.EnumMetaKey = {}));
var EnumMetaValue;
(function (EnumMetaValue) {
    EnumMetaValue["Module"] = "MODULE";
    EnumMetaValue["Controller"] = "CONTROLLER";
    EnumMetaValue["Method"] = "METHOD";
    EnumMetaValue["Middleware"] = "MIDDLEWARE";
})(EnumMetaValue = exports.EnumMetaValue || (exports.EnumMetaValue = {}));
function createInjectableDecorator() {
    return (target) => {
        Reflect.decorate([inversify_1.injectable()], target);
    };
}
exports.createInjectableDecorator = createInjectableDecorator;
function createModuleDecorator(mountPoint = '') {
    return (target) => {
        Reflect.defineMetadata(EnumMetaKey.Type, EnumMetaValue.Module, target);
        Reflect.defineMetadata(EnumMetaKey.MountPoint, mountPoint, target);
        Reflect.decorate([createInjectableDecorator()], target);
        __1.modulesContainer.push(target);
        return target;
    };
}
exports.createModuleDecorator = createModuleDecorator;
function createControllerDecorator(resource = '') {
    return (target) => {
        Reflect.defineMetadata(EnumMetaKey.Type, EnumMetaValue.Controller, target);
        Reflect.defineMetadata(EnumMetaKey.Resource, resource || '', target);
        if (!Reflect.hasMetadata(EnumMetaKey.Routes, target)) {
            Reflect.defineMetadata(EnumMetaKey.Routes, [], target);
        }
        if (!Reflect.hasMetadata(EnumMetaKey.Middlewares, target)) {
            Reflect.defineMetadata(EnumMetaKey.Middlewares, [], target);
        }
        Reflect.decorate([createInjectableDecorator()], target);
        return target;
    };
}
exports.createControllerDecorator = createControllerDecorator;
function createClassMiddlewareDecorator(middlewares) {
    return (target) => {
        Reflect.defineMetadata(EnumMetaKey.Middlewares, middlewares || [], target);
        if (!Reflect.hasMetadata(EnumMetaKey.Routes, target)) {
            Reflect.defineMetadata(EnumMetaKey.Routes, [], target);
        }
        return target;
    };
}
exports.createClassMiddlewareDecorator = createClassMiddlewareDecorator;
function createMiddlewareDecorator() {
    return (target) => {
        Reflect.defineMetadata(EnumMetaKey.Type, EnumMetaValue.Middleware, target);
        Reflect.decorate([createInjectableDecorator()], target);
        return target;
    };
}
exports.createMiddlewareDecorator = createMiddlewareDecorator;
function createMethodDecorator(method, path) {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata(EnumMetaKey.Type, EnumMetaValue.Method, target);
        const routes = (Reflect.getMetadata(EnumMetaKey.Routes, target.constructor) || []);
        path = path ? path : '';
        const index = routes.findIndex(route => route.name === propertyKey.toString() && (route.method === method || route.method === __1.MethodKeys.Undefined));
        if (index >= 0) {
            routes[index].method = method;
            routes[index].path = path;
        }
        else {
            routes.push({
                name: propertyKey.toString(),
                method,
                path: path,
                middlewares: [],
            });
        }
        Reflect.defineMetadata(EnumMetaKey.Routes, routes, target.constructor);
        if (descriptor) {
            return descriptor;
        }
    };
}
exports.createMethodDecorator = createMethodDecorator;
function createMethodMiddlewareDecorator(middlewares) {
    return (target, propertyKey, descriptor) => {
        const routes = (Reflect.getMetadata(EnumMetaKey.Routes, target.constructor) || []);
        const index = routes.findIndex(route => route.name === propertyKey.toString());
        if (index >= 0) {
            routes[index].middlewares = (routes[index].middlewares || []).concat(middlewares);
        }
        else {
            routes.push({
                name: propertyKey.toString(),
                method: __1.MethodKeys.Undefined,
                path: undefined,
                middlewares,
            });
        }
        Reflect.defineMetadata(EnumMetaKey.Routes, routes, target.constructor);
        if (descriptor) {
            return descriptor;
        }
    };
}
exports.createMethodMiddlewareDecorator = createMethodMiddlewareDecorator;
//# sourceMappingURL=decoratorFactory.js.map