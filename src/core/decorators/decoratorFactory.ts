import { injectable } from 'inversify';
import { MethodKeys, RouteDefinition, modulesContainer } from '..';

export enum EnumMetaKey {
  MountPoint = 'MOUNT_POINT',
  Resource = 'RESOURCE',
  Routes = 'ROUTES',
  Middlewares = 'MIDDLEWARES',
  Type = 'TYPE',
}

export enum EnumMetaValue {
  Module = 'MODULE',
  Controller = 'CONTROLLER',
  Method = 'METHOD',
  Middleware = 'MIDDLEWARE',
}

export function createInjectableDecorator(): ClassDecorator {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.decorate([injectable() as ClassDecorator], target);
  };
}

export function createModuleDecorator(mountPoint: string = ''): ClassDecorator {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata(EnumMetaKey.Type, EnumMetaValue.Module, target);
    Reflect.defineMetadata(EnumMetaKey.MountPoint, mountPoint, target);

    Reflect.decorate([createInjectableDecorator()], target);
    modulesContainer.push(target as any);

    return target;
  };
}

export function createControllerDecorator(resource: string = ''): ClassDecorator {
  return <TFunction extends Function>(target: TFunction) => {
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

export function createClassMiddlewareDecorator(middlewares: Array<Function>): ClassDecorator {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata(EnumMetaKey.Middlewares, middlewares || [], target);

    if (!Reflect.hasMetadata(EnumMetaKey.Routes, target)) {
      Reflect.defineMetadata(EnumMetaKey.Routes, [], target);
    }

    return target;
  };
}

export function createMiddlewareDecorator(): ClassDecorator {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata(EnumMetaKey.Type, EnumMetaValue.Middleware, target);
    Reflect.decorate([createInjectableDecorator()], target);
    return target;
  };
}

export function createMethodDecorator(method: MethodKeys, path?: string): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => {
    Reflect.defineMetadata(EnumMetaKey.Type, EnumMetaValue.Method, target);
    const routes = (Reflect.getMetadata(EnumMetaKey.Routes, target.constructor) || []) as Array<RouteDefinition>;

    path = path ? path : '';
    const index = routes.findIndex(
      route =>
        route.name === propertyKey.toString() && (route.method === method || route.method === MethodKeys.Undefined),
    );
    if (index >= 0) {
      routes[index].method = method;
      routes[index].path = path;
    } else {
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

export function createMethodMiddlewareDecorator(middlewares: Array<Function>): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => {
    const routes = (Reflect.getMetadata(EnumMetaKey.Routes, target.constructor) || []) as Array<RouteDefinition>;

    const index = routes.findIndex(route => route.name === propertyKey.toString());
    if (index >= 0) {
      routes[index].middlewares = (routes[index].middlewares || []).concat(middlewares);
    } else {
      routes.push({
        name: propertyKey.toString(),
        method: MethodKeys.Undefined,
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
