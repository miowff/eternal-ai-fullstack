export class ApiError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
  static NotFound(entity: string) {
    return new ApiError(`${entity} not found`, 404);
  }
  static IsNull(entity: string) {
    return new ApiError(`${entity} is null`, 400);
  }
  static AlreadyExists(entity: string) {
    return new ApiError(`${entity} is already exists!`, 400);
  }
  static WrongPassword() {
    return new ApiError(`Incorrect password!`, 401);
  }
  static Unauthorized() {
    return new ApiError(`Unauthorized`, 401);
  }
}
