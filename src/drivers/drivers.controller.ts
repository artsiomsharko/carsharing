import DriversService from "./drivers.service";
import { type ParamsRequest } from "../helpers/types";
import { NextFunction, Request, Response } from "express";

class DriversController {
  async getOne(req: ParamsRequest, res: Response, next: NextFunction) {
    try {
      const driverId = req.params.id;
      const driver = await DriversService.getOne(driverId);

      if (!driver) {
        throw Error(`Cannot find driver with id: ${driverId}`);
      }

      return res.json(driver);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const drivers = await DriversService.getAll();

      return res.json(drivers);
    } catch (e) {
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.body;
      const driver = await DriversService.create(params);

      return res.json(driver);
    } catch (e) {
      next(e);
    }
  }

  async update(req: ParamsRequest, res: Response, next: NextFunction) {
    try {
      const driverId = req.params.id;
      const params = req.body;

      const updatedDriver = await DriversService.update(driverId, params);

      return res.json(updatedDriver);
    } catch (e) {
      next(e);
    }
  }

  async delete(req: ParamsRequest, res: Response, next: NextFunction) {
    try {
      const driverId = req.params.id;
      const deletedDriver = await DriversService.delete(driverId);

      return res.json(deletedDriver);
    } catch (e) {
      next(e);
    }
  }
}

export default new DriversController();
