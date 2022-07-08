import { Breadcrumb } from 'flowbite-react'
import React, { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { StyledLink } from '../StyledLink/StyledLink'

export const BreadCrumbs = () => {
  const location = useLocation()
  const { id } = useParams()

  const breadcrumbNameMap = useMemo(
    () => ({
      '/agents': 'Agents',
      [`/agents/${id}`]: 'Agent details',
      '/devices': 'Devices',
      [`/devices/${id}`]: 'Device details',
    }),
    [id],
  )

  const generateBreadcrumbItems = useMemo(() => {
    const pathSnippets = location.pathname.split('/').filter((i) => i)

    return pathSnippets.map((path, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`

      const isCurrentPathTheLast = pathSnippets.indexOf(path) === pathSnippets.length - 1

      const breadcrumbLabel = breadcrumbNameMap[url]

      return (
        <Breadcrumb.Item key={url}>
          {isCurrentPathTheLast ? <span>{breadcrumbLabel}</span> : <StyledLink href={url} label={breadcrumbLabel} />}
        </Breadcrumb.Item>
      )
    })
  }, [breadcrumbNameMap, location.pathname])

  const breadcrumbItems = useMemo(
    () =>
      [
        <Breadcrumb.Item key="dashboard">
          <StyledLink href="/" label="Dashboard" />
        </Breadcrumb.Item>,
      ].concat(generateBreadcrumbItems),
    [generateBreadcrumbItems],
  )

  return <Breadcrumb aria-label="Breadcrumb">{breadcrumbItems}</Breadcrumb>
}
