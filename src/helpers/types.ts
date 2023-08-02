import { Request } from "express";
import { Types } from "mongoose";

export type ParamsRequest = Request<{ id: Types.ObjectId }>;
