import { AxiosResponse } from 'axios';

import { MutateResourceConfig } from 'app/types';

import { BASE_API } from './constants';

export async function mutateResource<T, R>(config: MutateResourceConfig<T>): Promise<R> {
  const { method, url, body } = config;
  return BASE_API[method]<T, AxiosResponse<R>>(url, body).then(res => res.data);
}
