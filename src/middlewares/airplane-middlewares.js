const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Something went wrong while creating airplane";
    ErrorResponse.error = new AppError(
      ["Airplane not found in the incomming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
  }
  next();
}

module.exports = { validateCreateRequest };
