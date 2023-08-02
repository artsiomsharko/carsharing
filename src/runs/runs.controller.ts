import RunsService from "./runs.service";
import CarsService from "../cars/cars.service";
import { Request, Response } from "express";
import { type ParamsRequest } from "../helpers/types";

class RunsController {
  async getAllForCar(req: ParamsRequest, res: Response) {
    try {
      const carId = req.params.id;
      const cars = await RunsService.getAllForCar(carId);

      return res.json(cars);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req: ParamsRequest, res: Response) {
    try {
      const runId = req.params.id;
      const run = await RunsService.getOne(runId);

      if (!run) {
        throw Error(`Cannot find run with id: ${runId}`);
      }

      return res.json(run);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const params = req.body;
      const run = await RunsService.create(params);

      if (params.setCurrent) {
        await CarsService.update(params.carId, { currentRunId: run._id });
      }

      return res.json(run);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req: ParamsRequest, res: Response) {
    try {
      const runId = req.params.id;
      const params = req.body;

      const updatedRun = await RunsService.update(runId, params);

      if (!updatedRun) {
        throw Error(`Cannot find run with id: ${runId}`);
      }

      return res.json(updatedRun);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req: ParamsRequest, res: Response) {
    try {
      const runId = req.params.id;
      const deletedRun = RunsService.delete(runId);

      return res.json(deletedRun);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new RunsController();
