"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const _1 = require(".");
const decoratorFactory_1 = require("./decoratorFactory");
function Module(mountPoint, document) {
    return _1.createModuleDecorator(mountPoint);
}
exports.Module = Module;
function Get(path, document) {
    return _1.createMethodDecorator(controllers_1.MethodKeys.Get, path);
}
exports.Get = Get;
function Post(path, document) {
    return _1.createMethodDecorator(controllers_1.MethodKeys.Post, path);
}
exports.Post = Post;
function Put(path, document) {
    return _1.createMethodDecorator(controllers_1.MethodKeys.Put, path);
}
exports.Put = Put;
function Patch(path, document) {
    return _1.createMethodDecorator(controllers_1.MethodKeys.Patch, path);
}
exports.Patch = Patch;
function Delete(path, document) {
    return _1.createMethodDecorator(controllers_1.MethodKeys.Delete, path);
}
exports.Delete = Delete;
function Copy(path, document) {
    return _1.createMethodDecorator(controllers_1.MethodKeys.Copy, path);
}
exports.Copy = Copy;
function Head(path, document) {
    return _1.createMethodDecorator(controllers_1.MethodKeys.Head, path);
}
exports.Head = Head;
function Options(path, document) {
    return _1.createMethodDecorator(controllers_1.MethodKeys.Options, path);
}
exports.Options = Options;
function Purge(path, document) {
    return _1.createMethodDecorator(controllers_1.MethodKeys.Purge, path);
}
exports.Purge = Purge;
function Lock(path, document) {
    return _1.createMethodDecorator(controllers_1.MethodKeys.Lock, path);
}
exports.Lock = Lock;
function Unlock(path, document) {
    return _1.createMethodDecorator(controllers_1.MethodKeys.Unlock, path);
}
exports.Unlock = Unlock;
function Propfind(path, document) {
    return _1.createMethodDecorator(controllers_1.MethodKeys.Propfind, path);
}
exports.Propfind = Propfind;
function Validator(document) {
    return _1.createInjectableDecorator();
}
exports.Validator = Validator;
function Service(document) {
    return _1.createInjectableDecorator();
}
exports.Service = Service;
function Controller(prefix, document) {
    return _1.createControllerDecorator(prefix);
}
exports.Controller = Controller;
function ScheduledController(every, document) {
    throw "method not implemented";
}
exports.ScheduledController = ScheduledController;
function RealtimeController(path, document) {
    throw "method not implemented";
}
exports.RealtimeController = RealtimeController;
function ControllerMiddleware(middlewares, document) {
    return _1.createClassMiddlewareDecorator(middlewares);
}
exports.ControllerMiddleware = ControllerMiddleware;
function Middleware(document) {
    return decoratorFactory_1.createMiddlewareDecorator();
}
exports.Middleware = Middleware;
function MethodMiddleware(middlewares, document) {
    return _1.createMethodMiddlewareDecorator(middlewares);
}
exports.MethodMiddleware = MethodMiddleware;
function COR() {
    return _1.createInjectableDecorator();
}
exports.COR = COR;
//# sourceMappingURL=decorators.js.map