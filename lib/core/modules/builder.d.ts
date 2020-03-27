import { IRouter } from "express";
import { Container } from "inversify";
import { Module } from "./module";
import { AppOptions } from "..";
export declare class ModulesBuilder {
    private modules;
    private globalOptions;
    add(...modules: Array<Module>): ModulesBuilder;
    remove(...modules: Array<Module>): ModulesBuilder;
    options(options: AppOptions): ModulesBuilder;
    build(this: ModulesBuilder, container: Container, router?: IRouter): IRouter;
}
