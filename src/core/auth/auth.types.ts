import { type Request } from 'express';

interface IRequestGeneric {
  Body?: unknown
  Query?: unknown
  Params?: Request["params"]
  Headers?: Request['headers']
}

export type IRequest<TRequestGeneric extends IRequestGeneric = IRequestGeneric> =
  Request<IRequestGeneric['Params'], unknown, TRequestGeneric['Body'], TRequestGeneric['Query']> & {
    userId?: number
  }
