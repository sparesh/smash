import { Router, RequestHandler } from "express";
import { types } from "util";
import { Container } from "inversify";
import { IRouter } from "express-serve-static-core";
import { Controller } from "./controller";
import { RouteDefinition, errorController } from ".";
import { IMiddleware, EnumMetaKey, AppOptions } from "..";

export class ControllersBuilder {
  private controllers: Controller[] = [];
  private globalOptions: AppOptions | null = null;

  add(...controllers: Controller[]): ControllersBuilder {
    this.controllers = this.controllers.concat(...controllers);
    return this;
  }

  remove(...controllers: Controller[]): ControllersBuilder {
    this.controllers = this.controllers.filter((controller) => !controllers.includes(controller));
    return this;
  }

  options(options: AppOptions | null): ControllersBuilder {
    this.globalOptions = options;
    return this;
  }

  build(container: Container, router: IRouter = Router()): IRouter {
    const defaultHandler: RequestHandler = (req, res, next) => next();

    this.controllers.forEach((Controller: any) => {
      let instance = container.get(Controller) as any;
      let resource = Reflect.getMetadata(EnumMetaKey.Resource, Controller);
      let middlewares: Array<RequestHandler> = Reflect.getMetadata(EnumMetaKey.Middlewares, Controller);
      let routes: Array<RouteDefinition> = Reflect.getMetadata(EnumMetaKey.Routes, Controller);

      if (!middlewares || !middlewares.length) {
        middlewares = [defaultHandler];
      } else {
        middlewares = middlewares.map((Middleware) => {
          const middleware = container.get(Middleware) as IMiddleware;
          const isAsync = types.isAsyncFunction(middleware.main);
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
        } else {
          route.middlewares = route.middlewares.map((Middleware) => {
            const middleware = container.get(Middleware) as IMiddleware;
            const isAsync = types.isAsyncFunction(middleware.main);
            return this.wrapRoute(middleware.main.bind(middleware), isAsync);
          });
        }

        const handler = instance[route.name].bind(instance);
        const isAsync = types.isAsyncFunction(instance[route.name]);
        (router as any)[route.method](routePath, ...middlewares, ...route.middlewares, this.wrapRoute(handler, isAsync));
      });
    });

    return router.use(errorController);
  }

  private wrapRoute(route: any, isAsync: boolean = false): RequestHandler {
    return (req, res, next) => {
      if (isAsync) {
        route(req, res, next).catch(next);
      } else {
        try {
          (route as RequestHandler)(req, res, next);
        } catch (error) {
          next(error);
        }
      }
    };
  }
}
