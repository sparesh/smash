import { IRouter } from "express";
import { AppOptions } from "..";
export declare type Module = new (...args: any[]) => {};
export interface IModule {
    init(appOptions: AppOptions | null): void;
    getRouter(): IRouter;
    getControllers(): {
        [prop: string]: Function;
    };
}
