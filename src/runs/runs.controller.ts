import RunsService from "./runs.service";
import CarsService from "../cars/cars.service";
import { NextFunction, Request, Response } from "express";
import { type ParamsRequest } from "../helpers/types";

class RunsController {
  async getAllForCar(req: ParamsRequest, res: Response, next: NextFunction) {
    try {
      const carId = req.params.id;
      const cars = await RunsService.getAllForCar(carId);

      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req: ParamsRequest, res: Response, next: NextFunction) {
    try {
      const runId = req.params.id;
      const run = await RunsService.getOne(runId);

      if (!run) {
        throw Error(`Cannot find run with id: ${runId}`);
      }

      return res.json(run);
    } catch (e) {
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.body;
      const run = await RunsService.create(params);

      if (params.setCurrent) {
        await CarsService.update(params.carId, { currentRunId: run._id });
      }

      return res.json(run);
    } catch (e) {
      next(e);
    }
  }

  async update(req: ParamsRequest, res: Response, next: NextFunction) {
    try {
      const runId = req.params.id;
      const params = req.body;

      const updatedRun = await RunsService.update(runId, params);

      if (!updatedRun) {
        throw Error(`Cannot find run with id: ${runId}`);
      }

      return res.json(updatedRun);
    } catch (e) {
      next(e);
    }
  }

  async delete(req: ParamsRequest, res: Response, next: NextFunction) {
    try {
      const runId = req.params.id;
      const deletedRun = RunsService.delete(runId);

      return res.json(deletedRun);
    } catch (e) {
      next(e);
    }
  }
}

export default new RunsController();
