import axios, { AxiosError } from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { Alert } from '../..'

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
