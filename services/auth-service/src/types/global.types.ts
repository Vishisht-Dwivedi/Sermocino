export type ServiceResponse<T = unknown> = {
  ok: boolean
  code: number
  error?: {
    type: string
    message: string
  }
  data?: T
}