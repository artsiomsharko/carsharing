import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export default function validateObjectId(
  req: Request<{ id: string | mongoose.Types.ObjectId }>,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: `Invalid ObjectId param: ${id}` });
  }

  next();
}
