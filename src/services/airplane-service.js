const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    console.log(error);
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Can't create a airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Can't fetch all airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("The flight is not available", error.statusCode);
    }
    throw new AppError(
      "Can't fetch the airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
};
