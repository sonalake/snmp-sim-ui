import React, { useState } from 'react'
import { Button, TextInput } from 'flowbite-react'
import { AiOutlineCaretRight, AiOutlinePause, AiOutlinePlusCircle, AiOutlineReload } from 'react-icons/ai'
import { Device } from '../../models'
import { useFetch } from '../../hooks'
import {
  AddNewDeviceModal,
  DataTable,
  SelectInput,
  LoadingIndicator,
  PageWrapper,
  BreadCrumbs,
  Pagination,
} from '../../components'
import { devicesColumns } from '../../utils/devicesColumns'

export const Devices = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { resource: devices, isLoading, error, fetchData } = useFetch<Device[]>('/api/devices')

  if (error) {
    throw error
  }

  return (
    <PageWrapper>
      {isLoading && <LoadingIndicator />}

      {!!devices?.length && (
        <>
          <BreadCrumbs />

          <div className="flex flex-row items-center mt-5 mb-5">
            <SelectInput data={devices} />

            <div className="flex flex-row items-center gap-1">
              <Button color="light" onClick={() => setIsModalVisible(true)}>
                <AiOutlinePlusCircle className="mr-2 h-5 w-5" /> Add
              </Button>

              <Button color="light">
                <AiOutlineCaretRight className="mr-2 h-5 w-5" />
                Start all
              </Button>

              <Button color="light">
                <AiOutlinePause className="mr-2 h-5 w-5" /> Stop all
              </Button>

              <Button onClick={() => fetchData()} color="light">
                <AiOutlineReload className="mr-2 h-5 w-5" /> Refresh
              </Button>
            </div>
          </div>

          <div className="mb-3">
            <TextInput type="text" placeholder="Search" />
          </div>

          <DataTable data={devices} columns={devicesColumns} />

          <Pagination currentPage={0} onPageChange={(page) => console.log(page)} />

          <AddNewDeviceModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
        </>
      )}
    </PageWrapper>
  )
}
