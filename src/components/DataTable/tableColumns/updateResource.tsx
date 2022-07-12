import axios, { AxiosError } from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { Alert } from '../..'
import { Agent, Device } from '../../../models'

export const updateResource = async (
  values: Partial<Device | Agent>,
  id: string,
  resource: 'agents' | 'devices',
  refetchMethod: Function,
) => {
  try {
    await axios.put(`/api/${resource}/${id}`, values)

    refetchMethod()

    toast(<Alert color="success" message={`${resource === 'agents' ? 'Agent' : 'Device'} updated!`} />)
  } catch (err) {
    toast(
      <Alert
        color="failure"
        message={(err as Error)?.message}
        additionalContent={
          <>
            <span>{(err as AxiosError).code}:</span>
            <br />
            <span>{(err as AxiosError<{ error: string }>)?.response?.data?.error}</span>
          </>
        }
      />,
    )
  }
}
