import React from 'react'
import { useParams } from 'react-router'
import { BreadCrumbs, LoadingIndicator, PageWrapper } from '../../components'
import { useFetch } from '../../hooks'
import { Agent } from '../../models'

export const AgentDetails = () => {
  const { id } = useParams()

  const { resource: device, isLoading, error } = useFetch<Agent>(`/api/agents/${id}`)

  if (error) {
    throw error
  }

  return (
    <PageWrapper>
      {isLoading && <LoadingIndicator />}

      {device && (
        <>
          <BreadCrumbs />

          <h1 className="text-4xl font-bolder mt-5 mb-32">Agent Details - {device.name} - WIP</h1>

          <p>Description: {device.description}</p>
          <p>Data URL: {device.snmp_data_url}</p>
        </>
      )}
    </PageWrapper>
  )
}
