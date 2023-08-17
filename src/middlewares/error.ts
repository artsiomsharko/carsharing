import { NextFunction, Request, Response } from "express";

export default function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof Error) {
    return res.status(400).json({ error: error.message });
  }

  next();
}
