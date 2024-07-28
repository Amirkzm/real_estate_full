type ErrorResponseType = {
  code: number;
  message: string;
  details?: any;
};

export interface ErrorResponse {
  status: "error";
  errors: ErrorResponseType[] | ErrorResponseType;
}

export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface SuccessResponse<T> {
  status: "success";
  data: T;
  pagination?: Pagination;
}
