export enum HTTPRequestMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export const API_ROOT = `${process.env.REACT_APP_BASE_API || ''}`;
