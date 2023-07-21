import { rest } from 'msw';

import { DEVICES } from 'mock-api/data/mocked-devices';

export const handlers = [
  rest.get('/api/devices', (req, res, ctx) => {
    // @TODO - handle pagination/filtering/etc.
    return res(ctx.status(200), ctx.json(DEVICES));
  })
];
