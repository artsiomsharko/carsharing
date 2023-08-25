export const mockCarProdInfo = {
  brand: "BMW",
  model: "3-er F30",
  date: "2022-02-14T00:00:00.000Z",
};

export const mockCarProps = {
  vin: "VIN2POST2",
  registrationNumber: "0007AM-7",
  status: "free" as
    | "unavailable"
    | "in-service"
    | "in-use"
    | "free"
    | "reserved",
  fuelLevel: 77,
  mileage: 25200,
  currentRunId: null as null,
};

export const mockCarLocation = {
  type: "Point",
  coordinates: [24.12312355, 35.31231231],
};

export const mockRun = {
  carId: "649b203746ae3152343caaaa",
  driverId: "610f07d8748e9a5e2832baaa",
  startDate: "2023-07-31T12:00:00.000Z",
  finishFuelLevel: 50,
  finishMileage: 5000,
};

export const mockDriver = {
  licenseNumber: "A123457896TEST",
  firstName: "John",
  lastName: "Mock",
};

export const mockPaymentCard = {
  number: 1234567890123456,
  owner: "John Doe",
  validThrough: "2001-05-24T21:00:00.000Z",
};
