import { FC, useMemo, useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { TextInput } from 'flowbite-react';

import { Heading, LoadingIndicator } from 'app/components';
import { useFetchDeviceTypes } from 'app/queries/useDeviceTypeQueries';

import { DeviceTypeOption } from './DeviceTypeOption';

interface DeviceTypeModalContentProps {
  onClose: () => void;
}

export const DeviceTypeModalContent: FC<DeviceTypeModalContentProps> = ({ onClose }) => {
  const [search, setSearch] = useState('');

  const { data, isLoading } = useFetchDeviceTypes();

  const filteredData = useMemo(
    () =>
      (data || []).filter(
        ({ name }) => name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || search === ''
      ),
    [search, data]
  );

  return (
    <div className='rounded p-6'>
      <div className='flex flex-col pb-3'>
        <div className='flex items-start justify-between'>
          <Heading.Modal>Add device</Heading.Modal>
          <button
            aria-label='Close'
            className='ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-800 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
            onClick={onClose}
          >
            <HiOutlineX aria-hidden={true} className='h-5 w-5' />
          </button>
        </div>
        <Heading.ModalSub>Select a device type below or add your own.</Heading.ModalSub>
      </div>
      <div className='flex-1 pt-1 pb-4'>
        <TextInput
          id='search'
          required={true}
          value={search}
          name='name'
          placeholder='Search device types'
          disabled={isLoading}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className='flex-1 flex flex-col h-[470px] max-h-[470px] overflow-y-auto gap-4'>
        {isLoading && <LoadingIndicator />}
        {!isLoading &&
          filteredData.map((val, key) => <DeviceTypeOption key={key} deviceType={val} />)}
      </div>
    </div>
  );
};
