export class Pagination<T> {
  private readonly PageIndex: number;
  private readonly PageSize: number;
  private readonly Count: number;
  private readonly Data: T[];
  constructor(PageIndex: number, PageSize: number, Count: number, Data: T[]) {
    this.PageIndex = PageIndex || 1;
    this.PageSize = PageSize || 6;
    this.Count = Count;
    this.Data = Data;
  }
}
