import { FC, FunctionComponent, ReactNode, SVGProps } from 'react';
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiQuestionMarkCircle,
  HiXCircle
} from 'react-icons/hi';
import { Alert as FlowbiteAlert } from 'flowbite-react';

type AlertColors = 'success' | 'info' | 'gray' | 'warning' | 'failure';

const icons: Record<AlertColors, FunctionComponent<SVGProps<SVGSVGElement>>> = {
  success: HiCheckCircle,
  info: HiInformationCircle,
  gray: HiQuestionMarkCircle,
  warning: HiExclamationCircle,
  failure: HiXCircle
};

export const Alert: FC<{ message: string; color: AlertColors; additionalContent?: ReactNode }> = ({
  message,
  color,
  additionalContent
}) => (
  <FlowbiteAlert color={color} icon={icons[color]} additionalContent={additionalContent}>
    <span className='font-medium'>{message}</span>
  </FlowbiteAlert>
);
