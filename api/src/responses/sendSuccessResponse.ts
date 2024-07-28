import { Response } from "express";
import { Pagination, SuccessResponse } from "../interfaces/responses.interface";

const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  pagination?: Pagination
) => {
  const response: SuccessResponse<T> = {
    status: "success",
    data,
    pagination,
  };
  res.status(statusCode).json(response);
};

export default sendSuccessResponse;
