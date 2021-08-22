class StandardResponse {
  public statusCode: number;

  constructor(statusCode: number, type: string) {
    this.statusCode = statusCode ? statusCode : type === 'success' ? 200 : 500;
  }
}

export class StandardSuccess<Type> extends StandardResponse {
  public data: Type | Record<string, never>;

  constructor(statusCode: number, data: Type) {
    super(statusCode, 'success');
    this.data = data ? data : {};
  }
}

export class StandardError extends StandardResponse {
  public error: { name: string; message: string };

  constructor(statusCode: number, error: Error | { name: string; message: string }) {
    super(statusCode, 'error');
    this.error = { name: error.name, message: error.message };
  }
}
