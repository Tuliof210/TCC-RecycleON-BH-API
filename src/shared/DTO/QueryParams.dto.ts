export interface QueryParamsDTO {
  query: Record<string, any>;
  select: Record<string, number>;
  cursor: { limit: number; skip: number; sort: Record<string, number> };
}
