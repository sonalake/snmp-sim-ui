import { toast } from 'react-toastify'
import React from 'react'
import { AxiosError } from 'axios'
import { Alert } from '../Alert/Alert'

export const successToast = (message: string) => toast(<Alert color="success" message={message} />)

export const errorToast = (err: unknown) =>
  toast(
    <Alert
      color="failure"
      message={err instanceof Error ? err.message : ''}
      additionalContent={
        <>
          {err instanceof AxiosError && (
            <>
              <span>{(err as AxiosError).code}:</span>
              <br />
              <span>{(err as AxiosError<{ error: string }>)?.response?.data?.error}</span>
            </>
          )}
        </>
      }
    />,
  )
