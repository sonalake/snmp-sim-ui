import React from 'react'
import { PageWrapper } from '../../components'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  return (
    <PageWrapper>
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bolder mb-16">Welcome to the SNMP Simulator Web Console</h1>

        <Button>
          <Link to="/devices">Devices</Link>
        </Button>
      </div>
    </PageWrapper>
  )
}
