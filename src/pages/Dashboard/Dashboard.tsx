import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { PageWrapper } from '../../components'

export const Dashboard = () => (
  <PageWrapper>
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <h1 className="text-4xl font-bolder mb-16">Welcome to the SNMP Simulator Web Console</h1>

      <Link to="/agents">
        <Button>Agents</Button>
      </Link>

      <Link to="/devices">
        <Button>Devices</Button>
      </Link>
    </div>
  </PageWrapper>
)
