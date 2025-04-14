export type ID = number | string
export type IDataResponse<T> = T & { id: number };
type IFindByResponseObject<T> = {
  first: () => IDataResponse<T> | null;
  all: () => Array<IDataResponse<T>>;
}

export interface IDatabaseAdapter<T, TResponse> {
  save: (data: Omit<T, "id">) => Promise<IDataResponse<TResponse>>;
  findById: (id: ID) => Promise<IDataResponse<TResponse>>;
  findAll: () => Promise<Array<IDataResponse<TResponse>>>;
  findBy: (searchObj: Partial<T>) => Promise<IFindByResponseObject<TResponse>>;
  updateById: (id: ID, data: Partial<T>) => Promise<IDataResponse<TResponse>>;
  deleteById: (id: ID) => Promise<IDataResponse<TResponse>>;
}
