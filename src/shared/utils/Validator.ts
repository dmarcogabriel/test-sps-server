import { APIError } from "@app/core/errors"
import { ZodError } from "zod"

export default class Validator<T> {
  constructor(private readonly schema: any) {}

  public validate(body: any): T {
    try {
      return this.schema.parse(body);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new APIError({
          message: "Body da requisição está errado.",
          type: "VALIDATION_ERROR",
          statusNumber: 404,
          reason: e.issues.map(issue => issue.path[0])
        })
      }
  
      throw new APIError({
        message: "Ocorreu um erro inesperado, tente novamente mais tarde.",
        type: "VALIDATION_FAILURE",
        statusNumber: 500
      })
    }
  }
}