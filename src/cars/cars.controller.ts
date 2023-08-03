import CarsService from "./cars.service";
import { type ParamsRequest } from "../helpers/types";
import { NextFunction, Request, Response } from "express";

class CarsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = await CarsService.getAll();
      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req: ParamsRequest, res: Response, next: NextFunction) {
    try {
      const carId = req.params.id;
      const car = await CarsService.getOneById(carId);

      if (!car) {
        throw Error(`Cannot find car with id: ${carId}`);
      }

      return res.json(car);
    } catch (e) {
      next(e);
    }
  }

  async getLowFuelInUse(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = await CarsService.getLowFuelInUse();

      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  async getReservedUnauthorized(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const cars = await CarsService.getReservedUnauthorized();

      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.body;
      const car = await CarsService.create(params);

      return res.json(car);
    } catch (e) {
      next(e);
    }
  }

  async update(req: ParamsRequest, res: Response, next: NextFunction) {
    try {
      const carId = req.params.id;
      const params = req.body;

      const updatedCar = await CarsService.update(carId, params);

      if (!updatedCar) {
        throw Error(`Cannot find car with id: ${carId}`);
      }

      return res.json(updatedCar);
    } catch (e) {
      next(e);
    }
  }

  async moveOldInService(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = await CarsService.moveOldInService();

      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  async changeLocationForFree(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = await CarsService.changeLocationForFree();

      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  async deleteByVin(req: Request, res: Response, next: NextFunction) {
    try {
      const vin = req.params.vin;
      const deletedCar = await CarsService.deleteByVin(vin);

      if (!deletedCar) {
        throw Error(`Cannot find car with VIN: ${vin}`);
      }

      return res.json(deletedCar);
    } catch (e) {
      next(e);
    }
  }
}

export default new CarsController();
