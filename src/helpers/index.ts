import { Response } from 'express';

export const RESPONSE_HELPER = 'RESPONSE HELPER';
export interface IResponseHelper {
  success<Type>(res: Response, statusCode?: number): (entity: Type) => void;
  failure(res: Response, statusCode?: number): (error: Error) => void;
  notFound<Type>(res: Response, message?: string): (entity: Type) => Type | void;
}
