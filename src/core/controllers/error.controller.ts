import { Request, Response, NextFunction } from "express";

export const errorController = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    if (error.isJoi) {
      res.status(400).send({ error: error.message });
    } else if (error.userError) {
      res.status(error.code).send({ error: error.message });
    } else {
      res.status(500).send(process.env.NODE_ENV === "production" ? { error: "Internal Server Error" } : { error: error.message });
    }
  }
};
