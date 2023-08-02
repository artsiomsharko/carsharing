import DriversService from "./drivers.service";
import { type ParamsRequest } from "../helpers/types";
import { Request, Response } from "express";

class DriversController {
  async getOne(req: ParamsRequest, res: Response) {
    try {
      const driverId = req.params.id;
      const driver = await DriversService.getOne(driverId);

      if (!driver) {
        throw Error(`Cannot find driver with id: ${driverId}`);
      }

      return res.json(driver);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const drivers = await DriversService.getAll();

      return res.json(drivers);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const params = req.body;
      const driver = await DriversService.create(params);

      return res.json(driver);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req: ParamsRequest, res: Response) {
    try {
      const driverId = req.params.id;
      const params = req.body;

      const updatedDriver = await DriversService.update(driverId, params);

      return res.json(updatedDriver);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req: ParamsRequest, res: Response) {
    try {
      const driverId = req.params.id;
      const deletedDriver = await DriversService.delete(driverId);

      return res.json(deletedDriver);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new DriversController();
