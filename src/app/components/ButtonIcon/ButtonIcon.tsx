import { FC } from 'react';
import { IconType } from 'react-icons';

interface ButtonIconProps {
  as: IconType;
  onClick?: () => void;
  className?: string;
}

export const ButtonIcon: FC<ButtonIconProps> = ({ as, onClick, className }) => {
  const Icon = as;

  return <Icon className={`${className} mr-2 h-5 w-5 cursor-pointer`} onClick={onClick} />;
};
