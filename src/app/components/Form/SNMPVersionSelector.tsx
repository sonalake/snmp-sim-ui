import { useState } from 'react';
import { toast } from 'react-toastify';
import { Checkbox, Label } from 'flowbite-react';
import { useFormikContext } from 'formik';

import { Device, SMNPVersion } from '../../models';
import { Alert } from '../Alert/Alert';

import { deviceSNMPFormFields } from './formFields';
import { TextInput } from './TextInput';

const acceptedVersions: SMNPVersion[] = ['snmp_v1', 'snmp_v2c', 'snmp_v3'];

const items = Object.keys(deviceSNMPFormFields) as Array<keyof typeof deviceSNMPFormFields>;

const versions: Array<{
  name: SMNPVersion;
  label: string;
}> = acceptedVersions.map(version => ({ name: version, label: `SNMP ${version.split('_')[1]}` }));

export const SNMPVersionSelector = () => {
  const [selectedValues, setSelectedValues] = useState<SMNPVersion[]>([acceptedVersions[0]]);

  const { setFieldValue, values, setValues, touched, errors, handleChange, handleBlur } =
    useFormikContext<Device>();

  return (
    <fieldset className='m-1'>
      <legend>SNMP version</legend>

      <div className='mt-3'>
        {versions.map(({ name, label }) => {
          const disabled = selectedValues.length === 1 && selectedValues.includes(name);

          return (
            <div key={label}>
              <div className='flex items-center gap-1'>
                <Checkbox
                  name={name}
                  value={name}
                  style={{
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    color: disabled ? '#6b6280' : '#1c64f2'
                  }}
                  onClick={() => disabled && toast(<Alert message='msg' color='info' />)}
                  disabled={disabled}
                  checked={selectedValues.includes(name)}
                  onChange={() => {
                    if (!selectedValues.includes(name)) {
                      setSelectedValues([...selectedValues, name]);
                    } else {
                      setSelectedValues(selectedValues.filter(value => value !== name));

                      const { [name]: currentSNMPVersion, ...snmp_protocol_attributes } =
                        values.snmp_protocol_attributes;

                      setFieldValue(name, '');
                      setValues({
                        ...values,
                        snmp_protocol_attributes
                      });
                    }
                  }}
                />

                <Label htmlFor={name}>{label}</Label>
              </div>

              <div className='mt-3 mb-5'>
                {items.map(
                  item =>
                    item.includes(name) && (
                      <TextInput
                        key={item}
                        formItem={deviceSNMPFormFields[item]}
                        disabled={!selectedValues.includes(name)}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                    )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};
