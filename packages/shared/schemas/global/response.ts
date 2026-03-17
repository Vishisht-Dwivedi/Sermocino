export type ServiceResponse<T = unknown> = {
  ok: boolean
  code: number
  error?: {
    type: string
    message: string
  }
  data?: T
}

export type SuccessType = {
    ok: boolean,
    code: number,
    message: string,
    data: object
}
export type ErrorType = {
    ok: boolean,
    code: number,
    message: string,
    error: string
}
