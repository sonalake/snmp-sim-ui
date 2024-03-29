import { FC, useState } from 'react';
import { HiInformationCircle, HiOutlineX, HiPlus } from 'react-icons/hi';
import { AxiosError } from 'axios';
import { Alert, Button } from 'flowbite-react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { ButtonIcon, Heading, TextInput } from 'app/components';
import { createDevice } from 'app/queries/useDeviceQueries';
import { Device } from 'app/types';

import { DeviceModalProps } from './DeviceModal';
import { DeviceTypeSelector } from './DeviceTypeSelector';

const validationSchema = yup.object({
  type: yup.string().required('Type is required'),
  name: yup.string().required('Name is required'),
  address: yup
    .string()
    .matches(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      'Address must be in format "127.0.0.1"'
    )
    .required('Address is required'),
  port: yup.number().moreThan(1023).lessThan(65536).required('Port is required')
});

type DeviceModalContentProps = Omit<DeviceModalProps, 'show'>;

export const DeviceModalContent: FC<DeviceModalContentProps> = ({ onClose }) => {
  const [apiError, setApiError] = useState<string | undefined>();

  const formik = useFormik({
    initialValues: {
      type: '',
      name: '',
      address: '',
      port: ''
    },
    validationSchema,
    onSubmit: values => {
      setApiError(undefined);
      // @TODO - remove the need for 'as unknown as'
      createDevice(values as unknown as Device)
        .then(() => onClose())
        .catch((err: AxiosError<{ error: string }>) =>
          setApiError(err.response?.data?.error || 'Unknown error')
        )
        .finally(() => formik.setSubmitting(false));
    }
  });

  return (
    <>
      <div className='flex flex-col rounded-t p-6 pb-3'>
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
      </div>
      <form autoComplete='off' data-testid='add-device-form' onSubmit={formik.handleSubmit}>
        <div className='px-6 py-1 flex-1 overflow-auto'>
          <div className='flex flex-col gap-4'>
            {apiError && (
              <Alert color='failure' icon={HiInformationCircle}>
                {apiError}
              </Alert>
            )}
            <TextInput
              label='Name'
              id='name'
              required={true}
              autoComplete='off'
              value={formik.values.name}
              name='name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              color={formik.touched.name && Boolean(formik.errors.name) ? 'failure' : 'gray'}
            />
            <DeviceTypeSelector
              id='type'
              required={true}
              autoComplete='off'
              defaultValue={formik.values.type}
              name='type'
              onChange={val => formik.setFieldValue('type', val)}
              onBlur={formik.handleBlur}
              color={formik.touched.type && Boolean(formik.errors.type) ? 'failure' : 'gray'}
            />
            <div className='flex flex-row gap-4'>
              <TextInput
                label='Address'
                id='address'
                placeholder='127.0.0.1'
                required={true}
                autoComplete='off'
                value={formik.values.address}
                name='address'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={
                  formik.touched.address && Boolean(formik.errors.address) ? 'failure' : 'gray'
                }
              />
              <TextInput
                label='Port'
                id='port'
                placeholder='1024 to 65535'
                required={true}
                type='number'
                autoComplete='off'
                value={formik.values.port}
                name='port'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.port && Boolean(formik.errors.port) ? 'failure' : 'gray'}
              />
            </div>
          </div>
        </div>
        <div className='flex items-start justify-between rounded-b p-6 pt-3'>
          <Button color='gray' onClick={() => onClose()} data-testid='device-modal-cancel-btn'>
            Cancel
          </Button>
          <Button
            className='bg-primary-700 dark:bg-primary-700 text-white'
            disabled={!formik.isValid || formik.isSubmitting}
            data-testid='device-modal-submit-btn'
            type='submit'
          >
            <ButtonIcon as={HiPlus} />
            Add device
          </Button>
        </div>
      </form>
    </>
  );
};
