import { Request, Response, NextFunction } from "express";
import { ApiError } from "../types";

export const errorController = (error: ApiError | Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    if (error instanceof ApiError) {
      res.status(error.code).send({ error: error.errorInfo });
    } else if ((error as any).isJoi) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send(process.env.NODE_ENV === "production" ? { error: "internal server error" } : error.message);
    }
  }
};
