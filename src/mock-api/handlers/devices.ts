import { rest } from 'msw';

import { DEVICES } from 'mock-api/data/devices';

import { API_ROOT } from 'app/constants';

export const handlers = [
  rest.get(`${API_ROOT}/devices`, (req, res, ctx) => {
    // @TODO - handle pagination/filtering/etc.

    const search = req.url.searchParams.get('search');
    if (search === '404') {
      return res(ctx.status(404));
    } else if (search === '500') {
      return res(ctx.status(500));
    } else if (search === 'empty') {
      return res(
        ctx.status(200),
        ctx.json({
          count: 0,
          items: []
        })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        count: 21,
        items: DEVICES
      })
    );
  })
];
