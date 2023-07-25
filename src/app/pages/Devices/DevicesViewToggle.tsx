import { FC } from 'react';
import { HiViewGrid, HiViewList } from 'react-icons/hi';
import { Button } from 'flowbite-react';

import { ViewState } from 'app/constants';

interface DevicesViewToggleProps {
  viewState: ViewState;
  changeViewState: (state: ViewState) => void;
}

const customTheme = {
  base: 'rounded-lg p-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 focus:ring-4',
  inner: {
    base: ''
  },
  color: {
    info: 'text-gray-500 bg-transparent border border-transparent focus:outline-none focus:ring-gray-200 dark:bg-transparent dark:text-gray-400 dark:border-transparent focus:ring-4'
  },
  size: {
    md: ''
  },
  pill: {
    off: ''
  }
};

export const DevicesViewToggle: FC<DevicesViewToggleProps> = ({ viewState, changeViewState }) => {
  const Icon = viewState === ViewState.CARDS ? HiViewGrid : HiViewList;
  return (
    <Button
      theme={customTheme}
      data-testid='view-toggle-button'
      onClick={() => {
        changeViewState(viewState === ViewState.LIST ? ViewState.CARDS : ViewState.LIST);
      }}
    >
      <Icon size='20px' />
    </Button>
  );
};
