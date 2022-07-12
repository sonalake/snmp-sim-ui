import React from 'react'
import { useParams } from 'react-router'
import { BreadCrumbs, LoadingIndicator, PageWrapper, StatusIndicator } from '../../components'
import { useFetch } from '../../hooks'
import { Device } from '../../models'

const isMockActive = false

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

          <h1 className="text-4xl font-bolder mt-5 mb-32">{device.name} - details - WIP</h1>

          <p className="flex gap-1">
            Status: <StatusIndicator title={isMockActive ? 'Running' : 'Stopped'} isActive={isMockActive} />
          </p>

          <p>Description: {device.description}</p>
          <p>Host: {device.snmp_host}</p>
          <p>Port: {device.snmp_port}</p>
          <p>SNMP protocol attributes: {JSON.stringify(device.snmp_protocol_attributes, null, 2)}</p>
          <p>Agent: {device.agent.name}</p>
        </>
      )}
    </PageWrapper>
  )
}
