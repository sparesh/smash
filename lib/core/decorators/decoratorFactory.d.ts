import { MethodKeys } from '..';
export declare enum EnumMetaKey {
    MountPoint = "MOUNT_POINT",
    Resource = "RESOURCE",
    Routes = "ROUTES",
    Middlewares = "MIDDLEWARES",
    Type = "TYPE"
}
export declare enum EnumMetaValue {
    Module = "MODULE",
    Controller = "CONTROLLER",
    Method = "METHOD",
    Middleware = "MIDDLEWARE"
}
export declare function createInjectableDecorator(): ClassDecorator;
export declare function createModuleDecorator(mountPoint?: string): ClassDecorator;
export declare function createControllerDecorator(resource?: string): ClassDecorator;
export declare function createClassMiddlewareDecorator(middlewares: Array<Function>): ClassDecorator;
export declare function createMiddlewareDecorator(): ClassDecorator;
export declare function createMethodDecorator(method: MethodKeys, path?: string): MethodDecorator;
export declare function createMethodMiddlewareDecorator(middlewares: Array<Function>): MethodDecorator;
