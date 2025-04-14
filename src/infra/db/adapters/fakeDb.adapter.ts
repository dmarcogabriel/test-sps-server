import { ID, IDatabaseAdapter, IDataResponse } from '@app/shared/interfaces/IDatabaseAdapter';
import db from '@app/infra/db/db';
import { BaseError } from "@app/core/errors";

function parseId(id: string | number): number {
  return typeof id === 'string' ? Number.parseInt(id) : id
}

export default class FakeDbAdapter<T, TResponse> implements IDatabaseAdapter<T, TResponse> {
  private readonly tableName: string;
  private table: Array<IDataResponse<TResponse>>;

  constructor(
    tableName: string
  ) {
    const table = (db as Record<string, unknown>)[tableName];

    if (!table) {
      throw new BaseError({
        message: `Tabela ${tableName}, não existe.`,
        type: "TABLE_NOT_FOUND"
      });
    }

    this.tableName = tableName;
    this.table = table as Array<IDataResponse<TResponse>>;
  }

  public async save(data: Omit<T, "id">) {
    const lastIndex = this.table.length - 1;
    const newId = parseId(this.table[lastIndex]?.id) + 1;
    const newData = { ...data, id: newId } as IDataResponse<TResponse>;

    this.table.push(newData);

    return newData;
  }

  public async findById(id: ID) {
    const data = this.table.find((data: IDataResponse<TResponse>) =>
      data.id === parseId(id)
    );

    if (!data) {
      throw new BaseError({
        message: "Registro não encontrado.",
        type: "NOT_FOUND"
      });
    }

    return data;
  }

  public async findAll() {
    return (this.table ?? []) as unknown as Array<IDataResponse<TResponse>>;
  }

  public async findBy(searchObj: Partial<T>) {
    let found: Array<IDataResponse<TResponse>> = [];
    Object.entries(searchObj).forEach(([searchKey, searchValue]) => {
      const foundData = this.table.filter((data) => {
        if (!data[searchKey as keyof typeof data]) {
          throw new BaseError({
            message: `Coluna ${searchKey} não existe na tabela ${this.tableName}`,
            type: "NON_EXISTING_COLUMN"
          });
        }

        return data[searchKey as keyof typeof data] === searchValue;
      });
      found = [...found, ...foundData];
    })

    return {
      first() {
        return found[0] ?? null;
      },

      all() {
        return found;
      }
    };
  }

  public async updateById<T>(id: ID, updateData: Partial<T>) {
    this.table = this.table.map(data => {
      if (data.id === parseId(id)) {
        return { ...data, ...updateData }
      }
      return data;
    })

    return this.findById(id);
  }

  public async deleteById<T>(id: ID) {
    const foundData = this.findById(id);

    this.table =this.table.filter(data => data.id !== parseId(id));

    return foundData;
  }
}