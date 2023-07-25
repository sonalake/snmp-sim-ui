import { FC, PropsWithChildren } from 'react';
import { Badge } from 'flowbite-react';

type DeviceBadgeProps = PropsWithChildren;

const customTheme = {
  root: {
    base: 'flex h-fit items-center gap-1 w-fit',
    color: {
      info: 'bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-gray-200'
    },
    size: {
      xs: 'px-2.5 py-[1px] font-medium leading-5'
    }
  }
};

export const DeviceBadge: FC<DeviceBadgeProps> = ({ children }) => {
  return <Badge theme={customTheme}>{children}</Badge>;
};
