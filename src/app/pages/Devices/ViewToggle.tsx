import { FC } from 'react';
import { HiViewGrid, HiViewList } from 'react-icons/hi';
import { Button } from 'flowbite-react';

export enum ViewToggleState {
  LIST = 'list',
  CARDS = 'cards'
}

interface ViewToggleProps {
  viewState: ViewToggleState;
  changeViewState: (state: ViewToggleState) => void;
}

export const ViewToggle: FC<ViewToggleProps> = ({ viewState, changeViewState }) => {
  const handleViewChange = () => {
    const newState =
      viewState === ViewToggleState.LIST ? ViewToggleState.CARDS : ViewToggleState.LIST;
    changeViewState(newState);
  };

  const Icon = viewState === ViewToggleState.CARDS ? HiViewGrid : HiViewList;
  return (
    <Button
      data-testid='view-toggle-button'
      onClick={handleViewChange}
      className='rounded-lg p-2.5 text-sm text-gray-500 bg-transparent dark:bg-transparent w-10 h-10 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
    >
      <Icon size='20px' />
    </Button>
  );
};
