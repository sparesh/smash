export class ApiError extends Error {
  public code: number;
  public userError: boolean;

  constructor(message: string, code: number) {
    super(message);

    this.code = code;
    this.userError = code >= 400 && code < 500;
  }
}
