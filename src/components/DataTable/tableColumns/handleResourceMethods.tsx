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

export const deleteResource = async (id: string, resource: 'agent' | 'device', refetchMethod: Function) => {
  const isResourceAgent = resource === 'agent'

  try {
    await axios.delete(`/api/${isResourceAgent ? 'agents' : 'devices'}/${id}`)

    refetchMethod()

    toast(<Alert color="success" message={`${isResourceAgent ? 'Agent' : 'Device'} deleted!`} />)
  } catch (err) {
    toast(
      <Alert
        color="failure"
        message={(err as Error).message}
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
