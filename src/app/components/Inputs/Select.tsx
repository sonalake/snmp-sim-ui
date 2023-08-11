import { FC } from 'react';
import {
  Label,
  Select as FlowbiteSelect,
  SelectProps as FlowbiteSelectProps
} from 'flowbite-react';

interface SelectProps extends FlowbiteSelectProps {
  options: { label: string; value: string }[];
  label?: string;
}

export const Select: FC<SelectProps> = ({ label, options, placeholder, ...props }) => (
  <div>
    {!!label && (
      <div className='mb-2 block'>
        <Label className='leading-normal dark:text-white' htmlFor={props.id} value={label} />
      </div>
    )}
    <FlowbiteSelect {...props}>
      {!!placeholder && <option hidden>{placeholder}</option>}
      {options.map((opt, index) => (
        <option key={`select-input-${props.id}-${index}`} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </FlowbiteSelect>
  </div>
);
