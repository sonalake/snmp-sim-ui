import React, { FC } from 'react';
import { Label, TextInput as FlowbiteTextInput } from 'flowbite-react';
import { Field, FormikErrors, FormikHandlers, FormikTouched } from 'formik';

import { FormField } from '../../models';

import { HelperText } from './HelperText';

export const TextInput: FC<{
  formItem: FormField;
  disabled?: boolean;
  touched: FormikTouched<Record<keyof FormField, string>>;
  errors: FormikErrors<Record<keyof FormField, string>>;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
}> = ({
  formItem: { type, name, label, required, validation },
  disabled,
  errors,
  touched,
  handleChange,
  handleBlur
}) => {
  return (
    <div className='m-1'>
      <div className='mb-2 block'>
        <Label htmlFor={name}>
          {label}
          {required && <span className='text-red-600'>*</span>}
        </Label>
      </div>

      <Field name={name}>
        {({ field }: { field: { value: string } }) => {
          return (
            <FlowbiteTextInput
              type={type.toLowerCase()}
              name={name}
              value={field.value}
              placeholder={label}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disabled}
              required={required}
              helperText={<HelperText errors={errors} touched={touched} name={name} validation={validation} />}
            />
          );
        }}
      </Field>
    </div>
  );
};
