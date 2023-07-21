import { AxiosResponse } from 'axios';

import { MutateResourceConfig } from './api.model';
import { baseApi } from './baseApi';

export async function mutateResource<T, R>(config: MutateResourceConfig<T>): Promise<R> {
  const { method, url, body } = config;
  return baseApi[method]<T, AxiosResponse<R>>(url, body).then(res => res.data);
}
