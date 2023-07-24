import { HTTPRequestMethod } from 'app/constants';

export interface MutateResourceConfig<T> {
  method: HTTPRequestMethod;
  url: string;
  body?: T;
}
