import { rest } from 'msw';

import { DEVICE_TYPES } from 'mock-api/data/deviceTypes';

import { DEVICE_TYPES_API_ROOT } from 'app/queries/useDeviceTypeQueries';

export const handlers = [
  rest.get(DEVICE_TYPES_API_ROOT, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(DEVICE_TYPES));
  })
];
