export interface QueryParamsDTO {
  query: Record<string, any>;
  select: Record<string, any>;
  cursor: { limit: number; skip: number; sort: Record<string, any> };
}
