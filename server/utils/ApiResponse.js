
export class ApiResponse  {
  constructor(statusCode, success, message, data = null) {
  this.statusCode = statusCode;
  this.success = success;
  this.message = message
  this.data = data;
  }
}

