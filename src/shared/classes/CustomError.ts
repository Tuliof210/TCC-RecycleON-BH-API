export class CustomError extends Error {
  public name: string;
  public message: string;
  constructor(body: { name: string; message: string }) {
    super();
    Object.assign(this, body);
  }
}
