import axios from 'axios';

export const BASE_API = axios.create({
  headers: { 'content-type': 'application/json', accept: 'application/json' }
});

export enum QUERY_KEYS {
  AGENT = 'agent',
  AGENTS = 'agents',
  DEVICE = 'device',
  DEVICES = 'devices'
}
