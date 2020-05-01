export class ApiError extends Error {
  public userError: boolean;

  constructor(public errorInfo: any, public code: number) {
    super();

    this.userError = code >= 400 && code < 500;
  }
}
