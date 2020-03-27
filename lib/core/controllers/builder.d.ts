import { Container } from "inversify";
import { IRouter } from "express-serve-static-core";
import { Controller } from "./controller";
import { AppOptions } from "..";
export declare class ControllersBuilder {
    private controllers;
    private globalOptions;
    add(...controllers: Controller[]): ControllersBuilder;
    remove(...controllers: Controller[]): ControllersBuilder;
    options(options: AppOptions | null): ControllersBuilder;
    build(container: Container, router?: IRouter): IRouter;
    private wrapRoute;
}
