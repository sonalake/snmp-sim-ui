import { AxiosResponse } from 'axios';

import { baseApi } from './api';
import { MutateResourceConfig } from './api.model';

export async function mutateResource<T, R>(config: MutateResourceConfig<T>): Promise<R> {
  const { method, url, body } = config;
  return baseApi[method]<T, AxiosResponse<R>>(url, body).then(res => res.data);
}
