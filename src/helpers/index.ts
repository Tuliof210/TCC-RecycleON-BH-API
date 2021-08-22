export const HTTP_ERROR_STATUS_HELPER = 'HTTP_ERROR_STATUS_HELPER';
export interface IHttpErrorStatusHelper {
  get(error: Error): number;
}

export { HttpErrorStatusHelper } from './HttpErrorStatus.helper';
