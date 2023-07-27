import { rest } from 'msw';

import { DEVICES } from 'mock-api/data/devices';

export const handlers = [
  rest.get('/api/devices', (req, res, ctx) => {
    // @TODO - handle pagination/filtering/etc.

    const search = req.url.searchParams.get('search');
    if (search === '404') {
      return res(ctx.delay(500), ctx.status(404));
    } else if (search === '500') {
      return res(ctx.delay(500), ctx.status(500));
    }
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        count: 21,
        items: DEVICES
      })
    );
  })
];
