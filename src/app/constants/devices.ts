export enum DeviceStatus {
  RUNNING = 'running',
  STOPPED = 'stopped',
  ALL = 'all'
}

export type DeviceStatusType = 'running' | 'stopped';

export enum ViewState {
  LIST = 'list',
  CARDS = 'cards'
}

export const PAGINATION_LIST_VIEW_PAGE_SIZE_OPTION = 10;
export const PAGINATION_CARD_VIEW_PAGE_SIZE_OPTION = 12;
