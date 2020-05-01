import { Request, Response, NextFunction } from "express";
import { ApiError } from "../types";

export const errorController = (error: ApiError | Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    if (error instanceof ApiError) {
      const isJoi = (error as any).isJoi;
      res.status(isJoi ? 400 : error.code).send({ error: error.errorInfo });
    } else {
      res.status(500).send(process.env.NODE_ENV === "production" ? { error: "internal server error" } : error.message);
    }
  }
};
