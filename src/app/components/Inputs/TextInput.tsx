import { FC } from 'react';
import {
  Label,
  TextInput as FlowbiteTextInput,
  TextInputProps as FlowbiteTextInputProps
} from 'flowbite-react';

interface TextInputProps extends FlowbiteTextInputProps {
  label?: string;
}

export const TextInput: FC<TextInputProps> = ({ label, type = 'text', ...props }) => (
  <div>
    {!!label && (
      <div className='mb-2 block'>
        <Label className='leading-normal dark:text-white' htmlFor={props.id} value={label} />
      </div>
    )}
    <FlowbiteTextInput type={type} {...props} />
  </div>
);
