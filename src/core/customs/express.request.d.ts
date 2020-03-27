declare namespace Express {
  export interface Request {
    [prop: string]: any;
  }

  export interface Response {
    [prop: string]: any;
  }
}
