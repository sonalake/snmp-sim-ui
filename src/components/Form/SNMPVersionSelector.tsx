import { Label, Radio, TextInput } from 'flowbite-react'
import React, { useMemo, useState } from 'react'

type AcceptedVersions = 'snmp_v1' | 'snmp_v2c' | 'snmp_v3'

const values: Array<{ name: AcceptedVersions; label: string }> = [
  {
    name: 'snmp_v1',
    label: 'SNMP v1',
  },
  {
    name: 'snmp_v2c',
    label: 'SNMP v2c',
  },
  {
    name: 'snmp_v3',
    label: 'SNMP v3',
  },
]

const inputs = {
  snmp_v1: (
    <div className="w-full mt-3">
      <div className="mb-2 block">
        <Label htmlFor="community" value="Community" />
      </div>
      <TextInput type="text" placeholder="Community" />
    </div>
  ),
  snmp_v2c: (
    <div className="w-full mt-3">
      <div className="mb-2 block">
        <Label htmlFor="community" value="Community" />
      </div>
      <TextInput type="text" placeholder="Community" />
    </div>
  ),
  snmp_v3: (
    <div className="w-full mt-3">
      <div className="mb-5">
        <div className="mb-2 block">
          <Label htmlFor="authentication_password" value="Authentication password" />
        </div>
        <TextInput type="text" placeholder="Authentication password" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="encryption_key" value="Encryption key" />
        </div>
        <TextInput type="text" placeholder="Encryption key" />
      </div>
    </div>
  ),
}

export const SNMPVersionSelector = () => {
  const [selectedValue, setSelectedValue] = useState<AcceptedVersions>('snmp_v1')

  const input = useMemo(() => inputs[selectedValue], [selectedValue])

  return (
    <fieldset className="m-1">
      <legend>SNMP version</legend>
      <div className="flex gap-4 mt-3">
        {values.map(({ name, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Radio name={name} value={name} checked={selectedValue === name} onChange={() => setSelectedValue(name)} />
            <Label htmlFor={name}>{label}</Label>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-3 mb-5">{input}</div>
    </fieldset>
  )
}
