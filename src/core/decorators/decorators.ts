import { MethodKeys } from "../controllers";
import {
  createModuleDecorator,
  createMethodDecorator,
  createControllerDecorator,
  createMethodMiddlewareDecorator,
  createClassMiddlewareDecorator,
  createInjectableDecorator
} from ".";
import { createMiddlewareDecorator } from "./decoratorFactory";

type Document = any;

/***********************************************************************************************
 *                                      App Decorators
 **********************************************************************************************/

export function Module(mountPoint?: string, document?: Document): ClassDecorator {
  return createModuleDecorator(mountPoint);
}

/***********************************************************************************************
 *                                      Http Methods Decorators
 **********************************************************************************************/

export function Get(path?: string, document?: Document): MethodDecorator {
  return createMethodDecorator(MethodKeys.Get, path);
}

export function Post(path?: string, document?: Document): MethodDecorator {
  return createMethodDecorator(MethodKeys.Post, path);
}

export function Put(path?: string, document?: Document): MethodDecorator {
  return createMethodDecorator(MethodKeys.Put, path);
}

export function Patch(path?: string, document?: Document): MethodDecorator {
  return createMethodDecorator(MethodKeys.Patch, path);
}

export function Delete(path?: string, document?: Document): MethodDecorator {
  return createMethodDecorator(MethodKeys.Delete, path);
}

export function Copy(path?: string, document?: Document): MethodDecorator {
  return createMethodDecorator(MethodKeys.Copy, path);
}

export function Head(path?: string, document?: Document): MethodDecorator {
  return createMethodDecorator(MethodKeys.Head, path);
}

export function Options(path?: string, document?: Document): MethodDecorator {
  return createMethodDecorator(MethodKeys.Options, path);
}

export function Purge(path?: string, document?: Document): MethodDecorator {
  return createMethodDecorator(MethodKeys.Purge, path);
}

export function Lock(path?: string, document?: Document): MethodDecorator {
  return createMethodDecorator(MethodKeys.Lock, path);
}

export function Unlock(path?: string, document?: Document): MethodDecorator {
  return createMethodDecorator(MethodKeys.Unlock, path);
}

export function Propfind(path?: string, document?: Document): MethodDecorator {
  return createMethodDecorator(MethodKeys.Propfind, path);
}

/***********************************************************************************************
 *                                       Class Decorator
 **********************************************************************************************/

export function Validator(document?: Document): ClassDecorator {
  return createInjectableDecorator();
}

export function Service(document?: Document): ClassDecorator {
  return createInjectableDecorator();
}

export function Controller(prefix: string, document?: Document): ClassDecorator {
  return createControllerDecorator(prefix);
}

export function ScheduledController(every: number, document?: Document): ClassDecorator {
  throw "method not implemented";
}

export function RealtimeController(path: string, document?: Document): ClassDecorator {
  throw "method not implemented";
}

export function ControllerMiddleware(middlewares: Array<Function>, document?: Document): ClassDecorator {
  return createClassMiddlewareDecorator(middlewares);
}

export function Middleware(document?: Document): ClassDecorator {
  return createMiddlewareDecorator();
}

/***********************************************************************************************
 *                                  MiddleWare Decorator
 **********************************************************************************************/

export function MethodMiddleware(middlewares: Array<Function>, document?: Document): MethodDecorator {
  return createMethodMiddlewareDecorator(middlewares);
}

/***********************************************************************************************
 *                                  CORHandler Decorator
 **********************************************************************************************/

export function COR(): ClassDecorator {
  return createInjectableDecorator();
}

/***********************************************************************************************
 *                                  Parameter Decorator
 **********************************************************************************************/
