import axios, { AxiosError } from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { Alert } from '../..'

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
