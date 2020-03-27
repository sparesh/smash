import { Server } from "http";
import { Express } from "express";

export class AppOptions {
  [module: string]: any;

  constructor(public server: Server, public app: Express) {
    this.modulesProps = {};
  }

  public attachProp(module: string, name: string, value: any): void {
    this[module][name] = value;
  }

  public getProp(module: string, name: string): any {
    return this[module][name];
  }

  public getProps(module: string): any {
    return { ...this[module] };
  }
}
