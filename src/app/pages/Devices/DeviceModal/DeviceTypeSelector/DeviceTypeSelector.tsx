import { FC, FocusEvent, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { Button, Label, TextInput, TextInputProps } from 'flowbite-react';

import { DeviceTypeCount } from 'app/types';

import { DeviceTypeModal } from './DeviceTypeModal';

const customTheme = {
  base: 'group flex h-min items-center relative w-full text-center relative focus:z-10 focus:outline-none border',
  color: {
    failure:
      'bg-red-50 border-red-500 text-red-900 enabled:hover:bg-red-100 focus:border-red-500 focus:ring-red-500 dark:bg-red-100 dark:enabled:hover:bg-red-100 dark:border-red-400 dark:focus:border-red-500 dark:focus:ring-red-500',
    gray: 'bg-gray-50 border-gray-300 text-gray-600 enabled:hover:bg-gray-100 enabled:hover:text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 dark:focus:border-cyan-500 dark:focus:ring-cyan-500'
  },
  inner: {
    base: 'flex flex-1 items-center justify-between transition-all duration-200'
  },
  size: {
    md: 'text-sm p-2.5'
  }
};

export const DEVICE_TYPE_SELECTOR_BUTTON_TEST_ID = 'device-type-selector-button';

interface DeviceTypeSelectorProps extends Omit<TextInputProps, 'onChange'> {
  onChange: (val: string) => void;
}

export const DeviceTypeSelector: FC<DeviceTypeSelectorProps> = ({
  onChange,
  onBlur,
  color = 'gray',
  ...props
}) => {
  const [isDeviceTypeOpen, setIsDeviceTypeOpen] = useState(false);

  const handleSelection = (deviceType: DeviceTypeCount) => onChange(deviceType.name);

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (!isDeviceTypeOpen) {
      onBlur?.(e);
    }
  };

  const onModalClose = () => {
    setIsDeviceTypeOpen(false);
    // manually triggering onBlur with a fabricated event
    onBlur?.({ target: { name: props.name } } as FocusEvent<HTMLInputElement, Element>);
  };

  return (
    <>
      <div>
        <div className='mb-2 block'>
          <Label className='leading-normal dark:text-white' htmlFor={props.id} value='Type' />
        </div>
        <div className='flex'>
          <Button
            data-testid={DEVICE_TYPE_SELECTOR_BUTTON_TEST_ID}
            theme={customTheme}
            color={color}
            name={props.name}
            onClick={() => setIsDeviceTypeOpen(true)}
            onBlur={handleBlur}
          >
            {props.defaultValue || 'Select from the list'}
            <HiChevronDown className='h-4 w-4' />
          </Button>
        </div>
        <TextInput className='hidden' {...props} />
      </div>
      <DeviceTypeModal
        show={isDeviceTypeOpen}
        onClose={onModalClose}
        onSelection={handleSelection}
      />
    </>
  );
};
