import { handlers as devices } from './devices';
import { handlers as deviceTypes } from './deviceTypes';

export const handlers = [...devices, ...deviceTypes];
