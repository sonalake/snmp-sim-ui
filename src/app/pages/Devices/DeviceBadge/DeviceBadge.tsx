import { FC, PropsWithChildren } from 'react';
import { Badge } from 'flowbite-react';

type DeviceBadgeProps = PropsWithChildren & {
  className?: string;
};

const customTheme = {
  root: {
    base: 'flex h-fit items-center gap-1 w-fit',
    color: {
      info: 'bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-gray-200'
    },
    size: {
      xs: 'px-2.5 py-[1px] font-medium text-sm leading-5'
    }
  }
};

export const DeviceBadge: FC<DeviceBadgeProps> = ({ children, className }) => {
  return (
    <Badge theme={customTheme} className={className}>
      {children}
    </Badge>
  );
};
