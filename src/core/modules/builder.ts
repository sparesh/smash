import { IRouter, Router } from "express";
import { Container } from "inversify";
import { Module, IModule } from "./module";
import { Controller } from "../controllers/controller";
import { AppOptions, ControllersBuilder, EnumMetaKey } from "..";

export class ModulesBuilder {
  private modules: Array<Module> = [];
  private globalOptions: AppOptions | null = null;

  add(...modules: Array<Module>): ModulesBuilder {
    this.modules = this.modules.concat(...modules);
    return this;
  }

  remove(...modules: Array<Module>): ModulesBuilder {
    this.modules = this.modules.filter(module => !modules.includes(module));
    return this;
  }

  options(options: AppOptions): ModulesBuilder {
    this.globalOptions = options;
    return this;
  }

  build(this: ModulesBuilder, container: Container, router: IRouter = Router()): IRouter {
    const modulesMetadata: Array<[string, IRouter, ControllersBuilder]> = [];

    this.modules.forEach(function(this: ModulesBuilder, Module: any) {
      const instance: IModule = container.get(Module);
      const mountPoint = Reflect.getMetadata(EnumMetaKey.MountPoint, Module);

      const controllersCollection: Array<Controller> = [];
      const controllers = instance.getControllers();
      for (const controller in controllers) {
        if (controllers.hasOwnProperty(controller)) {
          controllersCollection.push(controllers[controller] as Controller);
        }
      }

      instance.init(this.globalOptions);
      modulesMetadata.push([mountPoint, instance.getRouter(), new ControllersBuilder().add(...controllersCollection).options(this.globalOptions)]);
    }, this);

    modulesMetadata.forEach(([mountPoint, moduleRouter, controllerBuilder]) => {
      router.use(`/${mountPoint}`, controllerBuilder.build(container, moduleRouter));
    });

    return router;
  }
}
