import axios from 'axios'
import { useState, useCallback, useEffect } from 'react'

export const useFetch = <T>(url: string) => {
  const [resource, setResource] = useState<T>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)

      const { data } = await axios.get<T>(url, {
        headers: { 'content-type': 'application/json', accept: 'application/json' },
      })

      setResource(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { resource, isLoading, error, fetchData }
}
