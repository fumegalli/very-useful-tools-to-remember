class ApiError {
  message: string;

  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export {ApiError};
