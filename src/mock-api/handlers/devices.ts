import { rest } from 'msw';

import { DEVICES } from 'mock-api/data/devices';

import { API_ROOT } from 'app/constants';
import { Device } from 'app/types';

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
  }),
  rest.post<Device>(`${API_ROOT}/devices`, (req, res, ctx) => {
    const { name } = req.body;

    if (name === '404') {
      return res(ctx.status(404));
    } else if (name === '400') {
      return res(
        // ctx.delay(2000),
        ctx.status(400),
        ctx.json({
          error: 'Error from the API'
        })
      );
    } else if (name === '500') {
      return res(ctx.status(500));
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          count: 21,
          items: DEVICES
        })
      );
    }
  })
];
