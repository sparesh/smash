import { Request, Response, NextFunction } from "express";
import { ApiError } from "../types";
export declare const errorController: (error: Error | ApiError, req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>, next: NextFunction) => void;
