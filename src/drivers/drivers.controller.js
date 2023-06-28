const DriversService = require("./drivers.service");

class DriversController {
  async getOne(req, res) {
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

  async getAll(req, res) {
    try {
      const drivers = await DriversService.getAll();

      return res.json(drivers);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async create(req, res) {
    try {
      const params = req.body;
      const driver = await DriversService.create(params);

      return res.json(driver);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const driverId = req.params.id;
      const params = req.body;

      const updatedDriver = await DriversService.update(driverId, params);

      return res.json(updatedDriver);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const driverId = req.params.id;
      const deletedDriver = await DriversService.delete(driverId);

      return res.json(deletedDriver);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

module.exports = new DriversController();
