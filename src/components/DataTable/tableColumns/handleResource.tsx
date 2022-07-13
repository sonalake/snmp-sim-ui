import axios, { AxiosError } from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { Alert } from '../..'
import { Agent, Device } from '../../../models'

const getOperationProperties = (config: { id?: string; resource: 'agents' | 'devices' }) => {
  const { id, resource } = config

  const messageResource = resource === 'agents' ? 'Agent' : 'Device'

  return {
    post: { url: `/api/${resource}`, message: `${messageResource} created!` },
    put: { url: `/api/${resource}/${id}`, message: `${messageResource} updated!` },
    delete: { url: `/api/${resource}/${id}`, message: `${messageResource} deleted!` },
  }
}

export const handleResource = async (config: {
  resource: 'agents' | 'devices'
  operation: 'post' | 'put' | 'delete'
  id?: string
  body?: Partial<Device | Agent>
}) => {
  const { resource, operation, id, body } = config

  const { url, message } = getOperationProperties({ id, resource })[operation]

  try {
    await axios[operation](url, body)

    toast(<Alert color="success" message={message} />)
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

export const runDevice = async (id: string, isStart: boolean) => {
  const message = `Device ${isStart ? 'started' : 'stopped'}!`

  try {
    await axios.put(`/api/devices/${id}/${isStart ? 'start' : 'stop'}`)

    toast(<Alert color="success" message={message} />)
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
