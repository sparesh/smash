import { RequestHandler } from "express";

export interface IMiddleware {
  main: RequestHandler;
}
