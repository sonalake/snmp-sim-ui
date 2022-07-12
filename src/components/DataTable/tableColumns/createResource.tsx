import axios, { AxiosError } from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { Alert } from '../..'
import { Agent, Device } from '../../../models'

export const createResource = async (
  values: Partial<Device | Agent>,
  resource: 'agents' | 'devices',
  refetchMethod: Function,
) => {
  try {
    await axios.post(`/api/${resource}`, values)

    refetchMethod()

    toast(<Alert color="success" message={`${resource === 'agents' ? 'Agent' : 'Device'} created!`} />)
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
