import CarsService from "./cars.service";

class CarsController {
  async getAll(req, res) {
    try {
      const cars = await CarsService.getAll();
      return res.json(cars);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const carId = req.params.id;
      const car = await CarsService.getOneById(carId);

      if (!car) {
        throw Error(`Cannot find car with id: ${carId}`);
      }

      return res.json(car);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getLowFuelInUse(req, res) {
    try {
      const cars = await CarsService.getLowFuelInUse();

      return res.json(cars);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getReservedUnauthorized(req, res) {
    try {
      const cars = await CarsService.getReservedUnauthorized();

      return res.json(cars);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async create(req, res) {
    try {
      const params = req.body;
      const car = await CarsService.create(params);

      return res.json(car);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const carId = req.params.id;
      const params = req.body;

      const updatedCar = await CarsService.update(carId, params);

      if (!updatedCar) {
        throw Error(`Cannot find car with id: ${carId}`);
      }

      return res.json(updatedCar);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async moveOldInService(req, res) {
    try {
      const cars = await CarsService.moveOldInService();

      return res.json(cars);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async changeLocationForFree(req, res) {
    try {
      const cars = await CarsService.changeLocationForFree();

      return res.json(cars);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deleteByVin(req, res) {
    try {
      const vin = req.params.vin;
      const deletedCar = await CarsService.deleteByVin(vin);

      if (!deletedCar) {
        throw Error(`Cannot find car with VIN: ${vin}`);
      }

      return res.json(deletedCar);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new CarsController();
