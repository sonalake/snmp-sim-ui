import React from 'react'
import { useParams } from 'react-router'
import { BreadCrumbs, LoadingIndicator, PageWrapper } from '../../components'
import { useFetch } from '../../hooks'
import { Device } from '../../models'

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

          <h1 className="text-4xl font-bolder mt-5 mb-32">Device Details - {device.name} - WIP</h1>

          <p>Description: {device.description}</p>
          <p>Host: {device.snmp_host}</p>
          <p>Port: {device.snmp_port}</p>
          <p>SNMP protocol attributes: {JSON.stringify(device.snmp_protocol_attributes, null, 2)}</p>
          <p>Agent: {JSON.stringify(device.agent, null, 2)}</p>
        </>
      )}
    </PageWrapper>
  )
}
