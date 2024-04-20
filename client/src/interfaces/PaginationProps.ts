export interface PaginationProps<T> {
  PageIndex: number;
  PageSize: number;
  Count: number;
  Data: T;
}
