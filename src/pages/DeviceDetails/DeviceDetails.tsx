import React from 'react'
import { useParams } from 'react-router'
import { useFetch } from '../../hooks'
import { Device } from '../../models'
import { PageWrapper, BreadCrumbs, LoadingIndicator } from '../../components'

export const DeviceDetails = () => {
  const { id } = useParams()

  const { resource: device, isLoading, error } = useFetch<Device>(`/api/devices/${id}`)

  if (error) {
    throw error
  }

  return (
    <PageWrapper>
      {isLoading && <LoadingIndicator />}

      {device && (
        <>
          <BreadCrumbs />

          <h1 className="text-4xl font-bolder">Device Details - {device.name}</h1>

          <p>Description: {device.description}</p>
          <p>Host: {device.snmp_host}</p>
          <p>Port: {device.snmp_port}</p>
          <p>Agent: {JSON.stringify(device.agent, null, 2)}</p>
        </>
      )}
    </PageWrapper>
  )
}
