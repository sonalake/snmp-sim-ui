import { Row } from '@tanstack/react-table'
import { Button } from 'flowbite-react'
import React, { useState } from 'react'
import { AiOutlineCaretRight, AiOutlinePause, AiOutlinePlusCircle, AiOutlineReload } from 'react-icons/ai'
import { toast } from 'react-toastify'
import {
  AddNewDeviceModal,
  Alert,
  BreadCrumbs,
  DataTable,
  LoadingIndicator,
  PageWrapper,
  Pagination,
} from '../../components'
import { PAGINATION_PAGE_SIZE_OPTIONS } from '../../constants'
import { useFetch } from '../../hooks'
import { Device } from '../../models'
import { devicesColumns } from '../../utils/tableColumns/devicesColumns'

export const Devices = () => {
  const [selectedDevices, setSelectedDevices] = useState<Array<Row<Device>>>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGINATION_PAGE_SIZE_OPTIONS[0])
  const [isModalVisible, setIsModalVisible] = useState(false)

  const {
    resource: devices,
    isLoading,
    error,
    fetchData,
  } = useFetch<Device[]>(`/api/devices?page=${currentPage}&page_size=${pageSize}`)

  if (error) {
    throw error
  }

  return (
    <PageWrapper>
      {isLoading && !devices?.length && <LoadingIndicator />}

      {!!devices && (
        <>
          <BreadCrumbs />

          <div className="flex flex-row items-center justify-end mt-5 mb-5">
            <div className="flex flex-row items-center gap-1">
              <Button color="light" onClick={() => setIsModalVisible(true)}>
                <AiOutlinePlusCircle className="mr-2 h-5 w-5" /> Add
              </Button>

              <Button
                color="light"
                onClick={() =>
                  selectedDevices.length
                    ? toast(<Alert message="The selected devices were started!" color="success" />)
                    : toast(<Alert message="All devices were started!" color="success" />)
                }
              >
                <AiOutlineCaretRight className="mr-2 h-5 w-5" />
                Start all
              </Button>

              <Button
                color="light"
                onClick={() =>
                  selectedDevices.length
                    ? toast(<Alert message="The selected devices were stopped!" color="success" />)
                    : toast(<Alert message="All devices were stopped!" color="success" />)
                }
              >
                <AiOutlinePause className="mr-2 h-5 w-5" /> Stop all
              </Button>

              <Button onClick={() => fetchData()} color="light">
                <AiOutlineReload className="mr-2 h-5 w-5" /> Refresh
              </Button>
            </div>
          </div>

          {/* @TODO: make DataTable properly generic and remove these castings */}
          <DataTable
            data={devices}
            columns={devicesColumns as []}
            isSelectable
            onSelection={(selectedRows) => setSelectedDevices(selectedRows as [])}
          />

          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            pageSize={pageSize}
            onPageSizeChange={(size) => setPageSize(size)}
          />

          <AddNewDeviceModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
        </>
      )}
    </PageWrapper>
  )
}
