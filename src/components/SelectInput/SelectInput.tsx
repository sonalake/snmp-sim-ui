import React, { FC } from 'react'
import { Label, Select } from 'flowbite-react'
import { Device } from '../../models'

export const SelectInput: FC<{ data: Device[] }> = ({ data }) => {
  return (
    <>
      <Label htmlFor="countries" value="Device type:" />

      <div id="select" className="w-1/5 ml-3 mr-auto">
        <Select id="countries" defaultValue="All" required>
          {data?.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </Select>
      </div>
    </>
  )
}
