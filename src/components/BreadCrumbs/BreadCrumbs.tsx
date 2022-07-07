import React, { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Breadcrumb } from 'flowbite-react'
import { StyledLink } from '../StyledLink/StyledLink'

export const BreadCrumbs = () => {
  const location = useLocation()
  const { id } = useParams()

  const breadcrumbNameMap: Record<string, string> = useMemo(
    () => ({
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

      return isCurrentPathTheLast ? (
        <Breadcrumb.Item key={url}>
          <span>{breadcrumbLabel}</span>
        </Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item key={url}>
          <StyledLink href={url} label={breadcrumbLabel} />
        </Breadcrumb.Item>
      )
    })
  }, [breadcrumbNameMap])

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
