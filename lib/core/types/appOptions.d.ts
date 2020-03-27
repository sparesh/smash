/// <reference types="node" />
import { Server } from "http";
import { Express } from "express";
export declare class AppOptions {
    server: Server;
    app: Express;
    [module: string]: any;
    constructor(server: Server, app: Express);
    attachProp(module: string, name: string, value: any): void;
    getProp(module: string, name: string): any;
    getProps(module: string): any;
}
