import { Label, Select } from 'flowbite-react'
import React, { FC } from 'react'
import { Device } from '../../models'

export const SelectInput: FC<{ selectOptions: Device[] }> = ({ selectOptions }) => (
  <>
    <Label htmlFor="countries" value="Device type:" />

    <div id="select" className="w-1/5 ml-3 mr-auto">
      <Select id="countries" defaultValue="All" required>
        {selectOptions.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </Select>
    </div>
  </>
)
