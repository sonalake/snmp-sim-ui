import { rest } from 'msw';

import { DEVICES } from 'mock-api/data/devices';

import { DEVICES_API_ROOT } from 'app/queries/useDeviceQueries';
import { Device } from 'app/types';
import { sortObjectBy } from 'app/utils/sort';

export const handlers = [
  rest.get(DEVICES_API_ROOT, ({ url: { searchParams } }, res, ctx) => {
    const search = searchParams.get('search');
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

    // handling for search, status, types filters
    let dataToUse = DEVICES;
    if (search) {
      dataToUse = DEVICES.filter(
        val => val.name === search || val.snmp_host === search || val.id === search
      );
    }

    const statusParam = searchParams.get('status');
    if (!!statusParam && statusParam != 'all') {
      dataToUse = dataToUse.filter(val => val.status === statusParam);
    }

    const typesParam = searchParams.getAll('types');
    if (!!typesParam && typesParam.length > 0) {
      dataToUse = dataToUse.filter(val => typesParam.includes(val.type));
    }

    // handling for sorting
    const sortParam = (searchParams.get('sort') || 'id') as keyof Device;
    const sortDirParam = searchParams.get('sortDir') || 'ASC';
    dataToUse.sort((a, b) => {
      return sortObjectBy(a, b, sortParam, sortDirParam);
    });

    // handling of pagination is done inline
    const pageParam = (searchParams.get('page') || 1) as number;
    const pageSizeParam = (searchParams.get('page_size') || 10) as number;
    return res(
      ctx.status(200),
      ctx.json({
        count: dataToUse.length,
        items: dataToUse.slice((pageParam - 1) * pageSizeParam, pageSizeParam * pageParam)
      })
    );
  }),

  rest.post<Device>(DEVICES_API_ROOT, (req, res, ctx) => {
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
