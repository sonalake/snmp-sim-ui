export enum HTTPRequestMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface MutateResourceConfig<T> {
  method: HTTPRequestMethod
  url: string
  body: T
}
