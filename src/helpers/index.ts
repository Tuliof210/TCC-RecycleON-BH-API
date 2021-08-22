export const REPOSITORY_HTTP_STATUS_HELPER = 'REPOSITORY_HTTP_STATUS_HELPER';
export interface IRepositoryHttpStatusHelper {
  getError(error: Error): number;
}

export { RepositoryHttpStatusHelper } from './RepositoryHttpStatus.helper';
