import { useQuery } from '@tanstack/react-query';

import { API_ROOT } from 'app/constants';
import { DeviceTypeCount } from 'app/types';

import { BASE_API, QUERY_KEYS } from './constants';

export const DEVICE_TYPES_API_ROOT = `${API_ROOT}/deviceTypes`;

export const useFetchDeviceTypes = () =>
  useQuery({
    queryKey: [QUERY_KEYS.DEVICES],
    queryFn: () => BASE_API.get<DeviceTypeCount[]>(DEVICE_TYPES_API_ROOT).then(res => res.data)
  });
